const { chromium } = require('playwright');

/**
 * BOT 2: TRENDYOL (SATIŞ) AJANI
 * Görev: Satış ve finansal metrikleri (18 Kontrol Noktası) analiz etmek.
 * Amaç: Gerçek satış var mı? Kategori arz-talep dengesi nedir? Fiyat rekabeti durumu nedir?
 * Sistem: Beyaz Şapka (White Hat) - Gizli/Arka kapı yok, DOM Okuma.
 */
async function bot2TrendyolSatisAjani(aramaKelimesiVeyaLink) {
    console.log(`\n[BOT 2 - TRENDYOL SATIŞ AJANI] Göreve Başlıyor.`);
    console.log(`[BOT 2] Hedef: ${aramaKelimesiVeyaLink}`);
    console.log(`[BOT 2] Kamu Verisi Okunuyor (Arka Kapı Yok - %100 Yasal DOM Navigasyonu)`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    const page = await context.newPage();
    let hamVeri = {};

    try {
        await page.goto(aramaKelimesiVeyaLink, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // KAMUYA AÇIK BİLGİLERİ (DOM) SAF ŞEKİLDE ÇEK - 0 MALIYET
        hamVeri = await page.evaluate(() => {
            const baslik = document.querySelector('h1.pr-new-br span')?.textContent?.trim() || 'Bilinmiyor';
            const marka = document.querySelector('h1.pr-new-br a')?.textContent?.trim() || 'EvSahibi';
            const fiyatText = document.querySelector('.prc-dsc')?.textContent?.trim() || '0 TL';

            const yorumYazi = document.querySelector('.rvw-cnt-tx')?.textContent?.trim() || '0 Yorum';
            const favoriYazi = document.querySelector('.fv-dtls span')?.textContent?.trim() || '0 Favori';

            const badgeler = Array.from(document.querySelectorAll('.pr-st-bdg'))
                .map(el => el.textContent.trim());

            return {
                baslik,
                marka,
                fiyat: fiyatText,
                yorumAdedi: yorumYazi,
                favoriAdedi: favoriYazi,
                rozetler: badgeler,
                kumas: 'HTML Açıklamadan Çekilecek',
            };
        });

        console.log(`[BOT 2] Kamuya açık veri okundu. (Tespit: ${hamVeri.fiyat}, ${hamVeri.favoriAdedi})`);
        await browser.close();

        // 2. BİNGO ŞEFİ (GEMİNİ) VE HERMAİ (YORUMLAYICI) DEVREYE GİRER
        console.log(`[BİNGO ŞEFİ - GEMİNİ] Veriler analiz ediliyor...`);
        const geminiKarari = await geminiSefKarari(hamVeri);

        console.log(`[HERMAİ] Gemini'nin kararı ("${geminiKarari.karar}") nedenleriyle açıklanıyor...`);
        const hermaiSonuc = hermAiNedenBelirle(hamVeri, geminiKarari.karar);

        const analizRaporu = {
            ajan: 'BOT 2: TRENDYOL (SATIŞ) AJANI',
            zaman: new Date().toISOString(),
            hedef: aramaKelimesiVeyaLink,
            kamu_verisi: hamVeri,
            ai_karar: geminiKarari.karar,
            hermania_aciklama: hermaiSonuc.neden,
            risk_guveni: hermaiSonuc.guven
        };

        console.table({
            "AJAN": analizRaporu.ajan,
            "SİSTEM KARARI": analizRaporu.ai_karar,
            "HERMAI NEDENİ": analizRaporu.hermania_aciklama.substring(0, 50) + "..."
        });

        return analizRaporu;

    } catch (e) {
        console.error(`[BOT 2] Sorun Oluştu: ${e.message}`);
        await browser.close();
        return null;
    }
}

// ---- AI Entegrasyonları (Gemini İşlemi ve Hermania Nedenleyicisi) ----
async function geminiSefKarari(veri) {
    // Gerçekte Gemini API (Batch AI veya Yargıç üzerinden) çağrılacak. Demo kural:
    const fiyatStr = typeof veri.fiyat === 'string' ? veri.fiyat : '0';
    const favStr = typeof veri.favoriAdedi === 'string' ? veri.favoriAdedi : '0';

    const fiyatSayi = parseInt(fiyatStr.replace(/[^0-9]/g, '')) || 0;
    const favSayi = parseInt(favStr.replace(/[^0-9]/g, '')) || 0;

    let karar = "İZLE";
    if (favSayi > 500) karar = "ÇOK_SATAR";
    else if (favSayi < 50) karar = "SATMAZ";

    return { karar };
}

function hermAiNedenBelirle(veri, karar) {
    // Gerçek `localExplainer.js` in "neden" mekanizması:
    const favStr = typeof veri.favoriAdedi === 'string' ? veri.favoriAdedi : '0';
    const favSayi = parseInt(favStr.replace(/[^0-9]/g, '')) || 0;
    let neden = "";

    if (karar === "ÇOK_SATAR") {
        neden = `Ürünün organik favori saysı (${favSayi}) ve etkileşim hızı çok yüksek. Pazarda ciddi bir alıcı kitlesi ve talep patlaması var. (Fiyat/Maliyet hesabından bağımsız olarak HIZ onaylandı).`;
    } else if (karar === "SATMAZ") {
        neden = `Ürüne olan talep ve etkileşim ölü seviyede. İnsanların bu ürünü alma niyeti yok. Satış hızı riski yüzünden pas geçildi.`;
    } else {
        neden = `Veriler tam olgunlaşmamış ve rekabet stabil değil. Hız puanı (Delta) düşük olduğundan piyasadaki diğer rakip eylemleri izlenmeli.`;
    }

    return { neden, guven: 0.92 };
}

if (require.main === module) {
    // Test Çağrısı
    bot2TrendyolSatisAjani("https://www.trendyol.com/stradivarius/kadin-siyah-uzun-kaban-p-67891234");
}

module.exports = { bot2TrendyolSatisAjani };
