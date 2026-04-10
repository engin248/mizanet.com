# MAĞAZA & E-TİCARET MODÜLÜ
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_16_magaza_eticaret.md  
> **Amaç:** Üretilen ürünün satış takibi, müşteri analizi, stok yönetimi ve AI geri besleme

---

## 1. MODÜL AKIŞI
```
Paketleme → Mağaza Stok Girişi → Satış → Müşteri Kaydı → Satış Analizi → AI Geri Besleme
```

---

## 2. 8 ANA SEKME

### 2.1 Mağaza Stok Yönetimi
- Stok girişi, stok sayımı, stok uyarı
- Ürün kodu, giriş tarihi, giriş adedi (beden bazlı), mevcut stok, minimum stok uyarı seviyesi

### 2.2 Satış Takibi
- Günlük satış, satış detayı, ödeme yöntemi
- Satılan ürün kodu, satış tarihi/saati, satış fiyatı, ödeme yöntemi (nakit/KK/havale), satış personeli

### 2.3 Müşteri Analizi
- Müşteri kaydı, müşteri tipi, satın alma geçmişi
- Müşteri adı/tipi (perakende/toptan), ülkesi, satın alma geçmişi, segmenti, tercih ettiği ürünler

### 2.4 E-Ticaret Entegrasyonu
- Online mağaza, ürün listeleme, sipariş takibi
- Platform (kendi site/Trendyol/Amazon), listeleme durumu, online sipariş adedi, kargo takip, performans

### 2.5 Satış Veri Analizi
- Günlük/haftalık/aylık satış, en çok satan, en az satan
- En çok satan ürün/beden/renk, sezon bazlı trend

### 2.6 İade Yönetimi
- İade kaydı, iade nedeni, iade analizi
- İade nedeni (beden/kalite/renk), iade oranı, iade → üretim geri bildirimi

### 2.7 Kur Hesaplama (Toptan)
- Döviz kurları, fiyat hesaplama, güncel kur
- Satış para birimi, güncel kur oranı, toptan fiyat hesaplama, kur riski analizi

### 2.8 Mağaza Performans
- Personel performansı, ciro analizi, hedef takibi
- Günlük ciro, haftalık hedef vs gerçek, personel bazlı satış, müşteri memnuniyet skoru

---

## 3. VERİTABANI TABLOLARI

| Tablo | Amaç |
|-------|------|
| magaza_stoklari | Mağaza stok kayıtları |
| satislar | Satış kayıtları |
| satis_detaylari | Satış detay verileri |
| musteriler | Müşteri kartları |
| musteri_gecmisi | Müşteri satın alma geçmişi |
| iade_kayitlari | İade kayıtları |
| eticaret_siparisler | E-ticaret siparişleri |
| kur_bilgileri | Döviz kur bilgileri |
| magaza_performanslari | Mağaza performans metrikleri |

---

## 4. SİSTEM GERİ BESLEMESİ

| Kaynak | Hedef | Veri |
|--------|-------|------|
| Satış verisi | → Araştırma Modülü | Otomatik aktarım |
| İade nedeni | → Üretim / Tasarım | Uyarı |
| Müşteri tercihi | → Trend Analizi | Veri |
| En çok satan | → Üretim | Yeniden üretim önerisi |

---

## 5. 188 KRİTERDEN MAĞAZA (Kriter 43-48)

| # | Kriter |
|---|--------|
| 43 | Satış takibi fonksiyonel mi |
| 44 | Stok yönetimi doğru mu |
| 45 | Müşteri analizi çalışıyor mu |
| 46 | İade yönetimi var mı |
| 47 | E-ticaret entegrasyonu var mı |
| 48 | Satış analizi raporlanıyor mu |

---

> **Bu dosya Mağaza & E-Ticaret modülünün EN ÜST SEVİYE referansıdır.**
