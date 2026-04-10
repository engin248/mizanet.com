# İŞLETME 4 BÖLÜM YAPISI + SİSTEM AKIŞI
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_12_isletme_bolum_yapisi.md  
> **Felsefe:** İşletmenin gerçek yapısını sistemde birebir temsil etmek

---

## 1. İŞLETMENİN 4 ANA BÖLÜMÜ

| # | Bölüm | Kapsam |
|---|-------|--------|
| 1 | **İmalat / AR-GE** | Araştırma → Tasarım → Kalıp → Numune → Teknik Föy |
| 2 | **Üretim** | Kesim → Ara İşçilik → Bant Üretimi → Kalite → Paketleme |
| 3 | **Mağaza & E-Ticaret** | Stok → Satış → Müşteri Analizi → Kargo |
| 4 | **Yapay Zeka Ofisi** | Sistem analiz → Veri öğrenme → Öneri → İyileştirme |

---

## 2. UÇTAN UCA SÜREÇ AKIŞI

```
Araştırma (trend verisi, referans model)
   ↓
Tasarım (model tanımı, parça listesi)
   ↓
Kalıp (kalıp dosyası, beden serisi)
   ↓
Numune + Teknik Föy (onaylı numune, işlem sırası, video/ses anlatım)
   ↓
Malzeme / Kumaş Seçimi (BOM, tüketim hesabı)
   ↓
Kesim (kesilmiş parçalar, fire raporu)
   ↓
Ara İşçilik (hazır yarı mamul)
   ↓
Üretim Bandı (tamamlanmış ürün, işçi performans kaydı)
   ↓
Kalite Kontrol (onaylı/düzeltilecek ürün)
   ↓
Temizlik + Paketleme (paketli ürün)
   ↓
Mağaza & E-Ticaret (satış verisi, müşteri analizi)
   ↓
Yapay Zeka Analizi (iyileştirme önerisi → Araştırma'ya geri besleme)
```

---

## 3. 8 ÇEKİRDEK MODÜL

| # | Modül | Görev | Sayfa |
|---|-------|-------|-------|
| 1 | Araştırma/ARGE | İnternet trend/satış araştırması | `/arge` |
| 2 | Tasarım | Ürün tasarımı + model belirleme | `/tasarim` |
| 3 | Teknik Föy | İşlem sırası, zorluk, makine, video/ses | `/kalip` |
| 4 | Malzeme Arşivi | Kumaş/aksesuar/tedarikçi | `/kumas` |
| 5 | Kesim/Üretim | Kesim planı → bant → kalite | `/kesim`, `/uretim` |
| 6 | Mağaza/Satış | Stok, satış, müşteri | `/stok`, `/siparisler` |
| 7 | Finans | Maliyet, kasa, muhasebe | `/maliyet`, `/kasa`, `/muhasebe` |
| 8 | Yapay Zeka | Analiz, öğrenme, iyileştirme | `/arge`, `/denetmen` |

---

## 4. 6 ZORUNLU ARŞİV

| # | Arşiv | İçerik |
|---|-------|--------|
| 1 | Model Arşivi | Tüm modeller ve görselleri |
| 2 | Kumaş Arşivi | Kumaş katalogları, fotoğraflar, tedarikçi |
| 3 | Aksesuar Arşivi | Düğme, fermuar görselleri ve stok |
| 4 | Araştırma Arşivi | Trend referansları |
| 5 | Üretim Video Arşivi | Teknik föy işlem videoları |
| 6 | Ürün Foto Arşivi | Katalog görselleri |

---

## 5. EN KRİTİK MODÜL

> **TEKNİK FÖY MODÜLÜ** — çünkü:
> - Ücret sistemi buradan çıkar
> - Üretim planı buradan çıkar
> - İşlem sırası buradan çıkar
> - Bu modül yanlış olursa BÜTÜN sistem çöker

---

## 6. SİSTEMDE OLMASI GEREKEN 8 ÖZELLİK

1. İnternet araştırma kapasitesi (trend/satış/rakip)
2. Kumaş/aksesuar/malzeme arşivi (görsel + arama)
3. Teknik föy: görsel + sesli + videolu işlem anlatımı
4. İşçi başlangıç-bitiş saati kaydı
5. İşlem zorluk puanı ile adil ücret
6. Kalite kontrol kaydı
7. Mağaza satış + müşteri ülke analizi
8. Sistem kendi kendini geliştirme (AI feedback loop)

---

> **Bu dosya İşletme yapısının EN ÜST SEVİYE referansıdır.**
