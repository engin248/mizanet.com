// =========================================================================
// 1. EKİP ÜYESİ: "ÖLÜ İŞÇİ - THE SCRAPER"
// GÖREVİ: Trendyol ürünlerini detaylı olarak (15 Madde Kriterleriyle) kazımak.
// SINIR TABLOSU: Sadece b1_arge_products_karantina tablosudur.
// =========================================================================

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env.local') });

// Karantina havuzuna yazacağımız için Service Role (veya bypass key) şart
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[ÖLÜ İŞÇİ] ⚠️ UYARI: Servis key bulunamadı, anon key ile yazılıyor.');
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);

puppeteer.use(StealthPlugin());

// Rastgele İnsani Bekleme
const bekleInsani = (min, max) => new Promise(r => setTimeout(r, Math.random() * (max - min) + min));

// -----------------------------------------------------
// ANA FONKSİYON
// -----------------------------------------------------
async function rakipVerisiKazi(kategoriUrl, markaKategoriAdi) {
    console.log(`\n======================================================`);
    console.log(`[ÖLÜ İŞÇİ] ZIRH GİYİLDİ. HEDEF: ${markaKategoriAdi}`);
    console.log(`======================================================`);

    const isVPS = process.env.VPS_MODE === 'true' || process.env.NODE_ENV === 'production';
    const browser = await puppeteer.launch({
        headless: isVPS ? 'new' : false,
        args: [
            '--no-sandbox', '--disable-setuid-sandbox', '--start-maximized',
            '--disable-blink-features=AutomationControlled' // Ek zırh
        ]
    });

    try {
        const page = await browser.newPage();

        // Anti-Ban User-Agent rotasyonu
        const UA_POOL = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0'
        ];
        const secilenUA = UA_POOL[Math.floor(Math.random() * UA_POOL.length)];

        await page.setViewport({ width: 1366, height: 768 });
        await page.setUserAgent(secilenUA);

        // 1. ADIM: Kategori (Listeleme) sayfasına girip ürün LİNKLERİNİ toplama
        console.log(`[ÖLÜ İŞÇİ] Safha 1: Liste Tarama - ${kategoriUrl}`);
        await page.goto(kategoriUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await bekleInsani(2000, 4000);

        // Bir miktar scroll yap ki resimler ve linkler düşsün
        await autoScroll(page, 500);

        const urunLinkleri = await page.evaluate(() => {
            const links = [];
            // Trendyol urun linkleri
            document.querySelectorAll('.product-card .prdct-desc-cntnr-wrppr > a, .prdct-desc-cntnr-wrppr > a, .product-down > a').forEach(el => {
                if (el.href) links.push(el.href);
            });
            return [...new Set(links)].slice(0, 10); // LIMIT: Test için ilk 10 ürünü alıyoruz (Ban yememek için)
        });

        console.log(`[ÖLÜ İŞÇİ] Sızılacak toplam ${urunLinkleri.length} detay sayfası bulundu.`);
        if (urunLinkleri.length === 0) throw new Error("Listeleme sayfasında link bulunamadı, blocklanmış olabilirsiniz.");

        let islenenler = [];

        // 2. ADIM: Her ürünün tek tek detay sayfasına (PDP) sızılması ve INITIAL_STATE'nin çalınması
        for (let i = 0; i < urunLinkleri.length; i++) {
            const link = urunLinkleri[i].split('?')[0]; // URL parametrelerini temizle (Temiz url)
            console.log(`\n[ÖLÜ İŞÇİ] Sızılıyor (${i + 1}/${urunLinkleri.length}): ${link}`);

            // Bot gibi ardışık girmemek için aralarda insani duraksama
            await bekleInsani(4000, 8000);

            try {
                const pdpPage = await browser.newPage();
                await pdpPage.setUserAgent(secilenUA);
                // Resimleri vb. yüklemeyip bandwidth tasarrufu (isteğe bağlı eklenebilir)

                await pdpPage.goto(link, { waitUntil: 'domcontentloaded', timeout: 45000 });
                await bekleInsani(1500, 3000);

                // Trendyol'un gizli hazinesi: window.__INITIAL_STATE__ objesi
                // CSS seçicilerle uğraşmak yerine direkt arka plandaki JSON datayı çalıyoruz.
                const pdpData = await pdpPage.evaluate(() => {
                    const state = window.__INITIAL_STATE__;
                    if (!state || !state.product || !state.product.productDetail) return null;

                    const pd = state.product.productDetail;

                    // Veriyi Haritası Çıkarılmış Formatta Al
                    return {
                        marka_ismi: pd.brand?.name || '',
                        urun_ismi: pd.name || '',
                        orjinal_fiyat: pd.price?.originalPrice?.value || 0,
                        indirimli_fiyat: pd.price?.discountedPrice?.value || 0,
                        urun_puani: pd.ratingScore?.averageRating || 0,
                        urun_degerlendirme_sayisi: pd.ratingScore?.totalCount || 0,
                        favori_sayisi: pd.favoriteCount || 0,
                        resim_url: pd.images?.length > 0 ? ('https://cdn.dsmcdn.com/' + pd.images[0]) : '',

                        // Kumaş, renk gibi (Attributes dizisi) veriler
                        urun_ozellikleri: pd.attributes ? pd.attributes.map(a => ({ key: a.key?.name, value: a.value?.name })) : [],

                        // Yorum özeti var mıdır? (Genelde reviews API'si ayrıdır ama bazen burada gelir)
                        urun_yorum_ozeti: pd.productReviews?.reviewSummary || '',

                        // Stok satısı, diğer notlar vs
                        sepete_ekleme_notu: (pd.campaignInfo && pd.campaignInfo.length > 0) ? pd.campaignInfo[0].name : '',
                        siparis_begenisi_notu: pd.promotions ? pd.promotions.map(p => p.text).join(' - ') : '',
                    };
                });

                await pdpPage.close();

                if (pdpData) {
                    // Türkçe Gün Verisi (Örn: Salı, 15:40)
                    const bugunTarih = new Date();
                    const gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
                    const not_cekilme_tarihi = bugunTarih.toLocaleDateString('tr-TR') + ' - ' + gunler[bugunTarih.getDay()];

                    islenenler.push({
                        veri_kaynagi: markaKategoriAdi,
                        hedef_ajans: 'bot_oluisci',
                        karantina_durumu: 'bekliyor',

                        // 15 Madde
                        marka_ismi: pdpData.marka_ismi,
                        urun_ismi: pdpData.urun_ismi,
                        orjinal_fiyat: pdpData.orjinal_fiyat,
                        indirimli_fiyat: pdpData.indirimli_fiyat,
                        urun_puani: pdpData.urun_puani,
                        urun_degerlendirme_sayisi: pdpData.urun_degerlendirme_sayisi,
                        favori_sayisi: pdpData.favori_sayisi,
                        urun_linki: link,
                        urun_fotografi: pdpData.resim_url,
                        urun_ozellikleri: pdpData.urun_ozellikleri, // JSONB Olarak Kaydedilir
                        urun_yorum_ozeti: pdpData.urun_yorum_ozeti || 'Değerlendirilmedi',
                        sepete_ekleme_notu: pdpData.sepete_ekleme_notu,
                        siparis_begenisi_notu: pdpData.siparis_begenisi_notu,

                        // Zaman mühürleri
                        cekildigi_gun: not_cekilme_tarihi,
                        cekildigi_tarih: bugunTarih.toISOString(),
                        created_at: bugunTarih.toISOString()
                    });

                    console.log(`    ✅ Çalındı: ${pdpData.marka_ismi} - ${pdpData.urun_ismi} | ₺${pdpData.indirimli_fiyat}`);
                } else {
                    console.log(`    ❌ Başarısız: Gizli veri damarına inilemedi (INITIAL_STATE bulunamadı)`);
                }

            } catch (e) {
                console.log(`    ⚠️ Atlandı (Zaman aşımı veya bot yakalanması): ${e.message}`);
                // Hata alırsak tarayıcı sekmesini açık unutup sistemi şişirmeyelim diye catch edildi
            }
        }

        // 3. ADIM: KARANTİNA HAVUZUNA YAZMA (b1_arge_products_karantina)
        if (islenenler.length > 0) {
            console.log(`\n[ÖLÜ İŞÇİ] ${islenenler.length} adet kusursuz ürün KARANTİNA DEPOSUNA aktarılıyor...`);

            // UPSERT komutu, `urun_linki` sütunundaki url'in aynı kaydedilmesini (çifte kaydı) engeller.
            const { error, data } = await supabase.from('b1_arge_products_karantina')
                .upsert(islenenler, { onConflict: 'urun_linki', ignoreDuplicates: true });

            if (error) {
                console.error('[ÖLÜ İŞÇİ] ❌ Veritabanı Yazma Reddi!', error);
            } else {
                console.log(`[ÖLÜ İŞÇİ] ✅ Karantinaya Başarıyla İndirildi! Yönetici onayı bekliyor.`);

                // Karargah webhook bildirimi (Arayüze mesaj)
                const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
                try {
                    if (typeof fetch === 'function') {
                        await fetch(`${SITE_URL}/api/cron-ajanlar?gorev=log_oluisci_bitti`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ mesaj: `Trendyol PDP (15 Madde) analizi tamamlandı. ${islenenler.length} ürün "Karantina Onayına" bırakıldı.`, sonuc: 'basarili' })
                        }).catch(() => { });
                    }
                } catch (err) { }
            }
        } else {
            console.log(`\n[ÖLÜ İŞÇİ] Hiç veri alınamadı. (Firewall engeline takılmış olabiliriz)`);
        }

    } catch (error) {
        console.error(`[ÖLÜ İŞÇİ] 🚨 AĞIR DARBE (CRASH): ${error.message}`);
    } finally {
        await browser.close();
        console.log(`[ÖLÜ İŞÇİ] Uyku moduna dönüldü.`);
    }
}

// Güvenli AutoScroll (Listeleme sayfalarındaki lazy-load resimleri ve linkleri tetikler)
async function autoScroll(page, msBekle = 250) {
    await page.evaluate(async (msBekle) => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 400;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight - window.innerHeight || totalHeight > 5000) {
                    clearInterval(timer);
                    resolve();
                }
            }, msBekle);
        });
    }, msBekle);
}

module.exports = { rakipVerisiKazi, autoScroll };

if (require.main === module) {
    // Sadece test amaçlı limitli çağrı
    rakipVerisiKazi('https://www.trendyol.com/kadin-giyim-x-g1-c82', 'TRENDYOL_KADIN');
}
