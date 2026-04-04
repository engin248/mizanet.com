# KONU 15: İMALAT / ÜRETİM BANDI MODÜLÜ
> Amaç: Teknik föy'e göre insan inisiyatifi olmadan üretim — her işlem tanımlı, süre ölçülür, performans kayıtlı

---

## MODÜL AKIŞI
```
Kesim Sevki → İş Emri → Bant Hazırlık → İşçi Atama → Üretim Takip → Kalite Kontrol → Temizlik → Paketleme → Sevk
```

---

## TEMEL İLKE
```
İlk işlemden son işleme kadar:
- Nasıl yapılacağı → sistemde (görsel + sesli + yazılı)
- İşlem zorluğu → sistemde
- Hangi makineyle → sistemde
- Üretimin inisiyatif kullanacağı nokta → YOK
```

---

## 10 ANA SEKME

### 1. İŞ EMRİ
**Alt Sekmeler**: İş emri bilgisi, ürün bilgisi, miktar

| Soru |
|------|
| İş emri numarası |
| Ürün model kodu |
| Toplam üretim adedi |
| Beden dağılımı |
| Planlanan başlangıç tarihi |
| Planlanan bitiş tarihi |

### 2. BANT HAZIRLIK
**Alt Sekmeler**: Makine dizilimi, makine kontrolü, malzeme hazırlık

| Soru |
|------|
| Bant numarası |
| Toplam makine sayısı |
| Makine dizilim sırası |
| Malzeme (iplik/aksesuar) hazır mı |
| Teknik föy banta asıldı mı |

### 3. İŞÇİ ATAMA
**Alt Sekmeler**: Operatör listesi, beceri seviyesi, işlem ataması

| Soru |
|------|
| Operatör adı |
| Beceri seviyesi |
| Atanan işlem |
| Atanan makine |

### 4. ÜRETİM TAKİP (ANA EKRAN)
**Alt Sekmeler**: İşlem sırası, anlık durum, tamamlanan adet

| Soru |
|------|
| Hangi işçi hangi işlemi yapıyor |
| İşlem başlangıç saati |
| İşlem bitiş saati |
| Tamamlanan adet |
| Hatalı adet |

### 5. PERFORMANS ÖLÇÜMÜ
**Alt Sekmeler**: İşçi performans, işlem performans, bant performans

| Soru |
|------|
| İşçi günlük üretim adedi |
| İşçi saat başı üretim |
| İşlem hedef süre vs gerçek süre |
| Bant toplam verim oranı |

### 6. TEKNİK FÖY GÖRÜNTÜLEME
**Alt Sekmeler**: İşlem listesi, video, ses, görsel

| Soru |
|------|
| İşlem sıra numarası |
| İşlem açıklaması |
| İşlem videosu mevcut mu |
| İşlem sesli anlatımı mevcut mu |
| İşlem görsel anlatımı mevcut mu |

### 7. KALİTE KONTROL
**Alt Sekmeler**: Ara kontrol, son kontrol, hata kayıt

| Soru |
|------|
| Ara kontrol yapıldı mı |
| Son kontrol yapıldı mı |
| Hata türü |
| Hata sorumlusu |
| Düzeltme yapıldı mı |

### 8. TEMİZLİK
**Alt Sekmeler**: İplik temizleme, ütü, kontrol

| Soru |
|------|
| İplik temizleme yapıldı mı |
| Ütü yapıldı mı |
| Son görsel kontrol yapıldı mı |

### 9. PAKETLEME
**Alt Sekmeler**: Katlama, etiketleme, paketleme

| Soru |
|------|
| Etiket takıldı mı |
| Barkod/QR basıldı mı |
| Paketleme standardına uygun mu |
| Paket fotoğrafı çekildi mi |

### 10. MAĞAZAYA SEVK
**Alt Sekmeler**: Sevk planı, sevk tutanağı, teslim

| Soru |
|------|
| Sevk edilecek mağaza/depo |
| Sevk adedi |
| Sevk tarihi |
| Teslim tutanağı imzalandı mı |

---

## ADİL ÜCRET SİSTEMİ ENTEGRASYONU

| Veri | Amaç |
|------|------|
| İşlem başlangıç/bitiş saati | Süre ölçümü |
| İşlem zorluk puanı (Teknik Föy'den) | Zorluk bazlı ücret |
| Tamamlanan adet | Adet bazlı ücret |
| Hata adedi | Kalite bazlı düzeltme |

**Formül**: Ücret = (İşlem zorluk puanı × Adet × Birim fiyat) − (Hata cezası)

**Kural**: Bu veri manipüle edilemez — sistemden otomatik hesaplanır

---

## VERİTABANI TABLOLARI
```
is_emirleri
bant_hazirliklari
isci_atamalari
uretim_takipleri
performans_kayitlari
kalite_kontrolleri
temizlik_kayitlari
paketleme_kayitlari
sevk_kayitlari
ucret_hesaplamalari
```

---

## KRİTİK KURALLAR
- İşlem sırası Teknik Föy'den gelir — değiştirilemez
- Her işlem video/ses/görsel ile tanımlıdır
- İşçi işlem başlangıç-bitiş saati otomatik kayıt
- Kalite kontrol geçilmeden paketleme başlamaz
- Tüm üretim süreci kamera kaydı altında
