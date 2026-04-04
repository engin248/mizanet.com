# KONU 17: YAPAY ZEKA OFİSİ MODÜLÜ
> Amaç: Sistemin eksiklerini bulmak, veri analiz etmek, öğrenmek, iyileştirme önerileri üretmek

---

## ANA GÖREVLER

| # | Görev | Açıklama |
|---|-------|----------|
| 1 | Satış Analizi | Hangi ürün satıyor, hangisi satmıyor |
| 2 | Üretim Verim Analizi | Hangi işlem yavaş, darboğaz nerede |
| 3 | Trend Analizi | Yeni ürün önerisi üretmek |
| 4 | Hata Analizi | Üretim hatalarını azaltmak |
| 5 | Maliyet Analizi | Maliyet optimizasyonu |
| 6 | Performans Analizi | İşçi ve bant performansı |
| 7 | Tahmin Modeli | Satış tahmini, trend tahmini |

---

## 7 ANA SEKME

### 1. SATIŞ ANALİZİ
| Soru |
|------|
| En çok satan ürün |
| En az satan ürün |
| Beden bazlı satış dağılımı |
| Renk bazlı satış dağılımı |
| Sezon bazlı satış trendi |
| İade oranı ve nedeni |

### 2. ÜRETİM VERİM ANALİZİ
| Soru |
|------|
| Bant verim oranı |
| İşlem bazlı darboğaz |
| Hatalı üretim oranı |
| Fire oranı trendi |
| Üretim süresi vs planlanan süre |

### 3. TREND ANALİZİ (OTOMATİK)
| Soru |
|------|
| Yükselen trendler |
| Düşen trendler |
| Rakip ürün değişimleri |
| Sosyal medya sinyal analizi |
| Yeni ürün önerisi |

### 4. HATA ANALİZİ
| Soru |
|------|
| En sık hata türü |
| Hata kaynağı (kumaş / kesim / dikim / kalip) |
| Hata maliyeti |
| Hata azaltma önerisi |

### 5. MALİYET OPTİMİZASYONU
| Soru |
|------|
| Kumaş maliyet trendi |
| İşçilik maliyet analizi |
| Fire maliyet etkisi |
| Alternatif tedarikçi önerisi |
| Kâr marjı analizi |

### 6. SİSTEM ÖĞRENME MEKANİZMASI
| Soru |
|------|
| Geçmiş başarılı modeller |
| Geçmiş başarısız modeller |
| Trend tahmin doğruluğu |
| Satış tahmin doğruluğu |
| Ağırlık güncellemesi (dynamicWeights) |

### 7. MODEL YÖNETİMİ
| Soru |
|------|
| Aktif AI modelleri |
| Model versiyon numarası |
| Model eğitim tarihi |
| Model doğruluk oranı |

---

## SİSTEM ÖĞRENME PLANI (3-6-9-12 AY)

| Dönem | Hedef |
|:-----:|-------|
| 0-3 ay | Veri toplama, baseline oluşturma |
| 3-6 ay | İlk tahmin modelleri, trend doğruluk ölçümü |
| 6-9 ay | Ağırlık optimizasyonu, öneri sistemi devreye |
| 9-12 ay | Tam otonom öneri, kendini düzelten sistem |

---

## FEEDBACK LOOP

```
Satış verisi → AI analiz → Trend skoru güncelleme
Üretim verisi → Verim analizi → İşlem optimizasyonu
Hata verisi → Hata analizi → Kalite iyileştirme
Maliyet verisi → Maliyet analizi → Tedarik optimizasyonu
↓
Araştırma modülüne geri besleme (yeni ürün önerisi)
```

---

## TEKNOLOJİ

| Araç | Kullanım |
|------|----------|
| CatBoost / scikit-learn | Tahmin modelleri |
| CLIP (OpenAI) | Görsel trend eşleştirme |
| distilbert | Yorum sentiment analizi |
| Llama 3 / Mistral | Genel analiz |
| Redis | dynamicWeights saklama |
| PostgreSQL | Veri depolama |

---

## VERİTABANI TABLOLARI
```
ai_analizler
ai_modeller
ai_egitimler
ai_oneriler
ai_performanslar
trend_scorelari
dynamic_weights
```

---

## KRİTİK KURALLAR
- AI tek başına karar VERMEZ — önerir
- Karar mekanizmasında LLM devre dışı → matematik + Zod
- Model doğruluk oranı %70'in altına düşerse uyarı
- Her AI önerisi kanıtla desteklenir
