# FEATURES DİZİNİ TUTARSIZLIK RAPORU

> **Tarih:** 08 Nisan 2026 | 15:10 (UTC+3)  
> **Kaynak:** Canlı dosya taraması — `src/features/*`  
> **Durum:** MÜHÜRLENMIŞ

---

## TAM ENVANTER (26 Feature)

| # | Feature | Components | Hooks | Services | index.js | Durum |
|---|---|---|---|---|---|---|
| 1 | `ajanlar` | ✅ | ✅ | ✅ | ✅ (589B) | ✅ TAM |
| 2 | `arge` | ✅ | ✅ | ✅ | ⚠️ (183B) | ✅ TAM |
| 3 | `ayarlar` | ✅ | ✅ | ✅ | ✅ (732B) | ✅ TAM |
| 4 | `denetmen` | ✅ | ✅ | ✅ | ✅ (308B) | ✅ TAM |
| 5 | `gorevler` | ✅ | ✅ | ✅ | ⚠️ (221B) | ✅ TAM |
| 6 | `guvenlik` | ✅ | ✅ | ✅ | ⚠️ (188B) | ✅ TAM |
| 7 | `imalat` | ✅ | ✅ | ✅ | ✅ (383B) | ✅ TAM |
| 8 | `kalip` | ✅ | ✅ | ✅ | ✅ (303B) | ✅ TAM |
| 9 | `karargah` | ✅ | ✅ | ✅ | ✅ (274B) | ✅ TAM |
| 10 | `kasa` | ✅ | ✅ | ✅ | ✅ (309B) | ✅ TAM |
| 11 | `katalog` | ✅ | ✅ | ✅ | ✅ (827B) | ✅ TAM |
| 12 | `kesim` | ✅ | ✅ | ✅ | ✅ (302B) | ✅ TAM |
| 13 | `kumas` | ✅ | ✅ | ✅ | ✅ (565B) | ✅ TAM |
| 14 | `maliyet` | ✅ | ✅ | ✅ | ✅ (195B) | ✅ TAM |
| 15 | `modelhane` | ✅ | ✅ | ✅ | ✅ (214B) | ✅ TAM |
| 16 | `muhasebe` | ✅ | ✅ | ✅ | ✅ (472B) | ✅ TAM |
| 17 | `musteriler` | ✅ | ✅ | ✅ | ✅ (219B) | ✅ TAM |
| 18 | `personel` | ✅ | ✅ | ✅ | ✅ (357B) | ✅ TAM |
| 19 | `raporlar` | ✅ | ✅ | ✅ | ✅ (304B) | ✅ TAM |
| 20 | `siparisler` | ✅ | ✅ | ✅ | ✅ (632B) | ✅ TAM |
| 21 | `stok` | ✅ | ✅ | ✅ | ✅ (286B) | ✅ TAM |
| 22 | `uretim` | ✅ | ✅ | ✅ | ✅ (1400B) | ✅ TAM |
| 23 | **`giris`** | ✅ | ❌ | ❌ | ⚠️ (176B) | ❌ EKSİK |
| 24 | **`haberlesme`** | ✅ | ❌ | ❌ | ⚠️ (65B) | ❌ EKSİK |
| 25 | **`kameralar`** | ✅ | ✅ | ❌ | ❌ | ⚠️ KISMI |
| 26 | **`tasarim`** | ✅ | ❌ | ❌ | ❌ | ❌ EKSİK |

---

## ÖZET

| Durum | Sayı | Yüzde |
|---|---|---|
| ✅ TAM (3 katman + index) | 22 | %84.6 |
| ⚠️ KISMI | 1 | %3.8 |
| ❌ EKSİK | 3 | %11.5 |

---

## EKSİK FEATURE DETAYLARI

### 1. `tasarim` — ❌ EKSİK (hooks yok, services yok, index.js yok)
- Sadece `components/TasarimMainContainer.js` (33KB) mevcut
- Supabase tablosu: `b0_tasarim_ayarlari`
- **Gerekli:** `hooks/useTasarim.js`, `services/tasarimApi.js`, `index.js`

### 2. `giris` — ❌ EKSİK (hooks yok, services yok)
- Sadece `components/` + `index.js` (176B)
- EKİP-2 sorumluluğunda (auth katmanı)
- **Gerekli:** `hooks/useGiris.js`, `services/girisApi.js`

### 3. `haberlesme` — ❌ EKSİK (hooks yok, services yok)
- Sadece `components/` + `index.js` (65B)
- Supabase tabloları: `b1_askeri_haberlesme`, `b1_ic_mesajlar`
- **Gerekli:** `hooks/useHaberlesme.js`, `services/haberlesmeApi.js`

### 4. `kameralar` — ⚠️ KISMI (services yok, index.js yok)
- `components/` + `hooks/useMotionDetection.js` mevcut
- Supabase tabloları: `cameras`, `camera_events`, `camera_access_log`
- **Gerekli:** `services/kameralarApi.js`, `index.js`

---

> **Rapor Sonu**  
> **Aksiyon:** Eksik 4 feature'ın tamamlanması ayrı görev olarak planlanmalı  
> **Durum:** MÜHÜRLENMIŞ
