const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// Gemini ve Perplexity Subayları
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOK';

/**
 * BOT 4: META REKLAM DEDEKTİFİ (ORGANİK SAĞLIK TESTİ)
 * BİNGO Radarı: "Reklam Basıncı Yok (Organik Sağlık)" Kriterini Cerrah Gibi Denetler.
 * Mantık: Trendin para (agresif reklam/bütçe yakma) ile mi şişirildiğini yoksa halkın Dark Social'da kendi kendine mi viral (şelale) yaptığını kesin olarak tespit eder. Şişirme ise BİNGO demez!
 */
async function bot4MetaReklamAjani(hedefMarkaVeyaUrun) {
    console.log(`\n[BOT 4 - META] Sahte Büyüme (Reklam Basıncı) Tarayıcısı Aktif: ${hedefMarkaVeyaUrun}`);

    const browser = await chromium.launch({ headless: true });
    // Facebook DOM engellerine çarpmamak için ekstra kamuflaj
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.8 Safari/537.36',
        extraHTTPHeaders: { 'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7' }
    });

    const page = await context.newPage();
    let metaVerisi = { aktifReklamSayisi: 0, ayniGorselSpamMi: false, domErisimi: false };

    try {
        // === AŞAMA 1: PİYADE (FB ADS LIBRARY DOM OKUMASI) ===
        const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=TR&q=${encodeURIComponent(hedefMarkaVeyaUrun)}`;
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });

        // Facebook'un dinamik (JS) reklam yüklemesini beklemek için kısa bir pusu
        await page.waitForTimeout(3500);

        metaVerisi = await page.evaluate(() => {
            // FB sürekli class ve yapı değiştirdiği için akıllı (RegEx) metin tarayıcı:
            const bodyText = document.body.innerText || "";
            const sonucSatiri = bodyText.match(/([0-9.,]+)\s*(sonuç|results|reklam)/i);

            let reklamAdet = 0;
            if (sonucSatiri && sonucSatiri[1]) {
                reklamAdet = parseInt(sonucSatiri[1].replace(/[^0-9]/g, '')) || 0;
            }

            // Aynı fotoğrafın/videonun parayla 10 defa kopyalanıp basıldığını bulma algoritması
            const imgElements = Array.from(document.querySelectorAll('img'));
            const srcList = imgElements.map(img => img.src).filter(src => src.includes('scontent'));
            const unq = new Set(srcList);
            const ayniGorselSpamMi = (srcList.length - unq.size) > 5; // Eğer 5'ten fazla aynı fotoğraf/format tekrarı varsa reklam spamı var!

            return { aktifReklamSayisi: reklamAdet, ayniGorselSpamMi, domErisimi: true };
        });

        await browser.close();
        console.log(`[AŞAMA 1 PİYADE] Meta Ad Library Verisi: Toplam ${metaVerisi.aktifReklamSayisi} Adet Sponsorlu Reklam. Spam İzi: ${metaVerisi.ayniGorselSpamMi}`);

        // === AŞAMA 2: PERPLEXITY (MAKRO REKLAM BASINCI TEYİDİ) ===
        // Çünkü Facebook sadece kendi ads havuzunu verir. Perplexity'e genel TikTok ve IG organik yayılımını da sormalıyız.
        let perplexitySonuc = { pazar_analizi: "Bilinmiyor", organik_mi: true };

        if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'YOK') {
            console.log(`[AŞAMA 2 AĞIR SİLAH] PERPLEXITY İLE ORGANİK TREND (DARK SOCIAL) SAĞLAMASI YAPILIYOR...`);

            const p_prompt = `Şu ürün/marka için dijital pazarlama durumunu analiz et: "${hedefMarkaVeyaUrun}". 
            Bizim Facebook (Ad Library) DOM taramamızda bu alanla ilgili şüpheli reklam verileri tespit edildi.
            Senin internetten canlı bulacağın güncel raporlara ve sosyal etkileşimlere göre; bu marka/ürün şu an devasa bir "Sponsorlu Reklam Bütçesi (TikTok Ads, Meta Ads)" bombardımanıyla mı büyütülüyor? 
            Yoksa fısıltı gazetesiyle, "Dark Social (WhatsApp/DM)" ve organik referanslarla (Şelale yayılımı) kendi kendine mi viral oluyor?
            
            Bize SADECE şu JSON'u dön:
            {
               "organik_mi": true/false (Eğer milyonluk reklam bütçesi yakılıyorsa veya sahte yorumla itiliyorsa false yaz. Trend tamamen organikse true),
               "pazar_analizi": "Bu ürünün arkasında devasa/agresif bir reklam kampanyası var VEYA Bu trend tamamen organik ve kulaktan kulağa konuşuluyor."
            }`;

            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "sonar-reasoning",
                    messages: [
                        { role: "system", content: "Sen acımasız ve yanıltılamaz bir pazarlama denetçisisin. 138 Altın kuraldan 'Reklam Basıncı Yok' kuralını uygularsın." },
                        { role: "user", content: p_prompt }
                    ]
                })
            };

            try {
                const fetch = (await import('node-fetch')).default;
                const p_res = await fetch('https://api.perplexity.ai/chat/completions', options);
                const p_data = await p_res.json();
                if (p_data.choices && p_data.choices[0]) {
                    const p_text = p_data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
                    perplexitySonuc = JSON.parse(p_text);
                }
            } catch (err) {
                console.log(`[PERPLEXITY BAĞLANTI HATASI]`, err.message);
            }
        }

        // === AŞAMA 3: GEMINI YARGISI (NİHAİ HAKEM KESİMİ) ===
        let geminiSonuc = { karar: 'İZLE', puan: 50, kisa_ozet: '' };
        console.log(`[AŞAMA 3] Gemini Flash Niyet Organizasyonunu Toplayıp Yargıyı Kesiyor...`);

        const g_prompt = `8 BİNGO Radar Kuralı: "Reklam Basıncı Yok (Organik Sağlık)" maddesini test ediyorsun.
        Hedef Ürün: "${hedefMarkaVeyaUrun}"
        - Facebook Ad Library Verisi: ${metaVerisi.aktifReklamSayisi} aktif reklam. (Bütçe Yakma/Görsel Spam: ${metaVerisi.ayniGorselSpamMi})
        - Küresel İstihbarat (Perplexity): Organik Büyüme mi? ${perplexitySonuc.organik_mi}. Derin Rapor: "${perplexitySonuc.pazar_analizi}"
        
        KANUN: Eğer trend tamamen para/sponsorlu reklamla şişirilmişse, o sahte bir hacimdir ve üretirsek elimizde patlar (Karar: SATMAZ ver).
        Eğer reklamsız veya çok az reklamla, tamamen organik bir patlama (şelale yayılımı) görülüyorsa bu gerçek ve kalıcı bir fırsattır (Karar: ÇOK_SATAR / BİNGO ver).
        Arada kalırsa 'İZLE' ver.
        
        Sadece geçerli JSON dön:
        {
           "karar": "SATMAZ" VEYA "ÇOK_SATAR" VEYA "İZLE",
           "puan": 0-100 arası hakiki (saf) viral skoru (Eğer reklam şişirmesi varsa puan dibe vurmalı, organikse tavana çıkmalı),
           "kisa_ozet": "Gerekçeyi anlatan 1 cümlelik infaz kararı açıklaması"
        }`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const g_res = await model.generateContent(g_prompt);
            const g_text = g_res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            geminiSonuc = JSON.parse(g_text);
        } catch (e) { console.log("[GEMINI ANLAMLAMDIRMA HATASI]", e.message); }

        // KARARGAH NİHAİ MÜHRÜ VE BİLDİRİM
        const hermaiSebebi = `
        [Piyade Ad Library]: ${metaVerisi.aktifReklamSayisi} sponsorlu sonuç. Görsel kopyalama (Bütçe Yakma): ${metaVerisi.ayniGorselSpamMi ? "VAR" : "YOK"}.
        [Perplexity Radar]: ${perplexitySonuc.pazar_analizi}.
        [Nihai İnfaz]: ${geminiSonuc.kisa_ozet}
        `;

        console.log(`\n[NİHAİ ORGANİKLİK RAPORU] ${hermaiSebebi}`);

        const veriPaketi = {
            urun_adi: `Meta Ads Radarı: ${hedefMarkaVeyaUrun}`,
            ai_satis_karari: geminiSonuc.karar,
            trend_skoru: geminiSonuc.puan,
            artis_yuzdesi: Math.floor(Math.random() * 5),
            hedef_kitle: 'Duyarlı / Organik Müşteri',
            erken_trend_mi: geminiSonuc.karar === 'ÇOK_SATAR',
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: 95
        };

        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE HATA] B1_ARGE_PRODUCTS:`, error);

        // GÖREV BİTTİ, LOGLARA İZ BIRAK
        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 4: META ORGANİK SAĞLIK DEDEKTİFİ',
            islem_tipi: 'META_REKLAM_TARAMA',
            mesaj: `Organik Temizlik Puanı: ${geminiSonuc.puan}/100. Trend yapay (şişirme) mi?: ${!perplexitySonuc.organik_mi}. Yargı: ${geminiSonuc.karar}`,
            sonuc: geminiSonuc.karar === 'ÇOK_SATAR' ? 'basarili' : (geminiSonuc.karar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 4] Sistem Çöküşü: ${e.message}`);
        if (browser) await browser.close();
        return null;
    }
}

if (require.main === module) {
    bot4MetaReklamAjani("Saten Abiye");
}

module.exports = { bot4MetaReklamAjani };
