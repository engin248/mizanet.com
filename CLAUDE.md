# CLAUDE.md — THE ORDER / NIZAM Sistem Bağlamı

> Bu dosya her sohbet başında otomatik okunur. Sistem hakkında varsayım yapma — bu dosyayı esas al.

---

## 0. KİMLİK

| Alan | Değer |
|------|-------|
| Sistem Adı | **THE ORDER / NIZAM** |
| İşletme | Demir Tekstil |
| Web Sitesi | demirtekstiltheonder.com |
| Kurucu | **Engin** |
| Proje Dizini | `C:\Users\Esisya\Desktop\47_SilBaştan` |
| Çerçeve | Next.js 15 (App Router) |
| Veritabanı | Supabase (PostgreSQL) |
| Deployment | Vercel |
| Hata Takibi | Sentry |
| Dil | Türkçe (UI + naming convention) |

---

## 1. KURAL DOSYASI

**Yönetişim:** `.antigravity/rules.md` — 15 disiplin kuralı içerir. Her yanıtta bu kurallara uy:
- Kısa, net, doğrudan cevaplar
- 5 eksen analizi (Stratejik, Teknik, Operasyonel, Ekonomik, İnsan)
- Kod talep edilirse sadece kod verilir, açıklama yapılmaz
- Varsayım yapılmaz, eksik bilgi varsa soru sorulur
- Sistem mimarisi izinsiz değiştirilmez

---

## 2. MODÜL HARİTASI (18 Modül)

### 1. BİRİM — Üretim
| Kod | Sekme | Route | Fonksiyon |
|-----|-------|-------|-----------|
| M1 | Ar-Ge & Trend | `/arge` | Trendyol/Zara scraper → Gemini AI analiz → ÜRETİM/REDDET kararı |
| M2 | Kumaş & Arşiv | `/kumas` | Kumaş stok arşivi (`b1_kumas_arsiv`) |
| M3 | Kalıp & Serileme | `/kalip` | Kalıp yönetimi (`b1_kalip_arsiv`), M1 trendleriyle köprülü |
| M4 | Modelhane & Video | `/modelhane` | Tasarım stüdyosu + video arşivi |
| M5 | Kesim & Ara İşçilik | `/kesim` | Kesim operasyonları, dış işçilik takibi |
| M6 | Üretim Bandı | `/uretim` | Üretim iş emirleri (`b1_uretim_kayitlari`) |
| M7 | Maliyet Merkezi | `/maliyet` | Maliyet analizi (`b1_maliyet_kayitlari`) |
| M8 | Muhasebe & Rapor | `/muhasebe` | Finansal raporlar (`b1_muhasebe_raporlari`) |

### 2. BİRİM — Satış & Lojistik
| Kod | Sekme | Route | Fonksiyon |
|-----|-------|-------|-----------|
| M9 | Ürün Kataloğu | `/katalog` | Ürün yönetimi (`b2_urun_katalogu`) |
| M10 | Siparişler | `/siparisler` | Sipariş yönetimi (`b2_siparisler`, `b2_siparis_kalemleri`) |
| M11 | Stok & Sevkiyat | `/stok` | Stok hareketleri (`b2_stok_hareketleri`) |
| M12 | Kasa & Tahsilat | `/kasa` | Kasa hareketleri, çek/senet (`b2_kasa_hareketleri`) |
| M18 | Kameralar (AI) | `/kameralar` | AI kamera izleme, OpenAI Vision entegrasyonu |

### YÖNETİM
| Kod | Sekme | Route | Fonksiyon |
|-----|-------|-------|-----------|
| M13 | Müşteri CRM | `/musteriler` | Müşteri yönetimi (`b2_musteriler`) |
| M14 | Personel & Prim | `/personel` | İK + prim sistemi (`b1_personel`) |
| M15 | Görev Takibi | `/gorevler` | Görev yönetimi (`b1_gorevler`) |
| M16 | Raporlar | `/raporlar` | Analitik raporlar |

### SİSTEM
| Sekme | Route | Fonksiyon |
|-------|-------|-----------|
| Karargah | `/` | Ana dashboard (HQ) |
| Ajan Komuta (AI) | `/ajanlar` | 7 otonom ajan kontrol paneli |
| Müfettiş (AI) | `/denetmen` | Inspector AI sistemi |
| Güvenlik | `/guvenlik` | Güvenlik denetim paneli |
| Sistem Ayarları | `/ayarlar` | Sistem konfigürasyonu |

---

## 3. KİMLİK DOĞRULAMA SİSTEMİ (3 Katman)

```
Katman 1: Kullanıcı → PIN girer → /api/pin-dogrula (HTTPS)
Katman 2: Sunucu → .env PIN grupları ile doğrular
          COORDINATOR_PIN  → grup: 'tam'   (tam erişim)
          URETIM_PIN       → grup: 'uretim' (üretim modülleri)
          GENEL_PIN        → grup: 'genel'  (sadece okuma)
          Rate limit: 5 deneme / 15 dk (Upstash Redis + bellek fallback)
Katman 3: Sunucu → JWT token üretir (HS256, 8 saat)
          HttpOnly cookie olarak set edilir (JS erişemez)
          Cookie adları: sb47_jwt_token, sb47_auth_session
```

**Middleware** (`src/middleware.js`):
- Bot/crawler engelleme (sqlmap, nikto, vb.)
- API rate limit: 60 istek/dk per IP
- 21 sayfa JWT koruması, redirect → `/?hata=yetkisiz_erisim_middleware_kalkani`
- Güvenlik header'ları (HSTS, CSP, XSS, vb.)
- `x-internal-api-key` → cron/servis-servis atlatma

**Erişim Matrisi** — Sadece `tam` erişebilir: `/ajanlar`, `/kasa`, `/guvenlik`, `/ayarlar`

---

## 4. AI MASTERMIND SİSTEMİ

### Karar Akışı
```
1. Scraper (Python) → Trendyol/Zara tarar → b1_arge_products ('bekliyor')
2. Yargıç (Gemini AI) → Her 4 saatte çalışır → 50 ürün analiz eder
   Formül: TrendSkoru = (satis*0.35) + (sosyal*0.30) + (rakip*0.20) + (sezon*0.15)
           FırsatSkoru = TrendSkoru - (ortalama_risk * 0.5)
   Karar:  >=85 → ÜRETİM | >=70 → TEST ÜRETİMİ | >=50 → İZLEME | <50 → REDDET
   Çıktı → b1_arge_strategy, b1_arge_trend_data, b1_arge_cost_analysis, b1_arge_risk_analysis
   Eğer skor >=70 → b1_arge_trendler (M1 UI + M2 + Kalıphane'ye köprü)
3. Köprü Ajan → ÜRETİM kararlarını Telegram'a gönderir, 7 günlük temizlik yapar
```

**Dosyalar:**
- `scripts/arge_ajanlari/1_Scraper_Ajan.py` — Python scraper
- `src/scripts/ai_mastermind/yargic.js` — Gemini analiz motoru
- `src/scripts/ai_mastermind/kopru_ajan.js` — Karar uygulama & bildirim

### 7 Otonom Ajan (`src/lib/ajanlar-v2.js` — 846 satır)
| Ajan | Zamanlama | Görev |
|------|-----------|-------|
| Sabah Subayı | Her gün 05:00 | 8 kontrol: geç siparişler, sıfır stok, nakit, personel |
| Akşamcı | Her gün 18:00 | Günlük kapanış, yarınki hazırlık, muhasebe özeti |
| Nabız | Her 2 saatte | Anlık anomali tespiti, düşük stok, maliyet aşımı alarmı |
| Zincirci | Sürekli | Üretim hattı koordinasyonu, darboğaz tespiti |
| Finans Kalkanı | Sürekli | Nakit akışı, ödeme vadeleri, alacak takibi |
| Trend Kâşifi | Her 4 saatte | Pazar fırsatı tespiti |
| Muhasebe Yazıcı | Aylık | Finansal kapanış, gelir tanıma |

Tüm ajanlar → `b1_agent_loglari` | Kritik alarmlar → `b1_sistem_uyarilari` → Telegram

---

## 5. VERİTABANI ŞEMASI (Supabase)

```
b0_*   → Sistem çekirdeği (loglar, rate limit, audit)
b1_*   → 1. Birim + Yönetim (üretim, personel, görevler, ajanlar)
b2_*   → 2. Birim (müşteriler, siparişler, stok, kasa, tedarikçiler)
b3_*   → Operasyon

Önemli tablolar:
  b0_sistem_loglari      — Tüm önemli olayların audit logu
  b1_arge_products       — Ham scraper verisi
  b1_arge_strategy       — Yargıç kararları
  b1_arge_trendler       — Onaylı trendler (UI'a köprü)
  b1_agent_loglari       — Ajan çalışma kayıtları
  b1_sistem_uyarilari    — Gerçek zamanlı alarmlar
  b2_siparisler          — Sipariş yönetimi
  b2_kasa_hareketleri    — Kasa işlemleri

RLS: Tüm tablolarda aktif (FOR ALL USING true — satır filtresi yok)
Admin işlemler: supabaseAdmin.js (Service Role Key — sunucu tarafı)
```

---

## 6. API ENDPOINT HARİTASI (50+ route)

```
/api/pin-dogrula         POST  → Giriş (rate limited)
/api/cikis               POST  → Çıkış (cookie temizleme)
/api/veri-getir          POST  → Generic SQL SELECT (whitelist korumalı)
/api/ajan-calistir       POST  → Ajan manuel tetikleme (tam erişim)
/api/ajan-tetikle        POST  → Kamera alarmı + OpenAI Vision
/api/cron-ajanlar        GET   → Zamanlı görevler (x-internal-api-key)
/api/agent/kasif         POST  → Trend kâşifi ajanı
/api/musteri-ekle        POST  → Müşteri ekleme
/api/siparis-ekle        POST  → Sipariş ekleme
/api/stok-hareket-ekle   POST  → Stok hareketi
/api/gorev-ekle          POST  → Görev ekleme
/api/trend-ara           POST  → Ar-Ge trend arama
/api/stream-durum        GET   → Websocket stream durumu
/api/telegram-bildirim   POST  → Telegram mesajı
/api/kur                 GET   → Döviz kurları
/api/2fa-kurulum         POST  → TOTP kurulum
/api/2fa-dogrula         POST  → TOTP doğrulama
```

---

## 7. CRON JOBS (vercel.json)

```
0 5 * * *    → /api/cron-ajanlar?gorev=sabah_ozeti
0 0 * * *    → /api/cron-ajanlar?gorev=gece_yedekleme_ve_temizlik
0 5 * * *    → /api/cron-ajanlar?gorev=kamera_durum_kontrol_ajan
0 */4 * * *  → /api/cron-ajanlar?gorev=arge_zincir
```

---

## 8. TEKNOLOJİ YIĞINI

```
Frontend:   Next.js 15, React 19, Tailwind CSS 3, Lucide React
Charts:     Chart.js 4, Recharts 2
Backend:    Next.js API Routes (serverless), Supabase 2
Auth:       JWT (HS256), HttpOnly cookie, Zod şema doğrulama
AI:         Gemini (@google/genai 0.7), OpenAI Vision
Scraping:   Puppeteer 24 + puppeteer-extra
Rate Limit: Upstash Redis + ratelimit
Monitoring: Sentry 8
Deploy:     Vercel + Supabase (EU region)
Notif:      Telegram Bot API
```

---

## 9. ORTAM DEĞİŞKENLERİ (kritikler)

```bash
# Kimlik Doğrulama
COORDINATOR_PIN, URETIM_PIN, GENEL_PIN, TEST_COORDINATOR_PIN
JWT_SIRRI                      # JWT imza anahtarı
INTERNAL_API_KEY               # Servis-servis key

# Veritabanı
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # İstemci (RLS korumalı)
SUPABASE_SERVICE_ROLE_KEY      # Sunucu (RLS atlar)

# AI & Entegrasyon
GEMINI_API_KEY
OPENAI_API_KEY
TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

# Rate Limiting (opsiyonel)
UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
```

---

## 10. MODÜL MİMARİSİ (her feature klasörü)

```
src/features/[modul]/
├── components/
│   ├── [Modul]MainContainer.js   → Giriş noktası
│   ├── [Modul]Sayfasi.js         → Ana sayfa
│   └── [SubComponent].js
├── services/
│   └── [modul]Api.js             → API çağrıları
├── hooks/
│   └── use[Modul].js
├── schemas/                      → Zod validasyon
└── index.js
```

---

## 11. NAMING CONVENTION

```
Değişkenler:  camelCase (Türkçe tercih edilir)
Fonksiyonlar: camelCase eylem (girisYap, cikisYap, veriGetir)
Bileşenler:   PascalCase
DB tabloları: prefix_aciklama (b1_arge_products)
DB sütunları: snake_case (islenen_durum, created_at)
Sabitler:     UPPER_SNAKE_CASE
```

---

## 12. BİLİNEN KISITLAMALAR

- **Ajan eşzamanlılığı:** 7 ajan arasında mutex/kilit yok
- **Bellek içi rate limit:** Birden fazla Vercel instance'ta ölçeklenmez → Upstash zorunlu
- **RLS:** Tüm kullanıcılar tüm verileri görür (satır filtresi yok)
- **Gemini timeout:** 3 saniye — yavaş yanıtta mock skor kullanılır
- **Session sync:** localStorage (UI state) + cookies (gerçek auth) desenkronize olabilir

---

## 13. GÜVENLİK DURUMU

```
✅ 3 katmanlı PIN + JWT (HttpOnly cookie)
✅ SQL injection koruması (whitelist regex)
✅ Bot engelleme (User-Agent blacklist)
✅ CSP (production'da unsafe-eval yok)
✅ Ortam değişkeni sanitizasyonu
✅ Audit loglama (b0_sistem_loglari)
⚠️ Ajan orkestrasyon (koordinasyon yok)
⚠️ Veritabanı bağlantı havuzu (belgelenmemiş)
```

---

*Kaynak: Tam codebase analizi — src/, scripts/, SQL migrations, .env.local.example, vercel.json, package.json*
