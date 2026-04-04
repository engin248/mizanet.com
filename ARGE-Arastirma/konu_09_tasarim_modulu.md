# KONU 9: TASARIM MODÜLÜ (DETAYLI MİMARİ)
> Amaç: Araştırma çıktılarından satılacak ürünü net tasarıma dönüştürüp üretime hazır hale getirmek

---

## MODÜL ÇIKTISI
- Model tasarım dosyası
- Parça listesi
- Kumaş ve aksesuar listesi
- Ölçü tablosu + beden serisi
- Numune planı + test sonuçları
- Teknik Föy başlangıç verisi
- Üretim fizibilite analizi
- Onay kaydı

---

## 15 ANA SEKME

### 1. TREND → MODEL EŞLEŞTİRME
**Alt Sekmeler**: Trend seçimi, referans model, hedef müşteri

| Soru |
|------|
| Trend kaynağı nedir |
| Referans model var mı |
| Model kategorisi |
| Hedef müşteri |
| Sezon |

### 2. MODEL TANIMLAMA
**Alt Sekmeler**: Model bilgisi, ürün kategorisi, stil, sezon, hedef pazar, fiyat segmenti

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

### 3. MODEL VERSİYON YÖNETİMİ
**Alt Sekmeler**: Versiyon numarası, versiyon geçmişi, değişiklik nedeni

| Soru |
|------|
| Model versiyon numarası |
| Değişiklik tarihi |
| Değişiklik açıklaması |
| Önceki versiyon |

### 4. PARÇA YAPI ANALİZİ
**Alt Sekmeler**: Parça listesi, parça sayısı, parça ilişkisi, parça görselleri

| Soru |
|------|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri |
| Parça birleşme sırası |
| Parça türü |

### 5. ÖLÇÜ TABLOSU
**Alt Sekmeler**: Ölçü tablosu, beden serisi, ölçü toleransı

| Soru |
|------|
| Ana beden |
| Beden aralığı |
| Ölçü büyüme oranı |
| Ölçü toleransı |

### 6. KALIP SİSTEMİ
**Alt Sekmeler**: Kalıp dosyası, kalıp versiyonu, kalıp sorumlusu

| Soru |
|------|
| Kalıp türü |
| Kalıp versiyonu |
| Kalıp ölçüsü |
| Kalıp tarihi |

### 7. KUMAŞ VE MALZEME SEÇİMİ
**Alt Sekmeler**: Kumaş seçimi, aksesuar, malzeme listesi, tedarikçi, alternatif malzeme

| Soru |
|------|
| Kumaş türü / kodu / gramajı / renk |
| Aksesuar türü / kodu |
| Tedarikçi |
| Alternatif kumaş |
| Alternatif aksesuar |

### 8. TÜKETİM ANALİZİ
**Alt Sekmeler**: Kumaş tüketimi, aksesuar tüketimi, fire oranı

| Soru |
|------|
| Kumaş tüketim miktarı |
| Aksesuar tüketimi |
| Fire oranı |

### 9. GÖRSEL TASARIM
**Alt Sekmeler**: Model çizimi, 3D model, referans foto, teknik not

| Soru |
|------|
| Model çizimi var mı |
| Referans foto var mı |
| 3D model var mı |
| Model açıklaması |

### 10. NUMUNE PLANLAMA
**Alt Sekmeler**: Numune planı, sorumlu, süre

| Soru |
|------|
| Numune üretim tarihi |
| Numune sorumlusu |
| Numune üretim süresi |
| Numune maliyeti |

### 11. NUMUNE TEST ANALİZİ
**Alt Sekmeler**: Numune kalite, hata, iyileştirme

| Soru |
|------|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |
| Numune onay durumu |

### 12. TEKNİK FÖY HAZIRLIK
**Alt Sekmeler**: İşlem listesi, sıra, makine türü, zorluk puanı, işlem videosu

| Soru |
|------|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

### 13. ÜRETİM FİZİBİLİTE ANALİZİ
**Alt Sekmeler**: Üretim süresi, maliyet, kapasite

| Soru |
|------|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |
| İşçilik süresi |

### 14. TASARIM ONAY SÜRECİ
**Alt Sekmeler**: Tasarım onayı, kesim onayı, üretim onayı

| Soru |
|------|
| Tasarım onaylandı mı |
| Kesim onayı verildi mi |
| Üretim onayı verildi mi |

### 15. TASARIM ARŞİVİ
**Alt Sekmeler**: Tasarım arşivi, satış performansı, başarı analizi

| Soru |
|------|
| Model satış başarısı |
| Model performansı |
| Tasarım notları |

---

## VERİTABANI TABLOLARI
`models`, `model_parts`, `model_materials`, `model_accessories`, `model_images`, `model_versions`, `model_notes`, `model_sizes`, `model_consumption`
