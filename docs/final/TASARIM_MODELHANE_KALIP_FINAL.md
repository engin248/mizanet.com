# TASARIM + MODELHANE + KALIP + TEKNİK FÖY
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** 5 dosya analiz edildi

---

## 1. GENEL AKIŞ
```
Araştırma (M1) → Tasarım → Kalıp → Numune → Teknik Föy → Kesim → Üretim
```

---

## 2. TASARIM MODÜLÜ (/tasarim)

**Amaç:** Araştırma modülünden gelen veriyi satılabilir ürüne dönüştürmek.

### 15 Ana Sekme — 49 Alt Sekme — 68 Soru

| # | Sekme | Soru Sayısı |
|---|-------|------------|
| 1 | Trend → Model Eşleştirme | 5 |
| 2 | Model Tanımlama | 8 |
| 3 | Model Versiyon Yönetimi | 4 |
| 4 | Parça Yapı Analizi | 4 |
| 5 | Ölçü Tablosu | 3 |
| 6 | Kalıp Sistemi | 4 |
| 7 | Kumaş ve Malzeme Seçimi | 9 |
| 8 | Tüketim Analizi | 3 |
| 9 | Görsel Tasarım | 4 |
| 10 | Numune Planlama | 4 |
| 11 | Numune Test Analizi | 3 |
| 12 | Teknik Föy Hazırlık | 5 |
| 13 | Üretim Fizibilite Analizi | 3 |
| 14 | Tasarım Onay Süreci | 3 |
| 15 | Tasarım Arşivi | 3 |

### DB Tabloları
models, model_parts, model_materials, model_accessories, model_images, model_versions, model_notes, model_measurements, model_approvals

---

## 3. MODELHANE MODÜLÜ (/modelhane)

**Amaç:** İlk prototip üretimi, ölçü tablosu yönetimi, prova ve revizyon takibi.

### Alt Pencereler
Model kartı, ölçü tablosu, prova kayıtları, revizyon geçmişi

### Güvenlik
- PIN kalkanı (useAuth)
- Yetkisiz silme filtresi (Admin PIN bariyeri)
- Karakter kelepçesi (Not: 500, İşlem: 200)
- Try-catch + Promise.allSettled()

### Entegrasyonlar
- Telegram: Numune onayında "🚀 M2: Numune Onaylandı!" bildirimi
- M3 Geçiş: "Üretime / İmalata Geç" rotası

### Eksikler
- M3 Kumaş Arşivine bağlanma (menüden seç → stoktan düş)
- Fire Analiz Grafiği (Pie chart)

---

## 4. KALIP + NUMUNE + TEKNİK FÖY (/kalip)

**Amaç:** Tasarım çıktısını üretilebilir ürüne dönüştürmek.

### 13 Sekme

| # | Sekme | Kritik İçerik |
|---|-------|--------------|
| 1 | Kalıp Oluşturma | Ad, kod, versiyon, yazılım (CLO/Gerber/Optitex) |
| 2 | Kalıp Parça Yapısı | Parça sayısı, birleşme sırası |
| 3 | Beden Serisi (Grading) | Ana beden, büyüme oranı, tolerans |
| 4 | Kumaş Tüketim Hesabı | Metre, fire, yerleşim planı |
| 5 | Marker Planlama | Kumaş eni, marker verim oranı |
| 6 | Numune Üretimi | Tarih, sorumlu, süre, maliyet |
| 7 | Numune Test Analizi | Kalite, hata, iyileştirme |
| 8 | Numune Revizyon | Nedeni, tarihi, sorumlusu |
| 9 | Teknik Föy (Tech Pack) | İşlem sırası, makine, zorluk, süre |
| 10 | Üretim Fizibilite | Süre, maliyet, kapasite |
| 11 | Kalite Standartları | Dikiş/ölçü toleransı, paketleme |
| 12 | Üretim Talimatı | İş akışı, makine, beceri seviyesi |
| 13 | Teknik Föy Medya | Fotoğraf, video, referans |

### Modül Çıktısı
Kalıp dosyası → beden serisi → marker planı → numune onayı → teknik föy → üretim talimatı

### DB Tabloları
patterns, pattern_parts, pattern_sizes, pattern_consumption, markers, samples, sample_tests, sample_revisions, techpacks, operations, operation_media, production_feasibility, quality_standards

### Teknoloji
CAD: Gerber/Optitex/CLO | DB: Supabase | Storage: S3 | Video: Arşiv sistemi

---

## 5. VERİ PAYLAŞIMI

| Kaynak | Hedef |
|--------|-------|
| M1 ARGE → | Tasarım (trend föyü) |
| Tasarım → | Modelhane (model kartı) |
| Modelhane → | Kalıp (prototip) |
| Kalıp → | Kesim (üretim talimatı) |
| Kumaş ↔ | Modelhane, Kalıp, Kesim, Tasarım |

---

> **Bu dosya Tasarım+Modelhane+Kalıp modüllerinin EN ÜST SEVİYE referansıdır.**
