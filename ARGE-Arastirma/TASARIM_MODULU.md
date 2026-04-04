# TASARIM MODÜLÜ — TAM MİMARİ
> Oluşturulma: 4 Nisan 2026
> Amaç: Araştırma çıktısını satılabilir ürüne dönüştürmek ve üretime hazır hale getirmek

---

## MODÜL ÖZET

| Başlık | Sayı |
|---|---|
| Ana Sekme | 15 |
| Alt Sekme | 44 |
| Toplam Soru | 66 |
| Veritabanı Tablosu | 9 |

---

## 1. TREND → MODEL EŞLEŞTİRME

**Alt Sekmeler:** trend seçimi, referans model, hedef müşteri

| Soru |
|---|
| Trend kaynağı nedir |
| Referans model var mı |
| Model kategorisi nedir |
| Hedef müşteri kim |
| Hangi sezon için |

---

## 2. MODEL TANIMLAMA

**Alt Sekmeler:** model bilgisi, ürün kategorisi, stil, sezon, hedef pazar, fiyat segmenti

| Soru |
|---|
| Model adı |
| Model kodu |
| Ürün kategorisi |
| Stil türü |
| Sezon |
| Hedef müşteri |
| Hedef satış fiyatı |
| Tahmini üretim maliyeti |

---

## 3. MODEL VERSİYON YÖNETİMİ

**Alt Sekmeler:** versiyon numarası, versiyon geçmişi, değişiklik nedeni

| Soru |
|---|
| Model versiyon numarası |
| Değişiklik tarihi |
| Değişiklik açıklaması |
| Önceki versiyon |

---

## 4. PARÇA YAPI ANALİZİ

**Alt Sekmeler:** parça listesi, parça sayısı, parça ilişkisi, parça görselleri

| Soru |
|---|
| Ürün kaç parçadan oluşuyor |
| Parça isimleri |
| Parça birleşme sırası |
| Parça türü |

---

## 5. ÖLÇÜ TABLOSU

**Alt Sekmeler:** ölçü tablosu, beden serisi, ölçü toleransı

| Soru |
|---|
| Ana beden |
| Beden aralığı |
| Ölçü toleransı |

---

## 6. KALIP SİSTEMİ

**Alt Sekmeler:** kalıp dosyası, kalıp versiyonu, kalıp sorumlusu

| Soru |
|---|
| Kalıp türü |
| Kalıp versiyonu |
| Kalıp ölçüsü |
| Kalıp tarihi |

---

## 7. KUMAŞ VE MALZEME SEÇİMİ

**Alt Sekmeler:** kumaş seçimi, aksesuar seçimi, malzeme listesi, tedarikçi, alternatif malzeme

| Soru |
|---|
| Kumaş türü |
| Kumaş kodu |
| Kumaş gramajı |
| Kumaş renk |
| Aksesuar türü |
| Aksesuar kodu |
| Tedarikçi |
| Alternatif kumaş |
| Alternatif aksesuar |

---

## 8. TÜKETİM ANALİZİ

**Alt Sekmeler:** kumaş tüketimi, aksesuar tüketimi, fire oranı

| Soru |
|---|
| Kumaş tüketim miktarı |
| Aksesuar tüketimi |
| Fire oranı |

---

## 9. GÖRSEL TASARIM

**Alt Sekmeler:** model çizimi, 3D model, referans foto, teknik not

| Soru |
|---|
| Model çizimi var mı |
| Referans foto var mı |
| 3D model var mı |
| Model açıklaması |

---

## 10. NUMUNE PLANLAMA

**Alt Sekmeler:** numune planı, numune sorumlusu, numune süresi

| Soru |
|---|
| Numune üretim tarihi |
| Numune sorumlusu |
| Numune üretim süresi |
| Numune maliyeti |

---

## 11. NUMUNE TEST ANALİZİ

**Alt Sekmeler:** numune kalite, numune hata, numune iyileştirme

| Soru |
|---|
| Numune sonucu |
| Numune hata listesi |
| İyileştirme önerileri |
| Numune onay durumu |

---

## 12. TEKNİK FÖY HAZIRLIK

**Alt Sekmeler:** işlem listesi, işlem sırası, makine türü, işlem zorluk puanı, işlem videosu

| Soru |
|---|
| Toplam işlem sayısı |
| İşlem sırası |
| İşlem makinesi |
| İşlem zorluk puanı |
| İşlem süresi |

---

## 13. ÜRETİM FİZİBİLİTE ANALİZİ

**Alt Sekmeler:** üretim süresi, üretim maliyeti, üretim kapasitesi

| Soru |
|---|
| Toplam üretim süresi |
| Tahmini üretim maliyeti |
| Bant kapasitesi |
| İşçilik süresi |

---

## 14. TASARIM ONAY SÜRECİ

**Alt Sekmeler:** tasarım onayı, kesim onayı, üretim onayı

| Soru |
|---|
| Tasarım onaylandı mı |
| Kesim onayı verildi mi |
| Üretim onayı verildi mi |

---

## 15. TASARIM ARŞİVİ

**Alt Sekmeler:** tasarım arşivi, satış performansı, başarı analizi

| Soru |
|---|
| Model satış başarısı |
| Model performansı |
| Tasarım notları |

---

## VERİTABANI TABLOLARI

- models
- model_parts
- model_materials
- model_accessories
- model_images
- model_versions
- model_notes
- model_samples
- model_approvals

---

## TEKNOLOJİ ALTYAPISI

- Görsel arşiv sistemi (model depolama)
- 3D modelleme (tasarım görselleştirme)
- AI görsel analiz (model karşılaştırma)
- Veritabanı (PostgreSQL / Supabase)
- Arama motoru (model arama)

---

## MODÜL ÇIKTISI

1. Model tasarım dosyası
2. Parça listesi
3. Kumaş ve aksesuar listesi
4. Ölçü tablosu
5. Numune planı
6. Teknik Föy başlangıç verisi
7. Üretim fizibilite raporu
8. Tasarım onay kaydı
