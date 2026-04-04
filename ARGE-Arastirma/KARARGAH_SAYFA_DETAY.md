# KARARGÂH SAYFA DETAY MİMARİSİ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları
> Amaç: Karargâh sayfasının tek ekranlı kontrol merkezi olarak tam iç düzeni

---

## SAYFA ROLÜ

Tüm sistemi TEK ekrandan izleme, yönetme ve yetkilendirme.
Karargâh bütün modüllere erişir ve yetki verip alma işlemlerini yönetir.

---

## EKRAN GRID YAPISI

```
┌───────────────────────────────────────────────────────────┐
│                    ÜST KONTROL BAR                        │
├────────────┬─────────────────────────────┬────────────────┤
│            │                             │                │
│  SOL       │    MERKEZ OPERASYON         │  SAĞ ANALİZ   │
│  PANEL     │    PANELİ                   │  PANELİ        │
│            │                             │                │
├────────────┴─────────────────────────────┴────────────────┤
│               ALT CANLI SİSTEM DURUMU                     │
└───────────────────────────────────────────────────────────┘
```

---

## 1. ÜST KONTROL BAR

**İçerik:**
- Global arama
- Sistem durumu (aktif/pasif)
- Aktif kullanıcı sayısı
- Bildirimler
- Acil durum butonu
- Kullanıcı yönetimi

**Bilgi göstergeleri:**
- Üretim aktif/pasif
- Sipariş yoğunluğu
- Stok kritik uyarı
- Sistem sağlık durumu

**Butonlar:**
- Sistem kilitle
- Sistem aç
- Acil durum modu
- Denetim başlat

**Renk:** Koyu zümrüt yeşili arka plan, altın ikonlar

---

## 2. SOL PANEL (SİSTEM NAVİGASYON)

24 modül listelenir (ikon + isim):
Karargâh, Ar-Ge, Kumaş, Modelhane, Kalıp, Kesim, İmalat, Maliyet, Muhasebe, Kasa, Stok, Katalog, Sipariş, Müşteri, Personel, Görevler, Kameralar, Ajanlar, Denetmen, Raporlar, Tasarım, Üretim, Güvenlik, Ayarlar

**Her modül için:**
- Durum ışığı: Yeşil (normal) / Sarı (dikkat) / Kırmızı (sorun)
- Hover: açık yeşil efekt
- Tıklanınca ilgili modüle geçiş

---

## 3. MERKEZ OPERASYON PANELİ (En Önemli Alan)

### Üretim Zinciri Akış Diyagramı
```
AR-GE → TASARIM → MODELHANE → KALIP → KESİM → İMALAT → STOK → SATIŞ
```

**Her aşamada gösterilecek:**

| Bilgi | Detay |
|---|---|
| Aktif iş sayısı | Bu aşamadaki işler |
| Bekleyen iş | Onay bekleyen |
| Geciken iş | Tarihi geçen |
| Kalite durumu | İyi/sorunlu |

**Renk kodu:**
- Yeşil: normal
- Sarı: risk
- Kırmızı: sorun

**Tıklanınca:** İlgili modül açılır

### Modül Kartları

| Modül | Gösterilen Bilgi |
|---|---|
| Ar-Ge | Aktif proje sayısı, trend skoru |
| Kumaş | Stok durumu |
| Modelhane | Numune üretim durumu |
| Kalıp | Kalıp hazırlama durumu |
| Kesim | Kesim planı durumu |
| İmalat | Üretim ilerleme % |
| Stok | Ürün miktarı, kritik stok |
| Sipariş | Bekleyen sipariş sayısı |
| Maliyet | Ürün maliyet değişimi |
| Muhasebe | Finans durumu |

**Her kart:** Tıklanabilir → ilgili modüle açılır

---

## 4. SAĞ ANALİZ PANELİ (Karar Destek)

| Bölüm | İçerik |
|---|---|
| Trend Radar | Hangi ürün yükseliyor/düşüyor |
| Satış Analizi | Günlük/haftalık satış |
| Stok Analizi | Hızlı/yavaş dönen ürünler |
| Risk Analizi | Maliyet artışı, üretim gecikmesi |

---

## 5. AJAN KONTROL PANELİ

| Agent | Bilgi |
|---|---|
| Trend agent | Çalışıyor mu / raporu |
| Satış agent | Çalışıyor mu / raporu |
| Stok agent | Çalışıyor mu / raporu |
| Üretim agent | Çalışıyor mu / raporu |
| Maliyet agent | Çalışıyor mu / raporu |

**Gösterilen:** Agent çalışıyor mu, raporu, önerileri

---

## 6. ALT CANLI SİSTEM DURUMU

Sürekli güncellenir:

| Kategori | Bilgi |
|---|---|
| Üretim | Aktif makine, çalışan sayısı |
| Sipariş | Yeni sipariş, bekleyen sipariş |
| Stok | Kritik stok uyarıları |
| Maliyet | Ürün maliyet değişimi |

---

## 7. CANLI ÜRETİM HARİTASI

- Fabrika haritası (makine durumu, çalışan durumu, üretim hattı)
- Kamera entegrasyonu

---

## 8. KRİTİK UYARI PANELİ

Sistem otomatik uyarı verir:
- Stok bitiyor
- Üretim gecikmesi
- Maliyet artışı
- Kalite hatası

---

## POPUP PENCERELER

### Kullanıcı Yetki Yönetimi (En Kritik Popup)

| İşlev | Detay |
|---|---|
| Kullanıcı ekleme | Yeni kullanıcı |
| Kullanıcı silme | Kaldırma |
| Rol tanımlama | Karargâh/Yönetici/Departman/Operatör/İzleyici |
| Yetki verme | Modül bazlı |
| Yetki alma | Modül bazlı |

**Yetki seviyeleri:**

| Seviye | Erişim |
|---|---|
| Karargâh | Tüm modüller + yetki yönetimi |
| Yönetici | Kendi departmanı + alt birimleri |
| Departman | Kendi modülü |
| Operatör | Kendi görevleri |
| İzleyici | Sadece okuma |

### Sistem Uyarıları Popup
- Kritik hatalar, gecikmeler

### Hızlı Görev Atama Popup
- Görev, sorumlu, teslim tarihi

---

## VERİ PAYLAŞIMI

Karargâh şu modüllerle veri paylaşır:
Ar-Ge, Kumaş, Modelhane, Kalıp, Kesim, İmalat, Stok, Sipariş, Maliyet, Muhasebe, Raporlar, Ajanlar, Denetmen

**Karargâh yetkileri:**
- Tüm verileri okuyabilir
- Tüm verileri değiştirebilir
- Tüm yetkileri yönetebilir
- Tüm loglara erişebilir
- Tüm agent sistemlerini yönetebilir

---

## KONTROL KURALLARI

1. Karargâh tüm modüllere erişebilir
2. Yetki verme/alma sadece burada yapılır
3. Tüm işlem kayıtları loglanır
4. Loglar silinemez
5. Tüm sistem hareketleri raporlanır

---

## KARARGÂH ANA BİLGİLER

- Günlük satış
- Günlük üretim
- Stok durumu
- Trend raporu
- Maliyet değişimi
- Çalışan performansı
- Sipariş durumu
- Üretim hattı durumu
