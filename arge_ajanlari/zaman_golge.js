const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '../.env.local' });

// Supabase Kurulumu
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

// Gemini & Perplexity Kurulumu
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AI_KEY_YOK');
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || 'YOK';

/**
 * BOT 6: GÖLGE VE ZAMAN MAKİNESİ (Sıcak Takip & Diriliş Radarı)
 * Gerçekte Ne Yapar: Asla hayal kurmaz. Supabase'deki 'İZLE' (Sarı Alarm) ve 'SATMAZ' (Kırmızı) ürünlerini alır.
 * İnternete (Perplexity) bağlanarak "Bu ürünler patladı mı yoksa hâlâ ölü mü?" diye CANLI SAĞLAMA yapar.
 * Eğer İzlemedeki bir trend "Sepete Dönüşmeye" (Şelale yayılımına) başladıysa, Diriliş Fişeğini yakar.
 */
async function bot6GolgeZamanMakinesi() {
    console.log(`\n[BOT 6 - GÖLGE] "Siz İptal Edin, Ben Pusuya Yatarım". Makine Öğrenmesi ve Diriliş Görevi Başladı.`);

    try {
        // İZLE veya SATMAZ statüsündeki eski ürünleri bul (Son 3 Ürün - Tasarruf İçin)
        const { data: eskiUrunler, error } = await supabase
            .from('b1_arge_products')
            .select('*')
            .in('ai_satis_karari', ['SATMAZ', 'İZLE'])
            .order('created_at', { ascending: false })
            .limit(3);

        if (error || !eskiUrunler || eskiUrunler.length === 0) {
            console.log(`[BOT 6] Pusuya yatılacak (ölü ya da sarı alarmda) eski ürün yok. Saha temiz.`);
            return null;
        }

        console.log(`[BOT 6] Pusu Konulan Eski Hedefler: ${eskiUrunler.map(u => u.urun_adi).join(', ')}`);

        // Tek Tek Canlı İnternet Taraması (Halüsinasyon / Tahmin YOK)
        const guncellemeler = [];
        let dogruTahminSayisi = 0;

        for (const urun of eskiUrunler) {
            console.log(`\n-> Gölge Tarama: "${urun.urun_adi}" (Eski Kararımız: ${urun.ai_satis_karari})`);

            let gercekDurum = "Bilinmiyor";
            let perplexityRaporu = "";

            // AŞAMA 1: PERPLEXITY İLE İNTERNETE ÇIKIŞ VE CANLI SAĞLAMA
            if (PERPLEXITY_API_KEY && PERPLEXITY_API_KEY !== 'YOK') {
                const p_prompt = `Şu anki güncel e-ticaret, Google Trends ve sosyal ağ verilerini incele. Şu anahtar kelime/moda ürünü için: "${urun.urun_adi}". 
                Soru: Geçtiğimiz günlerde/haftalarda bu spesifik ürün için ani bir viral patlama, satış sıçraması (şelale yayılımı) gerçekleşti mi? Yoksa pazar bu ürüne tamamen kapalı mı (ölü mü)? 
                Cevabın kesin, gerçek pazar verileri/tespitleri içersin. Tahmin yapma.`;

                const options = {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: "sonar-reasoning",
                        messages: [
                            { role: "system", content: "Sen acımasız bir moda pazar araştırma dedektifisin. Asla yalan söylemez, pusuya yatarak sadece olanı (sıçrama var mı yok mu) anlatırsın." },
                            { role: "user", content: p_prompt }
                        ]
                    })
                };

                try {
                    const fetch = (await import('node-fetch')).default;
                    const p_res = await fetch('https://api.perplexity.ai/chat/completions', options);
                    const p_data = await p_res.json();
                    if (p_data.choices && p_data.choices[0]) {
                        perplexityRaporu = p_data.choices[0].message.content;
                    }
                } catch (perr) {
                    console.error(`[PERPLEXITY BAĞLANTI HATASI]`, perr.message);
                }
            } else {
                console.log(`[UYARI] API YOK! Gölge ajan dışarı çıkamıyor.`);
                continue; // API yoksa diğer ürüne geç (eski uyduruk sistemdeki gibi yalan sıkmasın)
            }

            // AŞAMA 2: GEMINI FLASH İLEJSON YAPISINA DÖNÜŞTÜRME (Yorumlayıcı Subay)
            let yeniKarar = urun.ai_satis_karari;
            let dirilisOlduMu = false;

            if (perplexityRaporu) {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const g_prompt = `Gölge (Perplexity) ajanından şu gerçek saha istihbaratı geldi: "${perplexityRaporu}".
                Ürünle ilgili eskiden (Yapay Zeka Kararımız) şuydu: "${urun.ai_satis_karari}".
                
                Saha raporuna bakarak pazarın bugünkü durumunu analiz et. Bize KESİNLİKLE JSON dön:
                {
                   "guncel_durum": "ÖLÜ / YÜKSELİŞTE / SABİT",
                   "tahmin_tutmus_mu": true/false (Örn: Eskiden satmaz dediysek ve hakikaten ölüyse tahmin tuttu (true). Eskiden İZLE veya SATMAZ deyip, şu an trend fırladıysa tahmin hatalıydı (false) -> Pazar fırladı!),
                   "yeni_satis_karari": "SATMAZ / İZLE / ÇOK_SATAR. (Eğer trend patlamışsa eski kararı boşver, doğrudan BİNGO/ÇOK_SATAR yap ki diriliş fişeği yansın!)",
                   "kisa_ozet": "Gölge ajan raporunun tek cümlelik hali. (Neden dirildi veya öldü?)"
                }
                Markdown kullanma, sadece JSON yap.`;

                try {
                    const g_res = await model.generateContent(g_prompt);
                    const g_text = g_res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
                    const analiz = JSON.parse(g_text);

                    gercekDurum = analiz.guncel_durum;
                    yeniKarar = analiz.yeni_satis_karari === 'BİNGO' ? 'ÇOK_SATAR' : analiz.yeni_satis_karari;
                    dirilisOlduMu = (urun.ai_satis_karari === 'SATMAZ' || urun.ai_satis_karari === 'İZLE') && yeniKarar === 'ÇOK_SATAR';

                    if (analiz.tahmin_tutmus_mu) dogruTahminSayisi++;

                    guncellemeler.push({
                        isim: urun.urun_adi,
                        eski: urun.ai_satis_karari,
                        yeni: yeniKarar,
                        ozet: analiz.kisa_ozet,
                        dirilis: dirilisOlduMu
                    });

                    // Diriliş varsa Ürünü Veritabanında (B1) Güncelle!
                    if (dirilisOlduMu) {
                        const yorum = `[ZAMAN MAKİNESİ / DİRİLİŞ] ${new Date().toLocaleDateString()}: Gölge Ajan Uyardı! Bu ürün geçmişte reddedildi/izlendi ancak saha raporlarına göre DİRİLDİ (Pazarda dikey sıçrama yaptı). Sistem Kararı ÇOK_SATAR olarak zorla değiştirildi. Kalıphaneye yollanabilir!`;
                        await supabase.from('b1_arge_products').update({
                            ai_satis_karari: 'ÇOK_SATAR',
                            hermania_karar_yorumu: urun.hermania_karar_yorumu + "\n\n" + yorum
                        }).eq('id', urun.id);
                        console.log(`[DİRİLİŞ FİŞEĞİ] 🔥 "${urun.urun_adi}" adlı ürün patlama yaptı ve sistemde ÇOK_SATAR olarak diriltildi!`);
                    } else {
                        console.log(`[DURUM DEĞİŞMEDİ] ${urun.urun_adi} hala aynı durumda. Karar: ${yeniKarar}`);
                    }

                } catch (e) {
                    console.log("[GEMINI PARSE HATASI İşlenemedi]", e.message);
                }
            }
        }

        // ML Doğruluk Oranı (Geçmiş Sağlaması)
        const in_total = eskiUrunler.length || 1;
        const mlOrani = Math.round((dogruTahminSayisi / in_total) * 100);
        const genelRapor = guncellemeler.map(g => `${g.isim}: [Eski=${g.eski} -> Yeni=${g.yeni}]`).join(' | ');

        console.log(`\n[BOT 6 GÖREV TAMAMLANDI] Sistem (ML) Doğruluk Oranımız: %${mlOrani}`);

        // LOGLARA KAYIT
        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 6: GÖLGE ZAMAN MAKİNESİ',
            islem_tipi: 'GECMİS_SAGLAMA_VE_DIRILIS',
            mesaj: `Öğrenme Doğruluğu (ML): %${mlOrani}. Tarama Özeti: ${genelRapor || 'Veri Bulunamadı'}`,
            sonuc: mlOrani >= 50 ? 'basarili' : 'uyari'
        }]);

        return { mlOrani, guncellemeler };

    } catch (e) {
        console.error(`[BOT 6 AĞIR HATA] Şebeke Çöküşü: ${e.message}`);
        return null;
    }
}

if (require.main === module) {
    bot6GolgeZamanMakinesi();
}

module.exports = { bot6GolgeZamanMakinesi };
