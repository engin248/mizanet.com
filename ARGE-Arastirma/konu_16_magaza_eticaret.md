# KONU 16: MAĞAZA & E-TİCARET MODÜLÜ
> Amaç: Üretilen ürünün satış takibi, müşteri analizi, stok yönetimi ve satış verisiyle sisteme geri besleme

---

## MODÜL AKIŞI
```
Paketleme → Mağaza Stok Girişi → Satış → Müşteri Kaydı → Satış Analizi → AI Geri Besleme
```

---

## 8 ANA SEKME

### 1. MAĞAZA STOK YÖNETİMİ
**Alt Sekmeler**: Stok girişi, stok sayımı, stok uyarı

| Soru |
|------|
| Ürün kodu |
| Giriş tarihi |
| Giriş adedi (beden bazlı) |
| Mevcut stok |
| Minimum stok uyarı seviyesi |

### 2. SATIŞ TAKİBİ
**Alt Sekmeler**: Günlük satış, satış detayı, ödeme yöntemi

| Soru |
|------|
| Satılan ürün kodu |
| Satış tarihi / saati |
| Satış fiyatı |
| Ödeme yöntemi (nakit / KK / havale) |
| Satış personeli |

### 3. MÜŞTERİ ANALİZİ
**Alt Sekmeler**: Müşteri kaydı, müşteri tipi, satın alma geçmişi

| Soru |
|------|
| Müşteri adı / tipi (perakende / toptan) |
| Müşteri ülkesi |
| Satın alma geçmişi |
| Müşteri segmenti |
| Hangi ürünleri tercih ediyor |

### 4. E-TİCARET ENTEGRASYONU
**Alt Sekmeler**: Online mağaza, ürün listeleme, sipariş takibi

| Soru |
|------|
| Online platform (kendi site / Trendyol / Amazon) |
| Ürün listeleme durumu |
| Online sipariş adedi |
| Kargo takip numarası |
| E-ticaret satış performansı |

### 5. SATIŞ VERİ ANALİZİ
**Alt Sekmeler**: Günlük/haftalık/aylık satış, en çok satan, en az satan

| Soru |
|------|
| En çok satan ürün |
| En az satan ürün |
| Hangi beden en çok satıyor |
| Hangi renk en çok satıyor |
| Sezon bazlı satış trendi |

### 6. İADE YÖNETİMİ
**Alt Sekmeler**: İade kaydı, iade nedeni, iade analizi

| Soru |
|------|
| İade edilen ürün |
| İade nedeni (beden / kalite / renk) |
| İade oranı |
| İade analizi → üretim geri bildirimi |

### 7. KUR HESAPLAMA (TOPTAN)
**Alt Sekmeler**: Döviz kurları, fiyat hesaplama, güncel kur

| Soru |
|------|
| Satış para birimi (TL / USD / EUR) |
| Güncel kur oranı |
| Toptan fiyat hesaplama |
| Kur riski analizi |

### 8. MAĞAZA PERFORMANS
**Alt Sekmeler**: Personel performansı, ciro analizi, hedef takibi

| Soru |
|------|
| Günlük ciro |
| Haftalık hedef vs gerçek |
| Personel bazlı satış adedi |
| Müşteri memnuniyet skoru |

---

## VERİTABANI TABLOLARI
```
magaza_stoklari
satislar
satis_detaylari
musteriler
musteri_gecmisi
iade_kayitlari
eticaret_siparisler
kur_bilgileri
magaza_performanslari
```

---

## SİSTEM GERİ BESLEMESİ
- Satış verisi → Araştırma Modülüne otomatik aktarım
- İade nedeni → Üretim / Tasarım Modülüne uyarı
- Müşteri tercihi → Trend Analizine veri
- En çok satan → Yeniden üretim önerisi
