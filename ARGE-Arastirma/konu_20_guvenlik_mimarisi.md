# KONU 20: GÜVENLİK MİMARİSİ (DETAYLI)
> Amaç: Sistemi dünya standartlarının üstünde güvenli hale getirmek — canlıda ve mobilde güvenlik açığı bırakmamak

---

## 10 KATMANLI GÜVENLİK MİMARİSİ

| # | Katman | Teknoloji | Açıklama |
|---|--------|-----------|----------|
| 1 | Authentication | Supabase Auth | Kimlik doğrulama |
| 2 | RBAC | Row Level Security | Rol tabanlı erişim kontrolü |
| 3 | XSS Koruma | Input sanitize | Script saldırısı engelleme |
| 4 | SQL Injection | Parameterized queries | Veritabanı saldırısı engelleme |
| 5 | CSRF | Token doğrulama | Form saldırısı engelleme |
| 6 | Rate Limit | API throttling | Spam/bot saldırısı engelleme |
| 7 | WAF | Cloudflare | Web firewall |
| 8 | Veri Şifreleme | AES-256 | Hassas veri şifreleme |
| 9 | 2FA | TOTP / SMS | İki faktörlü doğrulama |
| 10 | Audit Log | Append-only log | Kim ne yaptı kaydı |

---

## GÜVENLİK KONTROL KRİTERLERİ

### Kimlik Doğrulama
| Kontrol |
|---------|
| Giriş sistemi PIN tabanlı mı |
| PIN brute-force koruması var mı (5 deneme → kilitle) |
| PIN değişince eski oturum iptal oluyor mu |
| Oturum zaman aşımı (8 saat) var mı |
| Çok cihazlı giriş kontrolü var mı |

### Yetki Kontrolü
| Kontrol |
|---------|
| Her kullanıcı sadece kendi yetkisi kadar görebiliyor mu |
| Üretim operatörü maaş verisine erişememeli |
| Patron tüm verileri görebilir ama geçmişi değiştiremez |
| URL'den zorla sayfa açma engelleniyor mu (/kasa gibi) |
| Butonlar yetkiye göre görünür/gizli mi |

### Veri Güvenliği
| Kontrol |
|---------|
| Supabase API anahtarları istemcide görünmüyor mu |
| Tüm API çağrıları güvenli tünelden mi geçiyor |
| Hassas veriler (maaş, kasa) şifreli mi |
| Silinen veri gerçekten silinmiyor mu (soft delete) |
| Tüm işlemler audit log'a yazılıyor mu |

### Ağ Güvenliği
| Kontrol |
|---------|
| HTTPS zorunlu mu (HTTP → redirect) |
| IP kısıtlama var mı (yönetim paneli) |
| Cloudflare WAF aktif mi |
| DDoS koruması var mı |

---

## MOBİL GÜVENLİK

| Kontrol |
|---------|
| PWA üzerinden giriş güvenli mi |
| Mobil oturum zaman aşımı var mı |
| Cihaz kaybında uzaktan oturum sonlandırma var mı |
| Mobil veri önbellekte şifreleniyor mu |
| Wi-Fi dışında (mobil veri) güvenlik aynı mı |

---

## DÜNYA STANDARTLARI ÜSTÜNDEKİ ÖNERİLER

| # | Öneri | Açıklama |
|---|-------|----------|
| 1 | Zero Trust Model | Hiçbir kullanıcıya varsayılan güven yok |
| 2 | IP Whitelist | Yönetim paneline sadece belirli IP'lerden erişim |
| 3 | Anomali Tespiti | Olağandışı işlem anında alarm |
| 4 | Veri Anonimleştirme | Raporlarda kişisel veri gizleme |
| 5 | Penetrasyon Test | Düzenli güvenlik testi |
| 6 | SOC 2 Uyumu | Güvenlik sertifikasyonu hedefi |
| 7 | Backup Şifreleme | Yedeklerin de şifreli olması |

---

## GÜVENLİK AÇIK ANALİZİ

| Risk | Etki | Önlem |
|------|------|-------|
| API anahtarı sızması | Veri erişimi | Server-side API, environment variables |
| Brute-force | Hesap ele geçirme | Rate limit + captcha + kilitleme |
| XSS saldırısı | Veri çalınması | Input sanitize + CSP header |
| Insider threat | Veri manipülasyonu | Immutable logs + RBAC |
| Cihaz kaybı | Veri sızıntısı | Remote session kill + veri şifreleme |

---

## GÜVENLİĞİN ARTI / EKSİ ANALİZİ

### Artılar
- Supabase RLS → güçlü satır seviyesi güvenlik
- Cloudflare → DDoS koruması ücretsiz katmanda bile var
- PIN sistemi → basit ama etkili
- Audit log → her işlem izlenebilir

### Eksiler
- Supabase API key client-side → dikkatli yönetilmeli
- 2FA henüz aktif değil → eklenmeli
- Penetrasyon test yapılmadı → yapılmalı
- Mobil veri şifreleme → kontrol edilmeli
- Session token yönetimi → güçlendirilmeli

---

## KVKK UYUMU

| Kontrol |
|---------|
| Kişisel veriler şifreli mi |
| Veri silme talebi karşılanabiliyor mu |
| Veri işleme izni alınıyor mu |
| 3. taraflarla veri paylaşılıyor mu (paylaşılmamalı) |
| Çalışan maaş verisi gizli mi |

---

## VERİTABANI TABLOLARI
```
audit_logs
security_events
login_attempts
session_records
ip_whitelist
role_permissions
```
