# TASARIM + KALIP + NUMUNE + TEKNİK FÖY MODÜLÜ

> Araştırma çıktısından satılabilir ürünü tasarlayıp üretime hazır hale getirmek.

---

## BÖLÜM 1: TASARIM MODÜLÜ

### Mimari Özet

| Özellik | Değer |
|---------|-------|
| Ana Sekme | 15 |
| Alt Sekme | 42 |
| Toplam Soru | 52 |
| DB Tablosu | 9 |

### 1. Trend → Model Eşleştirme

**Alt sekmeler:** Trend seçimi, referans model, hedef müşteri

| Soru |
|------|
| Trend kaynağı |
| Referans model |
| Model kategorisi |
| Hedef müşteri |
| Sezon |

### 2. Model Tanımlama

**Alt sekmeler:** Model bilgisi, kategori, stil, sezon, hedef pazar, fiyat segmenti

| Soru |
|------|
| Model adı |
| Model kodu |
| Ürün kategorisi |
| Stil türü |
| Sezon |
| Hedef müşteri |
| Hedef satış fiyatı |
| Tahmini üretim maliyeti |

### 3. Model Versiyon Yönetimi

**Alt sekmeler:** Versiyon no, geçmiş, değişiklik nedeni

| Soru |
|------|
| Model versiyon numarası |
| Değişiklik tarihi |
| Değişiklik açıklaması |
| Önceki versiyon |

### 4. Parça Yapı Analizi

**Alt sekmeler:** Parça listesi, sayısı, ilişkileri, görselleri

| Soru |
|------|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri |
| Parça birleşme sırası |
| Parça türü |

### 5. Ölçü Tablosu

**Alt sekmeler:** Ölçü tablosu, beden serisi, tolerans

| Soru |
|------|
| Ana beden |
| Beden aralığı |
| Ölçü toleransı |

### 6. Kalıp Sistemi

**Alt sekmeler:** Kalıp dosyası, versiyonu, sorumlusu

| Soru |
|------|
| Kalıp türü |
| Kalıp versiyonu |
| Kalıp ölçüsü |
| Kalıp tarihi |

### 7. Kumaş ve Malzeme Seçimi

**Alt sekmeler:** Kumaş, aksesuar, malzeme listesi, tedarikçi, alternatif

| Soru |
|------|
| Kumaş türü / kodu / gramaj / renk |
| Aksesuar türü / kodu |
| Tedarikçi |
| Alternatif kumaş |
| Alternatif aksesuar |

### 8. Tüketim Analizi

**Alt sekmeler:** Kumaş tüketimi, aksesuar tüketimi, fire

| Soru |
|------|
| Kumaş tüketim miktarı |
| Aksesuar tüketimi |
| Fire oranı |

### 9. Görsel Tasarım

**Alt sekmeler:** Çizim, 3D model, referans foto, teknik not

| Soru |
|------|
| Model çizimi var mı |
| Referans foto var mı |
| 3D model var mı |
| Model açıklaması |

### 10. Numune Planlama

| Soru |
|------|
| Numune üretim tarihi |
| Numune sorumlusu |
| Numune üretim süresi |
| Numune maliyeti |

### 11. Numune Test Analizi

| Soru |
|------|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |

### 12. Teknik Föy Hazırlık

| Soru |
|------|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

### 13. Üretim Fizibilite Analizi

| Soru |
|------|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |

### 14. Tasarım Onay Süreci

| Soru |
|------|
| Tasarım onaylandı mı |
| Kesim onayı verildi mi |
| Üretim onayı verildi mi |

### 15. Tasarım Arşivi

| Soru |
|------|
| Model satış başarısı |
| Model performansı |
| Tasarım notları |

### Tasarım DB Tabloları

`models`, `model_parts`, `model_materials`, `model_accessories`, `model_images`, `model_versions`, `model_notes`, `model_sizes`, `model_approvals`

---

## BÖLÜM 2: KALIP + NUMUNE + TEKNİK FÖY MODÜLÜ

### Mimari Özet

| Özellik | Değer |
|---------|-------|
| Ana Sekme | 14 |
| Alt Sekme | 45 |
| Toplam Soru | 55+ |
| DB Tablosu | 13 |

### 1. Kalıp Oluşturma

**Alt sekmeler:** Kalıp bilgisi, dosyası, ölçü sistemi, sorumlusu

| Soru |
|------|
| Kalıp adı / kodu / versiyonu |
| Kalıp sorumlusu |
| Kalıp oluşturma tarihi |
| Kalıp yazılımı (CLO / Gerber / Optitex) |

### 2. Kalıp Parça Yapısı

| Soru |
|------|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri / ölçüleri |
| Parça birleşme sırası |
| Parça tipi (ana / yardımcı) |

### 3. Beden Serisi (Grading)

| Soru |
|------|
| Ana beden |
| Beden aralığı |
| Ölçü büyüme oranı |
| Ölçü toleransı |

### 4. Kumaş Tüketim Hesabı

| Soru |
|------|
| Kumaş tüketimi (metre) |
| Aksesuar tüketimi |
| Tahmini fire oranı |
| Kumaş yerleşim planı |

### 5. Marker Planlama (Kesim Hazırlık)

| Soru |
|------|
| Kumaş eni |
| Marker uzunluğu |
| Marker verim oranı |
| Parça yerleşimi |

### 6. Numune Üretimi

| Soru |
|------|
| Numune üretim tarihi / sorumlusu |
| Numune üretim süresi / maliyeti |

### 7. Numune Test Analizi

| Soru |
|------|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |
| Numune onay durumu |

### 8. Numune Revizyon Sistemi

| Soru |
|------|
| Revizyon nedeni / tarihi |
| Revizyon sorumlusu |
| Revizyon açıklaması |

### 9. Teknik Föy (Tech Pack)

| Soru |
|------|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

**Kural:** Her işlem video + ses + görsel + yazılı anlatımla kayıt edilir. İnisiyatif sıfır.

### 10. Üretim Fizibilite

| Soru |
|------|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |
| İşçilik süresi |

### 11. Kalite Standartları

| Soru |
|------|
| Dikiş toleransı |
| Ölçü toleransı |
| Görsel kalite kriterleri |
| Paketleme standardı |

### 12. Üretim Talimatı

| Soru |
|------|
| İşlem sırası |
| Kullanılacak makine |
| Operatör beceri seviyesi |
| Operasyon süresi |

### 13. Teknik Föy Medya Arşivi

| Soru |
|------|
| İşlem fotoğrafı var mı |
| İşlem videosu var mı |
| Referans görsel var mı |

### 14. Modül Çıktısı

- Kalıp dosyası
- Beden serisi
- Marker planı
- Numune onayı
- Teknik föy
- Üretim talimatı

### KALIP + NUMUNE DB Tabloları

`patterns`, `pattern_parts`, `pattern_sizes`, `pattern_consumption`, `markers`, `samples`, `sample_tests`, `sample_revisions`, `techpacks`, `operations`, `operation_media`, `production_feasibility`, `quality_standards`

### Teknoloji

- CAD yazılımı (Gerber / Optitex / CLO)
- Veritabanı (PostgreSQL / Supabase)
- Medya depolama (S3 uyumlu)
- Video arşiv sistemi
- İş akışı motoru

---

## GENEL AKIŞ

```
Araştırma → Tasarım → Kalıp → Numune → Teknik Föy → Kesim → Üretim → Mağaza → AI Analiz
```
