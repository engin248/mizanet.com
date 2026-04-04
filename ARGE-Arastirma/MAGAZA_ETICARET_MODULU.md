# MAĞAZA + E-TİCARET + SATIŞ ANALİZ MODÜLÜ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları
> Amaç: Bitmiş ürünün satışı, müşteri takibi ve geri besleme

---

## MODÜL AKIŞI

```
Depo/Paketleme → Mağaza Stok → Satış → Müşteri Kaydı → Satış Analizi → AI Geri Besleme
```

---

## 1. MAĞAZA STOK TAKİBİ

**Alt Sekmeler:** mağaza stok, depo stok, kritik stok

| Soru |
|---|
| Ürün adı/kodu |
| Beden dağılımı |
| Renk dağılımı |
| Mevcut stok adedi |
| Minimum stok seviyesi |
| Kritik stok uyarısı |

---

## 2. SATIŞ TAKİBİ

**Alt Sekmeler:** günlük satış, satış geçmişi, satış trend

| Soru |
|---|
| Satış tarihi |
| Satılan ürün |
| Satış adedi |
| Satış fiyatı |
| Ödeme yöntemi (nakit/kart) |
| Satış yapan personel |

---

## 3. MÜŞTERİ KAYDI

**Alt Sekmeler:** müşteri bilgi, satın alma geçmişi, müşteri analiz

| Soru |
|---|
| Müşteri adı |
| Müşteri ülkesi |
| Müşteri iletişim |
| Satın aldığı ürünler |
| Satın alma tarihleri |
| Toplam harcama |

---

## 4. ÜRÜN PERFORMANS ANALİZİ

| Analiz | Amaç |
|---|---|
| Satış hızı | Günlük/haftalık ne kadar satıldı |
| Beden bazlı satış | Hangi beden çok satıyor |
| Renk bazlı satış | Hangi renk tercih ediliyor |
| Müşteri yaş grubu | Hangi yaş grubu alıyor |
| Müşteri ülke dağılımı | Hangi ülke alıyor |
| İade oranı | İade sebebi |
| Satış süresi | Ürün kaç günde satıldı |

---

## 5. E-TİCARET

**Alt Sekmeler:** online stok, online satış, kargo takip

| Soru |
|---|
| Online platform (Trendyol/kendi site) |
| Online stok durumu |
| Online satış verisi |
| Kargo takip numarası |
| Müşteri değerlendirmesi |

---

## 6. KATALOG YÖNETİMİ

**Alt Sekmeler:** ürün fotoğraf, ürün açıklama, fiyat, beden/renk

| İçerik |
|---|
| Ürün fotoğrafları (ön/arka/detay) |
| Ürün açıklaması |
| Fiyat bilgisi (TL/USD/EUR) |
| Beden seçenekleri |
| Renk seçenekleri |
| Kumaş bilgisi |

---

## 7. SATIŞ → GERİ BESLEME (SİSTEM ÖĞRENMESİ)

| Veri | Nereye Gider |
|---|---|
| Satış hızı | Araştırma → yeni ürün seçimi |
| Müşteri tercihi | Tasarım → model yönlendirme |
| İade sebebi | Kalite → üretim iyileştirme |
| Beden dağılımı | Kalıp → beden serisi düzeltme |
| Stok dönüş hızı | Üretim → miktar planlama |

**Kural:** Stop-Loss → 20 gün satış görmeyen ürün otomatik değerlendirmeye alınır.

---

## VERİTABANI TABLOLARI

- magaza_stok
- satislar
- satis_detay
- musteriler
- musteri_satin_alma
- urun_performans
- iade_kayitlari
- online_satislar
- katalog_urunleri

---

## MODÜL ÇIKTISI

1. Satış raporu (günlük/haftalık/aylık)
2. Müşteri analiz raporu
3. Ürün performans raporu
4. Stok dönüş raporu
5. Geri besleme verisi → AR-GE + Tasarım + Üretim
