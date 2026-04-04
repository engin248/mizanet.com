# MİZANET — SİSTEM MİMARİ ÖLÇEK ANALİZİ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare
> Amaç: Sistemde kaç sayfa, buton, API, tablo olması gerektiğinin referans tablosu

---

## GENEL ÖLÇEK

| Kategori | Gerekli Ortalama |
|---|---|
| Toplam Modül / Sayfa | 17–22 |
| Alt Sayfa / Sekme | 60–90 |
| Toplam İşlem Butonu | 450–650 |
| API Endpoint | 120–180 |
| Veritabanı Tablosu | 45–70 |
| Realtime Kanal | 8–15 |
| Arka Plan Servisi | 10–20 |
| AI Servisi | 3–6 |

---

## MODÜL BAZLI DAĞILIM

| Modül | Sayfa | Buton | API | DB Tablo |
|---|---|---|---|---|
| Karargah | 3 | 30 | 10 | 4 |
| Ar-Ge | 4 | 40 | 12 | 5 |
| Kumaş | 4 | 35 | 10 | 4 |
| Modelhane | 5 | 45 | 14 | 6 |
| Kalıp | 3 | 30 | 9 | 4 |
| Kesim | 4 | 35 | 11 | 4 |
| İmalat | 4 | 38 | 12 | 4 |
| Stok/Depo | 4 | 35 | 11 | 4 |
| Kasa | 3 | 40 | 12 | 4 |
| Muhasebe | 3 | 30 | 10 | 4 |
| Personel | 4 | 42 | 13 | 5 |
| Katalog | 3 | 35 | 10 | 4 |
| Müşteriler | 3 | 30 | 9 | 4 |
| Sipariş | 4 | 40 | 12 | 5 |
| Denetmen | 2 | 25 | 8 | 3 |
| Agent Sistemi | 2 | 20 | 8 | 3 |
| Raporlar | 3 | 28 | 9 | 3 |
| Ayarlar | 2 | 18 | 7 | 3 |
| **TOPLAM** | **61** | **~596** | **~177** | **~69** |

---

## VERİTABANI TABLO YAPISI

### Ana İş Tabloları
kullanicilar, roller, personel, musteriler, siparisler, siparis_urunleri, urunler, stoklar, kumaslar, model_kaliplari, uretim_isleri, fasonlar, sevkiyatlar, kasa_hareketleri, maliyetler

### Sistem Tabloları
b0_sistem_loglari, b0_hata_loglari, b0_islem_gecmisi, b0_performans_metrikleri, b0_retry_queue, b0_offline_queue

### AI/Agent Tabloları
ai_analizler, agent_gorevleri, agent_loglari

---

## GÜVENLİK KATMANLARI

| Katman | Çözüm |
|---|---|
| Authentication | Supabase Auth |
| RBAC | Yetki sistemi |
| SQL Injection | Parametre kontrolü |
| XSS | Input sanitize |
| CSRF | Token doğrulama |
| Rate Limit | API koruma |
| WAF | Cloudflare |
| Audit Log | İşlem geçmişi |
| Şifre | bcrypt hash |
| Veri | AES şifreleme |

---

## FİNANSAL ALTYAPI

| Teknoloji | Aylık Ortalama |
|---|---|
| Supabase | 25–150$ |
| Vercel | 20–100$ |
| Cloudflare | 0–20$ |
| AI servisleri | 10–200$ |
| **Ortalama Toplam** | **55–470 USD/ay** |

---

## TEKNOLOJİ ALTERNATİFLERİ

| Sistem | Artı | Eksi |
|---|---|---|
| Supabase | Hızlı geliştirme | Vendor bağımlılığı |
| Firebase | Stabil | Maliyet artabilir |
| Self-host PostgreSQL | Ucuz | Yönetim zor |

---

## SİSTEMİN İŞLETMEYE FAYDASI

| Alan | Kazanç |
|---|---|
| Üretim kontrolü | +%30 verim |
| Hata azaltma | -%40 |
| Stok kontrolü | +%60 doğruluk |
| Finans kontrolü | +%50 şeffaflık |
| Operasyon hızı | +%35 |
