# ADALET + ŞEFFAFLIK + MANİPÜLASYON KORUMA + MAĞAZA & E-TİCARET
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_19, konu_16, konu_toplama (YENİ DOSYA — daha önce ayrı yoktu)

---

## 1. SİSTEMİN ANA İLKESİ
```
Kararı İNSAN değil VERİ verir.
Ücret tahmine değil ÖLÇÜME dayanır.
Geçmiş kayıtlar DEĞİŞTİRİLEMEZ.
```

---

## 2. ADİL ÜCRET SİSTEMİ

### Formül
```
Ücret = (İşlem Zorluk Puanı × Tamamlanan Adet × Birim Fiyat) − Hata Cezası
```

### Veri Kaynakları (Otomatik — Manuel DEĞİL)
| Veri | Kaynak | Manipüle? |
|------|--------|:---------:|
| İşlem zorluk puanı | Teknik Föy'den | ❌ |
| İşlem başlangıç saati | Sistem otomatik | ❌ |
| İşlem bitiş saati | Sistem otomatik | ❌ |
| Tamamlanan adet | Sistem sayımı | ❌ |
| Hata adedi | Kalite kontrol | ❌ |

### Zorluk Puanı Skalası
| Puan | Açıklama |
|:----:|----------|
| 1 | Basit (düz dikiş, ütü) |
| 2 | Normal (kol takma, yaka çevirme) |
| 3 | Zor (fermuar, manşet, astar) |
| 4 | Çok Zor (özel teknik, hassas işlem) |
| 5 | Uzman (prototip, numune, özel dikiş) |

---

## 3. ŞEFFAFLIK MEKANİZMALARI

### Çalışan Tarafı
- Kendi performansını görebilir
- Kendi ücret hesabını görebilir
- Kendi hata sayısını görebilir
- Başka çalışanın verisini GÖREMez

### Patron Tarafı
- Tüm verileri görebilir
- Geçmiş kayıtları DEĞİŞTİREMEZ
- Ücret formülünü tek taraflı DEĞİŞTİREMEZ
- Formül değişikliği loglanır

---

## 4. MANİPÜLASYON KORUMA (7 Kural)

| # | Kural | Detay |
|---|-------|-------|
| 1 | Üretim verisi değiştirilemez | immutable |
| 2 | Satış verisi değiştirilemez | immutable |
| 3 | Kasa verisi değiştirilemez | immutable |
| 4 | Log kayıtları değiştirilemez | append-only |
| 5 | Üretim sayıları şişirilemez | Otomatik + kamera |
| 6 | Geçmiş kayıt silinemez | Soft delete + arşiv |
| 7 | Ücret hesabı gizlenemez | Çalışana açık |

---

## 5. MAĞAZA & E-TİCARET MODÜLÜ (/magaza)

### Akış
```
Paketleme → Mağaza Stok Girişi → Satış → Müşteri Kaydı → Satış Analizi → AI Geri Besleme
```

### 8 Ana Sekme
1. **Mağaza Stok:** Ürün kodu, giriş tarihi, beden bazlı giriş adedi, minimum stok uyarısı
2. **Satış Takibi:** Satılan ürün, tarih/saat, fiyat, ödeme yöntemi, personel
3. **Müşteri Analizi:** Müşteri tipi, ülke, satın alma geçmişi, segment
4. **E-Ticaret:** Online platform, ürün listeleme, sipariş takibi, kargo
5. **Satış Analizi:** En çok/az satan, beden/renk bazlı, sezon trendi
6. **İade Yönetimi:** İade kaydı, iade nedeni (beden/kalite/renk), analiz → üretim geri bildirim
7. **Kur Hesaplama:** Döviz kurları, toptan fiyat, kur riski
8. **Mağaza Performans:** Günlük ciro, hedef vs gerçek, personel satış adedi

### Sistem Geri Beslemesi
- Satış verisi → Araştırma Modülüne otomatik
- İade nedeni → Üretim/Tasarım uyarısı
- Müşteri tercihi → Trend Analizine veri
- En çok satan → Yeniden üretim önerisi

### DB Tabloları
magaza_stoklari, satislar, satis_detaylari, musteriler, musteri_gecmisi, iade_kayitlari, eticaret_siparisler, kur_bilgileri, magaza_performanslari

---

## 6. İNSAN PSİKOLOJİSİ KONTROL
- Sistem çalışanı strese sokuyor mu?
- Sistem çalışanı motive ediyor mu?
- Çalışan sistemi kullanmak istiyor mu?
- Arayüz "çok karmaşık" hissi yaratıyor mu?

---

## 7. MESLEĞE KATKI VİZYONU
- İşletme için: Sağlıklı, adil, şeffaf üretim
- Meslek için: Standart ve ölçülebilir sistem
- İnsanlık hayrına: Mesleğimizde çalışan diğer insanların faydalanması
- **Hedef:** Sistem sektörde standart olabilir

---

## 8. VERİTABANI TABLOLARI (Adalet)
ucret_hesaplamalari, ucret_formulleri, zorluk_puanlari, performans_kayitlari, manipulasyon_loglari, denetim_kayitlari, formul_degisiklikleri

---

> **Bu dosya Adalet Sistemi + Mağaza & E-Ticaret'in EN ÜST SEVİYE referansıdır.**
