# GÜVENLİK + RLS + ZIRH SİSTEMİ
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026

---

## 1. GÜVENLİK MİMARİSİ (15 Katman)

| # | Katman | Çözüm |
|---|--------|-------|
| 1 | Authentication | Supabase Auth (JWT) |
| 2 | RBAC | 5 seviyeli yetki |
| 3 | SQL Injection | Parametre kontrolü |
| 4 | XSS | Input sanitize |
| 5 | CSRF | Token doğrulama |
| 6 | Rate Limit | IP bazlı API koruma |
| 7 | WAF | Cloudflare |
| 8 | Audit Log | Silinemez işlem geçmişi |
| 9 | Şifre Hash | bcrypt |
| 10 | Veri Şifreleme | AES-256 |
| 11 | 2FA | TOTP zorunlu |
| 12 | Oturum | Zaman aşımı aktif |
| 13 | Sentinel | Anomali tespiti |
| 14 | API Zırhı | Spam/DDoS koruma |
| 15 | Bot Gizleme | Playwright + user-agent rotation |

## 2. KOD DOSYALARI

| Dosya | İşlev |
|-------|-------|
| `lib/auth.js` | Kimlik doğrulama |
| `lib/yetki.js` | Yetki kontrol |
| `lib/sentinel.js` | Anomali nöbetçisi |
| `lib/sentinel_kalkan.js` | Kalkan katmanı |
| `lib/ApiZirhi.js` | API koruma |
| `lib/rateLimit.js` | Rate limiting |
| `lib/silmeYetkiDogrula.js` | Silme yetkisi |
| `lib/kripto.js` | Kriptografi |
| `lib/mesajSifrele.js` | Mesaj şifreleme |
| `lib/totp.js` | 2FA TOTP |
| `middleware.js` | Middleware |

## 3. RLS POLİTİKALARI (En Kapsamlı SQL'ler)

| Dosya | KB | İçerik |
|-------|----|--------|
| `MASTER_SUPABASE_KOR_NOKTA_YAMASI.sql` | 13.7 | Master zırh |
| `02_RLS_GUVENLIK_VE_TABLO_DUZELTME.sql` | 9.3 | RLS temel |
| `16_SISTEM_TITANYUM_ZIRH.sql` | 5.6 | Titanyum zırh |
| `07_VERITABANI_KOR_NOKTA_ZIRHLARI.sql` | 5.4 | Kör nokta |
| `03_RLS_TUM_TABLOLAR.sql` | 5.1 | Tüm tablolar |

## 4. 188 KRİTERDEN GÜVENLİK (15 kriter: 57-66 + 126-130)

| # | Kriter |
|---|--------|
| 57 | Kimlik doğrulama güvenli mi |
| 58 | RBAC rol sistemi var mı |
| 59 | SQL Injection koruması |
| 60 | XSS koruması |
| 61 | CSRF koruması |
| 62 | API rate limit |
| 63 | WAF |
| 64 | Veri şifreleme |
| 126 | IP kısıtlama |
| 127 | 2FA |
| 128 | Oturum zaman aşımı |
| 129 | Şifre hash |
| 130 | Veri erişim logu |

---

> **Bu dosya Güvenlik sisteminin EN ÜST SEVİYE referansıdır.**
