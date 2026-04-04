# VERİ TOPLAMA MİMARİSİ — 4 EKSEN MODELİ

---

## TEMEL FELSEFE

Sistem bir işletmenin 4 eksenini izler:

```
TREND → TASARIM → ÜRETİM → SATIŞ
```

Her eksen için farklı veri kaynağı, farklı kriter listesi gerekir.

---

## YASAL VERİ TOPLAMA MODELİ

| Yöntem | Durum |
|--------|-------|
| Scraping (HTML parse) | ❌ YASAK — hukuki risk |
| API kullanımı | ✅ YASAL — izinli veri |
| Screenshot → OCR → AI | ✅ YASAL — gözlem verisi |
| Manuel gözlem kaydı | ✅ YASAL |

**Kural:** Sistem kişisel veri işlemez. Sadece halka açık, gözlemlenebilir veriyi kaydeder.

---

## PLATFORM HİYERARŞİSİ

| Öncelik | Platform | Veri Türü |
|---------|----------|-----------|
| 1 (EN ÖNEMLİ) | Trendyol | Satış gerçekliği — para ödenen yer |
| 2 | TikTok / Instagram | Trend sinyali — ilgi = satış değil |
| 3 | Pinterest / Google | Tasarım yönü — referans |

**Neden Trendyol 1. sırada:** Satış gerçekliği. Sosyal medya ilgi gösterir ama satış göstermez. Para ödenen yer satış gerçeğidir.

---

## EKSEN 1: TREND (Ne üretilecek?)

### Trendyol Kriterleri

| # | Kriter | Kaynak | Erişim |
|---|--------|--------|--------|
| 1 | Ürün adı | Ürün sayfası | Screenshot |
| 2 | Marka / satıcı | Ürün sayfası | Screenshot |
| 3 | Fiyat (güncel) | Ürün sayfası | Screenshot |
| 4 | İndirim oranı | Ürün sayfası | Screenshot |
| 5 | Değerlendirme puanı | Ürün sayfası | Screenshot |
| 6 | Toplam yorum sayısı | Yorum bölümü | Screenshot |
| 7 | Fotoğraflı yorum sayısı | Yorum bölümü | Screenshot |
| 8 | 5 yıldızlı yorum oranı | Yorum bölümü | Screenshot |
| 9 | 1-2 yıldız şikayet teması | Yorum bölümü | Screenshot → LLM |
| 10 | Favori (kalbe ekleyenler) | Ürün sayfası | Screenshot |
| 11 | Satıcı sayısı | Arama sonucu | Screenshot |
| 12 | Stok durumu | Ürün sayfası | Zamanlı screenshot |
| 13 | Beden bazlı stok | Ürün sayfası | Screenshot |
| 14 | Kategori sıralaması | Kategori sayfası | Screenshot |

### Sosyal Medya Kriterleri

| # | Kriter | Kaynak | Erişim |
|---|--------|--------|--------|
| 1 | İzlenme (T-3/T-1/bugün) | TikTok | Screenshot → OCR |
| 2 | Beğeni sayısı | TikTok / IG | Screenshot → OCR |
| 3 | Yorum sayısı | TikTok / IG | Screenshot → OCR |
| 4 | Kaydetme (save) | IG / Pinterest | Screenshot → OCR |
| 5 | Paylaşım sayısı | TikTok | Screenshot → OCR |
| 6 | Hashtag kullanım | TikTok / IG | Hashtag sayfası |
| 7 | İçerik çoğalma hızı | TikTok | Zamanlı screenshot |
| 8 | İlk çıkış tarihi | TikTok | İlk görülme kaydı |

### Rakip Kriterleri

| # | Kriter | Kaynak |
|---|--------|--------|
| 1 | Yeni ürünler | Zara / H&M koleksiyon |
| 2 | Fiyat aralığı | Rakip siteleri |
| 3 | Koleksiyon değişimi | Periyodik kontrol |

### Görsel Analiz Kriterleri

| # | Kriter | Yöntem |
|---|--------|--------|
| 1 | Siluet | AI görsel analiz |
| 2 | Kesim | AI görsel analiz |
| 3 | Renk | AI görsel analiz |
| 4 | Desen | AI görsel analiz |
| 5 | Stil | AI görsel analiz |

---

## HİBRİT VERİ YAKLAŞIMI

| Tip | Oran | Yöntem |
|-----|------|--------|
| Hızlı veri | %80 | JSON / API / OCR |
| Görsel analiz | %20 | AI (sadece kritik an) |

---

## VERİ KALİTE SINIFLARI

| Sınıf | Tanım | Kullanım |
|-------|--------|----------|
| A | %100 güvenilir, direkt ölçülebilir | Çekirdek karar |
| B | Güvenilir ama gürültü var | Oran + çapraz doğrulamayla |
| C | Dolaylı, tek başına anlamsız | Hesap katmanına taşınır |
| D | Manipüle edilebilir (reklam, badge) | Tek başına karar vermez |
| E | AI bağımlı (görsel yorum) | Final kontrol, destek |

---

## SAHTE TREND FİLTRESİ

| Kontrol | Süre | Amaç |
|---------|------|------|
| İlk kontrol | 24 saat | Veri doğrulama |
| İkinci kontrol | 72 saat | Süreklilik testi |
| Üçüncü kontrol | 7 gün | Haftalık değerlendirme |
| Stop-loss | 20 gün | Satış yoksa otomatik iptal |

**Kural:** 24 saat içinde doğrulanmayan veri geçersiz. 72 saat süreklilik testi geçmeyen trend "balon" sayılır.

---

## VERİ AKIŞI

```
Platform → Screenshot → OCR/AI → Ham Veri → Zod Doğrulama → Temiz Veri → Hesap Katmanı → Karar Motoru
```
