# KONU 21: TELEGRAM BOT MİMARİSİ
> Amaç: Uzaktan görev verme, sistem uyarıları alma, onay/red mekanizması — bilgisayar başında olmadan kontrol

---

## BOT ANA GÖREVLERİ

| # | Görev | Açıklama |
|---|-------|----------|
| 1 | Bildirim | Sistem uyarılarını patrona iletmek |
| 2 | Alarm | Kritik olayları anında bildirmek |
| 3 | Görev yönetimi | Uzaktan görev verme / durum sorgulama |
| 4 | Onay/Red | Kritik işlemleri onaylama / reddetme |
| 5 | Rapor | Günlük/haftalık özet rapor gönderme |

---

## KOMUT YAPISI

### Sorgulama Komutları
| Komut | Açıklama |
|-------|----------|
| `/durum` | Sistem genel durumu |
| `/uretim` | Günlük üretim sayısı |
| `/satis` | Günlük satış özeti |
| `/kasa` | Kasa bakiyesi |
| `/stok` | Kritik stok uyarıları |
| `/hata` | Son hatalar listesi |

### Görev Komutları
| Komut | Açıklama |
|-------|----------|
| `/gorev [açıklama]` | Yeni görev oluştur |
| `/gorevler` | Aktif görev listesi |
| `/gordurum [id]` | Görev durumu sorgula |

### Onay Komutları
| Komut | Açıklama |
|-------|----------|
| `/onayla [id]` | Bekleyen işlemi onayla |
| `/reddet [id]` | Bekleyen işlemi reddet |
| `/tekrar [id]` | İşlemi tekrar çalıştır |

### Rapor Komutları
| Komut | Açıklama |
|-------|----------|
| `/gunluk` | Günlük rapor |
| `/haftalik` | Haftalık rapor |
| `/aylik` | Aylık rapor |

---

## OTOMATİK BİLDİRİMLER

| Olay | Bildirim |
|------|----------|
| Yüksek tutarlı kasa işlemi | 🔴 Acil alarm |
| Kritik stok seviyesi | 🟡 Uyarı |
| Üretim hata oranı yükselme | 🔴 Acil alarm |
| Agent hatası | 🟡 Uyarı |
| Sistem çökme | 🔴 Acil alarm |
| Günlük özet | 🟢 Bilgi (her gün 20:00) |
| İnternet kesilme | 🔴 Acil alarm |
| Yetkisiz giriş denemesi | 🔴 Acil alarm |

---

## GÜVENLİK KONTROL

| # | Kural | Detay |
|---|-------|-------|
| 1 | Token gizliliği | Bot token environment variable'da, kodda DEĞİL |
| 2 | Webhook doğrulama | Secret token ile Telegram'dan geldiği doğrulanır |
| 3 | Kullanıcı kısıtlama | Sadece yetkili Telegram ID'ler komut çalıştırabilir |
| 4 | Komut yetki kontrolü | Her komut yetki seviyesi kontrol edilir |
| 5 | Spam koruma | Aynı komut 5sn içinde tekrar → engel |
| 6 | Bot veri erişim sınırı | Bot sadece okuma yapar, veri DEĞİŞTİREMEZ |
| 7 | Log kaydı | Tüm bot komutları loglanır |
| 8 | Hata bildirimi | Bot hatası otomatik loga yazılır |

---

## İŞLETMEYE FAYDA ANALİZİ

| Artı | Eksi |
|------|------|
| Uzaktan anlık kontrol | Telegram bağımlılığı |
| Hızlı bildirim | İnternet kesilirse çalışmaz |
| Kolay kullanım | Sınırlı arayüz |
| Ücretsiz platform | Güvenlik riski (token sızması) |

---

## TEKNOLOJİ ALTYAPISI

| Teknoloji | Amaç |
|-----------|------|
| node-telegram-bot-api | Bot framework |
| Webhook | Gerçek zamanlı mesaj alma |
| Supabase | Veri okuma |
| Redis | Komut kuyruğu |
| APScheduler | Zamanlanmış raporlar |

---

## VERİTABANI TABLOLARI
```
telegram_komutlar
telegram_loglar
telegram_bildirimler
telegram_yetkiler
telegram_ayarlar
```

---

## BOT AKIŞ DİYAGRAMI
```
Sistem Olayı → Bot Servis → Telegram API → Patron Telefonu
                                               ↓
                                         Komut Yanıtı
                                               ↓
                                     Bot Servis → Sistem İşlemi
```
