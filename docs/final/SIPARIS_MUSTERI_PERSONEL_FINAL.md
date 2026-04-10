# SİPARİŞ + MÜŞTERİ + PERSONEL + KATALOG + RAPORLAR + GÖREV
> **Versiyon:** FINAL 2.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_toplama, feature dosyaları, hooks

---

## 1. SİPARİŞ MODÜLÜ (/siparisler)

**Amaç:** B2B/toptancı/e-ticaret siparişlerini üretim emrine çevirme

### Temel İşlevler
- Sipariş oluşturma (ürün, adet, beden, renk, müşteri)
- Teslim tarihi ve geri sayım
- Sipariş durumu (beklemede / üretimde / tamamlandı / sevk edildi)
- İptal gerekçeli kayıt zorunlu

### Akıllı Teslimat Geri Sayımı
```
5000 adet × 15 gün = günde 334 adet gerekli
Gerçek: günde 200 → "10 gün GEÇ KALABİLİRSİN!" panik butonu
```

### Karlılık Simülatörü
```
Maliyet(M2) + Kumaş(M3) + İşçi = Toplam
"300TL fiyat ama 310TL maliyet → ZARAR!" uyarısı
Min %30 kâr kilidi → Kâr marjı altı sipariş → SİSTEM BLOKE
```

### DB Tabloları
siparisler, siparis_urunleri, siparis_durumu, siparis_gecmisi

### Hook: `useSiparis.js`
Sipariş CRUD + durum güncellemesi + filtre

---

## 2. MÜŞTERİ MODÜLÜ (/musteriler)

**Amaç:** Müşteri kartı, sipariş geçmişi, borç/alacak takibi

### Müşteri Kartı
| Alan | Detay |
|------|-------|
| Ad/Soyad | Zorunlu |
| Firma adı | Toptancı için |
| Adres | Teslimat adresi |
| Telefon / E-posta | İletişim |
| Vergi No | Fatura için |
| Müşteri Tipi | Perakende / Toptan / B2B |
| Ülke | Coğrafya segmentasyonu |

### Analiz Alanları
- Satın alma geçmişi
- Borç/alacak durumu
- En çok aldığı ürün kategorisi
- Müşteri segmenti (VIP / Normal / Yeni)

### KVKK Uyumu
- Kişisel veriler şifreli saklanır
- Silme talebi → soft delete + arşiv
- Veri paylaşımı izne tabi

### DB Tabloları
musteriler, musteri_gecmisi, musteri_adresleri

---

## 3. PERSONEL MODÜLÜ (/personel)

**Amaç:** Personel kartı, izin takibi, performans, adil ücret

### Personel Kartı
| Alan | Detay |
|------|-------|
| Ad/Soyad, TC | Kimlik |
| Pozisyon | Operatör / Usta / Yönetici |
| Departman | Kesim / Bant / Paketleme |
| Giriş tarihi | İşe başlama |
| Maaş tipi | Sabit / Parça başı / Karma |
| Beceri seviyesi | 1-5 skala |

### Performans Takibi
- Günlük üretim adedi
- Hata oranı
- İşlem süresi
- Devamsızlık
- Kalite puanı

### Ücret Entegrasyonu (→ Adalet Sistemi)
```
Aylık Maaş = Sabit Taban + (Günlük Performanslar × Birim Ücret × Kalite Katsayısı) + Prim
```

### Eksik
- Otonom giriş-çıkış (kamera/QR ile otomatik)
- Parça başı performans şeması (Şampiyon / Normal / Yavaş)
- İzin otomasyonu (Telegram onay)

### DB Tabloları
personel, personel_izinleri, performans_kayitlari

### Hook: `usePersonel.js`
Personel CRUD + performans sorgu + departman filtre

---

## 4. KATALOG MODÜLÜ (/katalog)

**Amaç:** Ürün kataloğu, beden/renk varyantları, fiyat yönetimi

### Ürün Kartı
| Alan | Detay |
|------|-------|
| Ürün adı | Zorunlu |
| Ürün kodu | Otomatik üretim |
| Fotoğraf | Çoklu görsel |
| Bedenler | S/M/L/XL/XXL varyantları |
| Renkler | Renk varyantları |
| Fiyat | Liste / Toptan / İndirimli |
| Stok | Beden × Renk bazlı |

### Entegrasyonlar
- Trendyol/web ürün listeleme
- Ürün versiyonlama zorunlu (V1, V2...)
- QR kod ile stok bağlantısı

### DB Tabloları
urunler, urun_varyantlari, urun_gorselleri, urun_fiyatlari

---

## 5. RAPORLAR (/raporlar)

### Rapor Türleri
| Rapor | Periyot | İçerik |
|-------|---------|--------|
| Satış raporu | Günlük/Haftalık/Aylık | Satılan ürün, ciro, kâr |
| Üretim raporu | Günlük/Haftalık | Üretim adedi, verimlilik |
| Stok raporu | Haftalık | Kritik stok, hareket |
| Personel raporu | Aylık | Performans, devamsızlık |
| Maliyet raporu | Aylık | Maliyet karşılaştırma |
| KPI dashboard | Anlık | Özet metrikler |

### Çıktı Formatları
- Ekran üstü dashboard
- PDF export
- Excel export (XLSX)
- Telegram özet rapor

---

## 6. GÖREV YÖNETİMİ (/gorevler)

### Görev Yapısı
| Alan | Detay |
|------|-------|
| Başlık | Görev tanımı |
| Departman | Hedef departman |
| Atanan kişi | Sorumlu personel |
| Öncelik | P0 / P1 / P2 / P3 |
| Son tarih | Deadline |
| Durum | Beklemede / Devam / Tamamlandı / İptal |

### Telegram Entegrasyonu
- `/gorev [açıklama]` ile uzaktan görev oluşturma
- Görev atandığında bildirim
- Tamamlandığında patrona Telegram raporu

---

## 7. VERİ PAYLAŞIM MATRİSİ

| Modül | Paylaşım |
|-------|----------|
| Sipariş → | Üretim (iş emri), Stok (çıkış), Kasa (ödeme) |
| Müşteri → | Sipariş (müşteri kartı), Raporlar (analiz) |
| Personel → | Üretim (performans), Muhasebe (maaş) |
| Katalog → | Sipariş (ürün seçimi), Stok (stok bağlantısı) |
| Raporlar ← | TÜM modüllerden veri alır |

---

## 8. CUSTOM HOOKS

| Hook | Görev |
|------|-------|
| `useSiparis.js` | Sipariş CRUD + filtre |
| `usePersonel.js` | Personel CRUD + performans |
| `useStok.js` | Stok CRUD + alarm |
| `useMuhasebe.js` | Muhasebe verileri |
| `useKumas.js` | Kumaş verileri |
| `useUretim.js` | Üretim verileri |

---

> **Bu dosya operasyon modüllerinin EN ÜST SEVİYE referansıdır.**
