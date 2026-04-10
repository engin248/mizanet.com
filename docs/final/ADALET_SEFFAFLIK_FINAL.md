# ADİL DÜZEN + ŞEFFAF MALİYET + ADALETLİ ÜCRETLENDİRME
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_19, ADIL_UCRET_SISTEMI.md, Supreme Beyin ADALET dosyası  
> **Felsefe:** 37 yıllık tecrübenin ışığında mesleğin eksiklerini düzeltmek

---

## 1. ANA İLKE
```
Kararı İNSAN değil VERİ verir.
Ücret tahmine değil ÖLÇÜME dayanır.
Geçmiş kayıtlar DEĞİŞTİRİLEMEZ.
```

---

## 2. ADİL ÜCRET HESAPLAMA

### Formül
```
Birim Ücret = (İşlem Zorluk Puanı × Makine Katsayısı × Süre) / Standart Zaman
Günlük Performans = Üretilen Adet × Birim Ücret × Kalite Katsayısı
Aylık Maaş = (Günlük Performanslar Toplamı) + Sabit Taban + Prim
```

### Zorluk Puanı Skalası

| Puan | Açıklama | Örnek |
|:----:|----------|-------|
| 1 | Basit | Düz dikiş, ütü |
| 2 | Normal | Kol takma, yaka çevirme |
| 3 | Zor | Fermuar, manşet, astar |
| 4 | Çok Zor | Özel teknik, hassas işlem |
| 5 | Uzman | Prototip, numune, özel dikiş |

### Veri Kaynakları (Otomatik — Manuel DEĞİL)

| Veri | Kaynak | Manipüle Edilebilir |
|------|--------|:-------------------:|
| İşlem zorluk puanı | Teknik Föy'den | ❌ |
| İşlem başlangıç saati | Sistem otomatik | ❌ |
| İşlem bitiş saati | Sistem otomatik | ❌ |
| Tamamlanan adet | Sistem sayımı | ❌ |
| Hata adedi | Kalite kontrol | ❌ |

---

## 3. ŞEFFAFLIK MEKANİZMALARI

### Çalışan Hakları
- Kendi performansını görebilir
- Kendi ücret hesabını görebilir
- Kendi hata sayısını görebilir
- Başka çalışanın verisini GÖREMez

### Patron Sınırları
- Tüm verileri görebilir
- Geçmiş kayıtları DEĞİŞTİREMEZ
- Ücret formülünü tek taraflı DEĞİŞTİREMEZ
- Formül değişikliği sistem logu altına alınır

---

## 4. MANİPÜLASYON KORUMA (7 Kural)

| # | Kural | Detay |
|---|-------|-------|
| 1 | Üretim verisi değiştirilemez | Üretim saati, adet, işlem → immutable |
| 2 | Satış verisi değiştirilemez | Satış tutarı, müşteri → immutable |
| 3 | Kasa verisi değiştirilemez | Nakit giriş/çıkış → immutable |
| 4 | Log kayıtları değiştirilemez | Tüm işlem logları → append-only |
| 5 | Üretim sayıları şişirilemez | Otomatik sayım + kamera doğrulama |
| 6 | Geçmiş kayıt silinemez | Soft delete + arşiv |
| 7 | Ücret hesabı gizlenemez | Çalışana açık |

---

## 5. İNSAN PSİKOLOJİSİ KONTROL

| Kontrol |
|---------|
| Sistem çalışanı strese sokuyor mu |
| Sistem çalışanı motive ediyor mu |
| Çalışan sistemi kullanmak istiyor mu |
| Arayüz "çok karmaşık" hissi yaratıyor mu |
| Buton dili basit ve anlaşılır mı |

---

## 6. VERİTABANI TABLOLARI

| Tablo | Amaç |
|-------|------|
| ucret_hesaplamalari | Ücret hesap kayıtları |
| ucret_formulleri | Formül tanımları |
| zorluk_puanlari | İşlem zorluk puanları |
| performans_kayitlari | Performans ölçümleri |
| manipulasyon_loglari | Manipülasyon tespit logları |
| denetim_kayitlari | Denetim kayıtları |
| formul_degisiklikleri | Formül değişiklik geçmişi |

---

## 7. 188 KRİTERDEN ADALET (Kriter 101-105)

| # | Kriter |
|---|--------|
| 101 | Adil ücret sistemi var mı |
| 102 | Performans ölçümü şeffaf mı |
| 103 | Manipülasyon koruması aktif mi |
| 104 | Çalışan kendi verisini görebiliyor mu |
| 105 | Patron geçmiş kayıtları değiştiremez mi |

---

## 8. MESLEĞE KATKI VİZYONU

- **İşletme için:** Sağlıklı, adil, şeffaf üretim
- **Meslek için:** Standart ve ölçülebilir sistem
- **İnsanlık hayrına:** 37 yıllık tecrübenin sisteme dönüşmesi
- **Hedef:** Sistem sektörde standart olabilir

---

> **Bu dosya Adalet & Şeffaflık sisteminin EN ÜST SEVİYE referansıdır.**
