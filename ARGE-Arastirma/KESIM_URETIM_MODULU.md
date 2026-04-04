# KESİM + ÜRETİM BANT + KALİTE MODÜLÜ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları
> Amaç: Kesimden ürün çıkışına kadar tüm üretim süreçleri

---

## MODÜL AKIŞI

```
Teknik Föy + Kesim Onayı
    ↓
Kesim Planı → Kumaş Kesimi
    ↓
Ara İşçilik (ön hazırlık)
    ↓
Üretim Bant (dikiş)
    ↓
Temizlik + Kalite Kontrol
    ↓
Paketleme → Mağaza/Depo
```

---

## 1. KESİM PLANLAMA

**Alt Sekmeler:** kesim planı, pastal yerleşimi, kumaş tüketimi

| Soru |
|---|
| Kesim planı hazır mı |
| Pastal yerleşimi yapıldı mı |
| Kumaş eni (cm) |
| Kat sayısı |
| Fire oranı |
| Kesim emri numarası |

---

## 2. KUMAŞ KESİMİ

**Alt Sekmeler:** kesim işlemi, parça kontrol, fire kayıt

| Soru |
|---|
| Kesilecek kumaş türü |
| Kesilen parça sayısı |
| Fire miktarı |
| Kesim sorumlusu |
| Kesim tarihi/saati |

**Kayıt zorunluluğu:**
- Kesim öncesi kumaş fotoğraf
- Kesim sonrası parça sayım
- Fire kayıt

---

## 3. ARA İŞÇİLİK

**Alt Sekmeler:** ara işlem listesi, fason takip, sevk

| Soru |
|---|
| Kesimden sonra hangi ara işlemler var |
| Ara işlem sorumlusu |
| Fason var mı |
| Fason gönderim tarihi |
| Fason dönüş tarihi |
| Fason kalite kontrolü |

---

## 4. ÜRETİM BANT (DİKİŞ)

**Alt Sekmeler:** iş emri, operasyon listesi, işçi takip, üretim ilerleme

### İş Emri
| Soru |
|---|
| İş emri numarası |
| Ürün modeli |
| Üretim miktarı (beden dağılımı) |
| Teslim tarihi |

### Operasyon Takibi (Teknik Föye göre)
| Bilgi | Detay |
|---|---|
| Operasyon adı | Yaka dikimi, kol takma vb |
| Makine türü | Düz, overlok, reçme vb |
| İşlem süresi | Dakika |
| Zorluk seviyesi | Kolay/orta/zor |
| Beceri gereksinimi | Standart/uzman |

### İşçi Takip (Adil Ücret Sistemi İçin KRİTİK)
| Veri |
|---|
| Hangi işçi |
| Hangi işlem |
| Başlangıç saati |
| Bitiş saati |
| Üretilen adet |
| Kalite sonucu |

**KURAL:** Bu veriler üretim manipülasyonuna karşı korunur, değiştirilemez.

### Kayıt Zorunluluğu
- **Her operasyon:** görsel + sesli kayıt
- Doğru/yanlış yapım kaydı
- İnsiyatif bırakılmaz — işlem talimatı sistemden gelir

---

## 5. TEMİZLİK + KALİTE KONTROL

**Alt Sekmeler:** iplik temizlik, kalite kontrol, hata kayıt

| Kontrol |
|---|
| İplik temizliği yapıldı mı |
| Ölçü kontrol (rastgele numune) |
| Dikiş kontrol (atlama, boşluk, sıkılık) |
| Görsel kontrol (leke, delik, renk farkı) |
| Yıkama testi (çekme, renk akma) |
| Hata varsa → hata kaydı + fotoğraf |

---

## 6. DIŞ İŞLEMLER

**Alt Sekmeler:** dış işlem listesi, sevk, dönüş kontrol

| Soru |
|---|
| Dış işlem türü (yıkama, baskı, nakış vb) |
| Sevk tarihi |
| Dönüş tarihi |
| Dönüş kalite kontrolü |

---

## 7. ÜTÜ + PAKETLEME

**Alt Sekmeler:** ütü, katlama, etiketleme, paketleme

| İşlem |
|---|
| Buharlı ütü |
| Katlama (standart) |
| Beden + barkod etiket |
| Poşetleme |

---

## 8. DEPO GİRİŞ + SEVKİYAT

**Alt Sekmeler:** depo giriş, beden/renk stok, sevkiyat planı

| Soru |
|---|
| Depo giriş adedi (beden bazlı) |
| Renk bazlı stok kaydı |
| Sevkiyat planı |
| Sevk tarihi |

---

## VERİTABANI TABLOLARI

- kesim_planlari
- kesim_islemleri
- ara_iscilikler
- fason_takip
- uretim_emirleri
- operasyonlar
- isci_islem_takip
- kalite_kontrol
- dis_islemler
- paketleme
- depo_giris
- sevkiyat

---

## MODÜL ÇIKTISI

1. Kesilmiş parçalar → Üretime teslim
2. İşçi performans kaydı → Adil ücret hesabı
3. Kalite kontrol raporu → Onay/red
4. Bitmiş ürün → Depo/mağaza
5. Üretim verim raporu → AI analiz
