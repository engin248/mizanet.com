# HATA KODU MATRİSİ — API ROUTE → ERR KODU EŞLEŞTİRME

> **Tarih:** 08 Nisan 2026 | 15:08 (UTC+3)  
> **Durum:** MÜHÜRLENMIŞ — 56/56 Route Dönüştürüldü  
> **Format:** `ERR-{MODUL}-{KATMAN}-{NUMARA}`

---

## MODÜL KODLARI

| Kod | Modül |
|---|---|
| AUTH | Kimlik Doğrulama / 2FA |
| GVN | Güvenlik |
| AJN | Ajan Yönetimi |
| ARG | AR-GE / Trend / Scraper |
| SPR | Sipariş |
| MST | Müşteri |
| PRS | Personel |
| GRV | Görev |
| KMS | Kumaş / Aksesuar |
| URT | Üretim / İş Emri |
| STK | Stok |
| KSA | Kasa / Finans |
| HBR | Haberleşme |
| KMR | Kamera |
| MDL | Model / Modelhane |
| RPR | Rapor |
| SYS | Sistem Genel |
| API | Genel API |

## KATMAN KODLARI

| Kod | Katman |
|---|---|
| RT | Route (API endpoint) |
| SV | Service |
| HK | Hook |
| CM | Component |
| LB | Library |
| CR | Core |
| PG | Page |

---

## EKİP-2 SORUMLULUK ALANI (AUTH / GÜVENLİK)

| Hata Kodu | Route | Tablo |
|---|---|---|
| `ERR-AUTH-RT-001` | `api/2fa-dogrula` | `b0_sistem_loglari` |
| `ERR-AUTH-RT-002` | `api/2fa-kurulum` | `b0_sistem_loglari` |
| `ERR-AUTH-RT-003` | `api/cikis` | - |
| `ERR-AUTH-RT-004` | `api/pin-dogrula` | `b0_sistem_loglari` |
| `ERR-GVN-RT-001` | `api/beyaz-saha` | `b1_agent_loglari` |

---

## TAM HATA KODU EŞLEŞTİRME TABLOSU

| Hata Kodu | Route | Açıklama |
|---|---|---|
| `ERR-AUTH-RT-001` | `api/2fa-dogrula` | 2FA doğrulama hatası |
| `ERR-AUTH-RT-002` | `api/2fa-kurulum` | 2FA kurulum hatası |
| `ERR-AUTH-RT-003` | `api/cikis` | Oturum kapatma hatası |
| `ERR-AUTH-RT-004` | `api/pin-dogrula` | PIN doğrulama hatası |
| `ERR-GVN-RT-001` | `api/beyaz-saha` | Beyaz saha güvenlik hatası |
| `ERR-AJN-RT-001` | `api/trigger-agents` | Ajan tetikleme hatası |
| `ERR-AJN-RT-002` | `api/agent/kasif` | Kâşif ajan hatası |
| `ERR-AJN-RT-003` | `api/ai-kahin-ajan` | AI Kahin hatası |
| `ERR-AJN-RT-004` | `api/ajan-calistir` | Ajan çalıştırma hatası |
| `ERR-AJN-RT-005` | `api/ajan-orkestrator` | Orkestratör hatası |
| `ERR-AJN-RT-006` | `api/ajan-tetikle` | Ajan tetikleme / yetki hatası |
| `ERR-AJN-RT-007` | `api/ajan-yargic` | Yargıç hatası |
| `ERR-AJN-RT-008` | `api/cron-ajanlar` | Cron ajan hatası |
| `ERR-AJN-RT-009` | `api/kopru-ajan` | Köprü ajan hatası |
| `ERR-AJN-RT-010` | `api/worker-ajan` | Worker ajan hatası |
| `ERR-AJN-RT-011` | `api/yargic-motor-test` | Yargıç motor test hatası |
| `ERR-ARG-RT-001` | `api/batch-ai` | Batch AI hatası |
| `ERR-ARG-RT-002` | `api/deepseek-analiz` | DeepSeek analiz hatası |
| `ERR-ARG-RT-003` | `api/m1-motor-test` | M1 motor test hatası |
| `ERR-ARG-RT-004` | `api/m1-scraper-webhook` | Scraper webhook hatası |
| `ERR-ARG-RT-005` | `api/perplexity-arama` | Perplexity arama hatası |
| `ERR-ARG-RT-006` | `api/serp-trend` | SERP trend hatası |
| `ERR-ARG-RT-007` | `api/test-arge/ajan2-analist` | Arge test analist hatası |
| `ERR-ARG-RT-008` | `api/trend-ara` | Trend arama hatası |
| `ERR-SPR-RT-001` | `api/siparis-ekle` | Sipariş ekleme ana hata |
| `ERR-SPR-RT-002` | `api/siparis-ekle/kara-kutu-log` | Sipariş log hatası |
| `ERR-MST-RT-001` | `api/musteri-ekle` | Müşteri ekleme hatası |
| `ERR-PRS-RT-001` | `api/personel-ekle` | Personel ekleme hatası |
| `ERR-GRV-RT-001` | `api/gorev-ekle` | Görev ekleme hatası |
| `ERR-KMS-RT-001` | `api/kumas-ekle` | Kumaş ekleme ana hata |
| `ERR-KMS-RT-002` | `api/kumas-ekle/kara-kutu-log` | Kumaş log hatası |
| `ERR-URT-RT-001` | `api/is-emri-ekle` | İş emri ekleme hatası |
| `ERR-STK-RT-001` | `api/stok-hareket-ekle` | Stok hareket ana hata |
| `ERR-STK-RT-002` | `api/stok-hareket-ekle/kara-kutu-log` | Stok hareket log hatası |
| `ERR-STK-RT-003` | `api/stok-alarm/GET` | Stok alarm GET hatası |
| `ERR-STK-RT-004` | `api/stok-alarm/POST` | Stok alarm POST hatası |
| `ERR-STK-RT-005` | `api/stok-alarm/kara-kutu-log` | Stok alarm log hatası |
| `ERR-KSA-RT-001` | `api/kasa-ozet` | Kasa özet hatası |
| `ERR-HBR-RT-001` | `api/haberlesme/gonder` | Haberleşme gönder ana hata |
| `ERR-HBR-RT-002` | `api/haberlesme/gonder/db-insert` | Haberleşme DB yazma hatası |
| `ERR-HBR-RT-003` | `api/haberlesme/oku` | Haberleşme oku ana hata |
| `ERR-HBR-RT-004` | `api/haberlesme/oku/db-select` | Haberleşme DB okuma hatası |
| `ERR-KMR-RT-001` | `api/kamera-sayac` | Kamera sayaç hatası |
| `ERR-KMR-RT-002` | `api/m4-vision` | M4 Vision hatası |
| `ERR-KMR-RT-003` | `api/stream-durum` | Stream durum hatası |
| `ERR-MDL-RT-001` | `api/model-hafizasi` | Model hafızası hatası |
| `ERR-RPR-RT-001` | `api/rapor/atil-sermaye` | Atıl sermaye rapor hatası |
| `ERR-RPR-RT-002` | `api/rapor/darbogaz` | Darboğaz rapor hatası |
| `ERR-RPR-RT-003` | `api/rapor/kor-nokta` | Kör nokta rapor hatası |
| `ERR-RPR-RT-004` | `api/rapor/kumbaraci` | Kumbaracı rapor hatası |
| `ERR-RPR-RT-005` | `api/rapor/mevsimsel-muneccim` | Mevsimsel müneccim hatası |
| `ERR-RPR-RT-006` | `api/rapor/sabika-kaydi` | Sabıka kaydı rapor hatası |
| `ERR-RPR-RT-007` | `api/rapor/sistem-hafizasi` | Sistem hafızası rapor hatası |
| `ERR-RPR-RT-008` | `api/rapor/yirtici-firsat` | Yırtıcı fırsat rapor hatası |
| `ERR-SYS-RT-001` | `api/kur` | Döviz kuru hatası |
| `ERR-SYS-RT-002` | `api/b2b-webhook-tetikle` | B2B webhook hatası |
| `ERR-SYS-RT-003` | `api/health` | Health check hatası |
| `ERR-SYS-RT-004` | `api/kuyruk-motoru` | Kuyruk motoru hatası |
| `ERR-SYS-RT-005` | `api/stress-test` | Stress test hatası |
| `ERR-SYS-RT-006` | `api/telegram-bildirim` | Telegram bildirim hatası |
| `ERR-SYS-RT-007` | `api/telegram-foto` | Telegram foto hatası |
| `ERR-SYS-RT-008` | `api/telegram-webhook` | Telegram webhook hatası |
| `ERR-API-RT-001` | `api/veri-getir` | Genel veri getir hatası |

---

> **Toplam:** 62 hata kodu atandı (56 route + 6 alt-catch)  
> **Kanıt:** `grep_search` + PowerShell toplu dönüşüm  
> **Durum:** MÜHÜRLENMIŞ
