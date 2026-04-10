# MİZANET — KONU 03: KRİTER SİSTEMİ (KONSOLİDE FİNAL)

> **Belge Kodu:** MZN-K03-FINAL  
> **Tarih:** 10 Nisan 2026 — 11:05 (UTC+3)  
> **Kaynak Dosyalar:**  
> - `mizanet.com/konu_03_kriter_sistemi.md` (5KB) — 138 ARGE kriter  
> - `mizanet.com/kriter_analizi.md` (6KB) — 138 kriter 4'lü ayrım  
> - `mizanet.com/sistem_denetim_kriterleri.md` (12KB) — 188 sistem kriter  
> - `mizanet.com/konu_07_188_kriter_denetim_tablosu.md` (11KB)  
> - `mizanet.com/SISTEM_188_KRITER_TABLOSU.md` (12KB)  
> **Varsayım:** SIFIR

---

## BÖLÜM A: AR-GE KRİTER SİSTEMİ (138 KRİTER)

### A1. 4'lü Ayrım (KRİTİK)

> VERİ, HESAP, KARAR ve SİSTEM DAVRANIŞI birbirine karıştırılMAZ.

| Tip | Tanım | Adet |
|-----|--------|------|
| **VERİ** (Ham Input) | Dışarıdan gelir, toplanır, ölçülür, saklanır. Karar vermez. | 38 |
| **HESAP** (Türetilen) | Veriden matematikle hesaplanır. Ham olarak toplanamaz. | 12 |
| **KARAR** (Aksiyon) | Sistemin verdiği net aksiyon — para kazandıran çıktı. | 15 |
| **SİSTEM DAVRANIŞI** | Sistemin nasıl çalıştığını tanımlar — kriter değil, fonksiyondur. | 10+ |

---

### A2. VERİ KATEGORİSİ (38 Adet)

#### Veri Kalite Sınıfları

| Sınıf | Oran | Tanım | Örnek |
|-------|:----:|-------|-------|
| **A** | ~%40 | %100 güvenilir, direkt ölçülebilir | Fiyat, stok, yorum sayısı, kargo, kur |
| **B** | ~%30 | Güvenilir ama gürültü var (bot riski) | TikTok/IG izlenme, beğeni, hashtag |
| **C** | ~%15 | Dolaylı — tek başına anlamlı değil | Sepet deltası, dark social |
| **D** | ~%10 | Manipüle edilebilir | Influencer, sponsorlu reklam, "çok satan" badge |
| **E** | ~%5 | AI bağımlı | Kumaş kalitesi (görsel), kalıp duruşu |

#### Veri Detayı (Seçilmiş)

| # | Veri | Kaynak | Erişim | Kalite |
|---|------|--------|--------|--------|
| 1 | İzlenme (T-3/T-1/T-0) | TikTok | Screenshot → OCR | B |
| 2 | Yorum sayısı + artışı | Trendyol | Screenshot → OCR | A |
| 3 | Stok durumu + değişimi | Trendyol | Zamanlı screenshot | A |
| 4 | Beden bazlı stok | Trendyol | Screenshot | A |
| 5 | Fiyat (taban/tavan/ortalama) | Trendyol | Liste screenshot | A |
| 6 | Satıcı sayısı | Trendyol | Arama screenshot | A |
| 7 | Arama hacmi | Google Trends | Grafik screenshot | A |
| 8 | Ürün görselleri | Trendyol / IG | Screenshot | A |
| 9 | Rakip yeni ürünler | Zara / H&M | Koleksiyon screenshot | A |
| 10 | Günlük snapshot | Tüm platformlar | Her gün screenshot | A |

---

### A3. HESAP KATEGORİSİ (12 Adet)

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

#### Formüller

```
TrendScore = (satış_sinyali × 0.35) + (sosyal_büyüme × 0.30) + (rakip_kullanım × 0.20) + (sezon_uyumu × 0.15)
FırsatScore = TrendScore + KarMarjı(norm) − RiskScore(norm)
```
> Her girdi 0-100 normalize edilir

---

### A4. KARAR KATEGORİSİ

| Karar | FırsatScore | Ek Koşul |
|-------|:-----------:|----------|
| **ÜRET** | ≥ 85 | Trend devam + satış doğrulanmış |
| **TEST** | 70-85 | Trend aktif |
| **BEKLE** | 50-70 | Trend belirsiz |
| **RED** | < 50 | Satış yok VEYA balon |

Ek kararlar: `RENK EKLE` | `BEDEN GENİŞLET` | `FİYAT DÜŞÜR` | `STOK ARTIR` | `ÜRÜN İPTAL` | `NUMUNE ÜRET` | `PAZARA GİR` | `PAZARDAN ÇIK`

---

### A5. SİSTEM DAVRANIŞI

| # | Davranış | Açıklama |
|---|----------|----------|
| 1 | 24 saat tekrar kontrol | Her veri 24 saat sonra doğrulanır |
| 2 | 72 saat süreklilik testi | 3 günlük süreklilik |
| 3 | 7 gün yeniden analiz | Haftalık değerlendirme |
| 4 | 20 gün stop-loss | Satış yoksa otomatik iptal |
| 5 | Feedback loop | Satış → ağırlık güncelleme |
| 6 | Veri doğrulama (Zod) | Kirli veri RED |
| 7 | Log zorunlu | Her işlem kayıt |
| 8 | Hiyerarşik öncelik | Pazar > Sosyal > Destek |
| 9 | Numune zorunluluğu | TEST → ÜRET geçişinde |
| 10 | Sahte veri filtre | Bot/manipülasyon kontrolü |

---

### A6. BALON FİLTRE ve RED KURALLARI

**Balon Tespiti:**
- Sadece sosyalde var + satış yok → **RED**
- Influencer tek kaynak → **RED**
- Reklam tek kaynak → **RED**
- Ani sıçrama + hızlı düşüş → **BALON**

**Çapraz Test:**

| Durum | Karar |
|-------|-------|
| 3 platformda var (TikTok + IG + Trendyol) | ✅ Doğru |
| 2 platformda var | ⚠ Riskli |
| 1 platformda var | ❌ Yanlış |

---

### A7. EKSİK TESPİT EDİLEN 13 KRİTİK VERİ

| # | Eksik Veri | Neden Gerekli |
|---|-----------|---------------|
| 1 | Günlük snapshot (T-3/T-1/T-0) | Değişim olmadan trend bilinemez |
| 2 | Tahmini satış hızı (adet/gün) | İzlenme ≠ satış |
| 3 | Dönüşüm oranı (proxy) | Sahte trend eleme |
| 4 | Trend ömrü tahmini | Yanlış zamanda üretim = zarar |
| 5 | Trend sebebi | Yanlış ürün üretme önleme |
| 6 | Almama sebebi | Rakip açığı bulma |
| 7 | Varyant boşluğu (beden/renk) | Direkt satış fırsatı |
| 8 | Fiyat elastikiyeti | Maksimum kâr noktası |
| 9 | Erken alan kitle tipi | Trend başı yakalama |
| 10 | Trend güven skoru | Sahte trend engelleme |
| 11 | Rekabet kırılma noktası | Geç girme hatası önleme |
| 12 | Üretim süresi vs trend süresi | Yetişir mi kontrolü |
| 13 | İlk 3 gün satış tahmini | Test üretim kararı |

---

## BÖLÜM B: SİSTEM DENETİM KRİTERLERİ (188 KRİTER)

### B1. Modül İşlem Raporu

| Modül | İşlem | Alt İşlem (DB) | Yama | Hata |
|-------|:-----:|:--------------:|:----:|:----:|
| Ar-Ge (M1) | 61 | 13 | 4 | 0 |
| Kumaş (M2) | 57 | 12 | 4 | 0 |
| Modelhane (M3) | 80 | 19 | 4 | 0 |
| Kalıp (M4) | 53 | 10 | 4 | 0 |
| Kesim (M5) | 50 | 13 | 4 | 0 |
| Stok/Depo (M6) | 46 | 9 | 4 | 0 |
| Kasa (M7) | 80 | 10 | 4 | 0 |
| Muhasebe (M8) | 37 | 10 | 3 | 0 |
| Personel (M9) | 84 | 15 | 4 | 0 |
| Katalog (M10) | 75 | 13 | 4 | 0 |
| Müşteriler (M11) | 65 | 14 | 4 | 0 |
| Siparişler (M12) | 71 | 17 | 4 | 0 |
| Denetmen (M14) | 38 | 10 | 3 | 0 |
| Ajanlar | 76 | 6 | 4 | 0 |
| Raporlar | 51 | 11 | 2 | 0 |
| Ayarlar | 25 | 4 | 3 | 0 |
| Üretim Ana Panel | 73 | 14 | 4 | 0 |
| **TOPLAM** | **982** | **180** | **60** | **0** |

### B2. 188 Kriter Kategorileri

| Kategori | Kriter Aralığı | Adet |
|----------|:--------------:|:----:|
| Sistem Mimarisi | 1-8 | 8 |
| Araştırma | 9-18 | 10 |
| Tasarım | 19-26 | 8 |
| Teknik Föy | 27-34 | 8 |
| Üretim | 35-42 | 8 |
| Mağaza | 43-48 | 6 |
| Veri | 49-56 | 8 |
| Güvenlik | 57-66 | 10 |
| Performans | 67-72 | 6 |
| AI | 73-78 | 6 |
| Agent | 79-84 | 6 |
| Kamera | 85-89 | 5 |
| Telegram | 90-94 | 5 |
| Finans | 95-100 | 6 |
| Adalet | 101-105 | 5 |
| Arşiv | 106-111 | 6 |
| Manipülasyon Önleme | 112-115 | 4 |
| Öğrenme | 116-120 | 5 |
| Veri Detay | 121-125 | 5 |
| Güvenlik Detay | 126-130 | 5 |
| Performans Detay | 131-135 | 5 |
| AI Detay | 136-140 | 5 |
| Agent Detay | 141-145 | 5 |
| Kamera Detay | 146-150 | 5 |
| Telegram Detay | 151-155 | 5 |
| Finans Detay | 156-160 | 5 |
| Sürdürülebilirlik | 161-165 | 5 |
| Operasyon | 166-170 | 5 |
| Test | 171-175 | 5 |
| Analiz | 176-180 | 5 |
| Veri İleri | 181-185 | 5 |
| Risk | 186-188 | 3 |

---

## ANA KURALLAR

1. **VERİ ile KARAR karıştırılmaz** — veri toplanır, karar hesaptan çıkar
2. **HESAP ile VERİ karıştırılmaz** — oran veri değildir, türetilmiş bilgidir
3. **Kalite D/E sınıfı veriler tek başına karar veremez**
4. **Ana karar formülü:** `Trend + Satış + Süreklilik + Fırsat = ÜRET`

---

> **Bu belge, 5 farklı kaynak dosyadan konsolide edilmiş TEK REFERANS kaynağıdır.**
