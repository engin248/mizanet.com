# KONU 1: MİZANET 25 SAYFA SİSTEM MİMARİSİ
> Amaç: Her sayfanın içeriği, düzeni, panelleri, renkleri ve paylaştığı veriler

---

## GENEL SAYFA TASARIM STANDARDI

### Grid Yapısı (Tüm Sayfalar İçin Ortak)
```
---------------------------------------------------------
ÜST BİLGİ BAR (sayfa adı, arama, bildirim, kullanıcı, dil, saat)
---------------------------------------------------------
SOL MENÜ       |  ANA ÇALIŞMA ALANI  |  SAĞ YARDIM PANELİ
(25 modül)     |  (sayfaya göre)     |  (hızlı bilgi)
---------------------------------------------------------
ALT DURUM BAR (sistem durumu, aktif kullanıcı, senkronizasyon)
---------------------------------------------------------
```

### Renk Sistemi
| Kullanım | Renk | Kod |
|----------|------|-----|
| Ana renk | Zümrüt Yeşili | `#046A38` |
| Vurgu | Koyu Gold | `#C8A951` |
| Destek | Yumuşak Mavi | `#4F7CAC` |
| Arka plan | Açık Gri | `#F4F6F7` |
| Uyarı normal | Yeşil | — |
| Uyarı dikkat | Sarı | — |
| Uyarı sorun | Kırmızı | — |

### Psikolojik Tasarım Kuralları
1. Ekran kalabalık olmaz
2. Renk sayısı az olur
3. Veri kart sistemi kullanılır
4. Yazı okunabilir olur
5. Boşluklar geniş olur
6. **Amaç**: çalışan stresini azaltmak, sakinlik + güven hissi

---

## 25 SAYFA DETAY

### 1. KARARGÂH (`/karargah`)
- **Rol**: Tüm sistemi tek ekrandan izleme, yönetme, yetkilendirme
- **Özellik**: TEK sayfada BÜTÜN sistem. Tüm modüllere erişim + yetki verme/alma

**Paneller:**
| Panel | İçerik |
|-------|--------|
| Üst Kontrol Bar | Sistem durumu, aktif kullanıcı, bildirimler, acil durum butonu, kullanıcı yönetimi |
| Sol Panel | 25 modül listesi (durum ışığı + hızlı erişim) |
| Merkez Operasyon | Üretim zinciri akış diyagramı (AR-GE→Tasarım→Modelhane→Kalıp→Kesim→İmalat→Stok→Satış) |
| Sağ Analiz | Trend Radar, satış/stok/risk analizi |
| Alt Canlı Durum | Üretim, sipariş, stok, maliyet canlı göstergeleri |

**Popup Pencereler:** Yetki yönetimi, sistem uyarıları, hızlı görev atama

**Veri Paylaşımı:** Tüm modüller (okuma + değiştirme + yetki yönetimi)

---

### 2. AR-GE & TASARIM (`/arge`)
- **Rol**: Satılabilir ürün araştırması
- **Ana Panel**: Trend araştırma
- **Kartlar**: Trend listesi, ürün fikirleri, rakip analiz
- **Orta Alan**: Trend grafikleri
- **Sağ Panel**: Trend puanı, satış ihtimali
- **Sorular**: Nerede satılıyor, fiyat bandı, yaş grubu, sezon, satış hacmi
- **Veri**: Sosyal medya trendleri, e-ticaret satış, moda verileri, kumaş talep
- **Paylaşım**: Modelhane, Kumaş, Tasarım

### 3. KUMAŞ ARŞİVİ (`/kumas`)
- **Rol**: Tüm kumaş verisi
- **Ana Alan**: Kumaş listesi (tablo: ad, gramaj, içerik, stok, fiyat)
- **Sağ Panel**: Kumaş özellikleri detay
- **Paylaşım**: Modelhane, Kalıp, Maliyet

### 4. MODELHANE (`/modelhane`)
- **Rol**: İlk prototip üretim
- **Ana Alan**: Model kartı (ad, sezon, kumaş, ölçü)
- **Orta Alan**: Model görselleri
- **Alt Pencereler**: Ölçü tablosu, prova kayıtları, revizyon geçmişi
- **Paylaşım**: Kalıp, İmalat

### 5. KALIP (`/kalip`)
- **Rol**: Ürün kalıp sistemi
- **Ana Alan**: Kalıp listesi + kalıp görseli
- **Alt Pencereler**: Kalıp çizimi, beden serisi, dikiş payı, kesim planı
- **Paylaşım**: Kesim, Modelhane

### 6. KESİMHANE (`/kesim`)
- **Rol**: Kumaş kesimi
- **Ana Panel**: Kesim planı + pastal yerleşimi
- **Veri**: Kesim verimi, fire oranı
- **Paylaşım**: İmalat, Stok

### 7. İMALAT (`/imalat`)
- **Rol**: Dikiş üretimi
- **Ana Alan**: Üretim hattı (operasyon, çalışan, süre kartları)
- **Alt Pencereler**: İş emri, operasyon listesi, üretim takibi, kalite kontrol
- **Paylaşım**: Stok, Maliyet

### 8. MALİYET (`/maliyet`)
- **Rol**: Ürün maliyet hesaplama
- **Ana Alan**: Ürün maliyet tablosu (ham maliyet, işçilik, genel gider)

### 9. MUHASEBE (`/muhasebe`)
- **Rol**: Finans kayıtları
- **Ana Alan**: Gelir/gider, faturalar, vergi

### 10. KASA (`/kasa`)
- **Rol**: Nakit kontrol
- **Ana Alan**: Günlük kasa, ödeme kayıtları

### 11. STOK (`/stok`)
- **Rol**: Ürün stok yönetimi
- **Ana Alan**: Stok listesi (depo stok, mağaza stok, kritik stok)

### 12. KATALOG (`/katalog`)
- **Rol**: Satış kataloğu
- **Ana Alan**: Ürün görselleri + açıklamalar

### 13. SİPARİŞLER (`/siparisler`)
- **Rol**: Sipariş yönetimi
- **Ana Alan**: Sipariş tablosu + üretim durumu

### 14. MÜŞTERİLER (`/musteriler`)
- **Rol**: Müşteri verisi
- **Ana Alan**: Müşteri kartı + satın alma geçmişi

### 15. PERSONEL (`/personel`)
- **Rol**: Çalışan sistemi
- **Ana Alan**: Personel kartları + performans

### 16. GÖREVLER (`/gorevler`)
- **Rol**: İş yönetimi
- **Ana Alan**: Görev listesi + tamamlanan işler

### 17. KAMERALAR (`/kameralar`)
- **Rol**: Üretim izleme
- **Ana Alan**: Canlı kamera + kayıt

### 18. AJANLAR (`/ajanlar`)
- **Rol**: AI agent sistemi
- **Ana Alan**: AI ajan listesi (trend, stok, satış, üretim, maliyet agent)

### 19. DENETMEN (`/denetmen`)
- **Rol**: Sistem kontrol
- **Ana Alan**: İşlem denetimi + hata raporu

### 20. RAPORLAR (`/raporlar`)
- **Rol**: Analiz
- **Ana Alan**: Rapor grafik (satış, üretim)

### 21. TASARIM (`/tasarim`)
- **Rol**: Ürün çizimi
- **Ana Alan**: Çizim editörü + desen sistemi

### 22. ÜRETİM (`/uretim`)
- **Rol**: Tüm üretim planı
- **Ana Alan**: Üretim takvimi + kapasite planı

### 23. GÜVENLİK (`/guvenlik`)
- **Rol**: Sistem güvenliği
- **Ana Alan**: Kullanıcı yetkileri + erişim logları

### 24. AYARLAR (`/ayarlar`)
- **Rol**: Sistem yapılandırması
- **Ana Alan**: Dil ayarı, modül ayarı

### 25. GİRİŞ (`/giris`)
- **Rol**: Kimlik doğrulama
- **Ana Alan**: Kullanıcı giriş + 2FA doğrulama

---

## SİSTEM KURALLARI
- Tüm işlemler kayıt altına alınır
- Ses + video kayıt zorunlu (üretim işlemleri)
- İşlem geçmişi silinemez
- Yetki tabanlı erişim
- Çok dilli: Ana dil Türkçe, Arapça ikinci dil
- Günlük/haftalık/aylık performans kayıtları
- Herkes sadece kendi yetki alanındaki bilgilere ulaşır
