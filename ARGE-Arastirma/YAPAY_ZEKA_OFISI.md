# YAPAY ZEKA OFİSİ — GÖREVLER VE MİMARİ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları
> Amaç: Sistemin eksiklerini bulan, analiz eden ve geliştiren AI merkezi

---

## ANA GÖREV

Yapay Zeka Ofisi işletmenin 4. bölümüdür.
Görevi: sistemin eksiklerini bulmak, veri analiz etmek, iyileştirme önerisi üretmek.

---

## GÖREV LİSTESİ

| # | Analiz | Amaç |
|---|---|---|
| 1 | Satış Analizi | Hangi ürün satıyor, hangisi satmıyor |
| 2 | Üretim Verim Analizi | Hangi işlem yavaş, darboğaz nerede |
| 3 | Trend Analizi | Yeni ürün önerisi üretme |
| 4 | Hata Analizi | Üretim hatalarını tespit ve azaltma |
| 5 | Maliyet Analizi | Maliyet optimizasyonu önerileri |
| 6 | Performans Analizi | Personel/makine performans ölçümü |
| 7 | Stok Analizi | Kritik stok, yavaş dönen ürün |
| 8 | Müşteri Analizi | Müşteri tercihleri, bölge analizi |

---

## KAMERA + AGENT ENTEGRASYONU

**Mevcut durum:** İşletmede 12 adet Necron kamera sistemi var.

| Bileşen | Görev |
|---|---|
| Kamera | İşçi hareketi/işlem gözlemi |
| Vision Agent | Video/görüntü analizi |
| Performans Agent | Üretim hızı ölçümü |
| Kalite Agent | Ürün kalite kontrolü (görsel) |

**Sorular:**
- Kameralar sisteme nasıl entegre edilecek?
- Kamera başına kaç agent gerekiyor?
- Video analiz hangi AI ile yapılacak?
- Video depolama kapasitesi yeterli mi?
- Kamera erişimi yetkili mi?

---

## SİSTEM ÖĞRENMESİ (3-6-9-12 AY PLANI)

| Süre | Beklenen Gelişim |
|---|---|
| 3 ay | Temel veri toplama, ilk analizler |
| 6 ay | Trend tahmin doğruluğu artışı |
| 9 ay | Üretim optimizasyonu önerileri |
| 12 ay | Otonom karar destek sistemi |

**Öğrenme gereksinimleri:**
- Satış verisi → başarılı/başarısız ürün öğrenme
- Üretim verisi → darboğaz/verim öğrenme
- Hata verisi → tekrarlayan hata öğrenme
- Müşteri verisi → tercih kalıpları öğrenme

---

## BİLGİ HAFIZASI (KNOWLEDGE BASE)

Sistem şu bilgileri unutmamalı:
- Yapılan hatalar
- Yapılan doğru işlemler
- Başarılı modeller
- Başarısız modeller
- Trend tahmin doğruluk oranı

**Bu olmadan sistem kendini geliştiremez.**

---

## AI KARAR KURALI

1. AI tek başına karar VERMEZ
2. AI öneri üretir → sistem/insan onaylar
3. Her AI çıktısı loglanır
4. Yanlış öneri → otomatik geri bildirim
5. AI sadece son kontrol/karar anında devreye girer (maliyet kontrolü)

---

## İŞLETMEYE FAYDA

| Alan | Beklenen Kazanç |
|---|---|
| Doğru ürün seçimi | +%30 satış |
| Hata azaltma | -%40 fire |
| Stok optimizasyonu | +%60 doğruluk |
| Maliyet kontrolü | -%20 gereksiz harcama |
| Üretim verimliliği | +%35 hız |

---

## YAPAY ZEKA OFİSİ TEKNOLOJİLERİ

| Teknoloji | Kullanım | Tahmini Maliyet |
|---|---|---|
| Gemini API | Trend analiz, metin analiz | 10-100$/ay |
| Perplexity API | Araştırma | 20-200$/ay |
| Vision AI | Görsel analiz, kamera | 50-500$/ay |
| Speech-to-Text | Sesli komut | 10-50$/ay |
| Özel ML modelleri | Tahmin, sınıflandırma | Geliştirme maliyeti |
