# KONU 14: KESİM MODÜLÜ (DETAYLI MİMARİ)
> Amaç: Onaylı kalıp ve teknik föy'den kesim planlaması, kumaş kesimi, fire kontrolü ve ara işçilik yönetimi

---

## MODÜL AKIŞI
```
Teknik Föy (onay) → Kesim Planı → Kumaş Hazırlık → Kesim → Fire Raporu → Ara İşçilik → Üretim Bandı'na Sevk
```

---

## 8 ANA SEKME

### 1. KESİM PLANLAMA
**Alt Sekmeler**: Pastal planı, kumaş yerleşimi, marker düzeni

| Soru |
|------|
| Kesim emri numarası |
| Kesim tarihi |
| Kesim sorumlusu |
| Kesilecek toplam adet |
| Beden dağılımı |

### 2. KUMAŞ HAZIRLIK
**Alt Sekmeler**: Kumaş kontrolü, top/rulo bilgisi, kumaş eni

| Soru |
|------|
| Kumaş top numarası |
| Kumaş eni |
| Kumaş kusur kontrolü yapıldı mı |
| Toplam kumaş metre |

### 3. PASTAL YERLEŞİMİ
**Alt Sekmeler**: Pastal planı, kat sayısı, yerleşim görseli

| Soru |
|------|
| Pastal uzunluğu |
| Kat sayısı |
| Marker verim oranı (%) |
| Yerleşim planı görseli var mı |

### 4. KESİM İŞLEMİ
**Alt Sekmeler**: Kesim makinesi, kesim operatörü, kesim süresi

| Soru |
|------|
| Kesim makinesi türü |
| Kesim operatörü |
| Kesim başlangıç saati |
| Kesim bitiş saati |
| Kesim kalite kontrolü yapıldı mı |

### 5. FİRE RAPORU
**Alt Sekmeler**: Fire miktarı, fire oranı, fire nedeni

| Soru |
|------|
| Toplam fire metre |
| Fire oranı (%) |
| Fire nedeni (kumaş hatası / kesim hatası / normal) |
| Kabul edilebilir fire sınırı aşıldı mı |

### 6. PARÇA KONTROLÜ
**Alt Sekmeler**: Parça sayısı, beden kontrolü, eşleştirme

| Soru |
|------|
| Kesilmiş parça sayısı |
| Beden bazlı parça doğruluğu |
| Eksik parça var mı |
| Parça eşleştirmesi doğru mu |

### 7. ARA İŞÇİLİK
**Alt Sekmeler**: Ön hazırlık işlemleri, fason işlemler, ara işçilik sorumlusu

| Soru |
|------|
| Ara işçilik türü (nakış / baskı / yıkama / tela) |
| Ara işçilik sorumlusu |
| Fason gönderim yapıldı mı |
| Fason dönüş tarihi |
| Ara işçilik kalite kontrolü |

### 8. ÜRETİME SEVK
**Alt Sekmeler**: Sevk planı, sevk tarihi, teslim tutanağı

| Soru |
|------|
| Sevk edilen parça sayısı |
| Sevk tarihi |
| Teslim alan kişi |
| Sevk tutanağı imzalandı mı |

---

## VERİTABANI TABLOLARI
```
kesim_emirleri
kesim_planlari
pastal_planlari
kesim_islemleri
fire_raporlari
parca_kontrolleri
ara_iscilikler
fason_gonderimler
kesim_sevkleri
```

---

## KRİTİK KURALLAR
- Fire oranı %3'ü geçerse sistem otomatik uyarı verir
- Parça sayısı eşleşmezse üretim başlatılamaz
- Fason gönderim yapıldıysa dönüş kontrol edilmeden üretim başlamaz
- Her kesim işlemi fotoğraf + video kaydı altına alınır
