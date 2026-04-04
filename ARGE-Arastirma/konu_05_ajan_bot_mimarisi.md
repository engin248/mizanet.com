# KONU 5: AJAN / BOT MİMARİSİ VE TEKNOLOJİ
> Amaç: Sistem bileşenleri, teknoloji seçimleri, bot/agent ayrımı

---

## BOT vs AGENT AYRIMI

| Tip | Görev | Çalışma Şekli |
|-----|-------|---------------|
| **BOT** (Deterministik) | Veri alma (API), temizleme, pipeline çalıştırma | Kural tabanlı, sabit |
| **AGENT** (AI Karar) | Trend analizi, yorum analizi, risk analizi, karar önerisi | AI destekli, öğrenen |

---

## HİBRİT BOT MİMARİSİ

- **%80** → JSON/API botları (yapılandırılmış veri, hızlı, düşük maliyet)
- **%20** → Visual AI botları (kritik görsel kontrol, sadece son aşama)

> AI sürekli kullanılmaz → maliyet düşer

---

## AJAN SAYISI MODELLERİ

| Model | Ajan | Açıklama |
|-------|:----:|----------|
| Minimum (düşük maliyet) | 8 | Çok görevli ajanlar |
| Optimum | 12 | 4 veri + 3 tanıma + 3 analiz + 2 karar |
| Tam sistem | 20 | 6 katmanlı, her görev ayrı |

### 12 Ajan Optimum Model (Önerilen)
| # | Ajan | Görevi |
|---|------|--------|
| 1 | Sosyal Trend Tarayıcı | TikTok/IG/Pinterest — viral, hashtag |
| 2 | E-Ticaret Tarayıcı | Trendyol/Amazon/Zara — fiyat, satış |
| 3 | Rakip Koleksiyon İzleyici | Yeni ürün, koleksiyon değişimi |
| 4 | Görsel Analiz | Siluet, kesim, dikiş, stil |
| 5 | Ürün Kimliği Tanımlayıcı | Kategori, ürün tipi, stil |
| 6 | Kumaş Analizi | Tür, gramaj, elastan |
| 7 | Stil & Renk Analizi | Sezon uyumu, desen, renk trendi |
| 8 | Trend Skor Motoru | TrendScore hesaplama |
| 9 | Talep Tahmini | Satış potansiyeli, pazar büyüklüğü |
| 10 | Maliyet Tahmini | Kumaş + işçilik + satış fiyatı |
| 11 | Risk Analizi | Üretim/stok/sezon riski |
| 12 | Strateji Motoru | Üretilecek ürün + miktar |

---

## M1 BEYİN (KARAR MOTORU)

- 138 kriter → Zod + matematik
- **LLM karar mekanizmasından tamamen devre dışı**
- AI tek başına karar vermez → insan onaylar
- Çıktı: ÜRET / TEST / RED

### API Gateway
- Tek giriş noktası: `ingestAjanVerisi()`
- Zod filtre: kirli veri = RED
- Her bot `botId` ile izlenebilir

---

## TEKNOLOJİ STACK

### Yazılım
| Alan | Teknoloji |
|------|-----------|
| Backend | Python 3.11 + FastAPI |
| Veri tabanı | PostgreSQL 15 |
| ORM | Supabase |
| Kuyruk | Redis + RQ |
| Scraping | Playwright (browser otomasyon) |
| HTTP | httpx |
| Veri işleme | Pandas, NumPy |
| ML/Model | CatBoost, scikit-learn |
| Görsel analiz | CLIP (OpenAI), YOLO (PyTorch) |
| NLP (yorum) | transformers (distilbert-multilingual) |
| Zamanlayıcı | APScheduler |
| Log | structlog + logging |
| Validation | Zod (JS tarafı) |

### AI Modelleri (Düşük Maliyet)
| Model | Kullanım |
|-------|----------|
| Llama 3 | Genel analiz, metin |
| Mistral | Kod, analiz |
| CLIP | Görsel→metin eşleştirme |
| YOLO | Nesne tanıma |
| distilbert | Yorum sentiment analizi |

---

## DONANIM (Tek Bilgisayar)

| Bileşen | Minimum |
|---------|---------|
| CPU | 8-16 core |
| RAM | 32 GB |
| SSD | 1 TB |
| GPU | Opsiyonel (RTX 3060+) |

---

## MALİYET MODELİ

| Kalem | Maliyet |
|-------|---------|
| Sunucu | Kendi PC → 0 |
| Veritabanı | PostgreSQL lokal / Supabase free → 0 |
| AI modeli | Açık kaynak (Llama/Mistral) → 0 |
| Otomasyon | Python/Node.js → 0 |
| **Aylık toplam** | **0-50 USD** |

---

## FEEDBACK LOOP (ÖĞRENME)

- Satış sonrası → model güncelleme
- `dynamicWeights` Redis'te saklanır
- Haftalık eşik yeniden hesaplanır
- Hata sonrası ağırlık cezalandırma
- 6-12 ay veri birikimi → tahmin doğruluğu ciddi artar

---

## STOP-LOSS MEKANİZMASI
- 20 gün satış yok → otomatik üretim iptal
- Satış düşükse → üretim azalt
- Kötü yorum artışı → trend kontrol
