# MİZANET — KONU 02: ÜRETİM AKIŞ MODELİ (KONSOLİDE FİNAL)

> **Belge Kodu:** MZN-K02-FINAL  
> **Tarih:** 10 Nisan 2026 — 11:00 (UTC+3)  
> **Kaynak Dosyalar:**  
> - `mizanet.com/konu_02_uretim_akis_semasi.md` (5KB)  
> - `mizanet.com/uretim_akis_modeli.md` (6KB)  
> - `mizanet.com/URETIM_AKIS_DUNYA_STANDART.md` (7KB)  
> - `Mizanet/docs/MIZANET_MASTER_REFERANS.md` Bölüm 11  
> **Varsayım:** SIFIR

---

## 1. ANA PRENSİP

> İnsan insiyatifi sıfır. Her adım tanımlı, kayıtlı, test edilir.
> Ürün üretime girmeden TÜM bilgiler belirlenir.

---

## 2. ÜRETİME BAŞLAMADAN ZORUNLU 5 DOSYA

**Bu 5 dosya tamamlanmadan üretim başlatılMAZ.**

| # | Dosya | İçerik | Yoksa Ne Olur |
|---|-------|--------|---------------|
| 1 | **Tech Pack** | Teknik çizim + ölçü tablosu + dikiş yapısı + parça listesi | ❌ Üretim başlamaz |
| 2 | **BOM** (Bill of Materials) | Tüm malzeme listesi (kumaş, iplik, düğme, fermuar, etiket) | ❌ Malzeme alınamaz |
| 3 | **Operation Bulletin** | Operasyon listesi + makine türü + işlem süresi | ❌ Hat planlanamaz |
| 4 | **Time Study** (Zaman Etüdü) | Her operasyonun standart süresi | ❌ Kapasite hesaplanamaz |
| 5 | **Cost Sheet** (Maliyet) | Kumaş + aksesuar + işçilik + genel gider = birim maliyet | ❌ Fiyat belirlenemez |

---

## 3. 19 AŞAMALI ÜRETİM AKIŞI

### AŞAMA 1 — PAZAR VE TREND ARAŞTIRMASI

| Alan | Detay |
|------|-------|
| **Amaç** | Satılabilir ürünü belirlemek |
| **İşlem** | Pazar trend analizi (TikTok, Instagram, Trendyol), rakip analiz, satış verisi, hedef müşteri |
| **Belirlenen** | Ürün tipi, fiyat segmenti, yaş grubu, sezon |
| **Çıktı** | Ürün konsepti |

### AŞAMA 2 — ÜRÜN TASARIM BRIEFİ

| Alan | Detay |
|------|-------|
| **Amaç** | Ürünün tüm özelliklerini yazılı hale getirmek |
| **Belirlenen** | Ürün türü, kullanım amacı, sezon, hedef fiyat, hedef müşteri |
| **Teknik** | Kumaş türü, gramaj, aksesuar |
| **Çıktı** | **Ürün teknik dosyası** (ilk taslak) |

### AŞAMA 3 — TEKNİK TASARIM

| Alan | Detay |
|------|-------|
| **Amaç** | Ürünün teknik olarak tam tanımlanması |
| **Hazırlanan** | Teknik çizim (ön/arka/yan), ölçü tablosu (tüm bedenler), dikiş yapısı, parça listesi |
| **Belirlenen** | Hangi makine, hangi operasyon, hangi dikiş türü |
| **Çıktı** | **Tech Pack** |

### AŞAMA 4 — MALZEME PLANLAMA

| Malzeme | Detay |
|---------|-------|
| Kumaş | Tür, gramaj, en, renk |
| İplik | Renk, kalınlık |
| Düğme | Tip, adet |
| Fermuar | Boy, tip |
| Etiket | Marka, yıkama, beden |

**Çıktı:** **BOM (Bill of Materials)**

### AŞAMA 5 — OPERASYON ANALİZİ

| Operasyon | Makine | Süre |
|-----------|--------|------|
| Yaka dikimi | Düz makine | 3 dk |
| Kol takma | Kol makinesi | 4 dk |
| Yan dikiş | Overlok | 2 dk |
| Biye çekme | Biye makinesi | 2 dk |
| Etek kıvırma | Reçme | 1.5 dk |

**Çıktı:** **Operation Bulletin**

### AŞAMA 6 — ZORLUK VE BECERİ ANALİZİ

| İşlem | Zorluk | Beceri | Makine |
|-------|--------|--------|--------|
| Yaka dikimi | Orta | Standart | Düz makine |
| Manşet | Yüksek | Uzman | Düz makine |
| Overlok | Düşük | Standart | Overlok |
| Biye | Orta | Standart | Biye makinesi |

**Çıktı:** **Beceri matrisi**

### AŞAMA 7 — KALIP GELİŞTİRME

- Temel kalıp çizimi
- Beden serisi (XS-S-M-L-XL)
- Dikiş payları ekleme
- Kesim planı hazırlama
- **Kritik:** Orta beden (M) ilk çıkarılır, kumaş eni alınarak yerleşim planı yapılır, minimum fire hedeflenir

**Çıktı:** **Kalıp dosyası (DXF + ölçü)**

### AŞAMA 8 — NUMUNE ÜRETİMİ

- Kesim (tek beden — orta) → Dikim (operasyon sırasına göre) → İlk kontrol
- **Kayıt zorunluluğu:** Her dikiş işlemi video + fotoğraf
- **İnisiyatif yok** — işlem talimatı sistemden gelir
- Doğru/yanlış yapım kaydı: yazılı + görsel + sesli

### AŞAMA 9 — NUMUNE DEĞERLENDİRME

| Kontrol | Detay |
|---------|-------|
| Ölçü doğruluğu | Hedef vs gerçek ölçü |
| Dikiş kalitesi | Düzgünlük, dayanıklılık |
| Kullanım rahatlığı | Giyim testi |
| Kumaş duruşu | Döküm, tutuş |
| Görsel uyum | Tasarım briefi ile uyum |

**Çıktı:** Onay veya revizyon

### AŞAMA 10 — ÜRETİM HATTI PLANLAMASI

- Makine sayısı ve türü, operatör sayısı, üretim sırası (hat düzeni), darboğaz noktaları

### AŞAMA 11 — ZAMAN ETÜDÜ

- Her operasyon için standart süre ölçülür
- Günlük üretim kapasitesi hesaplanır
- Hat dengeleme yapılır

**Çıktı:** **Time Study**

### AŞAMA 12 — MALİYET ANALİZİ

| Kalem | Detay |
|-------|-------|
| Kumaş maliyeti | ₺/m × tüketim |
| Aksesuar maliyeti | Düğme + fermuar + etiket |
| İşçilik maliyeti | Süre × dakika ücreti |
| Genel gider | Kira + enerji + amortisman payı |
| **Toplam maliyet** | — |
| **Önerilen satış fiyatı** | — |
| **Kâr marjı %** | Min %30 hedef |

**Çıktı:** **Cost Sheet**

### AŞAMA 13 — ÜRETİM EMRİ

- Üretim miktarı (beden dağılımı), üretim planı (gün bazlı), teslim tarihi
- **Ön koşul:** 5 zorunlu dosya tamam

### AŞAMA 14 — KESİM PLANLAMASI

- Pastal planı, kumaş en + kalıp yerleşimi, kat sayısı, kesim emri
- Kumaş tüketimi ve fire oranı hesaplanır

### AŞAMA 15 — SERİ ÜRETİM

1. Kesim (kalıba göre)
2. Dikim (operasyon sırasına göre)
3. Ara kalite kontrol
4. Final dikiş

### AŞAMA 16 — KALİTE KONTROL

| Kontrol | Detay |
|---------|-------|
| Ölçü kontrolü | Ölçü tablosuna uygunluk (rastgele numune) |
| Dikiş kontrolü | Atlama, boşluk, sıkılık |
| Görsel kontrol | Leke, delik, renk farkı, iplik |
| Yıkama testi | Çekme, renk akma |

### AŞAMA 17 — ÜTÜ VE PAKETLEME

- Buharlı ütü → standart katlama → etiketleme (beden + barkod) → poşetleme

### AŞAMA 18 — STOK VE LOJİSTİK

- Depo girişi (beden/renk bazlı stok kaydı) → sevkiyat planı → barkod + miktar kayıt

### AŞAMA 19 — SATIŞ ANALİZİ (FEEDBACK)

| Takip | Detay |
|-------|-------|
| Satış hızı | Günlük/haftalık satış |
| Müşteri geri dönüş | Yorum + iade sebepleri |
| Beden dağılımı | Hangi beden çok satıyor |
| **Feedback** | Satış verisi → AR-GE'ye geri besleme → sistem öğrenir |

---

## 4. TEST ÜRETİM KURALI (SHEİN TAKTİĞİ)

| Aşama | Adet | Süre | Kural |
|-------|------|------|-------|
| İlk üretim | **50 adet** | 3 gün test | HER ZAMAN |
| Karar | — | — | Skor bazlı |

| Skor | Karar |
|------|-------|
| 0-50 | ❌ Çöpe At |
| 50-70 | 👁️ İzle |
| 70-85 | 🧪 Test Üretimi (100 adet) |
| 85-100 | ✅ Seri Üretim |

---

## 5. ÜCRET HESAPLAMA FORMÜLLERİ

```
Birim Ücret = (İşlem Zorluk Puanı × Makine Katsayısı × Süre) / Standart Zaman
Günlük Performans = Üretilen Adet × Birim Ücret × Kalite Katsayısı
Aylık Maaş = (Günlük Performanslar Toplamı) + Sabit Taban + Prim
```

---

## 6. KRİTİK KURALLAR

1. **İnsan inisiyatifine bırakılmaz** — her adım tanımlı prosedüre göre
2. **Her işlem görsel + sesli kayıt** altına alınır
3. **Adım atlanmaz, sıra değişmez, kayıt zorunlu**
4. **5 zorunlu dosya olmadan üretim başlatılmaz**
5. Her ürün için 19 adım eksiksiz uygulanır

---

> **Bu belge, 3 farklı kaynak dosyadan konsolide edilmiş TEK REFERANS kaynağıdır.**
