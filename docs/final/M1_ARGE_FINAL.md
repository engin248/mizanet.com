# M1 — AR-GE & TREND ARAŞTIRMA MODÜLÜ
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** 8 dosya analiz edildi, en üst seviye bilgi çıkarıldı  
> **Kural:** "Kararı insan değil, veri verir."

---

## 1. MODÜL TANIMI

**Sayfa:** `/arge`  
**Dosya:** `src/features/arge/`  
**Amaç:** Satılacak ürünü insan tahminiyle değil; veri, bilgi ve analiz ile belirlemek. Dünyadaki internet ortamında araştırma yapabilecek kapasitede beceriye sahip bir sistem kurmak.

---

## 2. ANA GÖREV (8 Madde)

| # | Görev | Hedef |
|---|-------|-------|
| 1 | Dünya moda trendlerini analiz | Global trend haritası |
| 2 | Online satış sitelerinde en çok satılanları analiz | Satış verisi |
| 3 | Rakip markaların ürünlerini analiz | Rakip zekası |
| 4 | Sosyal medya moda trendlerini analiz | Z kuşağı tüketim |
| 5 | Kumaş ve malzeme trendlerini analiz | Malzeme yönü |
| 6 | Sezonluk satış trendlerini analiz | Zamanlama |
| 7 | Bölgesel müşteri tercihlerini analiz | Coğrafya segmentasyonu |
| 8 | Satış verilerine göre yeni ürün önerisi | İç veri zekası |

---

## 3. 10 ANA KRİTER

| # | Kriter | Açıklama |
|---|--------|----------|
| 1 | Trend Analizi | Moda trendlerini belirlemek |
| 2 | Online Satış Analizi | Hangi ürünlerin satıldığını görmek |
| 3 | Rakip Analizi | Rakiplerin sattığı ürünleri incelemek |
| 4 | Sosyal Medya Analizi | Instagram/TikTok moda trendleri |
| 5 | Kumaş Trend Analizi | Hangi kumaşların popüler olduğu |
| 6 | Fiyat Analizi | Pazar fiyatlarını görmek |
| 7 | Sezon Analizi | Sezonluk satış trendleri |
| 8 | Bölge Analizi | Ülkeler arası moda farkı |
| 9 | Ürün Kategorisi Analizi | T-shirt, elbise vb. |
| 10 | Satış Potansiyeli Analizi | En yüksek satış ihtimali |

---

## 4. TREND ANALİZİ KAYNAKLARI

| # | Kaynak | Yöntem |
|---|--------|--------|
| 1 | Google Arama Trendleri | Perplexity sonar modeli ile gerçek zamanlı |
| 2 | Pinterest Trends | Prompt mimarisi ile zorunlu endeks |
| 3 | Instagram Görselleri | AI görsel analiz + prompt |
| 4 | TikTok Videoları | Z kuşağı viral akım parse |
| 5 | Moda Haftası Raporları | Global akademik/magazin kazıma |
| 6 | Global Moda Raporları | Çok dilli NLP çevirme (%100) |

---

## 5. ONLINE SATIŞ ANALİZİ

### Hedef Siteler (8 adet — prompt'a sabitlenecek)
Amazon, Zara, H&M, Trendyol, Shopify mağazaları, Etsy, Alibaba, Aliexpress

### Toplanacak Veriler
1. En çok satan ürünler
2. En çok yorum alan ürünler
3. En yüksek puanlı ürünler
4. En hızlı tükenen ürünler
5. En çok görüntülenen ürünler

### Teknik Not
Perplexity/Sonar modeli makale bazlı genel trend çıkarır. E-ticaret net stok/satış verisi için Crawler (Apify/Playwright) gereklidir.

---

## 6. RAKİP ANALİZİ

| # | Toplanacak Veri |
|---|----------------|
| 1 | Rakip ürün sayısı |
| 2 | Rakip fiyatları |
| 3 | Rakip ürün kategorileri |
| 4 | Rakip kumaş tercihleri |
| 5 | Rakip model çeşitleri |
| 6 | Rakip satış sıklığı |

---

## 7. SOSYAL MEDYA PARSE EDİLECEK VERİLER

| # | Kaynak | Parse Edilecek |
|---|--------|---------------|
| 1 | Instagram | Trend model, renk, kumaş, kesim, kombin |
| 2 | TikTok | Viral akım, görüntülenme, kaydetme oranı |
| 3 | Pinterest | Tasarım fikirleri, pin revaç analizi |
| 4 | YouTube | Moda kanalı trend analizi |

---

## 8. KUMAŞ VE MALZEME ANALİZİ

| # | Veri |
|---|------|
| 1 | Kumaş türleri |
| 2 | Kumaş renkleri |
| 3 | Kumaş dokuları |
| 4 | Aksesuar trendleri — düğme |
| 5 | Aksesuar trendleri — fermuar |
| 6 | Aksesuar trendleri — baskı |

---

## 9. SEZON VE BÖLGE ANALİZİ

### Sezonlar (4 ayrı parametre)
Yaz, Kış, Bahar, Sonbahar → her biri ayrı aranacak

### Bölgeler (5 coğrafya)
1. Avrupa müşteri tercihleri
2. Amerika müşteri tercihleri
3. Türkiye müşteri tercihleri
4. Orta Doğu müşteri tercihleri
5. Asya müşteri tercihleri

### UI Gereksinimi
Dropdown/seçenek kutusu ile bölge ve sezon seçimi (hardcoded değil)

---

## 10. KATEGORİ VE SATIŞ POTANSİYELİ

### Ürün Kategorileri
T-shirt, Sweatshirt, Hoodie, Elbise, Pantolon, Ceket, Gömlek

### Satış Potansiyeli Metrikleri
| # | Metrik |
|---|--------|
| 1 | Satış hacmi (tahmini pazar büyüklüğü) |
| 2 | Fiyat aralığı (min-max) |
| 3 | Rekabet seviyesi (Kızıl Deniz / Mavi Okyanus) |
| 4 | Üretim maliyeti tahmini |
| 5 | Kâr marjı öngörüsü |

---

## 11. HERMEZ 8-SİNYAL KARAR MOTORU

| # | Sinyal | Ağırlık | Bingo Eşiği |
|---|--------|---------|-------------|
| 1 | DÖNÜŞÜM | %35 | İzlenme/Sepet Oranı > %2 |
| 2 | TALEP | %20 | Favori/Yorum Delta > %50 (48s) |
| 3 | VİRAL | %15 | Klonlanma > 3 hesap |
| 4 | REKABET | %10 | İlk sayfa doygunluk < %80 |
| 5 | YORUM | %10 | "Tekrar Aldım" sinyali |
| 6 | ZAMAN | %5 | Tırmanış fazında |
| 7 | RİSK | -%20 | İade şikayeti > %20 → puan düşürülür |
| 8 | SEZON | %5 | Mevsimsel uyum |

**BİNGO ŞARTI:** 8 kriter tamamı YEŞİL → "KESİME GİR" emri M5'e otomatik gider.

---

## 12. DOĞRULUK ORANLARI

| Veri Kaynağı | Doğruluk Katkısı |
|-------------|-----------------|
| E-ticaret verisi | %30 |
| Sosyal medya trendi | %20 |
| Rakip analizi | %20 |
| Trend platformları | %20 |
| Satış geçmişi | %10 |
| **Toplam** | **%80-90 doğru ürün tahmini** |

---

## 13. VERİTABANI TABLOLARI

| Tablo | Amaç | Durum |
|-------|------|-------|
| `b1_arge_trendler` | Ana trend verileri | ✅ Aktif |
| `b1_istihbarat_ham` | Ham istihbarat | ⏳ Planlandı |
| `b1_analiz_kulucka` | Kuluçka analiz | ⏳ Planlandı |
| `b1_arge_nizam_karar` | Nihai karar | ⏳ Planlandı |
| `b1_arge_model_arsivi` | Model arşivi | ❌ Kurulmadı |
| `b1_arge_rakip_arsivi` | Rakip arşivi | ❌ Kurulmadı |
| `b1_arge_kumas_arsivi` | Kumaş arşivi | ❌ Kurulmadı |
| `b1_arge_aksesuar_arsivi` | Aksesuar arşivi | ❌ Kurulmadı |
| `b1_arge_notlar_arsivi` | Not arşivi | ❌ Kurulmadı |
| `b1_arge_referans_gorsel_arsivi` | Görsel arşivi | ✅ Storage aktif |

---

## 14. MODÜL ÇIKTISI (Onaylandığında M2'ye Düşecek 6 Veri)

| # | Çıktı | Zorunlu |
|---|-------|---------|
| 1 | Satılacak ürün | ✅ |
| 2 | Model türü | ✅ |
| 3 | Kumaş türü | ✅ |
| 4 | Aksesuar türü | ✅ |
| 5 | Fiyat aralığı | ✅ |
| 6 | Hedef müşteri | ✅ |

---

## 15. ARAYÜZ YAPISI

### Sayfa Düzeni
- **Sol Panel:** Trend Analizi, Rakip Analizi, Pazar Analizi
- **Ana Panel:** Araştırma + Sonuç Gösterimi
- **Sağ Panel:** Trend puanı, satış ihtimali, Bingo durumu

### Arama Konsolu
Kullanıcı "Ara" tuşuna bastığında yükleme konsolu:
```
Google Trends taranıyor... ✅
Pinterest çekiliyor... ✅
AI Görsel Analiz devrede... ⏳
Satış Verileri okunuyor... ⏳
```

### Sonuç Ekranı — 6 Kutu (Föy)
| Kutu | Örnek İçerik |
|------|-------------|
| 1. Satılacak Ürün | "Baggy Pantolon" |
| 2. Model Türü | "Kargo cepli, geniş paça" |
| 3. Kumaş Türü | "Paraşüt kumaşı / Gabardin" |
| 4. Aksesuar Türü | "Nikel fermuar, plastik stoper" |
| 5. Fiyat Aralığı | "850 - 1200 TL" |
| 6. Hedef Müşteri | "Avrupa Z kuşağı" |

### Onay Mekanizması
"ÜRETİM EMRİ (TASARIMI ONAYLA)" butonu → 7 arşive fiş → M2'ye bilet düşer

---

## 16. 7 ARŞİV

| # | Arşiv |
|---|-------|
| 1 | Trend arşivi |
| 2 | Model arşivi |
| 3 | Rakip ürün arşivi |
| 4 | Kumaş arşivi |
| 5 | Aksesuar arşivi |
| 6 | Araştırma notları |
| 7 | Referans görsel arşivi |

---

## 17. TELİF KORUMA

- Ham veri (başkasının telifli fotoğrafı) sistemde kaydedilmez
- Görsel analiz → teknik öznitelik çıkarılır → Generative AI ile orijinal Mizanet modeli çizilir
- Tüm tasarım ve veri Mizanet'e ait orijinal varlıklara dönüşür

---

## 18. VERİ PAYLAŞIMI

| Hedef Modül | Paylaşılan |
|-------------|-----------|
| M2 Modelhane | Onaylanan trend föyü |
| M3 Kumaş | Kumaş trend verisi |
| Tasarım | Tasarım briefi |
| Karargah | Genel durum/alarm |

---

## 19. TEKNOLOJİ

### Mevcut
| Teknoloji | Kullanım |
|-----------|----------|
| Perplexity Sonar API | Dış web kazıma |
| Google Trends | Ücretsiz trend |
| Pinterest Trends | Tasarım fikirleri |

### Gerekli (Henüz Kodlanmadı)
| Teknoloji | Amaç | Maliyet |
|-----------|------|---------|
| WGSN | Moda trend analizi | 2.000-5.000$/ay |
| Trendalytics | Satış trend | 500-1.500$/ay |
| Stylumia | Talep tahmini | 800-2.000$/ay |
| Heuritech | Görsel trend | Talep bazlı |
| Apify/Playwright | E-ticaret crawler | 50-200$/ay |

---

## 20. MEVCUT DURUM (Dürüst Rapor)

### ✅ Çalışan
- Perplexity ile global trend arama
- Sosyal medya endeksleme (prompt içinde)
- Talep skoru (1-10 puanlama)
- Sezon filtresi (2025-2026)
- PIN kalkanı + mükerrerlik radarı
- M2'ye geçiş butonu
- Storage bucket (arge_gorselleri)

### ❌ Eksik
- Rakip otonom izleme botu
- Kumaş/malzeme parse (JSON şeması)
- Bölge segmentasyonu (dropdown)
- İç veri zekası (fabrika satış geçmişi)
- E-ticaret crawler (Apify)
- Fiyat sütunu (UI'da yok)
- AI görsel analiz (Vision)
- 6 arşiv tablosu (DB'de yok)

---

## 21. SENTEZ: BOT MİMARİSİ NİHAİ KARARLARI
> **Kaynak:** KONSOLIDE_MASTER_ARSIV/SENTEZ_01_ARGE_EN_UST_DOGRU_HAREKAT_PLANI.md

### Bot Dağıtımı (Nihai)
- 12 Bot, Mizanet sunucusunda YAŞAMAYACAK
- Her biri dışarıda (Edge/Node.js) kurulup, Karargâh'a Webhook API ile veri Push edecek
- **Ban Zırhı:** Residential Proxy (Ev İPleri) zorunlu — sunucu IP'leri 15dk'da tespit edilir

### Bot Görev Dağılımı
| Bot | Görev |
|-----|-------|
| Bot-1 (TikTok/Reels) | Bounce süresi, trend yorumu, Hook saniyesi |
| Bot-2 (Trendyol) | Sepet bırakma deltası, Son 3 Ürün alarmı, 299TL altı rekabet |
| Bot-3 (Global Pinterest/Google) | Micro-season renk ve kesim hacmi |
| Süzgeç Botu (Zod Bekçisi) | Sahte beğeni, bot saldırısı şişen veriyi çöpe atar |

### AI Karar Motoru (HERMAİA) Nihai
- Gemini/GPT hiçbir zaman "ÜRET" veya "RED" DİYEMEZ — sadece tercüman
- **Asıl mühür:** 138 Kriterli Matrix → SQL şartı olarak kodlanacak (Kâr marjı < %30 → DUR)
- **Self-Tuning:** pgvector ile çarpanlar otomatik güncelleme → 5 yıl sonra devasa akıl

### Arayüz Kilidi
- WebSocket ile canlı veri (sayfa yenilenmeden)
- "M3 İmalata Aktar" butonu → DAİMA PASİF → fiziksel kanıt + M2 Numune ONAYI gerekli

---

## 22. SENTEZ: ZARA/SHEİN STRATEJİSİ
> **Kaynak:** KONSOLIDE_MASTER_ARSIV/SENTEZ_02_MEVCUT_DURUM_VE_ZARA_SHEIN_HEDEFI.md

### Korunacak Mevcut Güç
- ✅ 40+ Feature Mühendisliği
- ✅ Ensemble Model (Trend/İvme)
- ✅ 4 Mekanizmalı Feedback Loop
- ✅ Momentum, Growth, Velocity Çarpanları

### 4 Altın Strateji
1. **Görsel Mimari:** Klasik veri kazıma yerine Screenshot → Vision AI (bot çökmesini engeller)
2. **Hibrit Maliyet:** %80 ucuz bot + %20 pahalı AI (sadece final kontrol)
3. **Saldırı Stratejisi:** Kopyalama DEĞİL → rakibin şikayetlerini fırsata çevirme
4. **Mikro Test (SHEIN):** Tek tıkla yüksek üretim YOK → önce 50 adet → 3 gün izle → kararı ver

### Ana Hedef Denklemi
```
[ZARA Hızı (Haftalık)] + [SHEIN Veri Gücü (10.000/Gün)] + [ÖĞRENEN ALGORİTMA] + [MİZANET ÜRETİM ZEKASI]
= Sıfır İnisiyatifli Küresel Otonom ERP
```

---

## 23. TRENDYOL 18 KRİTER
> **Kaynak:** konu_04_veri_kaynaklari.md

| # | Kriter |
|---|--------|
| 1 | Ürün adı |
| 2 | Marka/satıcı |
| 3 | Fiyat (güncel) |
| 4 | İndirim oranı |
| 5 | Değerlendirme puanı |
| 6 | Gelişmiş yorum analizi (toplam, fotoğraflı, 5 yıldız oranı, 1-2 yıldız temaları) |
| 7 | Satış adedi |
| 8 | Favoriye ekleme/beğeni |
| 9 | Ana+alt kategori |
| 10 | Kumaş/materyal |
| 11 | Renkler arası performans |
| 12 | Beden seçenekleri + tükenen bedenler |
| 13 | Kargo hızı |
| 14 | Trend rozeti |
| 15 | Benzer ürün sayısı (rekabet) |
| 16 | Ürün fotoğrafı (URL) |
| 17 | Ürün açıklaması (ilk 300 karakter) |
| 18 | İade politikası gizli ibareleri |

---

## 24. 75 SORU ÇERÇEVESİ (15 Kategori × 5 Soru)
> **Kaynak:** konu_04_veri_kaynaklari.md

| # | Kategori |
|---|----------|
| 1 | Trend tespiti |
| 2 | Satış doğrulama |
| 3 | Trend+satış kesişimi |
| 4 | Ürün model analizi |
| 5 | Renk & görsel |
| 6 | Kumaş & malzeme |
| 7 | Fiyat analizi |
| 8 | Müşteri analizi |
| 9 | Rekabet analizi |
| 10 | Satmama sebebi |
| 11 | Fırsat analizi |
| 12 | Zaman analizi |
| 13 | Model üretim kararı |
| 14 | Birleştirme |
| 15 | Son karar |

---

## 25. KESİŞİM MODELİ (Ana Karar)
> **Kaynak:** konu_04_veri_kaynaklari.md

```
DÜN TREND + BUGÜN TREND → ortak ne?
DÜN SATAN + BUGÜN SATAN → ortak ne?
İki ortağın kesişimi → SATILABİLİR ÜRÜN
```

**Ana Karar Formülü:**
```
Trend + Satış + Süreklilik + Fırsat = ÜRET
```

---

> **Bu dosya Mizanet ARGE modülünün EN ÜST SEVİYE referansıdır.**  
> **Versiyon:** FINAL 3.0 | **Kaynak sayısı:** 12+ dosya
> **25 bölüm — tüm eksikler tamamlandı.**
