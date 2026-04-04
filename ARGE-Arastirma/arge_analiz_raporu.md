# AR-GE İSTİHBARAT SİSTEMİ — BİRLEŞTİRİLMİŞ ANALİZ RAPORU

> Tarih: 2026-04-04
> Kaynak: 6 mimari belgesi + VERİ TOPLAMA MİMARİSİ + ChatGPT sohbet analizi + 138 kriter dosyası
> Durum: Analiz tamamlandı — karar bekliyor

---

## 1. SİSTEMİN AMACI (TEK CÜMLE)

Dün trend + bugün trend + dün satan + bugün satan → ortak modeli bul → satılabilir ürün üret.

---

## 2. KESİN KURALLAR (DEĞİŞMEZ)

| # | Kural |
|---|-------|
| 1 | Veri çekme yok — sadece kamuya açık gözlem (screenshot → AI/OCR) |
| 2 | Platform verileri karıştırılmaz — her platform kendi yerinde değerlendirilir |
| 3 | Maliyet analizi ürün seçiminden AYRI — önce "satılır mı", sonra "üretilebilir mi" |
| 4 | AI karar vermez — önerir, insan onaylar |
| 5 | Test edilmeyen veri kullanılmaz — 24 saat + 72 saat tekrar kontrol |
| 6 | Sıfır inisiyatif — sistem ve ekip sadece verilen komutu uygular |

---

## 3. PLATFORM HİYERARŞİSİ

| Sıra | Platform | Rol | Karar Gücü |
|------|----------|-----|------------|
| 1 | **Trendyol** | Satış gerçekliği | EN YÜKSEK — ana karar kaynağı |
| 2 | **TikTok** | Erken trend sinyali | ORTA — doğrulama gerekir |
| 3 | **Instagram** | Trend desteği | ORTA — doğrulama gerekir |
| 4 | **Pinterest** | Tasarım/stil yönü | DÜŞÜK — sadece yön gösterir |
| 5 | **Google Trends** | Arama hacmi | DESTEK — zaman analizi için |
| 6 | **Zara/H&M/Mango** | Rakip izleme | DESTEK — koleksiyon değişimi |

**Kural:** Trendyol verisi diğer tüm platformlardan önce gelir. Sosyal medyada trend olup Trendyol'da satmayan ürün = balon.

---

## 4. VERİ SETİ (4'LÜ AYRIM — KARIŞTIRILMAZ)

### 4.1 — VERİ (Ham Girdi — Toplanır)

| # | Veri | Kaynak | Erişim Yöntemi |
|---|------|--------|---------------|
| 1 | İzlenme sayısı (T-3 / T-1 / bugün) | TikTok | Video screenshot → OCR |
| 2 | Beğeni sayısı | TikTok / Instagram | Screenshot → OCR |
| 3 | Yorum sayısı + artışı | Trendyol | Ürün sayfası screenshot |
| 4 | Kaydetme (save) sayısı | Instagram / Pinterest | Screenshot → OCR |
| 5 | Stok durumu + değişimi | Trendyol | Zamanlı screenshot karşılaştırma |
| 6 | Beden bazlı stok | Trendyol | Ürün sayfası screenshot |
| 7 | Fiyat (taban / tavan / ortalama) | Trendyol | Liste screenshot → OCR |
| 8 | Satıcı sayısı | Trendyol | Arama sonucunda screenshot |
| 9 | Arama hacmi | Google Trends | Grafik screenshot |
| 10 | Hashtag kullanım sayısı | TikTok / Instagram | Hashtag sayfası screenshot |
| 11 | Aynı ürün kaç farklı video/hesapta var | TikTok / Instagram | Manuel sayım veya screenshot |
| 12 | Video/içerik çoğalma hızı | TikTok | Zamanlı screenshot |
| 13 | İlk çıkış tarihi (ürün/içerik) | TikTok / Trendyol | İlk görülme kaydı |
| 14 | Yorum içerikleri (ham metin) | Trendyol | Screenshot → LLM okuma |
| 15 | Şikayet içerikleri | Trendyol | Screenshot → LLM analiz |
| 16 | İade sinyalleri (yorumdan) | Trendyol | Screenshot → LLM |
| 17 | Ürün görselleri | Trendyol / Instagram | Screenshot |
| 18 | Kumaş/materyal bilgisi | Trendyol ürün açıklaması | Screenshot → OCR |
| 19 | Reklam yoğunluğu | Meta Ad Library | Sayfa screenshot |
| 20 | Influencer paylaşımı mı? | TikTok / Instagram | Profil kontrolü |
| 21 | Pinterest pin save oranı | Pinterest | Screenshot |
| 22 | Rakip yeni ürünleri | Zara / H&M online | Koleksiyon sayfası screenshot |
| 23 | Rakip fiyat aralığı | Zara / H&M | Screenshot |
| 24 | Kargo süresi | Trendyol | Ürün sayfası |
| 25 | Trend etiketi/rozeti | Trendyol | Screenshot |
| 26 | Benzer ürün sayısı | Trendyol | Arama sonucu |
| 27 | Paylaşım (share) sayısı | TikTok | Screenshot |
| 28 | Bölgesel arama yoğunluğu | Google Trends | Screenshot |

**Eklenen veriler (eksik analizi sonrası):**

| # | Veri | Kaynak | Neden Gerekli |
|---|------|--------|---------------|
| 29 | Günlük snapshot (T-3 / T-1 / bugün) | Tüm platformlar | Zaman katmanı — değişim olmadan trend ölçülemez |
| 30 | Trend değişim oranı (delta) | Snapshot farkı | Artış mı düşüş mü |
| 31 | Tahmini satış hızı (adet/gün) | Stok değişimi | Gerçek talep ölçümü |
| 32 | Trend ömrü sinyali | Google Trends geçmiş grafik | Üretim zamanlaması — geç kalma riski |
| 33 | Trend sebebi (fiyat/kalite/viral/influencer) | Yorum + sosyal analiz | Yanlış ürün klonu önleme |
| 34 | Almama sebebi | Kötü yorumlar | Rakibin açığı = fırsat |
| 35 | Varyant boşluğu (eksik beden/renk) | Trendyol ürün seçenekleri | Direkt satış fırsatı |
| 36 | Negatif dönüş artış hızı | Yorum zaman analizi | Trend çöküş erken uyarı |
| 37 | Ürün benzerlik havuzu (geçmiş) | Kendi veri bankası | En güçlü tahmin kaynağı |
| 38 | Üretim süresi vs trend süresi | İç veri + trend ömrü | Yetişir mi yetişmez mi |

---

### 4.2 — HESAP (Türetilen — Hesaplanır)

| # | Hesap | Girdi | Çıktı |
|---|-------|-------|-------|
| 1 | Favori/Yorum oranı | Favori + yorum | İlgi/satış dengesi |
| 2 | İzlenme artış hızı | T-3 vs bugün | Trend ivmesi |
| 3 | Stok erime hızı | Zamanlı stok farkı | Gerçek satış tahmini |
| 4 | Pazar doygunluk skoru | Satıcı sayısı + ürün sayısı | Giriş riski |
| 5 | Arz-talep farkı | Stok vs ilgi | Fırsat büyüklüğü |
| 6 | Trend ivme skoru | 3 günlük delta | Yükseliyor mu düşüyor mu |
| 7 | Fiyat segmenti | Min/max/ortalama | Rakiplerle konum |
| 8 | Rekabet yoğunluk skoru | Satıcı + varyant | Pazar ölü mü diri mi |
| 9 | İade riski oranı | Şikayet / toplam yorum | Kalite sinyali |
| 10 | Trend güven skoru | Sosyal + satış birlikte | Gerçek mi balon mu |
| 11 | Dönüşüm oranı (proxy) | Yorum artışı / favori artışı | Satın alma niyeti |
| 12 | Rekabet kırılma noktası | Satıcı artış hızı | Ne zaman pazar ölür |

**TrendScore formülü (5/6 belgede tutarlı):**
```
TrendScore = (satış_sinyali × 0.35) + (sosyal_büyüme × 0.30) + (rakip_kullanım × 0.20) + (sezon_uyumu × 0.15)
```
> ⚠️ Her girdi 0-100 arasında normalize edilmeli. Farklı ölçekler toplanamaz.

**FırsatScore:**
```
FırsatScore = TrendScore + KarMarjı(normalize) − RiskScore(normalize)
```
> ⚠️ Tüm bileşenler aynı ölçeğe (0-100) dönüştürülmeli.

---

### 4.3 — KARAR (Aksiyon — Üretilir)

| Karar | Koşul |
|-------|-------|
| **ÜRET** | FırsatScore ≥ 85 + Trend devam + Satış doğrulanmış |
| **TEST ÜRETİMİ** | FırsatScore 70-85 + Trend aktif |
| **BEKLE** | FırsatScore 50-70 + Trend belirsiz |
| **RED** | FırsatScore < 50 VEYA satış yok VEYA balon |

Ek kararlar: RENK EKLE, BEDEN GENİŞLET, FİYAT DÜŞÜR, STOK ARTIR, ÜRÜN İPTAL

---

### 4.4 — SİSTEM DAVRANIŞI (Mekanik — Otomatik)

| # | Davranış |
|---|----------|
| 1 | 24 saat tekrar kontrol |
| 2 | 72 saat tekrar kontrol |
| 3 | 7 gün yeniden analiz |
| 4 | 20 gün satış yoksa → otomatik iptal (stop-loss) |
| 5 | Feedback loop — satış sonrası ağırlık güncelleme |
| 6 | Veri doğrulama (Zod validation) |
| 7 | Log — her işlem kayıt |
| 8 | Hiyerarşik veri önceliği (pazar > sosyal > destek) |
| 9 | Numune zorunluluğu (TEST → ÜRET geçişinde) |
| 10 | Sahte veri filtreleme |

---

## 5. YASAL VERİ TOPLAMA MODELİ

**Kullanıcının sözü:** "Verisini çekmiyoruz, gözle görüyoruz, kendi beynimizi oluşturuyoruz."

| Yöntem | İzinli mi |
|--------|-----------|
| Kamuya açık sayfa screenshot → AI/OCR okuma | ✅ |
| Google Trends grafik okuma | ✅ |
| Kendi satış verisi (iç sistem) | ✅ |
| Kendi yüklediği fotoğraf analizi | ✅ |
| robots.txt uyumlu sayfa erişimi | ✅ |
| Resmi API (varsa, izinli) | ✅ |
| Otomatik veri çekme (scraping) | ❌ |
| Görselleri indirip kopyalama | ❌ |
| Veritabanı çekme | ❌ |
| Kişisel veri işleme (KVKK/GDPR ihlali) | ❌ |

**Yöntem:** Screenshot → OCR/Vision AI → analiz sonucu kaydedilir (ürün değil, analiz kaydedilir).

---

## 6. SİSTEM İŞ AKIŞI (10 ADIM — KESİN SIRA)

```
1. TREND TESPİTİ
   → TikTok / Instagram'da yükselen ürünleri bul
   → Aynı ürün kaç hesapta var, çoğalıyor mu?

2. SATIŞ DOĞRULAMA
   → Aynı ürünü Trendyol'da ara
   → Yorum artıyor mu? Stok azalıyor mu?
   → Satış yoksa → RED

3. ZAMAN ANALİZİ
   → T-3, T-1, bugün karşılaştır
   → Sürekli artış → güçlü
   → Ani artış-düşüş → balon → RED

4. BALON FİLTRESİ
   → Sadece sosyalde var, satış yok → RED
   → Sadece influencer ürünü → RED
   → Sadece reklam → RED

5. MODEL PARÇALAMA
   → Kalıp, renk, uzunluk, form → ayrı ayrı çıkar

6. KESİŞİM BULMA
   → Dün trend + bugün trend = ortak ne?
   → Dün satan + bugün satan = ortak ne?
   → İki ortak kesişince = üretilecek model

7. DAVRANIŞ ANALİZİ
   → Neden alıyor? Neden almıyor?
   → Şikayet = fırsat

8. FIRSAT ANALİZİ
   → Eksik beden, eksik renk, kalite açığı?

9. TEST (24 saat + 72 saat tekrar kontrol)
   → Devam ediyorsa → güçlü
   → Durmuşsa → RED

10. SON KARAR
    → Trend ✔ + Satış ✔ + Zaman ✔ + Tekrar ✔ = ÜRET
```

---

## 7. 5 ÇAPRAZ ANALİZ

| # | Analiz | Kaynak | Çıktı |
|---|--------|--------|-------|
| 1 | Trend Analizi | TikTok / Instagram | Ne yükseliyor |
| 2 | Satış Analizi | Trendyol | Ne satıyor |
| 3 | Zaman Analizi | Snapshot farkı | Devam ediyor mu |
| 4 | Balon Filtresi | Sosyal vs Pazar | Gerçek mi sahte mi |
| 5 | Fırsat Analizi | Varyant + yorum | Boşluk nerede |

**Ana Karar Formülü:**
```
Trend + Satış + Süreklilik + Fırsat = ÜRET
```

---

## 8. TEKNOLOJİ SEÇİMİ (TÜM BELGELERDEN SÜZÜLMÜŞ)

| Bileşen | Seçim | Maliyet |
|---------|-------|---------|
| Ana dil | Python 3.11 | Ücretsiz |
| Backend | FastAPI | Ücretsiz |
| Veritabanı | PostgreSQL | Ücretsiz |
| Kuyruk | Redis + RQ | Ücretsiz |
| AI (lokal) | Llama 3 / Mistral | Ücretsiz |
| Görsel analiz | CLIP + YOLO (gerekirse) | Ücretsiz |
| NLP | distilbert-multilingual | Ücretsiz |
| OCR | Tesseract / Vision AI | Ücretsiz / düşük |
| Screenshot | Playwright | Ücretsiz |
| Zamanlama | APScheduler | Ücretsiz |
| Log | structlog | Ücretsiz |
| **Aylık toplam** | | **0-50 USD** |

---

## 9. AJAN MİMARİSİ (12 AJAN — OPTİMUM)

| # | Ajan | Katman | Görev |
|---|------|--------|-------|
| 1 | Sosyal Trend Tarayıcı | Veri Toplama | TikTok / Instagram screenshot + analiz |
| 2 | E-Ticaret Tarayıcı | Veri Toplama | Trendyol ürün sayfası screenshot + analiz |
| 3 | Rakip İzleme | Veri Toplama | Zara / H&M yeni ürünler |
| 4 | Görsel Analiz | Veri Toplama | Ürün görseli → siluet, kesim, renk |
| 5 | Ürün Tanımlayıcı | Ürün Tanıma | Kategori, tip, stil |
| 6 | Kumaş/Stil Analisti | Ürün Tanıma | Kumaş türü, renk trendi, sezon uyumu |
| 7 | Trend Skor Motoru | Analiz | TrendScore hesaplama |
| 8 | Talep Tahmini | Analiz | Satış potansiyeli + stok erime hızı |
| 9 | Feedback Agent | Analiz | Satış sonrası model güncelleme |
| 10 | Risk Analiz | Risk + Karar | Trend ömrü + pazar doygunluk |
| 11 | Fırsat Analiz | Risk + Karar | Varyant boşluğu + kötü yorum fırsatı |
| 12 | QA / Denetim | Denetim | Tüm ajanları kontrol, log, test |

---

## 10. VERİ TOPLAMA MİMARİSİ — 4 EKSEN

### EKSEN 1: TREND (Ne üretilecek?)
- Trendyol (21 kriter — önceki analizde +3, -1 ile 20'ye ayarlandı)
- Instagram (9 kriter — +1 save sayısı)
- TikTok (7 kriter — +1 paylaşım sayısı)
- Google Trends (5 kriter)
- Zara / H&M / Mango (5 kriter)

### EKSEN 2: TASARIM (Nasıl görünecek?)
- Pinterest (5 kriter)
- Kendi arşiv (kumaş + aksesuar sorgusu)

### EKSEN 3: ÜRETİM (Nasıl yapılacak?) — AYRI AŞAMA
- Kendi sistem (7 kriter)
- Tedarikçi (4 kriter)

### EKSEN 4: SATIŞ (Ne kadar sattı?)
- Trendyol Satıcı Paneli (8 kriter)
- Kendi Kasa/Sipariş (4 kriter)

---

## 11. YAPISAL EKSİKLER (HER İKİ KAYNAK SETİNDE DE YOK)

| # | Eksik | Neden Kritik |
|---|-------|-------------|
| 1 | **Güncelleme sıklığı** | Veriler ne sıklıkla toplanacak? Saatlik / günlük / haftalık? |
| 2 | **Eksenler arası karar eşiği** | TREND verisi hangi sayısal eşikte TASARIM'a geçer? |
| 3 | **Veri hacmi** | Günde kaç ürün, kaç kategori taranacak? |
| 4 | **Ajan iletişim protokolü** | 12 ajan birbirine nasıl veri aktarır? |
| 5 | **Hata kurtarma prosedürü** | Adım başarısız olunca ne olur? |
| 6 | **Donanım gerçekçiliği** | Llama + CLIP + 12 ajan → 32 GB yeter mi? (64 GB gerekebilir) |

---

## 12. KARAR BEKLENİLEN KONULAR

| # | Karar Konusu | Seçenekler |
|---|-------------|-----------|
| 1 | Günlük analiz hedefi | 100 / 200 / 300 ürün |
| 2 | Kategori önceliği | Kadın giyim / Elbise / Pantolon / Hepsi? |
| 3 | AI modeli | Sadece lokal / lokal + API fallback |
| 4 | Donanım | Mevcut PC / yeni sunucu / VPS |
| 5 | Mevcut kod sistemi (feature engineering) | Korunacak mı, sıfırdan mı? |
| 6 | Onay mekanizması | Her karar manuel / eşik üstü otomatik |
| 7 | Rakip izleme aktif mi? | Zara / H&M izlenecek mi? |
| 8 | Instagram erişim | Public sayfalar mı, hesap mı? |

---

## 13. SONUÇ

| Alan | Durum |
|------|-------|
| Stratejik vizyon | ✅ Güçlü — 4 eksen doğru |
| Veri seti | ✅ %95 tam — 38 veri tanımlı |
| Yasal model | ✅ Net — screenshot + analiz |
| Platform hiyerarşisi | ✅ Netleşti — Trendyol > Sosyal > Destek |
| TrendScore formülü | ⚠️ Tutarlı ama normalizasyon eksik |
| Ajan mimarisi | ✅ 12 ajan optimum |
| Teknik detaylar | ⚠️ Ajan iletişimi, hata kurtarma eksik |
| Karar mekanizması | ✅ 4 kademe (ÜRET/TEST/BEKLE/RED) |
| Test sistemi | ✅ 24h + 72h zorunlu |

**Net durum:** Stratejik plan %90 hazır. Bölüm 12'deki 8 karar verildiğinde → uygulama planı çıkarılabilir.
