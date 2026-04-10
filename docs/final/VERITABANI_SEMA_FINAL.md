# VERİTABANI ŞEMASI — MASTER REFERANS
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** 51 SQL dosyası analiz edildi

---

## 1. ANA İŞ TABLOLARI

| Tablo | Amaç |
|-------|------|
| kullanicilar | Sistem kullanıcıları |
| roller | Yetki rolleri |
| personel | Çalışan bilgileri |
| musteriler | Müşteri kartları |
| siparisler | Sipariş kayıtları |
| siparis_urunleri | Sipariş ürün detayı |
| urunler | Ürün kataloğu |
| stoklar | Stok yönetimi |
| kumaslar | Kumaş arşivi |
| model_kaliplari | Model ve kalıp |
| uretim_isleri | Üretim iş emirleri |
| fasonlar | Fason üretim |
| sevkiyatlar | Sevkiyat |
| kasa_hareketleri | Kasa giriş/çıkış |
| maliyetler | Maliyet hesaplamaları |

## 2. SİSTEM TABLOLARI

| Tablo | Amaç |
|-------|------|
| b0_sistem_loglari | Sistem logları |
| b0_hata_loglari | Hata kayıtları |
| b0_islem_gecmisi | İşlem geçmişi |
| b0_performans_metrikleri | Performans |
| b0_retry_queue | Tekrar kuyruğu |
| b0_offline_queue | Offline kuyruk |

## 3. ARGE TABLOLARI

| Tablo | Amaç | Durum |
|-------|------|-------|
| b1_arge_trendler | Ana trend verileri | ✅ |
| b1_istihbarat_ham | Ham istihbarat | ⏳ |
| b1_analiz_kulucka | Kuluçka analiz | ⏳ |
| b1_arge_nizam_karar | Nihai karar | ⏳ |
| b1_arge_model_arsivi | Model arşivi | ❌ |
| b1_arge_rakip_arsivi | Rakip arşivi | ❌ |
| b1_arge_kumas_arsivi | Kumaş arşivi | ❌ |
| b1_arge_aksesuar_arsivi | Aksesuar arşivi | ❌ |
| b1_arge_notlar_arsivi | Not arşivi | ❌ |
| b1_arge_referans_gorsel_arsivi | Görsel arşivi | ✅ |

## 4. AI/AGENT TABLOLARI

| Tablo | Amaç |
|-------|------|
| ai_analizler | AI analiz sonuçları |
| agent_gorevleri | Görev atama/takip |
| agent_loglari | İşlem logları |

## 5. TASARIM/KALIP TABLOLARI

| Tablo | Amaç |
|-------|------|
| models | Model kartları |
| model_parts | Model parçaları |
| model_materials | Model malzemeleri |
| model_accessories | Model aksesuarları |
| model_images | Model görselleri |
| model_versions | Model versiyonları |
| model_notes | Model notları |
| model_measurements | Model ölçüleri |
| model_approvals | Model onayları |
| patterns | Kalıp dosyaları |
| pattern_parts | Kalıp parçaları |
| pattern_sizes | Kalıp bedenleri |
| pattern_consumption | Kumaş tüketimi |
| markers | Marker planları |
| samples | Numuneler |
| sample_tests | Numune testleri |
| sample_revisions | Numune revizyonları |
| techpacks | Teknik föyler |
| operations | İşlemler |
| operation_media | İşlem medyaları |
| production_feasibility | Üretim fizibilite |
| quality_standards | Kalite standartları |

## 6. KAMERA TABLOLARI

| Tablo | Amaç |
|-------|------|
| camera_events | Kamera olayları |
| camera_status | Kamera durumu |

## 7. SQL DOSYA KRONOLOJİSİ

### Temel Kurulum (7 dosya)
01_GEMINI → SUPABASE_TABLO → NIHAI → birim1_ek → birim2 → gorevler → personel

### Modül Genişleme (7 dosya)
V2_M4_M6 → V3_ARGE → 09_M4_OTONOM → b1_piyasa → b2_kategoriler → FAZ2

### Güvenlik (7 dosya)
02_RLS → 03_RLS_TUM → 04_RLS_POLITIKALAR → 07_KOR_NOKTA → 08_GERCEK_RLS → 16_TITANYUM → MASTER

### Kamera/Agent (4 dosya)
KAMERA_SQL → KAMERA_NIHAI → 11_ALARM → SQL_AJAN

### Yamalar (11+ dosya)
35_MASTER_TODO → 36-44 arası modül yamaları → EKSIK_TABLOLAR

---

> **Bu dosya Veritabanı Şemasının EN ÜST SEVİYE referansıdır.**  
> **Yeni SQL çalıştırmadan önce bu dosya kontrol edilecektir.**
