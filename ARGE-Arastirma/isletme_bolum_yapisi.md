# MİZANET — İŞLETME BÖLÜM YAPISI VE SÜREÇ MİMARİSİ
> Oluşturulma: 4 Nisan 2026
> Amaç: İşletmenin 4 ana bölümü ve aralarındaki veri akışı

---

## İŞLETME 4 ANA BÖLÜM

| # | Bölüm | Kapsam |
|---|---|---|
| 1 | İmalat / AR-GE | Araştırma, tasarım, kalıp, numune, teknik föy, kesim, üretim |
| 2 | Üretim Yönetimi | Üretim planlama, bant yönetimi, kalite kontrol, paketleme |
| 3 | Mağaza & E-Ticaret | Stok, satış, müşteri, sevkiyat, katalog |
| 4 | Yapay Zeka Ofisi | Sistem analiz, trend, hata, performans, geliştirme |

---

## UÇTAN UCA SÜREÇ AKIŞI

```
Araştırma
    ↓
Tasarım
    ↓
Kalıp
    ↓
Numune + Teknik Föy
    ↓
Malzeme/Kumaş Seçimi
    ↓
Kesim Planı → Kesim
    ↓
Ara İşçilik
    ↓
Üretim Bant
    ↓
Temizlik + Kalite Kontrol
    ↓
Paketleme
    ↓
Mağaza & E-Ticaret
    ↓
Satış Verisi
    ↓
Yapay Zeka Analizi
    ↓
Geri Besleme → Araştırma/Tasarım/Üretim
```

---

## DETAYLI SÜREÇ TABLOSU

| Aşama | Alt Modül | Görevler | Girdiler | Çıktılar | Sonraki Aşama |
|---|---|---|---|---|---|
| Araştırma | Trend Tarama | Global moda araştırması | Web, kataloglar | Trend listesi | Tasarım |
| Araştırma | Referans Arşiv | Görsel/video depolama | Araştırma sonuçları | Arşiv veri seti | Tasarım |
| Tasarım | Model Tasarımı | Satılacak ürün belirleme | Trend verisi | Taslak model | Kalıp |
| Tasarım | Malzeme Fikri | Kumaş/aksesuar ön seçimi | Arşiv + tedarikçi | Malzeme listesi | Kalıp |
| Kalıp | Kalıp Çıkarma | Model kalıpları oluşturma | Tasarım | Dijital kalıp | Numune |
| Numune | Numune Dikimi | İlk model üretimi | Kalıp | Numune ürün | Teknik Föy |
| Numune | Teknik Föy | İşlem sırası/zorluk/makine | Numune | Teknik doküman | Kesim |
| Teknik Föy | Video/Ses Eğitim | Her işlem için anlatım | Teknik Föy | Eğitim materyali | Üretim |
| Malzeme | Kumaş Arşivi | Kumaş foto/katalog | Tedarikçiler | Kumaş veritabanı | Kesim |
| Malzeme | Aksesuar Arşivi | Aksesuar stok/görseller | Tedarikçiler | Aksesuar veritabanı | Kesim |
| Kesim | Parça Analizi | Parça sayısı/kesim planı | Kalıp + malzeme | Kesim listesi | Kesim |
| Kesim | Kumaş Kesimi | Kumaş kesim işlemi | Kesim planı | Kesilmiş parçalar | Ara İşçilik |
| Ara İşçilik | Ön Hazırlık | Ara dikim işlemleri | Kesim parçaları | Hazır parçalar | Üretim |
| Üretim | Bant Üretimi | Teknik föye göre üretim | Ara işçilik | Tamamlanmış ürün | Kalite |
| Üretim | İşçi Takip | Kim/hangi işlem/saat | Üretim verisi | Performans kaydı | Analiz |
| Kalite | Kontrol | Hata ve kalite | Ürün | Onay/düzeltme | Paketleme |
| Paketleme | Paketleme | Ürün paketleme | Onaylı ürün | Paketli ürün | Mağaza |
| Mağaza | Stok & Satış | Satış takibi | Paketli ürün | Satış verisi | AI Analiz |
| E-Ticaret | Online Satış | Dijital satış | Ürün kataloğu | Satış verisi | AI Analiz |
| AI Ofisi | Veri Analizi | Satış/üretim/trend | Tüm veri | İyileştirme önerisi | Araştırma |

---

## ZORUNLu ARŞİVLER

| # | Arşiv | İçerik |
|---|---|---|
| 1 | Model arşivi | Tasarlanan tüm modeller |
| 2 | Kumaş arşivi | Kumaş katalogları ve fotoğrafları |
| 3 | Aksesuar arşivi | Düğme, fermuar vb |
| 4 | Araştırma arşivi | İnternetten toplanan referanslar |
| 5 | Üretim video arşivi | Teknik işlem videoları |
| 6 | Ürün foto arşivi | Ürün katalog görselleri |

---

## ÜRETİM ADALET SİSTEMİ (VERİ TABANLI)

| Veri | Amaç |
|---|---|
| İşlem süresi | Gerçek üretim zorluğu |
| İşçi başlangıç-bitiş saati | Performans ölçümü |
| İşlem zorluk puanı | Adil ücret |
| Ürün işlem sayısı | Üretim planlama |

**Kural:** Kararı insan değil veri verir!

---

## YAPAY ZEKA OFİSİ GÖREVLERİ

| Analiz | Amaç |
|---|---|
| Satış Analizi | Hangi ürün satıyor |
| Üretim Verim Analizi | Hangi işlem yavaş |
| Trend Analizi | Yeni ürün önerisi |
| Hata Analizi | Üretim hatası azaltma |

---

## SİSTEM TEMEL İLKESİ

- İşlem sırası sabit (sistemde tanımlı)
- İşlem zorluğu kayıtlı
- Üretim süresi ölçülür
- Ücret hesaplama veri ile yapılır
- İnsan inisiyatifi bırakılmaz
- Şeffaf maliyet, adil düzen, adaletli ücret
