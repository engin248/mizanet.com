# KONU 18: KAMERA SİSTEMİ VE AGENT ENTEGRASYONU
> Amaç: 12 Necron kamera sistemini üretime, kalite kontrolüne ve personel performansına entegre etmek

---

## MEVCUT DURUM
- İşletmede **12 adet Necron kamera** mevcuttur
- Kameralar şu an güvenlik amaçlı çalışmaktadır
- Sistem entegrasyonu henüz yapılmamıştır

---

## KAMERA KULLANIM ALANLARI

| # | Kullanım | Amaç |
|---|----------|------|
| 1 | İşçi performans takibi | Kim ne kadar üretiyor |
| 2 | Üretim kalite kontrolü | Hatalı ürün tespiti |
| 3 | İşlem doğrulama | İşlem doğru yapılıyor mu |
| 4 | Güvenlik | Atölye güvenliği |
| 5 | Fire kontrolü | Kesim fire tespiti |

---

## KAMERA BAŞINA AGENT SAYISI

| Senaryo | Agent Sayısı | Açıklama |
|---------|:------------:|----------|
| Sadece kayıt | 0 | Agent gerekmez |
| İşçi hareket analizi | 1 | Hareket tanıma |
| Ürün kalite kontrol | 1 | Görsel hata tespiti |
| Tam analiz | 2 | Hareket + kalite |

**12 kamera × 2 agent = en fazla 24 agent** (tam analiz modunda)

**Önerilen başlangıç**: 12 kamera × 1 agent = 12 agent (önce temel analiz)

---

## 6 ANA SEKME

### 1. KAMERA YÖNETİMİ
| Soru |
|------|
| Kamera numarası |
| Kamera konumu (kesim / bant / paketleme) |
| Kamera çözünürlüğü |
| Kamera durumu (aktif / deaktif) |

### 2. VİDEO KAYIT
| Soru |
|------|
| Günlük kayıt saati |
| Kayıt süresi |
| Kayıt depolama alanı |
| Otomatik silme süresi (30 / 60 / 90 gün) |

### 3. PERSONEL PERFORMANS ANALİZİ
| Soru |
|------|
| Kamera bölgesindeki operatör |
| Çalışma süresi |
| Hareket analizi (boşta kalma süresi) |
| Üretim adedi |

### 4. ÜRETİM KALİTE KONTROL (AI)
| Soru |
|------|
| Dikiş hata tespiti |
| Kumaş hata tespiti |
| Renk uyumsuzluğu |
| Ölçü sapması |

### 5. AGENT YÖNETİMİ
| Soru |
|------|
| Agent atanan kamera |
| Agent görevi (hareket / kalite) |
| Agent aktif mi |
| Agent son işlem tarihi |
| Agent hata log |

### 6. DEPOLAMA VE ARŞİV
| Soru |
|------|
| Toplam depolama kapasitesi |
| Kullanılan alan |
| Arşivlenen videoların süresi |
| Otomatik silme politikası |

---

## TEKNOLOJİ ALTYAPISI

| Teknoloji | Amaç |
|-----------|------|
| YOLO (PyTorch) | Nesne tanıma / hareket |
| CLIP (OpenAI) | Görsel kalite eşleştirme |
| OpenCV | Video işleme |
| RTSP | Kamera akışı |
| S3 / NAS | Video depolama |

---

## MALİYET ANALİZİ

| Kalem | Maliyet |
|-------|---------|
| Kamera (mevcut 12 adet) | 0 (zaten var) |
| GPU (RTX 3060+) | Tek seferlik |
| NAS depolama (4TB) | Tek seferlik |
| Elektrik | Aylık düşük |
| **Aylık toplam** | **~50–100 $** |

---

## VERİTABANI TABLOLARI
```
kameralar
kamera_alanlari
kamera_kayitlari
kamera_analizleri
kamera_agent_atamalari
video_arsivi
```

---

## KRİTİK KURALLAR
- Kamera görüntüsü kişisel gizlilik kurallarına uygun kullanılır
- Video kayıtları yalnızca yetkililer tarafından erişilebilir
- Kamera verileri manipüle edilemez
- AI analiz sonuçları log'a yazılır
- Kamera arızası anında Telegram ile bildirilir
