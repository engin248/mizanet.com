# KONU 10: KALIP + NUMUNE + TEKNİK FÖY MODÜLÜ
> Amaç: Tasarım çıktısını üretilebilir ürüne dönüştürmek — kalıp doğruluğu, numune doğrulaması, eksiksiz teknik föy

---

## MODÜL AKIŞI
```
Tasarım → Kalıp → Numune → Numune Testi → Teknik Föy → Kesim → Üretim
```

---

## 14 ANA SEKME

### 1. KALIP OLUŞTURMA
**Alt Sekmeler**: Kalıp bilgisi, kalıp dosyası, kalıp ölçü sistemi, kalıp sorumlusu

| Soru |
|------|
| Kalıp adı / kodu |
| Kalıp versiyonu |
| Kalıp sorumlusu |
| Kalıp oluşturma tarihi |
| Kalıp yazılımı (CLO / Gerber / Optitex) |

### 2. KALIP PARÇA YAPISI
**Alt Sekmeler**: Parça listesi, ölçüler, ilişkiler, görseller

| Soru |
|------|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri |
| Parça ölçüleri |
| Parça birleşme sırası |
| Parça tipi (ana / yardımcı) |

### 3. BEDEN SERİSİ (GRADING)
**Alt Sekmeler**: Ana beden, beden aralığı, ölçü toleransı

| Soru |
|------|
| Ana beden |
| Beden aralığı |
| Ölçü büyüme oranı |
| Ölçü toleransı |

### 4. KUMAŞ TÜKETİM HESABI
**Alt Sekmeler**: Kumaş tüketimi, aksesuar tüketimi, fire oranı

| Soru |
|------|
| Kumaş tüketimi (metre) |
| Aksesuar tüketimi |
| Tahmini fire oranı |
| Kumaş yerleşim planı |

### 5. MARKER PLANLAMA (KESİM HAZIRLIK)
**Alt Sekmeler**: Marker planı, kumaş eni, yerleşim planı

| Soru |
|------|
| Kumaş eni |
| Marker uzunluğu |
| Marker verim oranı |
| Parça yerleşimi |

### 6. NUMUNE ÜRETİMİ
**Alt Sekmeler**: Numune üretim planı, sorumlu, tarih

| Soru |
|------|
| Numune üretim tarihi |
| Numune sorumlusu |
| Numune üretim süresi |
| Numune maliyeti |

### 7. NUMUNE TEST ANALİZİ
**Alt Sekmeler**: Numune kalite, hata, iyileştirme

| Soru |
|------|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |
| Numune onay durumu |

### 8. NUMUNE REVİZYON SİSTEMİ
**Alt Sekmeler**: Revizyon listesi, nedeni, tarihi

| Soru |
|------|
| Revizyon nedeni |
| Revizyon tarihi |
| Revizyon sorumlusu |
| Revizyon açıklaması |

### 9. TEKNİK FÖY (TECH PACK)
**Alt Sekmeler**: İşlem listesi, sıra, makine türü, zorluk puanı, işlem videosu

| Soru |
|------|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

### 10. ÜRETİM FİZİBİLİTE ANALİZİ
**Alt Sekmeler**: Üretim süresi, maliyet, kapasite

| Soru |
|------|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |
| İşçilik süresi |

### 11. KALİTE STANDARTLARI
**Alt Sekmeler**: Kalite kriterleri, kontrol noktaları, hata toleransı

| Soru |
|------|
| Dikiş toleransı |
| Ölçü toleransı |
| Görsel kalite kriterleri |
| Paketleme standardı |

### 12. ÜRETİM TALİMATI
**Alt Sekmeler**: İş akışı, operasyon sırası, makine listesi

| Soru |
|------|
| İşlem sırası |
| Kullanılacak makine |
| Operatör beceri seviyesi |
| Operasyon süresi |

### 13. TEKNİK FÖY MEDYA ARŞİVİ
**Alt Sekmeler**: İşlem fotoğrafları, videoları, referans görseller

| Soru |
|------|
| İşlem fotoğrafı var mı |
| İşlem videosu var mı |
| Referans görsel var mı |

### 14. MODÜL ÇIKTISI
- Kalıp dosyası (DXF)
- Beden serisi
- Marker planı
- Numune onayı
- Teknik föy (tech pack)
- Üretim talimatı
- Kalite standartları

---

## VERİTABANI TABLOLARI
```
patterns
pattern_parts
pattern_sizes
pattern_consumption
markers
samples
sample_tests
sample_revisions
techpacks
operations
operation_media
production_feasibility
quality_standards
```

---

## TEKNOLOJİ ALTYAPISI
- CAD kalıp yazılımı (Gerber / Optitex / CLO)
- Veritabanı (PostgreSQL / Supabase)
- Medya depolama (S3 uyumlu storage)
- Video arşiv sistemi
- İş akışı motoru
