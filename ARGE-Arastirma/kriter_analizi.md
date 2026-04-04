# 138 KRİTER ANALİZİ — 4'LÜ AYRIM

> Kriterler 4 kategoriye ayrılmıştır. Karıştırılması yasak — sistem çöker.

---

## KATEGORİ 1: VERİ (Ham Girdi — Toplanır)

### Veri Kalite Sınıfları

| Sınıf | Tanım | Kullanım |
|-------|--------|----------|
| A | %100 güvenilir, direkt ölçülebilir | Çekirdek karar verisi |
| B | Güvenilir ama gürültü var (bot şişirme riski) | Oran + çapraz doğrulamayla kullanılır |
| C | Dolaylı — tek başına anlamlı değil | Hesap katmanına taşınır |
| D | Manipüle edilebilir (reklam, badge, indirim) | Tek başına karar vermez, sadece destek |
| E | AI bağımlı (görsel yorum, kumaş analizi) | Final kontrol, tek başına kullanılmaz |

### Veri Listesi (38 Adet)

| # | Veri | Kaynak | Erişim | Kalite |
|---|------|--------|--------|--------|
| 1 | İzlenme (T-3/T-1/bugün) | TikTok | Screenshot → OCR | B |
| 2 | Beğeni sayısı | TikTok / IG | Screenshot → OCR | B |
| 3 | Yorum sayısı + artışı | Trendyol | Screenshot → OCR | A |
| 4 | Kaydetme (save) | IG / Pinterest | Screenshot → OCR | B |
| 5 | Stok durumu + değişimi | Trendyol | Zamanlı screenshot | A |
| 6 | Beden bazlı stok | Trendyol | Screenshot | A |
| 7 | Fiyat (taban/tavan/ortalama) | Trendyol | Liste screenshot | A |
| 8 | Satıcı sayısı | Trendyol | Arama screenshot | A |
| 9 | Arama hacmi | Google Trends | Grafik screenshot | A |
| 10 | Hashtag kullanım | TikTok / IG | Hashtag sayfası | B |
| 11 | Aynı ürün kaç hesapta var | TikTok / IG | Manuel / screenshot | B |
| 12 | İçerik çoğalma hızı | TikTok | Zamanlı screenshot | B |
| 13 | İlk çıkış tarihi | TikTok / Trendyol | İlk görülme kaydı | A |
| 14 | Yorum içerikleri (metin) | Trendyol | Screenshot → LLM | B |
| 15 | Şikayet içerikleri | Trendyol | Screenshot → LLM | B |
| 16 | İade sinyalleri | Trendyol | Screenshot → LLM | C |
| 17 | Ürün görselleri | Trendyol / IG | Screenshot | A |
| 18 | Kumaş/materyal bilgisi | Trendyol açıklama | Screenshot → OCR | A |
| 19 | Reklam yoğunluğu | Meta Ad Library | Screenshot | D |
| 20 | Influencer paylaşımı | TikTok / IG | Profil kontrol | D |
| 21 | Pinterest save oranı | Pinterest | Screenshot | B |
| 22 | Rakip yeni ürünler | Zara / H&M | Koleksiyon screenshot | A |
| 23 | Rakip fiyat aralığı | Zara / H&M | Screenshot | A |
| 24 | Kargo süresi | Trendyol | Ürün sayfası | A |
| 25 | Trend etiketi/rozeti | Trendyol | Screenshot | D |
| 26 | Benzer ürün sayısı | Trendyol | Arama sonucu | A |
| 27 | Paylaşım sayısı | TikTok | Screenshot | B |
| 28 | Bölgesel arama | Google Trends | Screenshot | A |
| 29 | Günlük snapshot | Tüm platformlar | Her gün screenshot | A |
| 30 | Trend değişim oranı | Snapshot farkı | Hesaplanır | A |
| 31 | Tahmini satış hızı | Stok değişimi | Zamanlı screenshot | A |
| 32 | Trend ömrü sinyali | Google Trends geçmiş | Grafik screenshot | B |
| 33 | Trend sebebi | Yorum + sosyal | LLM analiz | E |
| 34 | Almama sebebi | Kötü yorumlar | LLM analiz | C |
| 35 | Varyant boşluğu | Trendyol seçenekler | Screenshot | A |
| 36 | Negatif dönüş artışı | Yorum zaman analizi | Zamanlı analiz | C |
| 37 | Ürün benzerlik havuzu | Kendi veri bankası | İç veri | A |
| 38 | Üretim süresi vs trend | İç veri + trend ömrü | Hesaplanır | A |

---

## KATEGORİ 2: HESAP (Türetilen — Hesaplanır)

| # | Hesap | Girdi | Çıktı |
|---|-------|-------|-------|
| 1 | Favori/Yorum oranı | Favori + yorum | İlgi/satış dengesi |
| 2 | İzlenme artış hızı | T-3 vs bugün | Trend ivmesi |
| 3 | Stok erime hızı | Zamanlı stok farkı | Gerçek satış tahmini |
| 4 | Pazar doygunluk | Satıcı + ürün sayısı | Giriş riski |
| 5 | Arz-talep farkı | Stok vs ilgi | Fırsat büyüklüğü |
| 6 | Trend ivme skoru | 3 gün delta | Yükseliş/düşüş |
| 7 | Fiyat segmenti | Min/max/ortalama | Rakip konumu |
| 8 | Rekabet yoğunluk | Satıcı + varyant | Pazar durumu |
| 9 | İade riski | Şikayet / toplam | Kalite sinyali |
| 10 | Trend güven skoru | Sosyal + satış | Gerçek mi balon mu |
| 11 | Dönüşüm oranı (proxy) | Yorum artış / favori | Satın alma niyeti |
| 12 | Rekabet kırılma | Satıcı artış hızı | Pazar ölüm noktası |

**TrendScore:**
```
TrendScore = (satış_sinyali × 0.35) + (sosyal_büyüme × 0.30) + (rakip_kullanım × 0.20) + (sezon_uyumu × 0.15)
```
> Her girdi 0-100 normalize

**FırsatScore:**
```
FırsatScore = TrendScore + KarMarjı(norm) − RiskScore(norm)
```

---

## KATEGORİ 3: KARAR (Aksiyon)

| Karar | FırsatScore | Ek Koşul |
|-------|-------------|----------|
| **ÜRET** | ≥ 85 | Trend devam + satış doğrulanmış |
| **TEST** | 70-85 | Trend aktif |
| **BEKLE** | 50-70 | Trend belirsiz |
| **RED** | < 50 | Satış yok VEYA balon |

Ek kararlar: RENK EKLE, BEDEN GENİŞLET, FİYAT DÜŞÜR, STOK ARTIR, ÜRÜN İPTAL, NUMUNE ÜRET

---

## KATEGORİ 4: SİSTEM DAVRANIŞI (Mekanik)

| # | Davranış | Açıklama |
|---|----------|----------|
| 1 | 24 saat tekrar kontrol | Her veri 24 saat sonra doğrulanır |
| 2 | 72 saat tekrar kontrol | 3 günlük süreklilik testi |
| 3 | 7 gün yeniden analiz | Haftalık değerlendirme |
| 4 | 20 gün stop-loss | Satış yoksa otomatik iptal |
| 5 | Feedback loop | Satış → ağırlık güncelleme |
| 6 | Veri doğrulama (Zod) | Kirli veri RED |
| 7 | Log zorunlu | Her işlem kayıt |
| 8 | Hiyerarşik öncelik | Pazar > Sosyal > Destek |
| 9 | Numune zorunluluğu | TEST → ÜRET geçişinde |
| 10 | Sahte veri filtre | Bot/manipülasyon kontrolü |

---

## ÖNEMLİ UYARILAR

1. **VERİ ile KARAR karıştırılmaz** — veri toplanır, karar hesaptan çıkar
2. **HESAP ile VERİ karıştırılmaz** — oran veri değildir, türetilmiş bilgidir
3. **SİSTEM DAVRANIŞI kriter değildir** — sistem fonksiyonudur
4. **Kalite D/E sınıfı veriler tek başına karar veremez**
