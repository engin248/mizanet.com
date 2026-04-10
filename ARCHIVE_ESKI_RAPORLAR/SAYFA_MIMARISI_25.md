# MİZANET — 25 SAYFA MİMARİSİ (SAYFA İÇİ DÜZEN + İÇERİK + PAYLAŞIM)
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları + sistem analizi
> Amaç: Her sayfanın ne içereceği, panel düzeni, veri paylaşımı

---

## GENEL SAYFA TASARIM STANDARDI

### Grid Yapısı (Tüm Sayfalarda Aynı)
```
┌───────────────────────────────────────────────────┐
│                 ÜST BİLGİ BAR                     │
├───────┬──────────────────────────┬────────────────┤
│       │                          │                │
│ SOL   │    ANA ÇALIŞMA ALANI     │  SAĞ           │
│ MENÜ  │                          │  PANEL          │
│       │                          │                │
├───────┴──────────────────────────┴────────────────┤
│              ALT DURUM BAR                        │
└───────────────────────────────────────────────────┘
```

### Üst Bar İçeriği
- Sayfa adı
- Global arama
- Bildirimler
- Kullanıcı bilgisi
- Dil seçimi (Türkçe/Arapça/çok dilli)
- Tarih + saat

### Sol Menü
- 25 modül listesi (ikon + isim)
- Her modülün yanında durum ışığı (yeşil/sarı/kırmızı)
- Hover: açık yeşil efekt

### Alt Bar
- Sistem durumu
- Aktif kullanıcı sayısı
- Veri senkronizasyon durumu

---

## 1. KARARGÂH (/karargah)

**Rol:** Tüm sistemi tek ekrandan izleme, yönetme, yetkilendirme

### Sayfa İçi Paneller

#### Üst Kontrol Paneli
- Sistem durumu (aktif/pasif)
- Aktif kullanıcı sayısı
- Üretim durumu
- Satış durumu
- Kritik uyarılar
- Butonlar: sistem kilitle, sistem aç, acil durum, denetim başlat

#### Merkez Dashboard (Operasyon Akışı)
```
AR-GE → TASARIM → MODELHANE → KALIP → KESİM → İMALAT → STOK → SATIŞ
```
Her aşamada:
- Aktif iş sayısı
- Bekleyen iş
- Geciken iş
- Durum rengi (yeşil/sarı/kırmızı)
- Tıklayınca ilgili modüle geçiş

#### Modül Kartları
| Modül | Gösterilen Bilgi |
|---|---|
| Ar-Ge | aktif proje sayısı, trend skoru |
| Kumaş | stok durumu |
| Modelhane | numune üretim durumu |
| Kalıp | kalıp hazırlama durumu |
| Kesim | kesim planı durumu |
| İmalat | üretim ilerleme % |
| Stok | ürün miktarı, kritik stok |
| Sipariş | bekleyen sipariş sayısı |
| Maliyet | ürün maliyet değişimi |
| Muhasebe | finans durumu |

#### Sağ Analiz Paneli
- Trend Radar (ne yükseliyor/düşüyor)
- Günlük/haftalık satış
- Hızlı/yavaş dönen ürünler
- Risk uyarıları (maliyet artışı, gecikme)

#### Ajan Kontrol Paneli
- Trend agent durumu
- Satış agent durumu
- Stok agent durumu
- Agent raporları ve önerileri

#### Alt Canlı Sistem Durumu
- Aktif makine sayısı, çalışan sayısı
- Yeni sipariş, bekleyen sipariş
- Kritik stok uyarıları
- Ürün maliyet değişimi

#### Yetki Yönetim Penceresi (popup)
- Kullanıcı ekleme/silme
- Rol tanımlama (Karargâh, Yönetici, Departman, Operatör, İzleyici)
- Yetki verme/alma
- Erişim modülleri belirleme

### Veri Paylaşımı
Tüm modüllerle — Karargâh HER YERE erişir

### Kontrol Kuralları
- Tüm modüllere erişim
- Tüm yetkileri değiştirme
- Tüm işlemleri izleme
- Tüm loglara erişim
- Loglar silinemez

---

## 2. AR-GE & TASARIM (/arge)

**Rol:** Satılabilir ürün araştırması — trend avlamak, ürün seçmek

### Sayfa İçi Paneller

#### Ana Panel — Trend Araştırma
- Canlı trend listesi (skor ile)
- Ürün fikir havuzu
- Trend grafikleri (24saat/3gün/7gün)

#### Alt Pencereler
- Trend Analizi: yükselen ürünler, artış hızı
- Rakip Analizi: fiyat, varyant, yorum
- Pazar Analizi: doygunluk, fırsat
- Tasarım Briefi çıktısı

#### Sağ Panel
- Trend puanı (TrendKararMotoru skoru)
- Satış ihtimali
- ÜRET / GİR / BEKLE / İPTAL kararı
- Ajan log (ne taradı, ne seçti, neden)

#### Sorulması Gereken Sorular
- Bu ürün nerede satılıyor?
- Fiyat bandı nedir?
- Hangi yaş grubu?
- Hangi sezon?
- Satış hacmi ne?
- Trend devam ediyor mu?

### Veri Paylaşımı
- → Modelhane (onaylanan ürün briefi)
- → Kumaş (kumaş ihtiyacı)
- → Tasarım (çizim briefi)
- ← Trendyol/TikTok/Instagram/Pinterest (dış veri)

---

## 3. KUMAŞ ARŞİVİ (/kumas)

**Rol:** Tüm kumaş verisi — stok, özellik, maliyet

### Ana Panel — Kumaş Listesi (Tablo)
| Sütun | Bilgi |
|---|---|
| Kumaş adı | — |
| Kumaş türü | örme/dokuma |
| Gramaj | g/m² |
| İçerik | %pamuk/%polyester |
| Esneklik | var/yok |
| En (cm) | kumaş eni |
| Renk | mevcut renkler |
| Stok | metre |
| Fiyat | ₺/m |
| Tedarikçi | firma adı |

### Sağ Panel
- Seçili kumaşın teknik özellikleri (detay kart)
- Kumaş görseli
- Tedarikçi bilgisi

### Veri Paylaşımı
- → Modelhane (hangi kumaş var)
- → Kalıp (en bilgisi)
- → Maliyet (kumaş fiyatı)
- → Kesim (kumaş stok)

---

## 4. MODELHANE (/modelhane)

**Rol:** İlk prototip üretimi — numune hazırlama

### Ana Panel — Model Kartları
- Model adı, sezon, kumaş, durum
- Ölçü tablosu (tüm bedenler)
- Prova kayıtları (video + fotoğraf)
- Revizyon geçmişi

### Alt Pencereler
- Model görselleri
- Prova videoları
- Ölçü kontrol sonuçları

### Kayıt Zorunluluğu
- **Her prova: video + fotoğraf + yazılı not**
- Her dikiş işlemi kayıt altında
- Revizyon sebebi yazılı

### Veri Paylaşımı
- ← Ar-Ge (ürün briefi)
- ← Kumaş (malzeme bilgisi)
- → Kalıp (onaylanan model)
- → İmalat (numune bilgileri)

---

## 5. KALIP (/kalip)

**Rol:** Ürün kalıp sistemi — beden serisi, dikiş payı, kesim planı

### Ana Panel
- Kalıp listesi
- Kalıp görseli (DXF dosya önizleme)
- Beden serisi tablosu
- Dikiş payı bilgisi

### Alt Pencereler
- Kalıp çizimi görüntüleyici
- Beden serisi ölçüleri
- Kesim planı (kumaş en × yerleşim)

### Veri Paylaşımı
- ← Modelhane (onaylanan model)
- ← Kumaş (en bilgisi)
- → Kesim (kalıp dosyası + yerleşim)
- → Maliyet (kumaş tüketimi)

---

## 6. KESİMHANE (/kesim)

**Rol:** Kumaş kesimi — pastal planı, fire kontrolü

### Ana Panel
- Kesim planı listesi
- Pastal yerleşimi (görsel)
- Kumaş tüketimi hesabı
- Fire oranı

### Veri Paylaşımı
- ← Kalıp (kalıp dosyası)
- ← Kumaş (stok)
- → İmalat (kesilen parçalar)
- → Stok (kumaş düşüşü)
- → Maliyet (fire oranı)

---

## 7. İMALAT (/imalat)

**Rol:** Dikiş üretimi — operasyon takibi, kalite kontrol

### Ana Panel — Üretim Hattı
- İş emri listesi
- Operasyon listesi (sıralı)
- Üretim takip (adet/saat/gün)
- Kalite kontrol sonuçları

### Her Operasyon İçin Görsel
| Bilgi | Detay |
|---|---|
| Operasyon adı | yaka dikimi, kol takma vb |
| Makine türü | düz, overlok, reçme vb |
| İşlem süresi | dakika |
| Zorluk seviyesi | kolay/orta/zor |
| Beceri gereksinimi | standart/uzman |

### Kayıt Zorunluluğu
- **Her operasyon: görsel + sesli kayıt**
- Doğru/yanlış yapım kaydı
- İnsiyatif bırakılmaz — işlem talimatı sistemden gelir

### Veri Paylaşımı
- ← Kesim (parçalar)
- ← Kalıp (operasyon planı)
- → Stok (bitmiş ürün)
- → Maliyet (işçilik süresi)
- → Kalite kontrol raporları

---

## 8. MALİYET (/maliyet)

**Rol:** Ürün maliyet hesabı

### Ana Panel — Maliyet Tablosu
- Kumaş maliyeti
- Aksesuar maliyeti
- İşçilik maliyeti
- Genel gider payı
- Toplam maliyet
- Önerilen satış fiyatı
- Kâr marjı %

### Veri Paylaşımı
- ← Kumaş (fiyat), Kesim (fire), İmalat (işçilik)
- → Karargâh, Sipariş (fiyat bilgisi)

---

## 9. MUHASEBE (/muhasebe)

**Rol:** Finans kayıtları

### Ana Panel
- Gelir/gider tablosu
- Faturalar
- Vergi hesapları
- Banka hareketleri

### Yetki: Karargâh + Muhasebe yetkisi

---

## 10. KASA (/kasa)

**Rol:** Nakit kontrol

### Ana Panel
- Günlük kasa durumu
- Ödeme kayıtları (giren/çıkan)
- Alacak/borç

---

## 11. STOK (/stok)

**Rol:** Ürün stok yönetimi

### Ana Panel
- Depo stok listesi
- Mağaza stok
- Kritik stok uyarıları (minimum seviye altı)
- Stok hareket geçmişi

### Veri Paylaşımı
- ← İmalat (bitmiş ürün), Kesim (kumaş düşüşü)
- → Sipariş, Katalog, Karargâh

---

## 12. KATALOG (/katalog)

**Rol:** Satış kataloğu

### Ana Panel
- Ürün fotoğrafları
- Ürün açıklamaları
- Fiyat bilgisi
- Beden/renk seçenekleri

---

## 13. SİPARİŞLER (/siparisler)

**Rol:** Sipariş yönetimi

### Ana Panel
- Sipariş tablosu (tarih, müşteri, ürün, adet, durum)
- Üretim durumu bağlantısı
- Sevkiyat takibi

---

## 14. MÜŞTERİLER (/musteriler)

**Rol:** Müşteri verisi

### Ana Panel
- Müşteri kartı (ad, iletişim, adres)
- Satın alma geçmişi
- Favori ürünler

### Yetki: Kişisel veri — sınırlı erişim

---

## 15. PERSONEL (/personel)

**Rol:** Çalışan sistemi

### Ana Panel
- Çalışan profili
- Görev geçmişi
- Performans kaydı (günlük/haftalık/aylık)
- Beceri matrisi

### Kayıt
- Günlük, haftalık, aylık iş kayıtları sistemde
- Şeffaf performans takibi

---

## 16. GÖREVLER (/gorevler)

**Rol:** İş yönetimi — görev atama ve takip

### Ana Panel
- Görev listesi (sorumlu, teslim tarihi, durum)
- Tamamlanan işler
- Geciken görevler (kırmızı vurgu)

---

## 17. KAMERALAR (/kameralar)

**Rol:** Üretim alanı izleme

### Ana Panel
- Canlı kamera görüntüleri
- Kayıt arşivi
- Makine/hat bazlı görüntü

---

## 18. AJANLAR (/ajanlar)

**Rol:** AI agent sistemi yönetimi

### Ana Panel
- Agent listesi (trend, satış, stok, üretim, maliyet)
- Agent durumu (çalışıyor/beklemede)
- Agent raporları
- Agent önerileri

---

## 19. DENETMEN (/denetmen)

**Rol:** Sistem kontrolü — işlem denetimi

### Ana Panel
- İşlem denetim listesi
- Hata raporları
- Düzeltme takibi
- Tekrar eden hata uyarısı

---

## 20. RAPORLAR (/raporlar)

**Rol:** Analiz ve raporlama

### Ana Panel
- Satış raporu (günlük/haftalık/aylık)
- Üretim raporu
- Maliyet raporu
- Trend raporu
- Performans raporu

---

## 21. TASARIM (/tasarim)

**Rol:** Ürün çizimi — tasarım editörü

### Ana Panel
- Çizim editörü
- Desen sistemi
- Renk paleti
- Tasarım arşivi

---

## 22. ÜRETİM (/uretim)

**Rol:** Tüm üretim planı

### Ana Panel
- Üretim takvimi
- Kapasite planı
- Hat yükü
- Teslim tarihleri

---

## 23. GÜVENLİK (/guvenlik)

**Rol:** Sistem güvenliği

### Ana Panel
- Kullanıcı yetkileri tablosu
- Erişim logları
- Güvenlik uyarıları
- Yetki değişiklik geçmişi

### Kural: Herkes kendi yetki alanına erişir

---

## 24. AYARLAR (/ayarlar)

**Rol:** Sistem yapılandırması

### Ana Panel
- Dil ayarı (Türkçe/Arapça/çok dilli)
- Modül ayarları
- Bildirim ayarları
- Tema ayarları

---

## 25. GİRİŞ (/giris)

**Rol:** Kimlik doğrulama

### Ana Panel
- Kullanıcı giriş formu
- 2FA doğrulama
- Şifre sıfırlama
