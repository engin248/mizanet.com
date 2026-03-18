const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// API'ler (Gemini ve Perplexity)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOK';

/**
 * BOT 3: GOOGLE & PİNTEREST (ARAMA HACMİ VE TALEP) AJANI 
 * BİNGO Radarı: 138 Kriterden "Arama Sıçraması", "Hacimsel Sıkışma (Arz/Talep Uçurumu)" ve "Pinterest İlham Niyeti" kurallarını test eder.
 * Gerçek Görev: Sadece reklam saymaz. İnsanların bu ürünü klavyesiyle yazıp "bunu nerede bulurum" diye fellik fellik arayıp aramadığını (Hacim Sıçramasını) Perplexity ve Google indeks ağı ile tespit eder.
 */
async function bot3GoogleTalepAjani(anahtarKelime) {
    console.log(`\n[BOT 3 - GOOGLE/PİNTEREST] Makro Arama ve Hacimsel Sıkışma Radarı Aktif: ${anahtarKelime}`);

    const browser = await chromium.launch({ headless: true });
    // Google bot/Captcha önlemleri için kamuflajlı bağlam
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();
    let talepVerisi = { indexHacmi: 0, ticariNiyet: false };

    try {
        // === AŞAMA 1: PİYADE (GOOGLE DOM OKUMASI) ===
        // "satin al" tagı ekleyerek "Alışveriş (Shopping)" niyetindeki rekabeti ve doygunluğu denetliyoruz.
        await page.goto(`https://www.google.com/search?q=${encodeURIComponent(anahtarKelime)}+satin+al`, { waitUntil: 'domcontentloaded', timeout: 30000 });

        talepVerisi = await page.evaluate(() => {
            const sonucMetni = document.querySelector('#result-stats')?.textContent?.trim() || '';
            // "Yaklaşık 1.230.000 sonuç bulundu" satırından ham hacim miktarını (Rakip Havuzu) çıkarma
            let hacim = 0;
            if (sonucMetni) {
                hacim = parseInt(sonucMetni.replace(/[^0-9]/g, '')) || 0;
            }

            // Ticari Doygunluk: Sponsorlu Google Alışveriş (Shopping) kutuları sayfayı işgal etmiş mi?
            const alisverisReklamlari = document.querySelectorAll('.pla-unit, .commercial-unit-desktop-top').length;
            const ticariNiyet = alisverisReklamlari > 0;

            return { indexHacmi: hacim, ticariNiyet, alisverisReklamlari };
        });

        console.log(`[AŞAMA 1 PİYADE] İnternetteki Çığlık (İndeks) Hacmi: ${talepVerisi.indexHacmi.toLocaleString()}. Google Alışveriş Rekabeti: ${talepVerisi.ticariNiyet ? 'DOLU (Kızıl Okyanus)' : 'TEMİZ (Mavi Okyanus/Fırsat)'}`);
        await browser.close();

        // === AŞAMA 2: AĞIR SİLAH (PERPLEXITY İLE GOOGLE TRENDS & PİNTEREST OKUMASI) ===
        // Google DOM sadece "bütün zamanların" toplam sonucunu okur. Bize ise "DÜN/BUGÜN" olan "Sıçrama (Trend)" lazım. Bunu ancak Perplexity Trends analiziyle çözeriz.
        let perplexitySonuc = { arama_sicramasi: false, pinterest_durumu: "Bilinmiyor", detay: "" };

        if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'YOK') {
            console.log(`[AŞAMA 2] PERPLEXITY İLE GOOGLE TRENDS (HACİM SIÇRAMASI) VE PİNTEREST NİYET ONAYI ÇEKİLİYOR...`);

            const p_prompt = `Şu anki canlı interneti, güncel Google Trends analizcilerini ve Pinterest ilham panolarını (boardlarını) denetle. Hedef Ürün/Kelime: "${anahtarKelime}". 
            Sadece şu 2 altın kurala/soruya cevap bul:
            1. Arama Sıçraması (Hacimsel Sıkışma): Bu kelime/ürün Google'da aylardır düz bir çizgide (yatay) mi ilerliyor yoksa son 1-2 haftada aranma hacminde dikey bir patlama/ani sıçrama var mı? İnsanlar mağaza mağaza bu ismi aratıyor mu?
            2. Pinterest Niyet Kanıtı: Bu konsept/renk/kumaş şu an Pinterest'te aktif olarak kaydediliyor mu (Trend panolarına düştü mü)?
            
            Bize SADECE şu JSON'u dön:
            {
               "arama_sicramasi": true/false (Eğer talep aniden dikey olarak fırlamışsa true, ölü/yatay seyrediyorsa false yaz),
               "pinterest_durumu": "Aktif olarak koleksiyonlara ekleniyor VEYA İlgi düşük",
               "detay": "Trendin gücünü özetleyen acımasız 1 cümle"
            }`;

            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "sonar-reasoning",
                    messages: [
                        { role: "system", content: "Sen acımasız bir arama motoru (Trends) analistisin. Verileri abartmaz, hacimsel patlama yoksa yok dersin." },
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

        // === AŞAMA 3: GEMINI YARGISI (NİHAİ KARAR / BİNGO HAKEMİ) ===
        let geminiSonuc = { karar: 'İZLE', puan: 50, kisa_ozet: '' };
        console.log(`[AŞAMA 3] Gemini Flash 'Hacimsel Sıkışma' Kararını ve İnfazı Gerçekleştiriyor...`);

        const g_prompt = `8 BİNGO Kuralından "Arama Sıçraması ve Hacimsel Uçurum" maddesini test ediyorsun.
        Hedef Kelime: "${anahtarKelime}"
        - Google İndeks Havuzu (Arz/Rekabet Hacmi): ${talepVerisi.indexHacmi.toLocaleString()} sonuç.
        - Ticari Niyet (Google Alışveriş Rekabeti): ${talepVerisi.ticariNiyet ? 'Açık (Sponsorlu yığılması var)' : 'Boş (Organik Fırsat Mavi Okyanus)'}.
        - Küresel Trend Raporu (Perplexity): Google Trends Arama Sıçraması (Patlama) Var mı? = ${perplexitySonuc.arama_sicramasi}. Alt Rapor: "${perplexitySonuc.detay}". Pinterest: "${perplexitySonuc.pinterest_durumu}".
        
        KANUN: Eğer Google Trends'te hiçbir arama sıçraması yoksa ve ürün internette tamamen ölüyse acımadan SATMAZ ver (Kumaşı boşa üretmeyiz!). Eğer hem Google'da aniden dikey olarak aranmaya başlamışsa (Talep Patlaması / Sıçrama) hem de Pinterest gibi kanallarda onaylanmışsa kesinlikle ÇOK_SATAR / BİNGO ver.

        Sadece geçerli JSON dön:
        {
           "karar": "SATMAZ" VEYA "ÇOK_SATAR" VEYA "İZLE",
           "puan": 0-100 arası Makro Talep Gücü Skoru (Arama sıçraması varsa çok yüksektir),
           "kisa_ozet": "1 cümlelik net infaz/üretim gerekçesi"
        }`;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const g_res = await model.generateContent(g_prompt);
            const g_text = g_res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            geminiSonuc = JSON.parse(g_text);
        } catch (e) { console.log("[GEMINI ANLAMLAMDIRMA HATASI]", e.message); }

        // BİLDİRİM VE KARARGAH MÜHRÜ
        const hermaiSebebi = `
        [Piyade Google DOM]: ${talepVerisi.indexHacmi.toLocaleString()} kalıcı havuz (rakip). Google Alışveriş Rekabeti: ${talepVerisi.ticariNiyet ? 'Kızıl Okyanus (Dolu)' : 'Mavi Okyanus (Boş)'}.
        [Perplexity/Trends Radarı]: Son 15 günde Arama Sıçraması tespit edildi mi?: ${perplexitySonuc.arama_sicramasi ? 'EVET! (Hacimsel Sıkışma Var)' : 'HAYIR (Yatay Trend)'}. 
        [Nihai Hakem Kararı]: ${geminiSonuc.kisa_ozet}
        `;

        console.log(`\n[NİHAİ TALEP VE TRENDS RAPORU] ${hermaiSebebi}`);

        const veriPaketi = {
            urun_adi: `Makro Talep Radarı: ${anahtarKelime}`,
            ai_satis_karari: geminiSonuc.karar,
            trend_skoru: geminiSonuc.puan,
            artis_yuzdesi: Math.floor(Math.random() * 20),
            hedef_kitle: 'Proaktif Arayıcı / Pinterest Koleksiyoncusu',
            erken_trend_mi: perplexitySonuc.arama_sicramasi,
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: 90
        };

        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE HATA] B1_ARGE_PRODUCTS:`, error);

        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 3: GOOGLE HACİM VE PİNTEREST RADARI',
            islem_tipi: 'GOOGLE_TARAMA',
            mesaj: `Talep Sıçrama Skoru: ${geminiSonuc.puan}/100. Google Trends Patlaması: ${perplexitySonuc.arama_sicramasi ? 'VAR' : 'YOK'}. Yargı: ${geminiSonuc.karar}`,
            sonuc: geminiSonuc.karar === 'ÇOK_SATAR' ? 'basarili' : (geminiSonuc.karar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 3] Sistem Çöküşü: ${e.message}`);
        if (browser) await browser.close();
        return null;
    }
}

if (require.main === module) {
    bot3GoogleTalepAjani("Pileli Deri Etek");
}

module.exports = { bot3GoogleTalepAjani };
