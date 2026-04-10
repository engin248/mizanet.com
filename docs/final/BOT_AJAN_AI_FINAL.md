# BOT & AJAN SİSTEMİ + TELEGRAM + AI OFİSİ + YAPAY ZEKA
> **Versiyon:** FINAL 2.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_05, konu_17, konu_21, Bot görev beyanları, ajan dosyaları

---

## 1. BOT vs AGENT AYRIMI

| Özellik | Bot (Deterministik) | Agent (AI Karar) |
|---------|---------------------|-----------------|
| Görev | Veri toplama/scraping | Karar verme/analiz |
| Çalışma | Sürekli (düşük maliyet) | Sadece final kontrol anı |
| Mantık | Sabit kural | AI tabanlı |
| Maliyet | Düşük | Yüksek (API çağrısı) |

**Altın Kurallar:**
- AI tek başına karar **VERMEZ** — öneri üretir → insan onaylar
- Her ajanın çıktısı **loglanır**
- Denetim ajanı **bağımsız** kontrol yapar
- AI sadece final kontrol anında devreye girer (maliyet kontrolü)

---

## 2. AJAN TÜRLERİ (12 Ajan)

### A) Veri Toplama Ajanları (4)
| # | Ajan | Görev | Kaynak |
|---|------|-------|--------|
| 1 | Sosyal Trend | TikTok/Instagram trend tarama | TikTok, Instagram |
| 2 | E-Ticaret | Trendyol satış verisi | Trendyol |
| 3 | Rakip İzleme | Rakip yeni ürün, fiyat | Trendyol, Zara |
| 4 | Görsel Analiz | Ürün fotoğraf analizi | Vision AI |

### B) Analiz Ajanları (3)
| 5 | Trend Skor | TrendKararMotoru, skor hesaplama |
| 6 | Talep Tahmin | Satış potansiyeli |
| 7 | Maliyet Tahmin | Kumaş + işçilik |

### C) Karar Ajanları (2)
| 8 | Risk | Üretim/tedarik/trend ömrü risk analizi |
| 9 | Strateji | ÜRET / TEST / BEKLE / RED kararı |

### D) Sistem Ajanları (3)
| 10 | Stok | Kritik stok uyarı, dönüş analizi |
| 11 | Feedback | Satış verisi → model güncelleme |
| 12 | Denetim | Tüm ajan çıktılarını bağımsız kontrol |

---

## 3. SCRAPER BOTLAR (13 dosya — scraper_bots/)

| Bot | İşlev |
|-----|-------|
| `tiktok.js` | TikTok trend scraper (Playwright) |
| `trendyol.js` | Trendyol satış scraper |
| `bingo.js` | 8 kriter Bingo karar motoru |
| `bot_beyan_motoru.js` | 139 nokta görev beyanı |
| `sef_motor.js` | Şef kontrol motoru |
| `arama_motoru.js` | Genel arama |
| `kumas_avcisi.js` | Kumaş avcı botu |
| `trendyol_avci.js` | Trendyol avcı |
| `tiktok_gozcu.js` | TikTok gözcü |
| `veri_suzgeci.js` | Bot 5 — süzgeç/filtre |
| `golge_zaman_makinesi.js` | Bot 6 — gölge zaman |
| `instagram_radar.js` | Instagram radar |
| `meta_reklam.js` | Meta reklam analizi |

---

## 4. ARGE AJANLARI (23 dosya — arge_ajanlari/)

| Ajan | İşlev |
|------|-------|
| `vision_trendyol_ajani.js` | Trendyol screenshot → Gemini Vision |
| `trend_tiktok.js` | TikTok viral analiz |
| `trend_instagram.js` | Instagram trend tarama |
| `talep_google.js` | Google arama hacmi |
| `reklam_meta.js` | Meta Ad Library |
| `satis_trendyol.js` | Trendyol satış veri çekme |
| `lens_google_ajani.js` | Google Lens görsel arama |
| `138_altin_kriter_ajani.js` | 138 kriter hesaplama |
| `bas_tasarimci.js` | Tasarım asistanı |
| `b2b_tedarikci_ajani.js` | B2B tedarikçi araştırma |
| `hava_durumu_etkisi.js` | Hava → satış korelasyonu |
| `m2_finans_kar_ajani.js` | Finans & kâr hesaplama |
| `sentinel_savas_oyunu.js` | Güvenlik test simülasyonu |

---

## 5. AI ENGINE (Kod Dosyaları)

| Dosya | İşlev |
|-------|-------|
| `lib/ai/aiKararMotoru.js` | AI karar motoru |
| `lib/ai/hermContext.js` | Hermez bağlam yönetimi |
| `lib/ai/hermExplainer.js` | AI açıklama motoru |
| `lib/ai/hermLoop.js` | AI döngü kontrolü |
| `lib/ai/visionAjanCore.js` | Vision ajan çekirdeği |
| `services/M1TrendAnalizMotoru.js` | Trend analiz motoru (15.8KB) |
| `services/MizanetYargic.js` | Yargıç servisi (4.9KB) |

---

## 6. TELEGRAM BOT (@mizanet_bot)

### Ana Görevler
| # | Görev | Açıklama |
|---|-------|----------|
| 1 | Bildirim | Sistem uyarılarını patrona iletmek |
| 2 | Alarm | Kritik olayları anında bildirmek |
| 3 | Görev yönetimi | Uzaktan görev verme / durum sorgulama |
| 4 | Onay/Red | Kritik işlemleri onaylama / reddetme |
| 5 | Rapor | Günlük/haftalık özet rapor gönderme |

### Komut Yapısı

**Sorgulama:**
`/durum` `/uretim` `/satis` `/kasa` `/stok` `/hata`

**Görev:**
`/gorev [açıklama]` `/gorevler` `/gordurum [id]`

**Onay:**
`/onayla [id]` `/reddet [id]` `/tekrar [id]`

**Rapor:**
`/gunluk` `/haftalik` `/aylik`

### Otomatik Bildirimler

| Olay | Seviye |
|------|--------|
| Yüksek tutarlı kasa işlemi | 🔴 Acil |
| Kritik stok seviyesi | 🟡 Uyarı |
| Üretim hata oranı yükselme | 🔴 Acil |
| Agent hatası | 🟡 Uyarı |
| Sistem çökme | 🔴 Acil |
| Günlük özet | 🟢 Bilgi (20:00) |
| İnternet kesilme | 🔴 Acil |
| Yetkisiz giriş denemesi | 🔴 Acil |
| Mesai dışı kamera hareketi | 🔴 Acil |

### Güvenlik (8 Kural)
1. Token gizliliği — env'de, kodda DEĞİL
2. Webhook doğrulama — secret token
3. Kullanıcı kısıtlama — sadece yetkili Telegram ID
4. Komut yetki kontrolü — seviye bazlı
5. Spam koruma — 5sn tekrar engel
6. Bot veri sınırı — sadece okuma, DEĞİŞTİREMEZ
7. Tüm komutlar loglanır
8. Bot hatası otomatik loga yazılır

### Mevcut API Routeları
- `/api/telegram-bildirim` — Bildirim gönder
- `/api/telegram-foto` — Foto gönder
- `/api/telegram-webhook` — Webhook algılama

### DB Tabloları
telegram_komutlar, telegram_loglar, telegram_bildirimler, telegram_yetkiler, telegram_ayarlar

---

## 7. YAPAY ZEKA OFİSİ

### Görev Listesi (8 Analiz)

| # | Analiz | Amaç |
|---|--------|------|
| 1 | Satış Analizi | Hangi ürün satıyor/satmıyor |
| 2 | Üretim Verim | Hangi işlem yavaş, darboğaz nerede |
| 3 | Trend Analizi | Yeni ürün önerisi üretme |
| 4 | Hata Analizi | Üretim hatalarını tespit/azaltma |
| 5 | Maliyet Analizi | Maliyet optimizasyonu önerileri |
| 6 | Performans | Personel/makine performans ölçümü |
| 7 | Stok Analizi | Kritik stok, yavaş dönen ürün |
| 8 | Müşteri Analizi | Müşteri tercihleri, bölge analizi |

### Kamera + Agent Entegrasyonu (12 Necron)

| Bileşen | Görev |
|---------|-------|
| Kamera | İşçi hareketi / işlem gözlemi |
| Vision Agent | Video / görüntü analizi |
| Performans Agent | Üretim hızı ölçümü |
| Kalite Agent | Ürün kalite kontrolü (görsel) |

---

## 8. AGENT KONTROL KRİTERLERİ (10 Kriter)

1. Görev tanımı var mı
2. İşlem log tutuyor mu
3. Hata kontrolü var mı
4. Yetki sınırlı mı
5. Performans ölçümü var mı
6. Görev zamanlaması var mı
7. Hatalı işlem geri alınabilir mi
8. Yapamayacağı işlemler tanımlı mı
9. Veri doğrulama yapıyor mu
10. Anlık izlenebiliyor mu

---

## 9. ÖĞRENME SİSTEMİ (3-6-9-12 Ay)

| Dönem | Beceri |
|-------|--------|
| 3 ay | Temel veri toplama, hata tespit |
| 6 ay | Hata kalıpları öğrenme, öneri başlangıcı |
| 9 ay | Gelişmiş analiz, otonom karar kapasitesi |
| 12 ay | Tam öğrenme, kendi kendini geliştirme |

---

## 10. MALİYET

| Bileşen | Aylık |
|---------|-------|
| AI API çağrıları | 10-200$ |
| Sunucu (Vercel) | 20-100$ |
| Depolama | 5-50$ |

---

## 11. STOP-LOSS MEKANİZMASI
> **Kaynak:** konu_05_ajan_bot_mimarisi.md

| Kural | Aksiyon |
|-------|---------|
| 20 gün satış yok | Otomatik üretim iptal |
| Satış düşükse | Üretim azalt |
| Kötü yorum artışı | Trend yeniden kontrol |

---

## 12. FEEDBACK LOOP (ÖĞRENME DÖNGÜSÜ)
> **Kaynak:** konu_05_ajan_bot_mimarisi.md

```
Satış sonrası → model güncelleme
dynamicWeights → Redis'te saklanır
Haftalık eşik yeniden hesaplanır
Hata sonrası ağırlık cezalandırma
6-12 ay veri birikimi → tahmin doğruluğu ciddi artar
```

### Hibrit Bot Mimarisi
- **%80** → JSON/API botları (yapılandırılmış veri, hızlı, düşük maliyet)
- **%20** → Visual AI botları (kritik görsel kontrol, sadece son aşama)

### M1 Beyin Karar Motoru
- 138 kriter → Zod + matematik
- LLM karar mekanizmasından **tamamen devre dışı**
- Tek giriş noktası: `ingestAjanVerisi()`
- Her bot `botId` ile izlenebilir

---

> **Bu dosya Bot & Ajan & AI & Telegram sisteminin EN ÜST SEVİYE referansıdır.**
> **Versiyon:** FINAL 3.0 | **12 bölüm — tüm eksikler tamamlandı.**
