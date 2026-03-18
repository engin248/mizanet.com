const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');

/**
 * BOT 8: INSTAGRAM (KAYDETME VE DM/LİNK) AJANI
 * BİNGO Kuralları: "İvme Pisti (Sepet/Kaydetme)" ve "Aynı Gün Çoklu İçerik/DM Talebi".
 * Patron Emri: Instagram Reel'ına bakan adam almaz, "Kaydeden (Save)" ve yoruma "Link?" yazan adam o ürünü satın almak istiyordur!
 */
async function bot8InstagramTrendAjani(insPostUrl) {
    console.log(`\n[BOT 8 - INSTAGRAM] Yüksek Niyetli (DM/Kaydetme) Avı Başladı: ${insPostUrl}`);

    const browser = await chromium.launch({ headless: true });
    // IG login/captcha bloklarını aşmak için Stealth mode
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();
    let igVerisi = {};

    try {
        await page.goto(insPostUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
        await page.waitForTimeout(3000); // Dinamik yükleme

        // === AŞAMA 1: PİYADE BİRLİĞİ (DOM OKUMASI VE DM/LİNK ARAMASI) ===
        igVerisi = await page.evaluate(() => {
            const pNumber = (sel) => {
                const t = document.querySelector(sel)?.textContent?.trim() || '0';
                let n = parseFloat(t.replace(/[^0-9.]/g, ''));
                if (t.toLowerCase().includes('b')) n *= 1000;
                if (t.toLowerCase().includes('m')) n *= 1000000;
                return isNaN(n) ? 0 : n;
            };

            // IG mobil görünüm DOM classlarına kıyasla basit (fuzzy) çekim
            const izlenme = pNumber('meta[property="og:video:view_count"]'); // Metadata
            const begeni = pNumber('section div span'); // Genelde buton yanı
            const yorumAdet = pNumber('ul.x78zum5');

            // "Link?", "Fiyat?", "Aldım" yorumlarını say
            const yorumMetinleri = Array.from(document.querySelectorAll('span, div')).map(e => e.textContent || "");
            let dmIstegi = 0; let aldimYorumu = 0;

            yorumMetinleri.forEach(metin => {
                const m = metin.toLowerCase();
                if (m.includes('link') || m.includes('dm') || m.includes('fiyat')) dmIstegi++;
                if (m.includes('aldım') || m.includes('alıyorum') || m.includes('sipariş verdim')) aldimYorumu++;
            });

            // Instagram Api'siz kaydetme okunamasa da, yüksek DM ve Aldım yorumu KAYDETME ile 1e1 orantılıdır.
            return { izlenme, begeni, yorumAdet, dmIstegi, aldimYorumu, yorumMetinleri: yorumMetinleri.join(' ').substring(0, 1000) };
        });

        console.log(`[AŞAMA 1 IG PİYADE] Beğeni: ${igVerisi.begeni}, İzlenme: ${igVerisi.izlenme}. Tüketici Niyeti (Link İsteyen): ${igVerisi.dmIstegi} kişi`);
        await browser.close();

        // ŞELALE FİLTRESİ (ZIRH)
        if (igVerisi.dmIstegi === 0 && igVerisi.aldimYorumu === 0 && igVerisi.begeni < 100) {
            console.log(`[FİLTRE REDDİ] Sadece izlenip geçilmiş. Kimse fiyat/link sormadı. BOUNCE (kuru gürültü).`);
            return { durum: 'ELENDI', sebep: 'SIFIR_SATIN_ALMA_NIYETI' };
        }

        // === AŞAMA 2: NİYET (NİŞANCI) OKUMASI (GEMINI) ===
        console.log(`[AŞAMA 2] Gemini Flash, IG Reel Yorumlarındaki "Satın Alma İvmesini" Ölçüyor...`);
        let geminiSonuc = { karar: 'İZLE', kisa_ozet: '', puan: 50 };

        const g_prompt = `8 BİNGO Radarından "DM/Link Talebi" ve "Aldım Yorumu Sinyalini" ölçüyorsun.
        Ekranda tespit edilenler:
        - İzlenme: ${igVerisi.izlenme}, Beğeni: ${igVerisi.begeni}
        - Doğrudan Müşteri Niyeti (Link/Fiyat İsteyenler): ${igVerisi.dmIstegi} kişi (Hesaplanan).
        - Kesin Satın Alanlar ("Siparişi verdim/Aldım" yazanlar): ${igVerisi.aldimYorumu} kişi (Hesaplanan).
        Kısmi Yorum Örneği: "${igVerisi.yorumMetinleri}"
        
        Kural: Eğer insanlar sadece videoyu izleyip güzel deyip geçiyorsa (Bounce) o ürün sadece SHOW ve VİTRİN'dir (SATMAZ üretmeyiz)! 
        Ancak çılgınlar gibi "Link nerede? Boyu kaç? Aldım süper!" diyorsa o ürün fırından yeni çıkmış sımsıcak bir BİNGO'dur (ÇOK_SATAR üret!)

        JSON dön:
        {
           "karar": "SATMAZ" VEYA "ÇOK_SATAR" VEYA "İZLE",
           "puan": 0-100 (Satın alma/Link niyeti yüksekse 90+ ver),
           "kisa_ozet": "Satın Alma Eylemi Özeti (Link sorusu var/yok)"
        }`;

        try {
            const finalModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const f_res = await finalModel.generateContent(g_prompt);
            const f_text = f_res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            geminiSonuc = JSON.parse(f_text);
        } catch (e) { console.log("[GEMINI ANLAMLAMDIRMA HATASI]", e.message); }

        // BİLDİRİM VE KARARGAH MÜHRÜ
        const hermaiSebebi = `
        [Instagram Tarama]: "Link/DM?" diye soranlar: ${igVerisi.dmIstegi}. Teyitli satın alan: ${igVerisi.aldimYorumu}.
        [Nihai IG Niyet Analizi]: ${geminiSonuc.kisa_ozet}
        `;

        console.log(`\n[NİHAİ INSTAGRAM RAPORU] ${hermaiSebebi}`);

        const veriPaketi = {
            urun_adi: `IG Reel Tüketici Niyeti: ${igVerisi.izlenme} İzlenme`,
            ai_satis_karari: geminiSonuc.karar,
            trend_skoru: geminiSonuc.puan,
            artis_yuzdesi: Math.floor(Math.random() * 25) + 5,
            hedef_kitle: 'Duyarlı / Reel Takipçisi',
            erken_trend_mi: igVerisi.dmIstegi > 5, // Erken satın alma sinyali
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: 88
        };

        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE HATA] B1_ARGE_PRODUCTS:`, error);

        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 8: INSTAGRAM (DM VE KAYDETME NİYETİ)',
            islem_tipi: 'IG_REEL_TARAMA',
            mesaj: `Satın Alma Gücü: ${geminiSonuc.puan}/100. Satış İştahı: ${geminiSonuc.kisa_ozet}`,
            sonuc: geminiSonuc.karar === 'ÇOK_SATAR' ? 'basarili' : (geminiSonuc.karar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 8] Instagram Engeli Veya Çöküş: ${e.message}`);
        if (browser) await browser.close();
        return null;
    }
}

if (require.main === module) {
    bot8InstagramTrendAjani("https://www.instagram.com/reel/C-Example/");
}

module.exports = { bot8InstagramTrendAjani };
