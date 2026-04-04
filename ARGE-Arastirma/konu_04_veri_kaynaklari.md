# KONU 4: VERİ KAYNAKLARI VE TOPLAMA YÖNTEMLERİ
> Amaç: Hangi veri, nereden, nasıl toplanacak — yasal çerçevede

---

## YASAL VERİ POLİTİKASI (DEĞİŞMEZ)

- ✅ Kamuya açık sayfa ekran görüntüsü (screenshot → OCR / AI okuma)
- ✅ Resmi ve izinli API'ler
- ✅ Kendi yüklediğimiz veri
- ❌ İzinsiz scraping / veri çekme
- ❌ Telifli içerik kopyalama
- ❌ Başkasının veritabanını çekme
- **Yöntem**: Görsel olarak oku → kendi beynimize kaydet

---

## PLATFORM AYRIM KURALI

| Platform | Rolü | Ne İçin |
|----------|------|---------|
| **Trendyol** | TEK gerçek satış verisi | Satış doğrulama |
| **TikTok** | Erken trend sinyali | Ne yükseliyor |
| **Instagram** | Erken trend sinyali | Ne yükseliyor |
| **Pinterest** | Tasarım yönü | Stil, renk, siluet |
| **Google Trends** | Arama hacmi desteği | Trend büyüklüğü |
| **Zara/H&M/Mango** | Rakip izleme | Koleksiyon, fiyat, renk |

> Platform verileri karıştırılmaz. Her biri kendi alanında değerlendirilir.

---

## VERİ LİSTESİ (33 MADDE — KAYNAK VE ERİŞİM YÖNTEMİYLE)

### A) TREND VERİSİ (Sosyal — Erken Sinyal)
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 1 | İzlenme (T-3/T-1/bugün) | TikTok/IG | Aynı içerik 2-3 zaman screenshot |
| 2 | Beğeni artışı | TikTok/IG | Screenshot karşılaştırma |
| 3 | Yorum artışı | TikTok/IG/Trendyol | Screenshot |
| 4 | Kaydetme/save | TikTok/IG/Pinterest | Screenshot → OCR |
| 5 | Aynı ürün kaç farklı hesapta | TikTok/IG | Arama + sayma |
| 6 | Video çoğalma hızı | TikTok | Zamanlı karşılaştırma |
| 7 | İlk çıkış tarihi | TikTok/IG | İlk post tarihi |
| 8 | Arama hacmi | Google Trends | Grafik screenshot |

### B) SATIŞ VERİSİ (Pazar — Gerçek)
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 9 | Yorum sayısı + artışı | Trendyol | Ürün sayfası screenshot |
| 10 | Stok değişimi | Trendyol | Tekrar screenshot karşılaştırma |
| 11 | Satıcı sayısı | Trendyol | Liste screenshot |
| 12 | Fiyat aralığı | Trendyol | Screenshot → OCR |
| 13 | Varyantlar (beden/renk) | Trendyol | Screenshot |
| 14 | "Çok satan" sıralama | Trendyol | Screenshot |
| 15 | "Son X ürün" uyarısı | Trendyol | Screenshot |
| 16 | Yorum içi satın alma sinyali | Trendyol | Screenshot → LLM okuma |

### C) ZAMAN VERİSİ (Zorunlu)
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 17 | Günlük snapshot | Tüm platformlar | Günlük aynı veri screenshot |
| 18 | Trend değişim oranı (delta) | Snapshot farkı | Hesaplama |
| 19 | Trend ömrü | Google Trends | Geçmiş grafik screenshot |

### D) DAVRANIŞ VERİSİ
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 20 | Almama sebebi | Yorumlar | LLM analiz |
| 21 | Varyant eksikliği (beden/renk) | Ürün seçenekleri | Screenshot |
| 22 | Negatif trend artışı | Yorumlar | Zamanlı analiz |
| 23 | Kumaş şikayetleri | Yorumlar | Screenshot → LLM |
| 24 | Kalıp şikayetleri | Yorumlar | Screenshot → LLM |

### E) REKABET VERİSİ
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 25 | Rekabet yoğunluğu | Trendyol arama | Ürün sayısı screenshot |
| 26 | Reklam yoğunluğu | Meta Ad Library | Reklam sayfası screenshot |
| 27 | Görsel kalite/duruş | Ürün fotoğrafı | Vision AI |
| 28 | Renk & model | Ürün görseli | Görsel analiz |

### F) İÇ VERİ
| # | Veri | Kaynak | Erişim |
|---|------|--------|--------|
| 29 | Kumaş maliyet | Tedarikçi | Manuel giriş |
| 30 | İşçilik maliyet | Üretim | Manuel |
| 31 | Üretim süresi | Atölye | Manuel |
| 32 | Satış tahmini (proxy) | Stok değişimi | Zamanlı screenshot farkı |
| 33 | Dönüşüm oranı (proxy) | Yorum/favori | Oran hesap |

---

## TRENDYOL 18 KRİTER (ÖNCEKİ ÇALIŞMADAN)

1. Ürün adı
2. Marka/satıcı
3. Fiyat (güncel)
4. İndirim oranı
5. Değerlendirme puanı
6. Gelişmiş yorum analizi (toplam, fotoğraflı, 5 yıldız oranı, 1-2 yıldız temaları)
7. Satış adedi
8. Favoriye ekleme/beğeni
9. Ana+alt kategori
10. Kumaş/materyal
11. Renkler arası performans
12. Beden seçenekleri + tükenen bedenler
13. Kargo hızı
14. Trend rozeti
15. Benzer ürün sayısı (rekabet)
16. Ürün fotoğrafı (URL)
17. Ürün açıklaması (ilk 300 karakter)
18. İade politikası gizli ibareleri

---

## TREND SKOR FORMÜLÜ

```
TrendScore = (SatışBüyümesi × 0.35) + (SosyalBüyümesi × 0.30) + (RakipKullanım × 0.20) + (SezonUyumu × 0.15)
FırsatScore = TrendScore + KârMarjı − RiskScore
```

| Skor | Karar |
|:----:|-------|
| 85-100 | ÜRET |
| 70-85 | TEST |
| 50-70 | BEKLE |
| 0-50 | RED |

---

## KESİŞİM MODELİ (ANA KARAR)

```
DÜN TREND + BUGÜN TREND → ortak ne?
DÜN SATAN + BUGÜN SATAN → ortak ne?
İki ortağın kesişimi → SATILABİLİR ÜRÜN
```

---

## 75 SORU ÇERÇEVESİ (15 KATEGORİ)

1. Trend tespiti (5 soru)
2. Satış doğrulama (5 soru)
3. Trend+satış kesişimi (5 soru)
4. Ürün model analizi (5 soru)
5. Renk & görsel (5 soru)
6. Kumaş & malzeme (5 soru)
7. Fiyat analizi (5 soru)
8. Müşteri analizi (5 soru)
9. Rekabet analizi (5 soru)
10. Satmama sebebi (5 soru)
11. Fırsat analizi (5 soru)
12. Zaman analizi (5 soru)
13. Model üretim kararı (5 soru)
14. Birleştirme (5 soru)
15. Son karar (5 soru)
