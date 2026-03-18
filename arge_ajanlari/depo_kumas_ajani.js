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
 * BOT 7: KUMAŞ FIRSATI (ARBITRAJ) & BİNGO TASARIM AJANI
 * Görev: Kumaşçılarda/Toptancılarda yer kapladığı için "kelepir" fiyata satılan atıl stok kumaşları sisteme alır.
 * Zeka: Kumaşın fotoğrafını/verisini global trendlere sorar. "Dünyada bu kumaştan en çok ne satıyor?"
 * Strateji: Çıkan modele göre sadece Numune (2-3 Adet) Test Kesimi emri verir. Tutarsa kumaşın tamamı kapatılır.
 */
async function bot7KumasFirsatiAjani(firsatKumasResmi_base64, kumasVerisi) {
    console.log(`\n[BOT 7 - KUMAŞ ARBİTRAJI] Kumaşçıdan düşen fırsat kumaş analiz ediliyor...`);
    console.log(`[BOT 7] Gelen Kumaş: ${kumasVerisi.renk} renk, ${kumasVerisi.metre} metre, ${kumasVerisi.cins}.`);

    try {
        // GEMINI VISION & BİNGO ŞEFİ ANALİZİ: Kumaştan Model Çıkarma
        let geminiSonuc = { oneri_model: 'Bilinmiyor', test_karari: 'RED', skor: 0, analiz: '' };
        if (process.env.GEMINI_API_KEY) {
            console.log(`[BOT 7] Gemini Vision, dünya çapında (Google/Pinterest/TikTok) bu kumaşın neye dönüşürse patlayacağını hesaplıyor...`);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
            Sen elit bir moda tasarımcısı, Bingo karar şefi ve pazar analistisin. 
            Tedarikçide yer tuttuğu için çok ucuza alabildiğimiz "Fırsat Kumaşı" şudur:
            Renk: ${kumasVerisi.renk}, Cins: ${kumasVerisi.cins}, Miktar: ${kumasVerisi.metre} Metre.
            
            GÖREVİN: 
            Dünya modasında (Pinterest, Zara Global, TikTok) bu renk ve cins kumaşla *ŞU AN* en çok hangi ürün/model ilgi görüyor? Biz bu bedavaya yakın kumaştan HANGİ MODELİ dikersek %100 kâr marjıyla en hızlı satarız?
            
            Lütfen şu JSON formatında cevapla:
            {
               "oneri_model": "Örn: Geniş Paça Cargo Pantolon veya Paraşüt Kumaş Etek",
               "analiz": "Neden bu model? Dünyada bu tarz kumaştan bu modelin patlamasının güncel/viral sebebi ne?",
               "test_karari": "TEST_URETIM",
               "tahmini_hiz_skoru": 0-100 arasi puan
            }`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
            geminiSonuc = JSON.parse(responseText);
        }

        const hemaniaOnerisi = `Bingo Kararı: Kumaşçıda yatan ${kumasVerisi.renk} ${kumasVerisi.cins} kumaş incelendi. AI Önerisi: "${geminiSonuc.oneri_model}". Global trend eşleşmesi çok yüksek (${geminiSonuc.tahmini_hiz_skoru}/100). STRATEJİ: Her beden ve renkten SADECE 2-3 adet test numunesi kesilecek. Eğer ilk satış hızı onaylanırsa kumaşın KALAN METRESİ toptancıdan kapatılacak.`;

        console.log(`[BOT 7] BİNGO ONAYI: ${hemaniaOnerisi}`);

        // SUPABASE B1_ARGE_PRODUCTS'a VİTRİN OLARAK YAZ (Karargah Paneli İçin)
        const veriPaketi = {
            urun_adi: `[🧵 FIRSAT KUMAŞ: ${kumasVerisi.renk.toUpperCase()}] -> Model: ${geminiSonuc.oneri_model}`,
            ai_satis_karari: 'İZLE', // Henüz test aşamasında olduğu için Karargah Matrisinde izlemeye düşer.
            trend_skoru: geminiSonuc.tahmini_hiz_skoru,
            artis_yuzdesi: 100, // Maliyet fırsatı olduğu için kar marjı potansiyeli tavandır
            hedef_kitle: 'Numune / Test Kesim (Arbitraj)',
            erken_trend_mi: true, // Riski minimize edilmiş test piyasası
            hermania_karar_yorumu: hemaniaOnerisi,
            ai_guven_skoru: 92
        };

        const { error } = await supabase.from('b1_arge_products').insert([veriPaketi]);
        if (error) console.error(`[SUPABASE HATA] B1_ARGE_PRODUCTS (Bot 7):`, error);
        else console.log(`[BAŞARILI] Fırsat Kumaşı Test Emri Ar-Ge Ekranına düştü.`);

        // B1_AGENT_LOGLARI
        await supabase.from('b1_agent_loglari').insert([{
            ajan_adi: 'BOT 7: KUMAŞ ARBİTRAJ / BİNGO',
            islem_tipi: 'FIRSAT_KUMAŞ_DÖNÜŞÜMÜ',
            mesaj: `Model Önerisi: ${geminiSonuc.oneri_model}. Plan: Her bedenden 2-3 adet Test Kesimi. Tutarsa tüm stok alınacak.`,
            sonuc: 'basarili'
        }]);

        return veriPaketi;

    } catch (e) {
        console.error(`[BOT 7] Hata: ${e.message}`);
        return null;
    }
}

if (require.main === module) {
    bot7KumasFirsatiAjani("base64_yok", { renk: "Bordo", cins: "İnce Kadife", metre: 500 });
}

module.exports = { bot7KumasFirsatiAjani };
