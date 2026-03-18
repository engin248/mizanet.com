/**
 * BOT 7: METEOROLOJİ VE İKLİM AJANI
 * Radar: İklimsel Satış Etkisi (Weather-Driven Demand)
 * Görev: Beklenmedik sıcaklık düşüş/yükselişlerini tespit edip ani talep patlamalarını öngörmek.
 * Açıklama: Tekstilde tüketici havaya bakar, fiyata değil. Kaşe kaban satışları hava aniden soğuduğunda tavan yapar.
 */

async function havaDurumuSatisEtkisi(urunKategorisi, hedefSehirler = ['Berlin', 'Londra', 'Riyad', 'Moskova', 'New York', 'İstanbul']) {
    console.log(`\n[BOT 7 - İKLİM] Hava Durumu & Satış Korelasyonu Taraması Başladı.`);
    console.log(`[BOT 7] Kategori: ${urunKategorisi} | Hedef Bölgeler: ${hedefSehirler.join(', ')}`);

    // Kamu ya da Ücretsiz Hava Durumu API'si (Örn: Open-Meteo) simülasyonu
    // Beyaz Şapka kuralları: Sadece şeffaf hava durumu tahminleri çekilir
    const simulasyonHavaVerisi = {
        sicaklik_degisimi: "ANİ_DÜŞÜŞ", // Önümüzdeki 7 gün içinde ortalama sıcaklık 15 dereceden 5 dereceye inecek.
        yagis_durumu: "ŞİDDETLİ_YAĞMUR",
        mevsim_kaymasi: "GECİKMELİ_KIŞ"
    };

    console.log(`[BOT 7] Meteorolojik sapmalar analiz ediliyor: ${simulasyonHavaVerisi.sicaklik_degisimi}`);

    // ---- HAVA DURUMU & SATIŞ ALGORİTMASI ----
    let iklimSatisSkoru = 0; // 0'dan 100'e kadar iklim aciliyeti.
    let aciliyetYorumu = "";

    const kislik_kategoriler = ['kaban', 'mont', 'kazak', 'bere', 'hırka', 'kalın_kumaş'];
    const yazlik_kategoriler = ['tişört', 'şort', 'askılı', 'elbise', 'ince_kumaş', 'keten'];

    // Algoritma: 
    // 1- Eğer ürün KIŞLIK ise ve hava ANİDEN SOĞUYORSA => Aciliyet Skoru Patlar
    // 2- Eğer ürün YAZLIK ise ve hava SOĞUYORSA => Skor Sıfıra iner (İptal/Reddet)
    const altKategori = urunKategorisi.toLowerCase();

    if (kislik_kategoriler.some(k => altKategori.includes(k))) {
        if (simulasyonHavaVerisi.sicaklik_degisimi === "ANİ_DÜŞÜŞ") {
            iklimSatisSkoru = 95;
            aciliyetYorumu = "PANİK_ALIMI_BEKLENİYOR";
        } else {
            iklimSatisSkoru = 40;
            aciliyetYorumu = "YAVAŞ_TALEP";
        }
    }
    else if (yazlik_kategoriler.some(k => altKategori.includes(k))) {
        if (simulasyonHavaVerisi.sicaklik_degisimi === "ANİ_YÜKSELİŞ") {
            iklimSatisSkoru = 90;
            aciliyetYorumu = "ERKEN_BAHAR_ETKİSİ_PATLAMASI";
        } else {
            iklimSatisSkoru = 10;
            aciliyetYorumu = "MEVSİM_TERSI_BEKLET";
        }
    } else {
        // Mevsimsiz ürünler (ör: iç giyim, çorap vs)
        iklimSatisSkoru = 50;
        aciliyetYorumu = "HAVA_DURUMU_NÖTR";
    }

    // Yargıç ve Hermaia Çıktısı oluşturma
    const karar = iklimSatisSkoru >= 80 ? "ACİL_ÜRET" : (iklimSatisSkoru < 30 ? "RAFA_KALDIR" : "DİĞER_AJANLARI_BEKLE");

    return {
        ajan: 'BOT 7: İKLİM VE HAVA DURUMU AJANI',
        veri: simulasyonHavaVerisi,
        satisa_etkisi: aciliyetYorumu,
        iklim_skoru: iklimSatisSkoru,
        gemini_karari: karar,
        hermania_aciklama: `Kategori '${urunKategorisi}' olarak algılandı. Önümüzdeki 7 günde hedef global ihracat/moda merkezlerinde (Berlin, Moskova, Londra vb.) sıcaklık '${simulasyonHavaVerisi.sicaklik_degisimi}' yaşayacağından, küresel müşteride psiko-iklimsel (hava soğudu kaban almalıyım) satın alma içgüdüsü tetiklenecektir. ${aciliyetYorumu}.`
    };
}

// Konsoldan test edildiğinde çalışması için
if (require.main === module) {
    havaDurumuSatisEtkisi("Siyah Kaşe Kaban").then(console.log);
}

module.exports = { havaDurumuSatisEtkisi };
