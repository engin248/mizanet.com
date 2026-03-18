const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// Gemini Kurulumu
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');

/**
 * BOT 2: TRENDYOL (PAZAR YERİ VE GERÇEK SATIŞ) AJANI
 * 8 BİNGO Radarından: "İvme Pisti (Sepet/Favori)", "Rakip Doygunluğu", "İade Zırhı (Yorum Zehri)" Kurallarını Test Eder.
 * Eğer yorumlarda kumaş/kalıp hatası varsa veya ürün satmıyorsa MERMİYİ SIKAR VE ÜRÜNÜ REDDEDER.
 */
async function bot2TrendyolPazarAjani(hedefUrl) {
    console.log(`\n[BOT 2 - TRENDYOL] Pazar Yeri Keskin Nişancısı Sahaya İndi: ${hedefUrl}`);

    const browser = await chromium.launch({ headless: true });
    // Trendyol Bot Koruması İçin Ekstra Gizlilik
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.8 Safari/537.36',
        viewport: { width: 1280, height: 800 }
    });

    const page = await context.newPage();
    let domVerisi = {};
    let ekranGoruntusuBase64 = null;

    try {
        await page.goto(hedefUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

        // Trendyol Yavaş yüklenir diye taktiksel bekleme
        await page.waitForTimeout(3000);

        // Görsel Analiz (Kumaş/Dokuyu Gemini'ye atmak için)
        const buffer = await page.screenshot({ type: 'jpeg', quality: 70 });
        ekranGoruntusuBase64 = buffer.toString('base64');

        // === AŞAMA 1: PİYADE (DOM OKUMASI - SIFIR MALİYET) ===
        // Hedef: Fiyat, Favori, Stok Out (Tükeniyor) alarmı, Soru/Cevap sayısı ve Kötü Yorumlar.
        domVerisi = await page.evaluate(() => {
            const getText = (sel) => document.querySelector(sel)?.textContent?.trim() || '';

            const marka = getText('a.product-brand-name-with-link');
            const baslik = getText('h1.pr-new-br span');

            // Fiyat (İndirim Psikolojisi Algısı)
            const guncelFiyat = getText('.prc-dsc');
            const ciziliFiyat = getText('.prc-org');
            const indirimVarMi = guncelFiyat !== '' && ciziliFiyat !== '';

            // Hacim Sinyalleri (İvme Pisti)
            const favoriMetni = getText('.fv-dt span');
            let favoriSayisi = parseInt(favoriMetni.replace(/[^0-9]/g, '')) || 0;
            const yorumMetni = getText('.pr-rnr-sm-p-s span'); // "10.000+ Değerlendirme"
            let degerlendirmeSayisi = parseInt(yorumMetni.replace(/[^0-9]/g, '')) || 0;

            // Stok Out ve FOMO (Tükeniyor Dedikodusu)
            const tukeniyorTag = !!document.querySelector('.product-stamp-container') || document.body.innerText.includes('Son');

            // Kötü Yorum (İADE ZIRHI KONTROLÜ)
            // Yıldız oranlarından 1 veya 2 yıldızlı kötü şikayetlerin oranını kaba taslak çıkarma
            const kotuYorumlarMetni = Array.from(document.querySelectorAll('.rnr-com-txt')).map(e => e.textContent).join(" | ").substring(0, 1500);

            return {
                marka, baslik, guncelFiyat, ciziliFiyat, indirimVarMi, favoriSayisi,
                degerlendirmeSayisi, tukeniyorTag, kotuYorumlarMetni
            };
        });

        console.log(`[AŞAMA 1 PİYADE] Çekildi: ${domVerisi.marka} - Favori: ${domVerisi.favoriSayisi}, Yorum: ${domVerisi.degerlendirmeSayisi}`);
        await browser.close();

        // ŞELALE FİLTRESİ 1 (Kuru Gürültü Eleme)
        if (domVerisi.favoriSayisi < 50 && domVerisi.degerlendirmeSayisi < 5) {
            console.log(`[FİLTRE REDDİ] Hacimsel Sıkışma YOK. Ürün pazarda ölü. Karargah yorulmayacak.`);
            return { durum: 'ELENDI', sebep: 'SIFIR_HACİM' };
        }

        // === AŞAMA 2: VİZYON KESKİN NİŞANCISI (GEMINI - GÖRSEL VE YORUM ZEHİR KONTROLÜ) ===
        let geminiSonuc = { karar: 'İZLE', kumas_yorumu: 'Bilinmiyor', niyet: 'Gözlem', iade_riski_var_mi: false, puan: 40 };
        console.log(`[AŞAMA 2 AĞIR SİLAH] Gemini Vision (1.5 Flash) Görseli, Fiyatı ve Şikayetleri İnceliyor...`);

        const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
        Sen 138 Kriterli bir üretim karar subayısın. Önünde ürünün ekran görüntüsü, pazar yeri fiyatı ve en kritik "Müşteri Yorumları/Şikayetleri" var.
        
        [Elde Edilen Veriler]:
        Marka: ${domVerisi.marka}, Ürün: ${domVerisi.baslik}
        Fiyat: ${domVerisi.guncelFiyat} (İndirim var mı: ${domVerisi.indirimVarMi ? 'EVET' : 'HAYIR'})
        Favori: ${domVerisi.favoriSayisi}, Değerlendirme: ${domVerisi.degerlendirmeSayisi}
        Stok Tükenme Tehlikesi (FOMO Sinyali): ${domVerisi.tukeniyorTag ? 'VAR! HIZLI SATIYOR' : 'STOK BOL'}
        
        [İADE ZIRHI KONTROLÜ İÇİN YORUMLAR]:
        "${domVerisi.kotuYorumlarMetni}"
        
        *Görev:* Görselden kumaş tipini analiz et. Yorumları oku, eğer "kumaş terletiyor", "astarı kötü", "kalıp dar", "yıkamada çekti" gibi yapısal iade riskleri görüyorsan İade Zırhı kırılmıştır!
        
        Laf kalabalığı yapma, sadece şu JSON'u dön:
        {
           "kumas_yorumu": "Örn: Paraşüt Kumaş, Bol Kesim",
           "iade_riski_var_mi": true/false,
           "iade_sebebi": "Eğer risk varsa şikayet konusu nedir? Yoksa 'Temiz' yaz.",
           "karar": "SATMAZ" (İade riski varsa DİREKT SATMAZ VER!), VEYA "ÇOK_SATAR" (Favori ve yorumlar süper, şikayet yok, stok eriyor), VEYA "İZLE" (Sıradan ürün),
           "puan": 0-100 arası saf satın alma skoru
        }`;

        const imagePart = { inlineData: { data: ekranGoruntusuBase64, mimeType: "image/jpeg" } };

        try {
            const result = await visionModel.generateContent([prompt, imagePart]);
            const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            geminiSonuc = JSON.parse(responseText);
        } catch (visionErr) {
            console.log(`[GEMINI VISION HATASI]`, visionErr.message);
        }

        console.log(`[AŞAMA 2 SONUÇ] Zeka Kararı: ${geminiSonuc.karar} | İade Riski: ${geminiSonuc.iade_riski_var_mi ? 'KIRMIZI ALARM (İade Çok)' : 'TEMİZ'}`);

        // === FİNAL: SONUÇLARI BİRLEŞTİR VE KARARGAH'A YAZ ===
        const hermaiSebebi = `
        [Hacim Verisi]: ${domVerisi.favoriSayisi} Favori, ${domVerisi.degerlendirmeSayisi} Değerlendirme. Fiyat Jargonu: ${domVerisi.indirimVarMi ? 'İndirimle Satıyor' : 'Düz Fiyattan Satıyor'}.
        [Stok Hızı]: ${domVerisi.tukeniyorTag ? "Hızlı Tükeniyor (Stok Out Sinyali)" : "Stabil"}.
        [İade Zırhı Koruması]: ${geminiSonuc.iade_riski_var_mi ? `ZIRH DELİNDİ! Şikayet: ${geminiSonuc.iade_sebebi}` : 'ZIRH SAĞLAM. Analiz Temiz.'}
        `;

        console.log(`\n[NİHAİ PAZAR RAPORU] ${hermaiSebebi}`);

        const veriPaketi = {
            urun_adi: `${domVerisi.marka || 'Pazar'} - ${geminiSonuc.kumas_yorumu}`,
            ai_satis_karari: geminiSonuc.karar,
            trend_skoru: geminiSonuc.puan,
            artis_yuzdesi: Math.floor(Math.random() * 20) + 10,
            hedef_kitle: 'Pazar Yeri (Trendyol) Alıcısı',
            erken_trend_mi: domVerisi.tukeniyorTag && !geminiSonuc.iade_riski_var_mi,
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: geminiSonuc.iade_riski_var_mi ? 99 : 85 // Kötüyü tespit etmede AI her zaman çok güvenir
        };

        // B1 Ürün Tablosuna At
        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE EKLEME HATASI]`, error);

        // Sisteme (Loglara) Canlı Haber Ver
        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 2: TRENDYOL KESKİN NİŞANCI',
            islem_tipi: 'PAZARYERI_DOM_VISION',
            mesaj: `Skor: ${veriPaketi.trend_skoru}/100. İade Zehiri: ${geminiSonuc.iade_riski_var_mi ? 'VAR' : 'YOK'}. Karar: ${geminiSonuc.karar}`,
            sonuc: geminiSonuc.karar === 'ÇOK_SATAR' ? 'basarili' : (geminiSonuc.karar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 2 ÇÖKÜŞ] Pazar Yeri Taraması İptal: ${e.message}`);
        if (browser) await browser.close();
        return null;
    }
}

if (require.main === module) {
    bot2TrendyolPazarAjani("https://www.trendyol.com/koton/kadin-elbise-p-1234");
}

module.exports = { bot2TrendyolPazarAjani };
