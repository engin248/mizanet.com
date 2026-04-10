# LIB DİZİNİ KONSOLİDASYON HARİTASI

> **Tarih:** 08 Nisan 2026 | 15:09 (UTC+3)  
> **Kaynak:** Canlı dosya taraması — `src/lib/*.js` import analizi  
> **Durum:** MÜHÜRLENMIŞ

---

## LIB → CORE DURUMU

### ✅ ZATEN REDIRECT EDİLMİŞ (4 dosya)

| lib Dosyası | core Karşılığı | Import Eden | Durum |
|---|---|---|---|
| `supabase.js` | `core/db/supabaseClient.js` | 0 (direkt core kullanılıyor) | ✅ Redirect — Silinemez (geriye uyumluluk) |
| `supabaseAdmin.js` | `core/db/supabaseAdmin.js` | 0 (direkt core kullanılıyor) | ✅ Redirect — Silinemez |
| `auth.js` | `core/auth/` | 1 | ✅ Redirect — Silinemez |
| `yetki.js` | `core/permissions/` | 0 (direkt core kullanılıyor) | ✅ Redirect — Silinemez |

---

### 🔵 AKTİF KULLANILAN LIB DOSYALARI (silinemez)

| Dosya | Boyut | Import Eden | Kategori |
|---|---|---|---|
| `errorCore.js` | 6.7KB | **60** | Merkezi hata yönetimi |
| `utils.js` | 3.9KB | **47** | Genel yardımcılar |
| `offlineKuyruk.js` | 6.1KB | **40** | Offline kuyruk sistemi |
| `langContext.js` | 815B | **33** | Dil bağlamı (i18n) |
| `silmeYetkiDogrula.js` | 2.1KB | **31** | Silme yetki doğrulama |
| `zodSchemas.js` | 9.4KB | **7** | Zod validasyon şemaları |
| `rateLimit.js` | 2.5KB | **7** | Rate limiting |
| `hataBildirim.js` | 5.0KB | **6** | Hata bildirim (Sentry/Telegram) |
| `ApiZirhi.js` | 1.7KB | **4** | API spam koruması |
| `logger.js` | 4.9KB | **4** | Sistem logger |
| `kripto.js` | 2.3KB | **2** | AES şifreleme (EKİP-2) |
| `lang.js` | 12.7KB | **2** | Dil dosyası (TR/AR) |
| `redis_kuyruk.js` | 1.6KB | **2** | Redis kuyruk |
| `totp.js` | 3.7KB | **2** | TOTP 2FA (EKİP-2) |
| `apiClient.js` | 7.6KB | **1** | API istemcisi |
| `apiWrapper.js` | 2.4KB | **1** | API wrapper |
| `ajanlar-v2.js` | 557B | **1** | Ajan v2 tanımları |
| `mesajSifrele.js` | 4.2KB | **1** | Client-side şifreleme (EKİP-2) |
| `TasarimContext.js` | 4.4KB | **1** | Tasarım context |

---

### ⚠️ KULLANILMAYAN LIB DOSYALARI (import = 0)

| Dosya | Boyut | Kategori | Öneri |
|---|---|---|---|
| `agents_dummy.js` | 33B | Dummy placeholder | 🗑️ Silinebilir |
| `aiOneri.js` | 3.9KB | AI öneri motoru | ⚠️ Kontrol et — runtime'da dinamik olabilir |
| `ajanlar.js` | 951B | Eski ajan tanımları | 🗑️ v2 varsa silinebilir |
| `bildirim.js` | 5.9KB | Bildirim gönderici | ⚠️ Kontrol et — runtime'da dinamik olabilir |
| `dipArsiv.js` | 2.0KB | Dip arşiv sistemi | ⚠️ Kontrol et |
| `m2_kar_kilidi.js` | 5.4KB | Finans kar kilidi | ⚠️ Kontrol et — runtime'da dinamik olabilir |
| `modelHafizasi.js` | 4.7KB | Model hafızası | ⚠️ Kontrol et |
| `pinUtils.js` | 1.5KB | PIN yardımcıları (EKİP-2) | ⚠️ core/auth'a taşınabilir |
| `sentinel.js` | 3.9KB | Bot sentinel | ⚠️ core/security'ye taşınabilir |
| `sentinel_kalkan.js` | 3.9KB | Sentinel kalkan | ⚠️ core/security'ye taşınabilir |
| `shard_logger.js` | 1.9KB | Shard logger | 🗑️ logger.js varsa elimine edilebilir |

---

### 🔴 POTANSIYEL ÇAKIŞMALAR

| lib Dosyası | core Karşılığı | Sorun |
|---|---|---|
| `sentinel.js` + `sentinel_kalkan.js` | `core/security/botBlocker.js` | 3 dosya aynı işi yapıyor olabilir |
| `pinUtils.js` | `core/auth/authTypes.js` | PIN yardımcıları auth katmanında olmalı |
| `errorCore.js` + `hataBildirim.js` + `logger.js` + `shard_logger.js` | — | 4 dosya hata/log yönetimi yapıyor |
| `kripto.js` + `mesajSifrele.js` | — | 2 şifreleme dosyası — birleştirilebilir |

---

## ÖZET

| Kategori | Dosya Sayısı |
|---|---|
| ✅ Redirect (çakışma çözülmüş) | 4 |
| 🔵 Aktif kullanılan (dokunulmayacak) | 19 |
| ⚠️ Kullanılmayan (kontrol gerekli) | 11 |
| 🔴 Potansiyel çakışma | 4 grup |

**Kritik Not:** Import sayısı = 0 olan dosyaların bir kısmı (`aiOneri.js`, `bildirim.js`, `m2_kar_kilidi.js`) çalışma zamanında (runtime) dinamik olarak kullanılıyor olabilir. Silmeden önce `grep` ile fonksiyon adı kontrolü yapılmalıdır.

---

> **Rapor Sonu**  
> **Durum:** MÜHÜRLENMIŞ — Bu rapor mevcut durumu belgeliyor, silme/taşıma işlemi için ayrı onay gerekli
