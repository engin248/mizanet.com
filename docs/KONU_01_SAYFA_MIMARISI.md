# MİZANET — KONU 01: SAYFA MİMARİSİ (KONSOLİDE FİNAL)

> **Belge Kodu:** MZN-K01-FINAL  
> **Tarih:** 10 Nisan 2026 — 10:59 (UTC+3)  
> **Kaynak Dosyalar:**  
> - `mizanet.com/konu_01_sayfa_mimarisi.md` (6KB)  
> - `mizanet.com/sayfa_mimarisi.md` (10KB)  
> - `mizanet.com/SAYFA_MIMARISI_25.md` (12KB)  
> - `mizanet.com/KARARGAH_SAYFA_DETAY.md` (6KB)  
> - `Mizanet/ARCHIVE_ESKI_RAPORLAR/SAYFA_MIMARISI_25.md` (12KB)  
> - `Mizanet/ARCHIVE_ESKI_RAPORLAR/KARARGAH_SAYFA_DETAY.md` (6KB)  
> - `Mizanet/docs/MIZANET_MASTER_REFERANS.md` Bölüm 4 (ilgili kısımlar)  
> **Varsayım:** SIFIR — Canlı kod (`src/app/`) ile doğrulanmıştır

---

## 1. GENEL SAYFA DÜZENİ (TÜM SAYFALAR İÇİN ORTAK)

### Grid Yapısı
```
┌─────────────────────────────────────────────────┐
│  ÜST BİLGİ BAR                                  │
│  (sayfa adı, arama, bildirimler, kullanıcı,     │
│   dil seçimi TR/AR, tarih+saat)                  │
├────────┬──────────────────────────┬──────────────┤
│  SOL   │   ANA ÇALIŞMA ALANI     │  SAĞ YARDIM  │
│  MENÜ  │   (kart sistemi)        │  PANELİ      │
│ (modül │   (sayfaya göre)        │  (hızlı      │
│  list) │                          │   bilgi)     │
├────────┴──────────────────────────┴──────────────┤
│  ALT DURUM BAR                                    │
│  (sistem durumu, aktif kullanıcı, senkronizasyon)│
└─────────────────────────────────────────────────┘
```

### Renk Sistemi

| Kullanım | Renk | Hex Kodu |
|----------|------|----------|
| **Ana renk** | Zümrüt Yeşili | `#046A38` |
| **Vurgu** | Koyu Gold | `#C8A951` |
| **Destek** | Yumuşak Mavi | `#4F7CAC` |
| **Arka plan** | Açık Gri | `#F4F6F7` |
| **Kart arka plan** | Beyaz | `#FFFFFF` |
| **Metin** | Koyu Gri | `#2D3436` |

### Durum Renk Kodları

| Renk | Hex | Anlam |
|------|-----|-------|
| 🟢 Yeşil | `#27AE60` | Normal — sorun yok |
| 🟡 Sarı | `#F39C12` | Dikkat — risk |
| 🔴 Kırmızı | `#E74C3C` | Sorun — acil müdahale |
| 🔵 Mavi | `#3498DB` | Bilgi |

### Tipografi

| Element | Font | Boyut |
|---------|------|-------|
| Başlık | Inter Bold | 20-24px |
| Alt başlık | Inter SemiBold | 16-18px |
| Normal metin | Inter Regular | 14-16px |
| Küçük metin | Inter Light | 12px |
| Sayısal veri | Inter Medium (monospace) | 16px |

### Psikolojik Tasarım Kuralları

1. Ekran kalabalık olmaz — az ve net bilgi
2. Renk sayısı az — 3 ana renk + durum renkleri
3. Veri kart sistemi — bilgiler kutularda
4. Yazı minimum 14px — okunabilir
5. Boşluklar geniş — nefes alan tasarım
6. Animasyon minimal — dikkat dağıtıcı efekt yok
7. İkonlar sade — tek renk, anlaşılır
8. **Amaç:** Çalışan stresini azaltmak, sakinlik + güven hissi

---

## 2. SAYFA LİSTESİ — PLAN vs GERÇEK KOD KARŞILAŞTIRMASI

### Planlanan 25 Sayfa vs Koddaki 32 Sayfa

| # | Planlanan Sayfa | Route | Kodda | Feature | Durum |
|---|----------------|-------|-------|---------|-------|
| 1 | Karargâh | `/karargah` | ✅ | ✅ | MEVCUT |
| 2 | AR-GE & Tasarım | `/arge` | ✅ | ✅ | MEVCUT |
| 3 | Kumaş Arşivi | `/kumas` | ✅ | ✅ | MEVCUT |
| 4 | Modelhane | `/modelhane` | ✅ | ✅ | MEVCUT |
| 5 | Kalıp | `/kalip` | ✅ | ✅ | MEVCUT |
| 6 | Kesimhane | `/kesim` | ✅ | ✅ | MEVCUT |
| 7 | İmalat | `/imalat` | ✅ | ✅ | MEVCUT |
| 8 | Maliyet | `/maliyet` | ✅ | ✅ | MEVCUT |
| 9 | Muhasebe | `/muhasebe` | ✅ | ✅ | MEVCUT |
| 10 | Kasa | `/kasa` | ✅ | ✅ | MEVCUT |
| 11 | Stok | `/stok` | ✅ | ✅ | MEVCUT |
| 12 | Katalog | `/katalog` | ✅ | ✅ | MEVCUT |
| 13 | Siparişler | `/siparisler` | ✅ | ✅ | MEVCUT |
| 14 | Müşteriler | `/musteriler` | ✅ | ✅ | MEVCUT |
| 15 | Personel | `/personel` | ✅ | ✅ | MEVCUT |
| 16 | Görevler | `/gorevler` | ✅ | ✅ | MEVCUT |
| 17 | Kameralar | `/kameralar` | ✅ | ✅ | MEVCUT |
| 18 | Ajanlar | `/ajanlar` | ✅ | ✅ | MEVCUT |
| 19 | Denetmen | `/denetmen` | ✅ | ✅ | MEVCUT |
| 20 | Raporlar | `/raporlar` | ✅ | ✅ | MEVCUT |
| 21 | Tasarım | `/tasarim` | ✅ | ✅ | MEVCUT |
| 22 | Üretim | `/uretim` | ✅ | ✅ | MEVCUT |
| 23 | Güvenlik | `/guvenlik` | ✅ | ✅ | MEVCUT |
| 24 | Ayarlar | `/ayarlar` | ✅ | ✅ | MEVCUT |
| 25 | Giriş | `/giris` | ✅ | ✅ | MEVCUT |

### Kodda Var Ama Planda Yok (Eklenen Sayfalar)

| # | Sayfa | Route | Açıklama |
|---|-------|-------|----------|
| 26 | Haberleşme | `/haberlesme` | Şifreli mesajlaşma |
| 27 | ARGE Karantina | `/arge/karantina` | Karantina ürünleri |
| 28 | ARGE Test Paneli | `/arge_test_paneli` | Test arayüzü |
| 29 | Üretim Kiosk | `/uretim-kiosk` | Kiosk terminali |
| 30 | Sistem Raporu | `/sistem-raporu` | Sistem durumu |
| 31 | Karargah Telsiz | `/karargah/telsiz` | Askeri haberleşme |
| 32 | Odalar | `/odalar/albay`, `/odalar/basmimar`, `/odalar/mufettis` | Özel AI odaları |

---

## 3. SAYFA DETAYLARI

### 3.1 KARARGÂH (`/karargah`)

**Rol:** Tüm sistemi TEK ekrandan izleme, yönetme ve yetkilendirme.

**Paneller:**

| Panel | Konum | İçerik |
|-------|-------|--------|
| Üst Kontrol Bar | Üst | Sistem durumu (aktif/pasif), aktif kullanıcı, bildirimler, acil durum butonu |
| Sistem Navigasyonu | Sol | 25+ modül listesi + durum ışığı (yeşil/sarı/kırmızı) |
| Operasyon Akış Diyagramı | Merkez | `AR-GE → TASARIM → MODELHANE → KALIP → KESİM → İMALAT → STOK → SATIŞ` |
| Modül Kartları | Merkez | Her modülün anlık durumu (aktif iş, bekleyen iş, geciken iş) |
| Analiz Paneli | Sağ | Trend Radar, satış analiz, stok analiz, risk analiz |
| Ajan Kontrol | Sağ-Alt | Agent durumları, raporlar, öneriler |
| Canlı Sistem Durumu | Alt | Üretim, sipariş, stok, maliyet anlık göstergeleri |

**Popup Pencereler:**
- Kullanıcı Yetki Yönetimi (ekle/sil/rol/yetki)
- Sistem Uyarıları
- Hızlı Görev Atama

**Yetki Seviyeleri:**

| Seviye | Erişim |
|--------|--------|
| Karargâh | Tüm modüller + yetki yönetimi |
| Yönetici | Kendi departmanı + alt birimler |
| Departman | Kendi modülü |
| Operatör | Kendi görevleri |
| İzleyici | Sadece okuma |

**Veri Paylaşımı:** TÜM modüllerle (okuma + yazma + yetki yönetimi)

**Kontrol Kuralları:**
1. Karargâh tüm modüllere erişir
2. Yetki verme/alma SADECE Karargâh'tan yapılır
3. Tüm işlem kayıtları loglanır
4. Loglar silinemez
5. Tüm sistem hareketleri raporlanır

---

### 3.2 AR-GE & TASARIM (`/arge`)

**Rol:** Satılabilir ürün araştırması — trend avlamak, ürün seçmek

| Panel | İçerik |
|-------|--------|
| Trend Listesi | Yükselen ürünler (TikTok/IG/Pinterest) |
| Satış Doğrulama | Trendyol satış kontrolü |
| Rakip Analiz | Rakip yeni ürünler, fiyat farkı |
| Ürün Fikir Havuzu | Onaylanan konseptler |
| Trend Grafikler | 24saat/3gün/7gün zaman serisi |
| Trend Puanı | TrendScore + FırsatScore |

**Karar:** ÜRET / GİR / BEKLE / İPTAL
**Paylaşım:** Modelhane, Kumaş, Tasarım

---

### 3.3 KUMAŞ ARŞİVİ (`/kumas`)

**Rol:** Tüm kumaş verisi

| Sütun | Bilgi |
|-------|-------|
| Kumaş adı | — |
| Kumaş türü | Örme/dokuma |
| Gramaj | g/m² |
| İçerik | %pamuk/%polyester |
| Esneklik | Var/yok |
| En (cm) | Kumaş eni |
| Renk | Mevcut renkler |
| Stok | Metre |
| Fiyat | ₺/m |
| Tedarikçi | Firma adı |

**Paylaşım:** Modelhane, Kalıp, Maliyet, Kesim

---

### 3.4 MODELHANE (`/modelhane`)

**Rol:** İlk prototip üretim — numune hazırlama

- Model kartı (ad, sezon, kumaş, renk)
- Ölçü tablosu (tüm bedenler)
- Prova kayıtları (video + fotoğraf) — **ZORUNLU**
- Revizyon geçmişi
- **Kural:** Her model görsel + sesli kayıtla sisteme girilir
- **Paylaşım:** Kalıp, İmalat, Tasarım

---

### 3.5 KALIP (`/kalip`)

**Rol:** Ürün kalıp sistemi — beden serisi, dikiş payı, kesim planı

- Kalıp listesi + DXF görseli
- Beden serisi tablosu (S-M-L-XL-XXL)
- Dikiş payı bilgisi
- Kesim planı (kumaş en × yerleşim)
- **Paylaşım:** Kesim, Modelhane, Maliyet

---

### 3.6 KESİMHANE (`/kesim`)

**Rol:** Kumaş kesimi — pastal planı, fire kontrolü

- Kesim planı listesi + pastal yerleşimi
- Kumaş tüketimi hesabı + fire oranı
- **Paylaşım:** İmalat, Stok, Maliyet

---

### 3.7 İMALAT (`/imalat`)

**Rol:** Dikiş üretimi — operasyon takibi, kalite kontrol

- İş emri listesi
- Operasyon listesi (adım, makine türü, işlem süresi, zorluk)
- Üretim takip (adet/saat/gün)
- Kalite kontrol sonuçları
- Çalışan atama
- **Kural:** Her operasyon video/fotoğraf ile kayıt. İnisiyatif yok — talimat sistemden gelir
- **Paylaşım:** Stok, Maliyet, Raporlar

---

### 3.8 MALİYET (`/maliyet`)

**Rol:** Ürün maliyet hesaplama

- Kumaş + aksesuar + işçilik + genel gider = Toplam maliyet
- Önerilen satış fiyatı, kâr marjı %
- Hedef vs gerçek karşılaştırma
- **Paylaşım:** Muhasebe, Kasa, Karargâh

---

### 3.9 MUHASEBE (`/muhasebe`)

- Gelir/gider tablosu, faturalar, vergi
- **Yetki:** Karargâh + Muhasebe yetkisi

### 3.10 KASA (`/kasa`)

- Günlük kasa durumu, ödeme kayıtları, alacak/borç

### 3.11 STOK (`/stok`)

- Depo stok, mağaza stok, kritik stok uyarıları, stok hareket geçmişi
- **Paylaşım:** Sipariş, Katalog, Karargâh

### 3.12 KATALOG (`/katalog`)

- Ürün görselleri, açıklamalar, fiyat, beden/renk seçenekleri

### 3.13 SİPARİŞLER (`/siparisler`)

- Sipariş tablosu (tarih, müşteri, ürün, adet, durum)
- Üretim durumu bağlantısı, sevkiyat takibi

### 3.14 MÜŞTERİLER (`/musteriler`)

- Müşteri kartı (ad, iletişim, adres)
- Satın alma geçmişi, favori ürünler
- **Yetki:** Kişisel veri — sınırlı erişim

### 3.15 PERSONEL (`/personel`)

- Çalışan profili + performans kaydı + beceri matrisi
- **Kural:** Şeffaf, adil, ölçülebilir performans takibi

### 3.16 GÖREVLER (`/gorevler`)

- Görev listesi, tamamlanan işler, geciken görevler

### 3.17 KAMERALAR (`/kameralar`)

- Canlı kamera görüntüleri (12 adet Necron)
- Kayıt arşivi, makine/hat bazlı görüntü

### 3.18 AJANLAR (`/ajanlar`)

- 12 AI ajan listesi + durum + rapor + kontrol

### 3.19 DENETMEN (`/denetmen`)

- İşlem denetimi, hata raporları, düzeltme takibi

### 3.20 RAPORLAR (`/raporlar`)

- Satış, üretim, maliyet, trend, performans raporları

### 3.21 TASARIM (`/tasarim`)

- Çizim editörü, desen sistemi, renk paleti

### 3.22 ÜRETİM (`/uretim`)

- Üretim takvimi, kapasite planı, hat yükü

### 3.23 GÜVENLİK (`/guvenlik`)

- Kullanıcı yetkileri, erişim logları, güvenlik uyarıları

### 3.24 AYARLAR (`/ayarlar`)

- Dil (TR/AR), modül ayarları, bildirim, tema

### 3.25 GİRİŞ (`/giris`)

- Kullanıcı giriş + 2FA doğrulama + şifre sıfırlama

---

## 4. VERİ AKIŞ HARİTASI

```
AR-GE → TASARIM → MODELHANE → KALIP → KESİM → İMALAT → STOK → SATIŞ
  ↓        ↓          ↓         ↓        ↓        ↓        ↓       ↓
Kumaş   Tasarım    Kalıp     Kesim   İmalat    Stok   Katalog  Müşteri
  ↓                                      ↓        ↓       ↓       ↓
Maliyet ←────────────────────────────── İşçilik   Fire  Sipariş  Kasa
  ↓                                                        ↓
Muhasebe ←─────────────────────────────────────────────── Kasa
```

## 5. DİL DESTEĞİ

- Ana dil: **Türkçe**
- İkinci dil: **Arapça**
- RTL uyum zorunlu
- Çok dilli genişleme: mümkün

## 6. GENEL SİSTEM KURALLARI (SAYFA BAZLI)

1. Tüm işlemler kayıt altına alınır
2. Ses + video kayıt zorunlu (üretim işlemleri)
3. İşlem geçmişi silinemez
4. Yetki tabanlı erişim (5 seviye)
5. Çok dilli: TR + AR
6. Günlük/haftalık/aylık performans kayıtları
7. Herkes sadece kendi yetki alanındaki bilgilere erişir

---

> **Bu belge, 6 farklı kaynak dosyadan konsolide edilmiş ve canlı kodla doğrulanmış TEK REFERANS kaynağıdır.**  
> **Kaynak dosyalar konsolidasyon tamamlandıktan sonra tasfiye edilecektir.**
