# MİZANET ERP — 25 SAYFA MİMARİSİ

> Her sayfa: Amaç → Paneller → Veri → Paylaşım → Kontrol Kuralları

---

## GENEL SAYFA DÜZENİ (TÜM SAYFALAR)

```
┌─────────────────────────────────────────────┐
│  ÜST BAR (sayfa adı, arama, bildirim, dil) │
├────────┬───────────────────────┬────────────┤
│  SOL   │   ANA ÇALIŞMA ALANI  │   SAĞ      │
│  MENÜ  │   (kart sistemi)     │   PANEL    │
│        │                      │            │
├────────┴───────────────────────┴────────────┤
│  ALT DURUM BAR (sistem, kullanıcı, sync)    │
└─────────────────────────────────────────────┘
```

## RENK SİSTEMİ

| Renk | Hex | Kullanım |
|------|-----|----------|
| Zümrüt Yeşili | #046A38 | Ana renk, üst bar, vurgu |
| Koyu Gold | #C8A951 | İkonlar, çizgiler, aksanlar |
| Yumuşak Mavi | #3A6EA5 | Destek, butonlar |
| Açık Gri | #F4F6F7 | Arka plan |
| Beyaz | #FFFFFF | Kart arka planı |

**Psikolojik amaç:** Sakinlik, güven, düşük stres. Çalışanlar meslek icabı stresli — sayfa düzeni rahatlatıcı olmalı.

## DURUM RENK KODLARI

| Renk | Anlam |
|------|-------|
| 🟢 Yeşil | Normal |
| 🟡 Sarı | Dikkat |
| 🔴 Kırmızı | Sorun |

---

## 1. KARARGÂH (/karargah)

**Amaç:** Tüm sistemi tek ekrandan izleme ve yönetme. Bütün modüllere erişim. Yetki verme/alma.

**Paneller:**

| Panel | Konum | İçerik |
|-------|-------|--------|
| Üst Kontrol Bar | Üst | Sistem durumu, aktif kullanıcı, bildirim, acil durum butonu |
| Sistem Navigasyonu | Sol | 25 modül listesi + durum ışığı |
| Operasyon Akış | Merkez | AR-GE → Tasarım → Modelhane → Kalıp → Kesim → İmalat → Stok → Satış |
| Analiz | Sağ | Trend radar, satış analiz, stok analiz, risk analiz |
| Canlı Durum | Alt | Üretim, sipariş, stok, maliyet anlık |

**Ek paneller:** Yetki yönetimi, ajan kontrol, kritik uyarı, hızlı görev atama

**Paylaşım:** TÜM modüllerle — okuma + yazma + yetki yönetimi

**Kural:** Karargâh tüm verilere erişir, tüm yetkileri yönetir, tüm logları görür.

---

## 2. AR-GE & TASARIM (/arge)

**Amaç:** Satılabilir ürün araştırması. Trend + satış kesişimi.

| Panel | İçerik |
|-------|--------|
| Trend Listesi | Yükselen ürünler (TikTok/IG/Pinterest) |
| Satış Doğrulama | Trendyol satış kontrolü |
| Rakip Analiz | Rakip yeni ürünler, fiyat farkı |
| Ürün Fikir Havuzu | Onaylanan ürün konseptleri |
| Trend Grafikler | Zaman serisi (T-3/T-1/bugün) |
| Trend Puanı | TrendScore + FırsatScore |

**Sorular:** Bu ürün nerede satılıyor? Fiyat bandı? Yaş grubu? Sezon? Satış hacmi?

**Paylaşım:** Modelhane, Kumaş, Tasarım

---

## 3. KUMAŞ ARŞİVİ (/kumas)

**Amaç:** Tüm kumaş verisi + stok + teknik özellik.

| Panel | İçerik |
|-------|--------|
| Kumaş Listesi | Tablo: ad, gramaj, içerik, esneklik, stok, fiyat |
| Kumaş Detay | Görsel + teknik kart |
| Tedarikçi | Tedarikçi bilgisi, fiyat, min sipariş |
| Stok Durumu | Mevcut miktar, kritik seviye |

**Paylaşım:** Modelhane, Kalıp, Maliyet, Kesim

---

## 4. MODELHANE (/modelhane)

**Amaç:** İlk prototip üretim. Model kartı yönetimi.

| Panel | İçerik |
|-------|--------|
| Model Kartı | Model adı, sezon, kumaş, renk |
| Ölçü Tablosu | Beden ölçüleri |
| Prova Kayıtları | Video + fotoğraf |
| Revizyon Geçmişi | Değişiklik log |
| Model Görselleri | Ön/arka/yan görüntü |

**Paylaşım:** Kalıp, İmalat, Tasarım

**Kural:** Her model görsel + sesli kayıtla sisteme girilir. İnisiyatif yok.

---

## 5. KALIP (/kalip)

**Amaç:** Ürün kalıp sistemi.

| Panel | İçerik |
|-------|--------|
| Kalıp Listesi | Model bazlı kalıp dosyaları |
| Kalıp Görseli | DXF / teknik çizim |
| Beden Serisi | S-M-L-XL-XXL ölçüleri |
| Dikiş Payı | Dikiş payı tanımları |
| Kesim Planı | Pastal yerleşim önizleme |

**Paylaşım:** Kesim, Modelhane

---

## 6. KESİMHANE (/kesim)

**Amaç:** Kumaş kesim yönetimi.

| Panel | İçerik |
|-------|--------|
| Kesim Planı | Aktif kesim emirleri |
| Pastal Yerleşim | Kumaş en + kalıp dizilimi |
| Kumaş Tüketimi | Kullanılan / fire |
| Kesim Verimi | Verimlilik yüzdesi |

**Paylaşım:** İmalat, Stok, Maliyet

---

## 7. İMALAT (/imalat)

**Amaç:** Dikiş üretim takibi.

| Panel | İçerik |
|-------|--------|
| İş Emri | Aktif üretim emirleri |
| Operasyon Listesi | İşlem adımları + makine + süre |
| Üretim Takip | Gerçek zamanlı ilerleme |
| Kalite Kontrol | Ölçü + dikiş + görsel kontrol |
| Çalışan Atama | Hangi operatör hangi işte |

**Paylaşım:** Stok, Maliyet, Raporlar

**Kural:** Her operasyon video/fotoğraf ile kayıt. Her adım sistem onayı gerektirir.

---

## 8. MALİYET (/maliyet)

**Amaç:** Ürün maliyet hesaplama.

| Panel | İçerik |
|-------|--------|
| Maliyet Tablosu | Kumaş + aksesuar + işçilik + genel gider |
| Birim Maliyet | Ürün başına maliyet |
| Karşılaştırma | Hedef vs gerçek maliyet |

**Paylaşım:** Muhasebe, Kasa, Karargâh

---

## 9. MUHASEBE (/muhasebe)

| Panel | İçerik |
|-------|--------|
| Gelir-Gider | Aylık/haftalık özet |
| Faturalar | Gelen/giden fatura listesi |
| Vergi | Vergi hesaplama |

---

## 10. KASA (/kasa)

| Panel | İçerik |
|-------|--------|
| Günlük Kasa | Giren/çıkan nakit |
| Ödeme Kayıtları | Ödeme geçmişi |

---

## 11. STOK (/stok)

| Panel | İçerik |
|-------|--------|
| Depo Stok | Ürün bazlı miktar |
| Mağaza Stok | Mağaza bazlı miktar |
| Kritik Stok | Minimum seviye uyarısı |
| Stok Hareketi | Giriş/çıkış log |

**Paylaşım:** Sipariş, Katalog, Satış

---

## 12. KATALOG (/katalog)

| Panel | İçerik |
|-------|--------|
| Ürün Galeri | Ürün görselleri |
| Ürün Açıklama | Kumaş, beden, fiyat |
| Paylaşım Linkleri | Sosyal medya / e-ticaret bağlantısı |

---

## 13. SİPARİŞLER (/siparisler)

| Panel | İçerik |
|-------|--------|
| Sipariş Listesi | Yeni / işlemde / tamamlanan |
| Üretim Durumu | Siparişin üretim aşaması |
| Teslimat Takip | Kargo durumu |

---

## 14. MÜŞTERİLER (/musteriler)

| Panel | İçerik |
|-------|--------|
| Müşteri Kartı | Ad, iletişim, segment |
| Satın Alma Geçmişi | Sipariş geçmişi |

---

## 15. PERSONEL (/personel)

| Panel | İçerik |
|-------|--------|
| Çalışan Profili | Ad, departman, beceri |
| Performans | Günlük/haftalık/aylık üretim |
| Görev Geçmişi | Yapılan işler log |

**Kural:** Her personelin yaptığı işlem kayıt altında. Şeffaf, adil, ölçülebilir.

---

## 16. GÖREVLER (/gorevler)

| Panel | İçerik |
|-------|--------|
| Görev Listesi | Aktif görevler |
| Tamamlanan | Biten görevler + kanıt |
| Geciken | Süre aşan görevler |

---

## 17. KAMERALAR (/kameralar)

| Panel | İçerik |
|-------|--------|
| Canlı Akış | Üretim alanı kameraları |
| Kayıt Arşivi | Geçmiş kayıtlar |

---

## 18. AJANLAR (/ajanlar)

| Panel | İçerik |
|-------|--------|
| Ajan Listesi | 12 ajan + durum |
| Ajan Raporu | Son çıktılar |
| Ajan Kontrol | Başlat / durdur / ayar |

---

## 19. DENETMEN (/denetmen)

| Panel | İçerik |
|-------|--------|
| İşlem Denetimi | Hatalı / eksik işlemler |
| Hata Raporu | Tespit edilen hatalar |
| Düzeltme Takip | Hata → düzeltme süreci |

---

## 20. RAPORLAR (/raporlar)

| Panel | İçerik |
|-------|--------|
| Satış Raporu | Günlük/haftalık/aylık |
| Üretim Raporu | Verimlilik, gecikme |
| Maliyet Raporu | Bütçe vs gerçek |
| Trend Raporu | AR-GE çıktıları |

---

## 21. TASARIM (/tasarim)

| Panel | İçerik |
|-------|--------|
| Çizim Editörü | Ürün çizim alanı |
| Desen Sistemi | Desen kütüphanesi |
| Renk Paleti | Sezon renkleri |

---

## 22. ÜRETİM (/uretim)

| Panel | İçerik |
|-------|--------|
| Üretim Takvimi | Planlanan üretimler |
| Kapasite Planı | Hat + makine + personel |
| Üretim Durumu | Gerçek zamanlı ilerleme |

---

## 23. GÜVENLİK (/guvenlik)

| Panel | İçerik |
|-------|--------|
| Kullanıcı Yetkileri | Rol bazlı erişim |
| Erişim Logları | Kim ne zaman nereye erişti |
| Güvenlik Uyarıları | Yetkisiz erişim denemeleri |

---

## 24. AYARLAR (/ayarlar)

| Panel | İçerik |
|-------|--------|
| Dil Ayarı | TR / AR (çok dilli) |
| Modül Ayarı | Modül aç/kapa |
| Sistem Yapılandırma | DB, API, bot ayarları |

---

## 25. GİRİŞ (/giris)

| Panel | İçerik |
|-------|--------|
| Kullanıcı Giriş | Kullanıcı adı + şifre |
| 2FA Doğrulama | İki faktörlü kimlik |

---

## DİL DESTEĞİ

- Ana dil: Türkçe
- İkinci dil: Arapça
- Çok dilli genişleme: mümkün

## ERİŞİM KURALI

- Herkes sadece kendi yetki alanındaki bilgilere erişir
- Karargâh tüm verilere erişir
- Yetki verme/alma sadece Karargâh'tan yapılır
