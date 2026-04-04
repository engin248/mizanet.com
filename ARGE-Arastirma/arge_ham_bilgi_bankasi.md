# AR-GE İSTİHBARAT SİSTEMİ — HAM BİLGİ BANKASI
> Kaynak: Kullanıcının paylaştığı 6+ analiz ve çalışma dokümanı
> Amaç: Karşılaştırma ve analiz için ham bilgilerin düzenli kaydı
> Durum: KAYIT — Henüz analiz/karar yok

---

## 1. İŞLETME BAĞLAMI

- **Sektör**: Tekstil / kadın giyim üretimi
- **Platform**: Mizanet.com (ERP sistemi mevcut, Next.js + Supabase)
- **Mevcut ajan sistemi**: 7 ajan (`ajanlar-v2.js` → artık modüler ayrıştırıldı)
- **Hedef**: Trend → Tasarım → Üretim → Satış zincirini veri/analiz ile yönetmek
- **Kısıt**: İşletmeye minimum finans yükü, yasal veri toplama

---

## 2. VERİ KAYNAKLARI (TÜM DOKÜMANLARDAN BİRLEŞTİRİLMİŞ)

### 2.1 E-Ticaret Platformları
| Platform | Toplanacak Veri | Kaynak Doküman |
|----------|----------------|----------------|
| Trendyol | 18 kriter (ürün adı, fiyat, indirim, yorum analizi, satış adedi, favoriler, renk performansı, beden, kargo, trend rozeti, rekabet) | Veri Toplama Mimarisi |
| Amazon | fiyat, yorum, satış sinyali | Operasyon Yol Haritası |
| Zara | yeni koleksiyon, fiyat, renk, materyal, indirim | Veri Toplama Mimarisi |
| Shein | fiyat, model, trend | Operasyon Yol Haritası |
| H&M | koleksiyon, fiyat | Veri Toplama Mimarisi |
| ASOS | fiyat, model | ChatGPT analizi |

### 2.2 Sosyal Medya
| Platform | Toplanacak Veri |
|----------|----------------|
| Instagram | hashtag kullanımı, 24 saat artış, en çok beğeni, video izlenme, ürün etiketleri, influencer |
| TikTok | izlenme, beğeni/yorum oranı, viral ses, review video sayısı |
| Pinterest | trend board renk paleti, en çok kaydedilen desen, siluet trendi, sezon rengi |

### 2.3 Diğer Kaynaklar
| Kaynak | Veri |
|--------|------|
| Google Trends | arama hacmi, trend yönü, coğrafi yoğunluk, ilgili aramalar, sezon deseni |
| Moda Raporları | moda haftaları, WGSN, Vogue, Pantone |
| Kendi Sistemimiz | üretim durumu, stok, personel, kasa, siparişler |
| Trendyol Satıcı Panelimiz | günlük sipariş/ciro, iade oranı, en çok satan, reklam ROI |

---

## 3. TRENDYOL 18 KRİTER (TAM LİSTE — Veri Toplama Mimarisi'nden)

1. Ürün adı
2. Marka / satıcı
3. Fiyat (güncel)
4. İndirim oranı
5. Değerlendirme puanı
6. Gelişmiş Yorum Analizi:
   - a. Toplam yorum sayısı
   - b. Fotoğraflı yorum sayısı
   - c. 5 yıldızlı yorum oranı
   - d. 1-2 yıldızlı yorum temaları (anahtar kelimeler)
7. Satış adedi
8. Favoriye ekleme / beğeni sayısı
9. Ana kategori + alt kategori
10. Kumaş / materyal içeriği
11. Renkler arası performans (favori renk, renk bazlı şikayet)
12. Beden seçenekleri + tükenen bedenler
13. Kargo hızı
14. Trend etiketi/rozeti
15. Benzer ürün sayısı (rekabet havuzu)
16. Ürün fotoğrafı (URL)
17. Ürün açıklaması (ilk 300 karakter)
18. İade politikası gizli ibareleri

---

## 4. AJAN SAYISI ÖNERİLERİ (DOKÜMAN KARŞILAŞTIRMASI)

| Doküman | Ajan Sayısı | Katman |
|---------|:-----------:|--------|
| İlk 3 Kişilik Tim planı | 3 | İstihbarat, Analist, Stratejist |
| ChatGPT ilk analiz | 8 | 7 AI + 1 Koordinatör |
| 10 Kişilik Süper Tim | 10 | 3 daire (4+3+3) |
| Operasyon Yol Haritası | 12 | 4 VT + 3 ÜT + 3 Analiz + 2 Risk/Karar |
| 20 Ajanlı Tam Sistem | 20 | 6 katman |
| Düşük Maliyet Optimum | 8-12 | Çok görevli ajanlar |

---

## 5. TREND SKOR FORMÜLÜ (TÜM KAYNAKLARDA AYNI)

```
TrendScore = 
  (SatışBüyümesi × 0.35) +
  (SosyalMedyaBüyümesi × 0.30) +
  (RakipKullanım × 0.20) +
  (SezonUyumu × 0.15)
```

### Fırsat Skoru
```
FırsatScore = TrendScore + KârMarjı − RiskScore
```

### Karar Tablosu
| Skor | Karar |
|:----:|-------|
| 85-100 | ÜRET |
| 70-85 | TEST |
| 50-70 | BEKLE/İZLE |
| 0-50 | RED |

---

## 6. TREND ÖMRÜ SINIFLANDIRMASI

| Tip | Süre |
|-----|------|
| Mikro trend | 1-3 ay |
| Orta trend | 6-12 ay |
| Mega trend | 2-5 yıl |

---

## 7. VERİ MODELİ (TÜM DOKÜMANLARDAN BİRLEŞİK)

Her ürün kaydı için minimum veri:
- ürün tipi / kategori
- kumaş / materyal
- renk / desen
- fiyat aralığı
- satış artışı
- sosyal medya büyümesi
- yorum sayısı / kalitesi
- trend skoru
- risk skoru
- kaynak platform
- timestamp

---

## 8. SİSTEM AKIŞI (TÜM DOKÜMANLARDAN ORTAK)

```
1. Veri topla (kamuya açık, yasal)
2. Veri temizle (duplicate, null, outlier)
3. Ürün tanımla (kategori, kumaş, stil)
4. Feature üret (40+ özellik)
5. Trend skor hesapla
6. Sosyal + rekabet analizi ekle
7. Müşteri analizi (yorum NLP)
8. Maliyet hesapla
9. Üretim uygunluk analizi
10. Risk hesapla
11. Fırsat skoru hesapla
12. Karar üret (ÜRET/TEST/BEKLE/RED)
13. Üretime gönder
14. Satış takibi
15. Feedback → model güncelle
```

---

## 9. YASAL VERİ POLİTİKASI (KESİN KURAL)

- ✅ Kamuya açık, gözle görülebilen bilgi
- ✅ Resmi ve izinli API'ler
- ✅ Kendi yüklediğimiz veri
- ❌ İzinsiz scraping / veri çekme
- ❌ Telifli içerik kopyalama
- ❌ Başkasının veritabanını çekme
- **Yöntem**: Sayfa analiz → özellik çıkarma → kendi beynimize kaydet

---

## 10. TEKNOLOJİ ÖNERİLERİ (DOKÜMANLARDAN)

| Alan | Teknoloji | Maliyet |
|------|-----------|---------|
| AI modeli | Llama / Mistral (lokal) | Ücretsiz |
| Görsel analiz | CLIP / YOLO | Ücretsiz |
| NLP | transformers (HuggingFace) | Ücretsiz |
| Veritabanı | PostgreSQL / Supabase | Ücretsiz/düşük |
| ML | CatBoost / scikit-learn | Ücretsiz |
| Backend | Python FastAPI veya Node.js | Ücretsiz |

### Donanım (tek bilgisayar)
- CPU: 8-16 core
- RAM: 32 GB
- SSD: 1 TB
- GPU: opsiyonel (RTX 3060+)

### Aylık maliyet hedefi: 0-50 USD

---

## 11. GÜNLÜK OPERASYON HEDEFLERİ

| Doküman | Ürün/Gün | Trend Raporu | Üretim Fırsatı |
|---------|:--------:|:------------:|:--------------:|
| Düşük maliyet | 100-200 | 10 | 3 |
| Orta | 200-300 | 20 | 5 |
| Tam sistem | 300-500 | 30 | 10 |

---

## 12. BAŞARI KRİTERLERİ (TÜM DOKÜMANLARDAN ORTAK)

- Yeni ürün başarı oranı: %20 → %65-70
- Stok riski: %40-50 azalma
- Trend tahmin doğruluğu: ≥ %75
- Yanlış üretim oranı: ≤ %20
- Veri birikimi: minimum 6-12 ay sonra tahmin başlar

---

## 13. MİZANET MEVCUT SİSTEM DURUMU

- **Platform**: Next.js 15 + Supabase
- **Mevcut 7 ajan**: sabahSubayi, aksamci, nabiz, zincirci, finansKalkani, trendKasifi, muhasebeYazici
- **Mevcut trendKasifi**: Perplexity API ile basit trend araştırma (demo mod)
- **Mevcut tablolar**: b1_arge_trendler, b2_urun_katalogu, b1_uretim_kayitlari, b2_kasa_hareketleri vb.
- **Build durumu**: Başarılı (exit code 0)

---

## 14. KRİTİK NOTLAR

1. **"Yaklaşma değil geçme"** hedefi var — Zara hızı + Shein veri gücünün ÜSTÜNDE
2. **Mevcut kod sistemi güçlü**: 40+ feature, ensemble trend, feedback loop — korunacak
3. **Üretim bağlantısı**: Çoğu rakipte yok, bizde olacak — EN BÜYÜK FARK
4. **Stop-loss**: 20 gün satış yoksa otomatik iptal
5. **Mikro test modeli**: 50 adet üret → 3 gün takip → başarılıysa büyüt

---

## 15. AÇIK SORULAR (HENÜZ CEVAPLANMAMIŞ)

1. Hangi kategoriler öncelikli? (kadın giyim / elbise / pantolon?)
2. Günde kaç ürüne bakılacak? (100? 300? 500?)
3. Kaç farklı kategoriye bakılacak?
4. Trendyol satıcı paneli verisi nasıl alınacak?
5. Instagram için hesap mı açılacak?
6. Rakip izleme yapılacak mı?
7. Proje yönetim paneli (Telegram + dosya bazlı görev) entegrasyonu nasıl olacak?
