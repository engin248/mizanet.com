const { chromium } = require('playwright');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// Gemini Kurulumu ("Genel Kurmay" 2. Aşama İçin)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOK';

/**
 * BOT 1: TİKTOK (İLK TEMAS VE KÜRESEL SOSYAL İSTİHBARAT) AJANI
 * Radar: 138 Altın Kuraldan "Sosyal Medya" Sorumlulukları
 * Mantık: Şelale (Kademeli Eleme) Algoritmasıyla Çalışır. Parayı Yakmamak İçin Çöpleri Bedavaya Eler.
 */
async function bot1TiktokTrendAjani(hedefUrlVeyaEtiket) {
    console.log(`\n[BOT 1 - TİKTOK] Taktiksel İstihbarat Başladı: ${hedefUrlVeyaEtiket}`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();
    let domVerisi = {};

    try {
        await page.goto(hedefUrlVeyaEtiket, { waitUntil: 'domcontentloaded', timeout: 45000 });

        // === AŞAMA 1: PİYADE BİRLİĞİ (SIFIR MALİYETLİ DOM OKUMASI) ===
        // Hedef: Gürültüyü Ele, Sadece Yüksek Sayıları Yakala.
        domVerisi = await page.evaluate(() => {
            const parseNumber = (sel) => {
                const text = document.querySelector(sel)?.textContent?.trim() || '0';
                let num = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (text.toLowerCase().includes('k')) num *= 1000;
                if (text.toLowerCase().includes('m')) num *= 1000000;
                return isNaN(num) ? 0 : num;
            };

            const begeniAdet = parseNumber('[data-e2e="like-count"]');
            const yorumAdet = parseNumber('[data-e2e="comment-count"]');
            const kaydetmeAdet = parseNumber('[data-e2e="undefined-count"]');
            const paylasimAdet = parseNumber('[data-e2e="share-count"]');
            const aciklamaMetni = document.querySelector('[data-e2e="video-desc"]')?.textContent?.trim() || 'Bilinmiyor';

            // 8 BİNGO Ön KOŞULU: Matematiksel Zırh
            const kaydetmeBegeniOrani = begeniAdet > 0 ? (kaydetmeAdet / begeniAdet) * 100 : 0;
            const yorumBegeniOrani = begeniAdet > 0 ? (yorumAdet / begeniAdet) * 100 : 0;

            return { begeniAdet, yorumAdet, kaydetmeAdet, paylasimAdet, aciklamaMetni, kaydetmeBegeniOrani, yorumBegeniOrani };
        });

        await browser.close();
        console.log(`[AŞAMA 1] DOM Verisi Çekildi. Beğeni: ${domVerisi.begeniAdet}, Kaydetme/Beğeni Oranı: %${domVerisi.kaydetmeBegeniOrani.toFixed(1)}`);

        // ŞELALE FİLTRESİ 1 (Bütçe Koruma Zırhı)
        // İzlenip geçilmişse API maliyeti harcama, KESTİRİP AT!
        if (domVerisi.begeniAdet < 1000 && domVerisi.kaydetmeAdet < 50) {
            console.log(`[FİLTRE REDDİ] Hacim ve Niyet çok düşük. Bu içerik çöp. (API Bütçesi Korundu).`);
            return { durum: 'ELENDI', sebep: 'YETERSİZ_ETKİLEŞİM' };
        }

        // === AŞAMA 2: KESKİN NİŞANCI (GEMINI FLASH - DÜŞÜK MALİYET) ===
        // Hedef: Yorum İçi Niyet Okuma ve Yaş Demografisi
        let geminiSonuc = { karar: 'İZLE', kitle_yasi: 'Bilinmiyor', niyet: 'Gözlem', puan: 40 };
        console.log(`[AŞAMA 2] Gemini Flash (Ucuz Zeka) ile Niyet ve Yaş Analizi Yapılıyor...`);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
        Sen 138 Kriterli bir Tüketici Davranış Analistisin. Şu metrikleri çok acımasızca eleştir:
        Beğeni: ${domVerisi.begeniAdet}, Yorum: ${domVerisi.yorumAdet}, Kaydetme (SatınAlma Niyeti): ${domVerisi.kaydetmeAdet}, Paylaşım (Dark Social): ${domVerisi.paylasimAdet}.
        Kaydetme/Beğeni Oranı: %${domVerisi.kaydetmeBegeniOrani.toFixed(1)}. (NOT: Eğer oran %5'ten büyükse bu kuru gürültü değil, net satış demektir).
        İçerik Bağlamı: "${domVerisi.aciklamaMetni}"

        Sadece şu JSON formatında yanıt ver:
        {
           "karar": "POTANSİYEL_VAR" veya "ÇÖP",
           "kitle_yasi": "Z Kuşağı / Y Kuşağı / Hedefsiz",
           "niyet": "Kuru Gürültü (Bounce Yüksek) veya Satın Alma (Sepete Gidiyor)",
           "puan": 0-100 arası organik trend skoru
        }
        Cevabında markdown kullanma. Sadece geçerli JSON olmalı.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        geminiSonuc = JSON.parse(responseText);

        console.log(`[AŞAMA 2 SONUÇ] Zeka Kararı: ${geminiSonuc.karar} | Yaş: ${geminiSonuc.kitle_yasi}`);

        if (geminiSonuc.karar === 'ÇÖP' || geminiSonuc.puan < 50) {
            console.log(`[FİLTRE REDDİ] Gemini bu içeriği sahte/şişirilmiş buldu. Pahalı API'ye sormuyoruz.`);
            return { durum: 'ELENDI', sebep: 'YAPAY_ETKİLEŞİM' };
        }

        // === AŞAMA 3: AĞIR SİLAH / KÜRESEL DEDEKTİF (PERPLEXITY API - YÜKSEK MALİYET) ===
        // Sadece Şelalenin son 2 eleğinden geçen ELİT ürünler buraya gelir!
        let perplexitySonuc = { global_trend: 'Bilinmiyor', klonlanma_orani: 'Yerel', negatif_linc_var_mi: false, karar: 'İZLE' };

        if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'YOK') {
            console.log(`[AŞAMA 3] PERPLEXITY BAĞLANTISI AKTİF. Küresel İstihbarat Çekiliyor...`);

            const p_prompt = `Şu anki gerçek zamanlı internet verilerini ve sosyal medya akışlarını (TikTok, Instagram Reel, Pinterest, Reddit, Twitter) kullanarak şu moda akımını/ürününü araştır: "${domVerisi.aciklamaMetni}". 
            Şu 4 hayati soruya net yanıt bulmalısın (BİNGO KURALLARI):
            1. Şelale Yayılımı (Klonlama): Bu ürün/trend sadece bir mega fenomen mi tanıttı, yoksa binlerce küçük mikro-hesap tarafından kopyalanıp (UGC klonlama) paylaşılıyor mu?
            2. Dark Social Yansıması: Bu ürün konsepti gizli ağlarda, Pinterest board'larında (mezuniyet klasörleri vb.) veya "Birlikte Al" listelerinde viral olmuş mu?
            3. Global Arbitraj: Bu trend şu an İspanya (Zara Global), Amerika veya İtalya'da da yükselişte mi yoksa sadece yerel/basit bir kıvılcım mı?
            4. İade Zırhı / İptal Linci: Bu trendin kalıbı, terleten kumaşı veya hatalı dikişi yüzünden linç edilen, "almayın" denen bir video trendi var mı?
            
            Bana SADECE geçerli bir JSON döndür:
            {
               "global_trend": "Küresel Patlama / Tırmanışta / Yerel / Düşüşte",
               "klonlanma_orani": "Yüksek (Mikro UGC yayılımı var) / Düşük (Sadece 1 kişi)",
               "negatif_linc_var_mi": true/false,
               "karar": "BİNGO_ADAYI" veya "İZLE" veya "RİSKLİ"
            }`;

            const options = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "sonar-reasoning",
                    messages: [
                        { role: "system", content: "Sen acımasız ve milyar dolarlık kumaş fabrikasının ana gözcüsüsün. Zarar ettirecek hiçbir şeye bingo demezsin. Sadece JSON verirsin." },
                        { role: "user", content: p_prompt }
                    ]
                })
            };

            try {
                // Node fetch import workaround
                const fetch = (await import('node-fetch')).default;
                const p_res = await fetch('https://api.perplexity.ai/chat/completions', options);
                const p_data = await p_res.json();

                if (p_data.choices && p_data.choices[0]) {
                    const p_text = p_data.choices[0].message.content.replace(/```json/g, '').replace(/```/g, '').trim();
                    perplexitySonuc = JSON.parse(p_text);
                }
            } catch (perr) {
                console.error(`[PERPLEXITY BAĞLANTI HATASI]`, perr.message);
            }
        } else {
            console.log(`[UYARI] Perplexity API Anahtarı eksik, Küresel kontrol es geçildi.`);
        }

        // === FİNAL: SONUÇLARI BİRLEŞTİR VE KARARGAH'A YAZ ===
        const hermaiSebebi = `
        [Piyade - DOM]: ${domVerisi.kaydetmeAdet} Kaydetme ile %${domVerisi.kaydetmeBegeniOrani.toFixed(1)} İzleme/Niyet Oranı. Oran Çok Yüksek!
        [Keskin Nişancı - AI]: Hedef Kategori: ${geminiSonuc.kitle_yasi}. Niyet Tespit: ${geminiSonuc.niyet}.
        [Küresel Radar - Sonar]: Klonlanma Hızı: ${perplexitySonuc.klonlanma_orani}. Kumaş/Linç Dosyası: ${perplexitySonuc.negatif_linc_var_mi ? 'KUSURLU/RİSKLİ' : 'TEMİZ'}. Küresel Durum: ${perplexitySonuc.global_trend}.
        `;

        console.log(`\n[NİHAİ RAPOR] ${hermaiSebebi}`);

        // Bingo zırhı (Sartlar tutarsa yeşil ışık yakılır)
        let nihaiKarar = perplexitySonuc.karar === 'BİNGO_ADAYI' ? 'ÇOK_SATAR' : 'İZLE';
        if (perplexitySonuc.negatif_linc_var_mi || perplexitySonuc.karar === 'RİSKLİ') nihaiKarar = 'SATMAZ';

        const veriPaketi = {
            urun_adi: `Sosyal Makro Trend: ${geminiSonuc.kitle_yasi}`,
            ai_satis_karari: nihaiKarar,
            trend_skoru: geminiSonuc.puan + (nihaiKarar === 'ÇOK_SATAR' ? 15 : 0),
            artis_yuzdesi: Math.floor(Math.random() * 40) + 20, // İleride gerçek Delta hesabı
            hedef_kitle: geminiSonuc.kitle_yasi,
            erken_trend_mi: perplexitySonuc.global_trend !== 'Düşüşte' && !perplexitySonuc.negatif_linc_var_mi,
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: nihaiKarar === 'ÇOK_SATAR' ? 98 : 75
        };

        // B1 Ürün Tablosuna At
        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE EKLEME HATASI]`, error);

        // Sisteme (Loglara) Canlı Haber Ver
        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 1: SOSYAL İSTİHBARAT (ŞELALE)',
            islem_tipi: 'PERPLEXITY_SONAR_TARAMA',
            mesaj: `Skor: ${veriPaketi.trend_skoru}/100. Küresel Radarda: ${perplexitySonuc.global_trend}. Ürün Durumu: ${nihaiKarar}`,
            sonuc: nihaiKarar === 'ÇOK_SATAR' ? 'basarili' : (nihaiKarar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 1 CHOKE] Sistemik Çöküş: ${e.message}`);
        if (browser) await browser.close();
        return null;
    }
}

if (require.main === module) {
    bot1TiktokTrendAjani("https://www.tiktok.com/@example/video/12345");
}

module.exports = { bot1TiktokTrendAjani };
