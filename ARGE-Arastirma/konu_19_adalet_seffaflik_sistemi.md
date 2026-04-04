# KONU 19: ADALET, ŞEFFAFLIK VE MANİPÜLASYON KORUMA SİSTEMİ
> Amaç: İnsan kayırmacılığını ortadan kaldırıp veri tabanlı adil bir çalışma ortamı oluşturmak
> Felsefe: 37 yıllık tecrübenin ışığında mesleğin eksiklerini düzeltmek

---

## SİSTEMİN ANA İLKESİ
```
Kararı İNSAN değil VERİ verir.
Ücret tahmine değil ÖLÇÜME dayanır.
Geçmiş kayıtlar DEĞİŞTİRİLEMEZ.
```

---

## ADİL ÜCRET SİSTEMİ

### Ücret Hesaplama Formülü
```
Ücret = (İşlem Zorluk Puanı × Tamamlanan Adet × Birim Fiyat) − Hata Cezası
```

### Veri Kaynakları (Otomatik — Manuel Değil)

| Veri | Kaynak | Manipüle Edilebilir mi |
|------|--------|:----------------------:|
| İşlem zorluk puanı | Teknik Föy'den | ❌ Hayır |
| İşlem başlangıç saati | Sistem otomatik | ❌ Hayır |
| İşlem bitiş saati | Sistem otomatik | ❌ Hayır |
| Tamamlanan adet | Sistem sayımı | ❌ Hayır |
| Hata adedi | Kalite kontrol | ❌ Hayır |

### Zorluk Puanı Skalası

| Puan | Açıklama |
|:----:|----------|
| 1 | Basit (düz dikiş, ütü) |
| 2 | Normal (kol takma, yaka çevirme) |
| 3 | Zor (fermuar, manşet, astar) |
| 4 | Çok Zor (özel teknik, hassas işlem) |
| 5 | Uzman (prototip, numune, özel dikiş) |

---

## ŞEFFAFLIK MEKANİZMALARI

### Çalışan Tarafı
| Kural |
|-------|
| Çalışan kendi performansını görebilir |
| Çalışan kendi ücret hesabını görebilir |
| Çalışan kendi hata sayısını görebilir |
| Çalışan başka çalışanın verisini GÖREMez |

### Patron Tarafı
| Kural |
|-------|
| Patron tüm verileri görebilir |
| Patron geçmiş kayıtları DEĞİŞTİREMEZ |
| Patron ücret formülünü tek taraflı DEĞİŞTİREMEZ |
| Formül değişikliği sistem logu altına alınır |

---

## MANİPÜLASYON KORUMA KURALLARI

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

## PATRON / ÇALIŞAN DENGESİ

| Soru | Cevap |
|------|-------|
| Patron sistemi manipüle edebilir mi? | HAYIR — veri değiştirilemez |
| Çalışan veri şişirebilir mi? | HAYIR — otomatik sayım |
| Maaş tek taraflı belirlenebilir mi? | HAYIR — formül bazlı |
| Geçmiş performans silinebilir mi? | HAYIR — arşiv zorunlu |

---

## İŞ SÜRECİ DOĞRULUĞU

| Kontrol |
|---------|
| Sistem gerçek üretim sürecini doğru yansıtıyor mu |
| İş akışı sırası sahadaki gerçekle uyumlu mu |
| Ustaların çalışma düzenine uygun mu |
| Kullanıcı yanlış işlem yaparsa sistem engelliyor mu |
| Süreç atlama mümkün mü (OLMAmalı) |

---

## İNSAN PSİKOLOJISI KONTROL

| Kontrol |
|---------|
| Sistem çalışanı strese sokuyor mu |
| Sistem çalışanı motive ediyor mu |
| Çalışan sistemi kullanmak istiyor mu |
| Arayüz "çok karmaşık" hissi yaratıyor mu |
| Buton dili basit ve anlaşılır mı |

---

## MESLEĞE KATKI VİZYONU

- **İşletme için**: Sağlıklı, adil, şeffaf üretim
- **Meslek için**: Standart ve ölçülebilir sistem
- **İnsanlık hayrına**: Mesleğimizde çalışan diğer insanların faydalanması
- **Hedef**: Sistem sektörde standart olabilir mi → EVET

---

## VERİTABANI TABLOLARI
```
ucret_hesaplamalari
ucret_formulleri
zorluk_puanlari
performans_kayitlari
manipulasyon_loglari
denetim_kayitlari
formul_degisiklikleri
```
