# KALIP + NUMUNE + TEKNİK FÖY MODÜLÜ — TAM MİMARİ
> Oluşturulma: 4 Nisan 2026
> Amaç: Tasarım çıktısını üretilebilir ürüne dönüştürmek
> Kural: Üretimde inisiyatif bırakılmaz — her işlem sistemde tanımlı

---

## MODÜL AKIŞI

```
Tasarım → Kalıp → Numune → Numune Testi → Teknik Föy → Kesim → Üretim
```

---

## MODÜL ÖZET

| Başlık | Sayı |
|---|---|
| Ana Sekme | 14 |
| Alt Sekme | 46 |
| Toplam Soru | 58 |

---

## 1. KALIP OLUŞTURMA

**Alt Sekmeler:** kalıp bilgisi, kalıp dosyası, kalıp ölçü sistemi, kalıp sorumlusu

| Soru |
|---|
| Kalıp adı |
| Kalıp kodu |
| Kalıp versiyonu |
| Kalıp sorumlusu |
| Kalıp oluşturma tarihi |
| Kalıp yazılımı (CLO / Gerber / Optitex vb) |

---

## 2. KALIP PARÇA YAPISI

**Alt Sekmeler:** parça listesi, parça ölçüleri, parça ilişkileri, parça görselleri

| Soru |
|---|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri |
| Parça ölçüleri |
| Parça birleşme sırası |
| Parça tipi (ana/yardımcı) |

---

## 3. BEDEN SERİSİ (GRADING)

**Alt Sekmeler:** ana beden, beden aralığı, ölçü toleransı

| Soru |
|---|
| Ana beden |
| Beden aralığı (XS–XL) |
| Ölçü büyüme oranı |
| Ölçü toleransı |

---

## 4. KUMAŞ TÜKETİM HESABI

**Alt Sekmeler:** kumaş tüketimi, aksesuar tüketimi, fire oranı

| Soru |
|---|
| Kumaş tüketimi (metre) |
| Aksesuar tüketimi |
| Tahmini fire oranı |
| Kumaş yerleşim planı |

---

## 5. MARKER PLANLAMA (KESİM HAZIRLIK)

**Alt Sekmeler:** marker planı, kumaş eni, yerleşim planı

| Soru |
|---|
| Kumaş eni |
| Marker uzunluğu |
| Marker verim oranı |
| Parça yerleşimi |

---

## 6. NUMUNE ÜRETİMİ

**Alt Sekmeler:** numune üretim planı, numune sorumlusu, numune tarihi

| Soru |
|---|
| Numune üretim tarihi |
| Numune sorumlusu |
| Numune üretim süresi |
| Numune maliyeti |

---

## 7. NUMUNE TEST ANALİZİ

**Alt Sekmeler:** numune kalite, numune hata, numune iyileştirme

| Soru |
|---|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |
| Numune onay durumu |

---

## 8. NUMUNE REVİZYON SİSTEMİ

**Alt Sekmeler:** revizyon listesi, revizyon nedeni, revizyon tarihi

| Soru |
|---|
| Revizyon nedeni |
| Revizyon tarihi |
| Revizyon sorumlusu |
| Revizyon açıklaması |

---

## 9. TEKNİK FÖY (TECH PACK)

**Alt Sekmeler:** işlem listesi, işlem sırası, makine türü, işlem zorluk puanı, işlem videosu

| Soru |
|---|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

---

## 10. ÜRETİM FİZİBİLİTE ANALİZİ

**Alt Sekmeler:** üretim süresi, üretim maliyeti, üretim kapasitesi

| Soru |
|---|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |
| İşçilik süresi |

---

## 11. KALİTE STANDARTLARI

**Alt Sekmeler:** kalite kriterleri, kontrol noktaları, hata toleransı

| Soru |
|---|
| Dikiş toleransı |
| Ölçü toleransı |
| Görsel kalite kriterleri |
| Paketleme standardı |

---

## 12. ÜRETİM TALİMATI

**Alt Sekmeler:** iş akışı, operasyon sırası, makine listesi

| Soru |
|---|
| İşlem sırası |
| Kullanılacak makine |
| Operatör beceri seviyesi |
| Operasyon süresi |

---

## 13. TEKNİK FÖY MEDYA ARŞİVİ

**Alt Sekmeler:** işlem fotoğrafları, işlem videoları, referans görseller

| Soru |
|---|
| İşlem fotoğrafı var mı |
| İşlem videosu var mı |
| Referans görsel var mı |

---

## 14. TASARIM → ÜRETİM ONAY

**Alt Sekmeler:** tasarım onayı, kalıp onayı, numune onayı, üretim onayı

| Soru |
|---|
| Tasarım onaylandı mı |
| Kalıp onaylandı mı |
| Numune onaylandı mı |
| Üretim onayı verildi mi |

---

## VERİTABANI TABLOLARI

- patterns (kalıplar)
- pattern_parts (kalıp parçaları)
- pattern_sizes (beden serisi)
- pattern_consumption (tüketim)
- markers (marker planları)
- samples (numuneler)
- sample_tests (numune testleri)
- sample_revisions (numune revizyonları)
- techpacks (teknik föyler)
- operations (operasyonlar)
- operation_media (operasyon medya)
- production_feasibility (üretim fizibilite)
- quality_standards (kalite standartları)

---

## TEKNOLOJİ ALTYAPISI

- CAD kalıp yazılımı (Gerber / Optitex / CLO)
- Veritabanı (PostgreSQL / Supabase)
- Medya depolama (S3 uyumlu storage)
- Video arşiv sistemi
- İş akışı motoru
- Analiz sistemi

---

## MODÜL ÇIKTISI

1. Kalıp dosyası (DXF + ölçü)
2. Beden serisi
3. Marker planı
4. Numune onayı
5. Teknik föy (tam)
6. Üretim talimatı
7. Kalite standardı
8. İşlem video/ses/görsel arşivi
