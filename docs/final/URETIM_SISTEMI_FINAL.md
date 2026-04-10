# ÜRETİM SİSTEMİ — KESİM + İMALAT + KAMERA + KUMAŞ + STOK + MALİYET
> **Versiyon:** FINAL 2.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_14, konu_15, konu_18, konu_toplama, röntgen raporları

---

## 1. UÇTAN UCA ÜRETİM AKIŞI
```
TREND TESPİT → TASARIM → KALIP → NUMUNE → ONAY → KESİM → İMALAT → KALİTE → PAKETLEME → SEVKİYAT
```

## 2. TEST ÜRETİM KURALI (Shein Taktiği)
- İlk üretim HER ZAMAN **50 adet**
- 3 gün test süresi
- 0-50: Çöpe At | 50-70: İzle | 70-85: Test Üretimi | 85-100: Seri Üretim

---

## 3. KESİMHANE (/kesim)

**Amaç:** Kumaş kesim, pastal yerleşimi, tüketim yönetimi, fire kontrolü

### İşlem Sırası
```
Teknik Föy → Marker Planı → Kumaş Serim → Kesim → Parça Ayırma → Bant'a Sevk
```

### Kontrol Noktaları
| Kontrol | Ölçüm |
|---------|-------|
| Fire oranı | % hesaplama (hedef: <%5) |
| Parça sayısı | Otomatik sayım |
| Kumaş tüketimi | Metre hesabı |
| Pastal verimliliği | Marker optimization skoru |

### Ara İşlemler
Kesim sonrası → Kumaş/Malzeme belirleme → Ara işçilikler (tela, aplike vb.) → Üretime sevk

**Eksik:** Pastal optimizasyon algoritması (AI destekli marker yerleşim)

---

## 4. İMALAT / ÜRETİM BANDI (/imalat, /uretim)

**Amaç:** Teknik Föy'e göre insan inisiyatifi olmadan üretim

### TEMEL KURAL: İNİSİYATİF BIRAKILMAYACAK
- Nasıl yapılacağı → görsel, sesli, yazılı kayıtlı
- İşlemlerin zorluk sırası → sisteme kayıtlı
- Hangi makineyle → sisteme kayıtlı
- İşlem süresi → otomatik ölçüm

### Kayıt Sistemi
```
İşçi × İşlem × Başlangıç Saati × Bitiş Saati × Adet × Kalite Sonucu
```

### Akış
```
Bant → Temizlik → Kalite Kontrol → Dış İşlem (varsa) → Paketleme → Sevk
```

### Performans Ölçümü
| Metrik | Ölçüm |
|--------|-------|
| Günlük adet | İşçi başına |
| İşlem süresi | Operasyon başına |
| Hata oranı | İşçi başına |
| Makine kullanım | Saat başına |

### Üretim Kiosk (/uretim-kiosk)
- Bant başında duran terminal
- İşçi QR/PIN ile giriş
- İşlem başla/bitir butonu
- Anlık performans gösterimi

---

## 5. KAMERA SİSTEMİ (/kameralar)

### Donanım
- **12 adet Necron kamera**
- go2rtc stream sunucusu
- RTSP protokolü

### Kullanım Alanları

| # | Kullanım | Amaç |
|---|----------|------|
| 1 | İşçi performans takibi | Kim ne kadar üretiyor |
| 2 | Üretim kalite kontrolü | Hatalı ürün tespiti (AI Vision) |
| 3 | İşlem doğrulama | İşlem doğru yapılıyor mu |
| 4 | Güvenlik | Atölye güvenliği |
| 5 | Fire kontrolü | Kesim fire tespiti |

### 6 Sekme
1. **Kamera Yönetimi** — numara, konum, çözünürlük, durum
2. **Video Kayıt** — günlük kayıt, süre, depolama, otomatik silme (30/60/90 gün)
3. **Personel Performans** — bölge operatör, çalışma süresi, boşta kalma, üretim adedi
4. **Kalite Kontrol (AI)** — dikiş hata, kumaş hata, renk uyumsuzluk, ölçü sapması
5. **Agent Yönetimi** — atanan kamera, görev, aktif/pasif, son işlem, hata log
6. **Depolama & Arşiv** — kapasite, kullanılan alan, arşiv süresi, silme politikası

### Agent Yapısı
- 12 kamera × 1 agent = 12 agent (başlangıç)
- Tam analiz: 12 × 2 = 24 agent (hareket + kalite)

### Mevcut Kod
- `useMotionDetection` — piksel hareket tespiti
- `kamera_durum_kontrol_ajan` — Cron'da çalışan kontrol ajanı
- Telegram alarmı — mesai dışı hareket bildirimi

### Teknoloji
| Teknoloji | Amaç |
|-----------|------|
| YOLO (PyTorch) | Nesne tanıma/hareket |
| CLIP (OpenAI) | Görsel kalite eşleştirme |
| OpenCV | Video işleme |
| RTSP/go2rtc | Kamera akışı |
| S3/NAS | Video depolama |

### Eksik
- Frontend'de Bounding Box gösterimi
- Zaman çizelgesi oynatıcısı
- AI Vision kalite kontrol entegrasyonu

### Maliyet
| Kalem | Maliyet |
|-------|---------|
| Kameralar | 0 (mevcut) |
| GPU (RTX 3060+) | Tek seferlik |
| NAS 4TB | Tek seferlik |
| **Aylık** | **~50-100$** |

---

## 6. KUMAŞ ARŞİVİ (/kumas)

### Kayıt Alanları
Kumaş adı, gramaj, içerik, esneklik, tedarikçi, fiyat, kod, renk, doku, stok

### Eksik
- Akıllı çekme uyarısı (%5 çekiyor → kalıbı düzelt)
- Dinamik tedarikçi botu
- Kumaş fotoğraf arşivi (storage bucket)

---

## 7. STOK (/stok)

### Kapsam
- Sarf malzeme denetimi (iğne, iplik, etiket)
- Beden bazlı stok takibi
- Kritik stok uyarısı

### Eksik
- Just-in-Time kilidi (malzeme eksik → üretim duruyor)
- Depo rafı haritası
- Barkod/QR entegrasyonu

---

## 8. MALİYET + MUHASEBE + KASA

### Maliyet Formülü (M2 Kâr Kilidi)
```
Toplam Maliyet = Ham Maliyet + İşçilik + Genel Gider
Satış Fiyatı = Toplam Maliyet / (1 - Hedef Kâr Marjı)
Minimum Fiyat = Toplam Maliyet × 1.30 (min %30 kâr)
```

### Kâr Kilidi Kuralı
- AI sipariş alırken kâr marjını kontrol eder
- %30 altı → **SİSTEM BLOKE** → sipariş alınamaz
- Patron bile %30 altı onaylayamaz (sistem kuralı)

### Muhasebe
- Gelir/gider, faturalar, vergi
- Aylık bilanço otomatik

### Kasa
- Günlük kasa, ödeme, nakit/kredi
- Realtime senkronizasyon
- Manipülasyon engeli
- Yüksek tutarlı işlem → Telegram alarm

---

## 9. VERİTABANI TABLOLARI

| Tablo | Amaç |
|-------|------|
| uretim_isleri | Üretim iş emirleri |
| kesim_planlari | Kesim planları |
| fire_raporlari | Fire kayıtları |
| kameralar | Kamera tanımları |
| kamera_alanlari | Kamera alanları |
| kamera_kayitlari | Video kayıtları |
| kamera_analizleri | AI analiz sonuçları |
| kamera_agent_atamalari | Agent atamaları |
| video_arsivi | Video arşivi |
| kumaslar | Kumaş arşivi |
| stoklar | Stok kayıtları |
| maliyetler | Maliyet hesaplamaları |
| kasa_hareketleri | Kasa giriş/çıkış |

---

## 10. 188 KRİTERDEN ÜRETİM (Kriter 35-42 + 85-89 + 146-150)

| Aralık | Kapsam |
|--------|--------|
| 35-42 | Üretim akışı, iş emri, kalite kontrol, performans |
| 85-89 | Kamera entegrasyonu, video kayıt, agent |
| 146-150 | Kamera detay: durumu, arşiv, agent performans |

---

## 11. KESİM 8 SEKME DETAYI
> **Kaynak:** konu_14_kesim_modulu.md

| # | Sekme | Sorular |
|---|-------|---------|
| 1 | Kesim Planlama | Emir no, tarih, sorumlu, adet, beden dağılımı |
| 2 | Kumaş Hazırlık | Top no, kumaş eni, kusur kontrolü, toplam metre |
| 3 | Pastal Yerleşimi | Uzunluk, kat sayısı, marker verim %, görsel |
| 4 | Kesim İşlemi | Makine türü, operatör, başlangıç/bitiş saat, kalite |
| 5 | Fire Raporu | Fire metre, oran %, nedeni, sınır aşımı mı |
| 6 | Parça Kontrolü | Parça sayısı, beden doğruluğu, eksik, eşleştirme |
| 7 | Ara İşçilik | Nakış/baskı/yıkama/tela, sorumlu, fason gönderim/dönüş |
| 8 | Üretime Sevk | Parça sayısı, sevk tarihi, teslim alan, tutanak |

**Kritik:** Fire >%3 → otomatik uyarı | Parça eşleşmezse üretim başlamaz | Fason dönmeden başlamaz

### DB Tabloları
kesim_emirleri, kesim_planlari, pastal_planlari, kesim_islemleri, fire_raporlari, parca_kontrolleri, ara_iscilikler, fason_gonderimler, kesim_sevkleri

---

## 12. İMALAT 10 SEKME DETAYI
> **Kaynak:** konu_15_imalat_uretim_bandi.md

| # | Sekme | Sorular |
|---|-------|---------|
| 1 | İş Emri | Emir no, model kodu, adet, beden, tarih |
| 2 | Bant Hazırlık | Bant no, makine sayısı, dizilim sırası, malzeme hazır mı, föy asıldı mı |
| 3 | İşçi Atama | Operatör adı, beceri seviyesi, atanan işlem, atanan makine |
| 4 | Üretim Takip | Kim hangi işlemde, başlangıç/bitiş saat, tamamlanan adet, hatalı adet |
| 5 | Performans | İşçi günlük/saat adet, hedef vs gerçek süre, bant verim oranı |
| 6 | Teknik Föy Görüntüleme | İşlem sıra, açıklama, video/ses/görsel mevcut mu |
| 7 | Kalite Kontrol | Ara kontrol, son kontrol, hata türü, sorumlu, düzeltme |
| 8 | Temizlik | İplik temizleme, ütü, son görsel kontrol |
| 9 | Paketleme | Etiket, barkod/QR, standart uyumu, paket foto |
| 10 | Mağazaya Sevk | Mağaza/depo, adet, tarih, tutanak imza |

**Adil Ücret Entegrasyonu:**
```
Ücret = (İşlem zorluk puanı × Adet × Birim fiyat) − (Hata cezası)
```
Veri manipüle edilemez — sistemden otomatik hesaplanır.

### DB Tabloları
is_emirleri, bant_hazirliklari, isci_atamalari, uretim_takipleri, performans_kayitlari, kalite_kontrolleri, temizlik_kayitlari, paketleme_kayitlari, sevk_kayitlari, ucret_hesaplamalari

---

> **Bu dosya Üretim hattının EN ÜST SEVİYE referansıdır.**
> **Versiyon:** FINAL 3.0 | **12 bölüm — tüm eksikler tamamlandı.**
