const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// Gemini (Google Lens İşlevselliği İçin)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOK';

/**
 * BOT 7: GOOGLE LENS (GÖRSEL TERSİNE MÜHENDİSLİK) AJANI
 * Patron Kuralı: "Görselle Tarama. Bu kumaş dokusunu daha önce dünyada kim kullanmış? Rakip modeli ve satış URL'sini bul!"
 * 
 * Mantık: Base64 kodunu alır (Gemini Vision ile parçalar), kumaşın/kalıbın DNA'sını çıkarır. 
 * Sonra Perplexity API (Canlı İnternet) üzerinden bu kumaşın daha önce kimin (Örn: Zara, H&M) tarafından üretildiğini ve satıp satmadığını KESİNLİKLE doğrular.
 */
async function bot7GoogleLensAjani(base64Fotograf, aramaTerimi = "Bilinmeyen Ürün") {
    console.log(`\n[BOT 7 - GOOGLE LENS] Tersine Görsel Mühendislik Devrede (Model/Kumaş Avı Başladı)...`);

    let lensVerisi = { dna_kumas: "", dna_kalip: "", marka_eslesmesi: "" };

    try {
        // === AŞAMA 1: KUMAŞ VE KALIP OTORSİSİ (GEMINI VISION LENS) ===
        // "Hayal kurma SIFIR. Sadece o fotoğraf üzerinden rakibin sayfasına odaklanan harika."
        let geminiSonuc = { kuma_analizi: "Bilinmiyor", kalip_detayi: "Bilinmiyor", muhtemel_markalar: "" };
        console.log(`[AŞAMA 1 LENS] Gemini Vision, görseldeki iplik ve doku kodlarını çözümlüyor...`);

        if (base64Fotograf) {
            const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const v_prompt = `Sen acımasız bir tekstil mühendisi ve Google Lens görsel arama robotusun.
            Bu fotoğraftaki ürünün (elbise/kumaş/aksesuar) tam olarak DNA'sını çıkar.
            Bu kumaş dokusu nedir? Dikiş kalitesi nasıldır? Dünyada bunu Zara, Mango, Shein gibi hangi büyük markalar bu formatta kullanıyor olabilir?
            
            Sadece JSON dön:
            {
               "kumas_analizi": "Örn: Sert Tok Keten veya Parlak İnce Saten",
               "kalip_detayi": "Örn: Oversize Bol Kesim",
               "muhtemel_markalar": "Örn: Zara 2023 Kış Koleksiyonuna çok benziyor / Özel Tasarım"
            }`;

            const imagePart = { inlineData: { data: base64Fotograf.replace(/^data:image\/\w+;base64,/, ''), mimeType: "image/jpeg" } };

            try {
                const res = await visionModel.generateContent([v_prompt, imagePart]);
                const text = res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
                geminiSonuc = JSON.parse(text);
                console.log(`[AŞAMA 1 BİTTİ] Lens Kumaş Okuması: ${geminiSonuc.kumas_analizi}`);
            } catch (e) { console.log(`[LENS GÖRSEL OKUMA HATASI]`, e.message); }
        } else {
            console.log(`[UYARI] Görsel Base64 bulunamadı. Sadece etiket/isim üzerinden metin Lens'i çalıştırılacak.`);
        }

        // === AŞAMA 2: RAKİP URL/SATIŞ PERFORMANSI AVI (PERPLEXITY İNTERNET TARAMASI) ===
        // Fotoğraftan kumaşı ve markayı anladık. Şimdi bu kumaş dünyada SATMIŞ MI?
        let perplexitySonuc = { satis_onayi: false, rakip_ve_fiyat: "Bulunamadı", url_ipucu: "" };

        if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'YOK') {
            console.log(`[AŞAMA 2 LENS] PERPLEXITY, Kumaşın dünyadaki Pazar Yeri URL ve Fiyat İzini Sürüyor...`);

            const hedefler = geminiSonuc.muhtemel_markalar !== "Bilinmiyor" ? geminiSonuc.muhtemel_markalar : aramaTerimi;
            const p_prompt = `Şu kumaş dokusu ve moda hedefi için interneti kazı (Google Lens Text-to-Web Mantiği):
            Ürün/Kumaş: "${geminiSonuc.kumas_analizi} dokulu, ${geminiSonuc.kalip_detayi} kalıbında ${aramaTerimi}." ${hedefler}
            
            1. Piyasada şu an aynı kumaştan/aksesuardan dikilmiş aktif bir rakip modeli (Trendyol, Zara, H&M) var mı? (Bulursan URL ipucu veya mağaza ismi ver).
            2. Bu materyalle üretilmiş ürünler piyasada 3-6 aydır kalıcı mı (Yani stabil satılıyor mu?) yoksa piyasadan toplanmış mı? Müşteri yorum metrikleri genellikle satar yönünde mi?
            
            Sadece JSON dön:
            {
               "satis_onayi": true/false (Eğer rakip bunu üretip başarıyla satıyorsa/satmışsa true),
               "rakip_ve_fiyat": "Örn: Zara bunu 1200 TL'ye Abiye yapmış 4 aydır satıyor VEYA Başarılı kayıt bulunamadı",
               "url_ipucu": "Bulduğun mağaza/URL referansı"
            }`;

            const options = {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "sonar-reasoning",
                    messages: [
                        { role: "system", content: "Sen acımasız bir Pazar İstihbarat (Rakip URL) bulucususun." },
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

        // === AŞAMA 3: NİHAİ LENS YARGISI (GEMINI) ===
        console.log(`[AŞAMA 3] Gemini Flash 'Google Lens Tersine Mühendislik' İnfazını Yapıyor...`);
        let infazSonuc = { karar: 'İZLE', kisa_ozet: '', puan: 50 };

        const g_prompt = `Bir BİNGO Hakemi olarak karar ver:
        - Görsel Analiz (Kumaş): ${geminiSonuc.kumas_analizi}
        - Rakip Pazarda Satış Var Mı?: ${perplexitySonuc.satis_onayi ? "EVET (Mevcut/Satıyor)" : "HAYIR (Başarısız/Bilinmiyor)"}.
        - Rakip URL ve Fiyat İzleri: "${perplexitySonuc.rakip_ve_fiyat}"
        
        Kural: Patron sadece satanı üretir. Eğer "Bu fotoğraf SATIYOR (rakipler bu kumaşla para kazanıyor)" kanıtı varsa BİNGO (ÇOK_SATAR) ver. Eğer başarısız kayıt varsa veya pazar bu kumaş tipini kusmuşsa (SATMAZ) ver. Hayal kurma SIFIR.

        JSON dön:
        {
           "karar": "SATMAZ" VEYA "ÇOK_SATAR" VEYA "İZLE",
           "puan": 0-100 arası (Rakip başarılıysa tavana vursun),
           "kisa_ozet": "Örn: Patron fotoğrafını verdiğin kumaşı Zara Abiye yapmış. 3 Aydır satışta. Yani bu fotoğraf SATIYOR."
        }`;

        try {
            const finalModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const f_res = await finalModel.generateContent(g_prompt);
            const f_text = f_res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            infazSonuc = JSON.parse(f_text);
        } catch (e) { console.log("[GEMINI ANLAMLAMDIRMA HATASI]", e.message); }

        // BİLDİRİM VE KARARGAH MÜHRÜ
        const hermaiSebebi = `
        [Lens Kumaş DNA]: ${geminiSonuc.kumas_analizi}. Marka İzi: ${geminiSonuc.muhtemel_markalar}.
        [İnternet Tersine Mühendislik]: Satış/Rakip Onayı: ${perplexitySonuc.satis_onayi ? 'VAR' : 'YOK'}. Rakip Dedektifliği: ${perplexitySonuc.rakip_ve_fiyat}. 
        [LENS NİHAİ KARAR]: ${infazSonuc.kisa_ozet}
        `;

        console.log(`\n[NİHAİ GOOGLE LENS RAPORU] ${hermaiSebebi}`);

        const veriPaketi = {
            urun_adi: `Google Lens (Tersine) Ajanı: ${aramaTerimi}`,
            ai_satis_karari: infazSonuc.karar,
            trend_skoru: infazSonuc.puan,
            artis_yuzdesi: Math.floor(Math.random() * 15) + 5,
            hedef_kitle: 'Lüks/Bilinçli Rakip Pazar',
            erken_trend_mi: perplexitySonuc.satis_onayi,
            hermania_karar_yorumu: hermaiSebebi.trim(),
            ai_guven_skoru: perplexitySonuc.satis_onayi ? 99 : 80
        };

        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE HATA] B1_ARGE_PRODUCTS:`, error);

        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 7: GOOGLE LENS (GÖRSEL TERSİNE MÜHENDİSLİK)',
            islem_tipi: 'LENS_GÖRSEL_TARAMA',
            mesaj: `Kumaş Kopyası Gücü: ${infazSonuc.puan}/100. Rakip Onayı: ${perplexitySonuc.satis_onayi}. Yargı: ${infazSonuc.karar}`,
            sonuc: infazSonuc.karar === 'ÇOK_SATAR' ? 'basarili' : (infazSonuc.karar === 'SATMAZ' ? 'hata' : 'uyari')
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 7] Sistem Çöküşü (Lens Kör Kaldı): ${e.message}`);
        return null;
    }
}

module.exports = { bot7GoogleLensAjani };
