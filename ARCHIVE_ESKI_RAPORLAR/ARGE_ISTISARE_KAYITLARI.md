# AR-GE İSTİHBARAT SİSTEMİ — TAM İSTİŞARE KAYITLARI
> Oluşturulma: 4 Nisan 2026
> Son Güncelleme: 4 Nisan 2026 07:34
> Kaynak: Tüm ChatGPT analizleri + mevcut Mizanet kodu
> Durum: KARŞILAŞTIRMA VE FİNAL KARAR İÇİN HAZIR

---

## BÖLÜM 1: SİSTEMİN AMACI (SABİT — DEĞİŞMEZ)

Dün trend neydi + Bugün trend ne
Dün ne sattı + Bugün ne satıyor
→ Ortak modeli bul → Satılabilir ürün üret

**Kural:** Satış verisi, üretim verisiyle karıştırılmaz.
- Satılabilirlik kararı = PAZAR + TREND verisiyle
- Üretilebilirlik kararı = MALİYET + KAPASİTE ile (AYRI aşama)

---

## BÖLÜM 2: MEVCUT SİSTEM DURUMU (CANLI KOD)

### 2.1 Var Olan Dosyalar
| Dosya | Konum | Durum |
|---|---|---|
| ArgeMainContainer.js | src/features/arge/components/ | Çalışıyor — Perplexity API ile trend arama |
| ArgeIstihbaratPanel.js | src/features/arge/components/ | Mevcut |
| useArge.js | src/features/arge/hooks/ | Mevcut |
| argeApi.js | src/features/arge/services/ | Mevcut |
| TrendKararMotoru.js | _agents/scripts/ | Çalışıyor — 8 sinyal, ağırlıklı skor motoru |
| sicak_satis_radari.js | _agents/scripts/ | Mevcut |
| 138_ALTIN_KRITERLER.md | _agents/ | 37 DIŞ + 56 İÇ kriter + 8 BİNGO şartı |
| VERI_MIMARISI_TASLAK.md | _agents/ | 4 eksen veri toplama mimarisi taslağı |
| ANALIZ_01_ARGE_TREND.md | _agents/ | Mevcut durum analizi |

### 2.2 Mevcut TrendKararMotoru.js (8 SİNYAL)
| Sinyal | Ağırlık | Açıklama |
|---|---|---|
| DÖNÜŞÜM | %35 | İzlenme → Sepet → Satış |
| TALEP | %20 | Sepet, Favori, Yorum ivmesi |
| VİRAL | %15 | Yayılma hızı, tekrar çıkma |
| REKABET | %10 | Pazar doymuş mu |
| YORUM | %10 | Tekrar eden olumlu yorum |
| ZAMAN | %5 | Artış devam mı durdu mu |
| RİSK | -%20 | İade sinyali, sahte trend (DÜŞÜRÜR) |

**Karar eşikleri:**
- >= 85 → ÜRET
- >= 70 → GİR (test edilebilir)
- >= 50 → BEKLE
- < 50 → İPTAL

**Özel kurallar:**
- ERKEN GİR ETİKETİ: Viral yüksek + Rekabet düşük + Yorum az ama artıyor
- ÖLÜMCÜL FİLTRE: Dönüşüm=0 veya Yorum artışı yavaşlamış → otomatik İPTAL

### 2.3 Mevcut 138 ALTIN KRİTER Yapısı
**A) DIŞ İSTİHBARAT (37 kriter):**
- TikTok & Instagram (13 kriter): izlenme, beğeni, yorum, kaydetme, viral hız, klonlanma, engagement
- Google & Pazar Yeri (12 kriter): arama trendi, sıralama, stok, kargo, rakip, iade
- Pinterest (12 kriter): kaydetme, desen, renk, siluet

**B) İÇ KARARGAH (56 kriter — 7 aşama):**
- Eleme (6): trend ürün, satış sinyali, fiyat bandı, şikayet, rakip, trend süresi
- Talep (3): sepet, favori, viral
- Strateji (4): fark, fiyat avantajı, boşluk, varyant
- Teknik (5): parça sayısı, dikim zorluğu, özel makine, işçilik süresi, fire
- Operasyon (4): kumaş tedariği, üretim süresi, kapasite, kargoya çıkış tarihi
- Maliyet (5): kumaş+aksesuar, işçilik, genel gider, satış fiyatı, kâr marjı
- Müşteri (4): nesil, kullanım yeri, övülen detay, iade kusuru
- Çelik Zırh / Risk Filtreleri (24 kriter): kalite, tedarik, skalabilite, platform, fiyat, yaşam döngüsü, lojistik

**C) BİNGO ŞARTLARI (8 kriter — TÜMÜ YEŞİL = KESİME GİR):**
1. İvme Pisti (Sepet Deltası + IG Kaydetme 48 saatte dikey sıçramış)
2. Klonlama (3-4 farklı küçük hesap paylaşmış)
3. Reklam Basıncı Yok (organik)
4. Rakip Doygunluğu (pazar boşluğu var)
5. İade Zırhı (şikayet <%20)
6. Maliyet & Marj (psikolojik fiyat eşiğinde kâr çıkıyor)
7. Bant Kapasitesi (üretim engellemeyecek)
8. Eğri (PİK'e giden tırmanış evresinde)

### 2.4 Mevcut Eksikler (ANALIZ_01'den)
- ❌ Gerçek veri yok (0 kayıt)
- ❌ Skor sistemi entegre değil
- ❌ API hataları (CORS / 522 / 400 Bad Request)
- ❌ Karar paneli yok
- ❌ Sosyal medya bağlantısı yok
- ❌ Zaman karşılaştırma sistemi yok

---

## BÖLÜM 3: ChatGPT ANALİZLERİNDEN ÇIKARILAN BİRLEŞTİRİLMİŞ SONUÇLAR

### 3.1 Tüm Raporlarda Tekrar Eden Mutabakatlar
1. Tek AI yetmez — çoklu ajan mimarisi gerekli
2. Veri toplama / analiz / karar ayrı katmanlarda olmalı
3. Trend skor formülü matematik zorunlu — LLM karar vermemeli
4. Risk analizi zorunlu — trend iyi olsa bile üretim riski var
5. Feedback loop zorunlu — sistem öğrenmeli
6. Veri bankası = güç — 6-12 ay veri birikmeli
7. Kamuya açık veri — veri çekme yok, görsellerden okuma
8. Platform verileri kendi alanında değerlendirilmeli (karıştırılmaz)
9. Zaman katmanı kritik — dün/bugün/3gün değişim zorunlu
10. Üretim, maliyet, kapasite bilgisi satılabilirlik kararından AYRI

### 3.2 Raporlardaki Ajan Sayısı Önerileri
| Kaynak | Ajan Sayısı | Performans |
|---|---|---|
| 3 kişilik tim | 3 | Yetersiz |
| 8 ajan (düşük maliyet) | 8 | %70 |
| 10 kişilik süper tim | 10 | %85 |
| 12 ajan optimum | 12 | %90-95 |
| 20 ajan tam sistem | 20 | %100'e yakın |

### 3.3 ChatGPT Trend Skor Formülü
```
TrendScore = (satış_büyümesi × 0.35) + (sosyal_medya × 0.30) + (rakip_kullanım × 0.20) + (sezon × 0.15)
```

### 3.4 Mevcut TrendKararMotoru.js vs ChatGPT Formülü KARŞILAŞTIRMA
| Kriter | Mevcut Kod | ChatGPT | Değerlendirme |
|---|---|---|---|
| Dönüşüm/Satış | %35 | %35 | AYNI — doğru |
| Talep | %20 | — | Mevcut daha detaylı |
| Viral/Sosyal | %15 | %30 | ChatGPT daha ağır veriyor |
| Rekabet | %10 | %20 | ChatGPT daha ağır veriyor |
| Yorum | %10 | — | Mevcut'a özel — iyi |
| Zaman | %5 | — | Mevcut'a özel — kritik |
| Risk | -%20 | ayrı modül | Mevcut'un entegre yöntemi daha güçlü |
| Sezon | — | %15 | EKLENMELİ |

**Sonuç:** Mevcut motor daha detaylı ve güçlü. Sezon uyumu eklenmeli. İkisi birleştirilmeli.

---

## BÖLÜM 4: VERİ SETİ (TAM — AYRILMIŞ)

### 4.1 VERİ LİSTESİ (Ham girdi — dışarıdan alınan)

#### A) TREND VERİSİ (Sosyal — erken sinyal)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 1 | İzlenme sayısı (T-3/T-1/bugün) | TikTok | video screenshot → OCR |
| 2 | Beğeni sayısı | TikTok / Instagram | screenshot → OCR |
| 3 | Yorum sayısı (sosyal) | TikTok / Instagram | screenshot → OCR |
| 4 | Kaydetme / save | Instagram / Pinterest | screenshot → OCR |
| 5 | Aynı ürün kaç farklı hesapta | TikTok / Instagram | arama + sayım |
| 6 | Aynı ürün kaç videoda | TikTok | hashtag arama screenshot |
| 7 | Video çoğalma hızı (24 saat) | TikTok / Instagram | tekrar screenshot karşılaştırma |
| 8 | İlk çıkış tarihi | TikTok / Instagram | içerik tarihi screenshot |
| 9 | Hashtag listesi + trend müzik | TikTok / Instagram | video detay screenshot |
| 10 | Hesap takipçi + engagement | TikTok / Instagram | profil screenshot |
| 11 | Profil tıklama / link tıklama | Instagram | story/bio screenshot |
| 12 | Viral hız (ilk 24/48 saat) | TikTok | zamanlı screenshot farkı |
| 13 | Klonlanma (küçük hesaplara yayılmış mı) | TikTok / Instagram | arama sonuçları |
| 14 | Google Trends artış % | Google Trends | grafik screenshot → değer |
| 15 | Bölgesel arama yoğunluğu | Google Trends | harita screenshot |
| 16 | Pinterest kaydetme sayısı | Pinterest | pin sayfası screenshot |
| 17 | Pinterest trend renk/desen | Pinterest | board screenshot |

#### B) SATIŞ VERİSİ (Pazar — gerçek)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 18 | Yorum sayısı (pazar) | Trendyol | ürün sayfası screenshot |
| 19 | Yorum artışı (24 saat fark) | Trendyol | tekrar screenshot karşılaştırma |
| 20 | Stok durumu / değişimi | Trendyol | ürün sayfası screenshot |
| 21 | Stok erime hızı | Trendyol | zamanlı screenshot farkı |
| 22 | "Son X ürün" uyarısı | Trendyol | ekran screenshot |
| 23 | Satıcı sayısı | Trendyol | arama listesi screenshot |
| 24 | Yeni satıcı giriş hızı | Trendyol | zamanlı arama karşılaştırma |
| 25 | Fiyat taban / tavan | Trendyol | liste screenshot → OCR |
| 26 | Fiyat dağılımı (ortalama) | Trendyol | çoklu screenshot → hesap |
| 27 | Psikolojik fiyat eşiği (299/499) | Trendyol | fiyat analizi |
| 28 | Kategori sıralama (en çok satan) | Trendyol | kategori sayfası screenshot |
| 29 | Sepete ekleme sinyali | Trendyol | UI metin screenshot |
| 30 | "Çok satan" rozeti | Trendyol | ürün sayfası |
| 31 | İlk sayfa doluluk % | Trendyol | arama sonuç sayısı |
| 32 | Bundle / set potansiyeli | Trendyol | benzer ürünler |
| 33 | Kargo süresi | Trendyol | ürün sayfası screenshot |

#### C) DAVRANIŞ VERİSİ (Yorum — neden alıyor/almıyor)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 34 | Yorum içi satın alma sinyali | Trendyol yorumları | screenshot → LLM okuma |
| 35 | "2. kez aldım" / tekrar alım | Trendyol yorumları | screenshot → LLM okuma |
| 36 | Kumaş şikayeti / övgü | Trendyol yorumları | screenshot → LLM analiz |
| 37 | Kalıp şikayeti / övgü | Trendyol yorumları | screenshot → LLM analiz |
| 38 | İade sebebi | Trendyol yorumları | screenshot → LLM analiz |
| 39 | "link?" / "nereden?" yorumları | TikTok / Instagram | yorum screenshot |
| 40 | Müşteri yaş/cinsiyet sinyali | Trendyol yorumları | LLM analiz |
| 41 | En çok övülen detay | Trendyol yorumları | LLM analiz |
| 42 | En çok şikayet edilen kusur | Trendyol yorumları | LLM analiz |
| 43 | Almama sebebi (pahalı/kötü kalite) | Trendyol yorumları | LLM analiz |

#### D) ÜRÜN / MODEL VERİSİ (Görsel — ne üretilecek)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 44 | Ürün tipi / kategori | Ürün görseli | screenshot → Vision AI |
| 45 | Kalıp / kesim (oversize/dar/regular) | Ürün görseli | screenshot → Vision AI |
| 46 | Uzunluk / boy | Ürün görseli | screenshot → Vision AI |
| 47 | Form / siluet | Ürün görseli | screenshot → Vision AI |
| 48 | Renk (en çok satan) | Trendyol varyant listesi | screenshot |
| 49 | Renk trendi (sosyal) | TikTok / Pinterest | screenshot |
| 50 | Desen | Ürün görseli | screenshot → Vision AI |
| 51 | Detay (cep, fermuar, yaka tipi) | Ürün görseli | screenshot → Vision AI |
| 52 | Beden seçenekleri + tükenen bedenler | Trendyol | ürün sayfası screenshot |
| 53 | Eksik varyant (beden/renk) | Trendyol | varyant listesi |

#### E) REKABET VERİSİ (Fırsat)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 54 | Aynı ürün kaç satıcıda | Trendyol | arama sonuçları |
| 55 | Rakip fiyat farkı | Trendyol | fiyat karşılaştırma |
| 56 | Rakipte eksik varyant | Trendyol | rakip ürün sayfası |
| 57 | Rakipte kötü yorum (fırsat) | Trendyol | rakip yorum screenshot |
| 58 | Rakip görsel kalitesi | Trendyol | görsel karşılaştırma |
| 59 | İndirim/kampanya durumu | Trendyol | ürün sayfası |
| 60 | Reklam yoğunluğu | Meta Ad Library | reklam sayfası screenshot |

#### F) ZAMAN VERİSİ (Değişim — zorunlu)
| # | Veri | Kaynak | Erişim Yöntemi |
|---|---|---|---|
| 61 | Günlük snapshot (tüm platformlar) | Tüm | her gün aynı veri screenshot |
| 62 | Trend değişim oranı (delta) | Hesaplanan | snapshot farkı |
| 63 | Trend ömrü tahmini | Google Trends | geçmiş grafik screenshot |
| 64 | İçerik artış/azalış hızı | TikTok/Instagram | zamanlı karşılaştırma |
| 65 | Trend başlangıç tarihi | TikTok/Google | ilk içerik/arama tarihi |

**TOPLAM: 65 veri noktası — tamamı kamuya açık, tamamı screenshot + OCR/AI yöntemiyle**

---

### 4.2 HESAP LİSTESİ (Veriden türetilen matematik)
| # | Hesap | Girdileri |
|---|---|---|
| H1 | Sepete dönüşüm oranı | izlenme / sepet |
| H2 | Satışa dönüşüm oranı (proxy) | yorum delta / sepet |
| H3 | Favori/yorum oranı | favori / yorum |
| H4 | Trend ivmesi (24-48 saat) | T0 - T-1 fark |
| H5 | 3-gün artış hızı | T0 vs T-3 |
| H6 | 7-gün artış hızı | T0 vs T-7 |
| H7 | Pazar doygunluk skoru | satıcı sayısı + ilk sayfa doluluk |
| H8 | Arz-talep farkı | stok erime vs satıcı sayısı |
| H9 | Ortalama fiyat | tüm fiyatların ortalaması |
| H10 | Psikolojik fiyat analizi | fiyat vs eşik noktaları |
| H11 | Rekabet yoğunluk skoru | satıcı + fiyat + varyant |
| H12 | İade oranı (proxy) | olumsuz yorum / toplam yorum |
| H13 | Trend ömür tahmini | başlangıç + ivme + kategori bazlı |
| H14 | Balon/gerçek trend filtresi | sosyal var ama satış yok = balon |
| H15 | Klonlanma skoru | farklı hesap sayısı + tekrar |
| H16 | Erken trend sinyali | düşük yorum + yüksek ilgi |
| H17 | Stok dayanım süresi | stok / günlük erime hızı |
| H18 | Trend güven skoru | çoklu platform doğrulama |

### 4.3 KARAR LİSTESİ (Sistemin çıktıları)
| Karar | Açıklama |
|---|---|
| ÜRET | Trend + satış + süreklilik + fırsat → tam |
| TEST ÜRETİMİ | Sinyaller güçlü ama kesinleşmemiş |
| ERKEN GİR | Viral yüksek + rekabet düşük + yeni başlamış |
| BEKLE | Kararsız sinyal — izlemeye devam |
| RED | Balon, satış yok, trend bitmiş |
| İPTAL | Ölümcül filtre (dönüşüm=0, iade yüksek) |

### 4.4 SİSTEM DAVRANIŞI LİSTESİ (Mekanik)
| # | Davranış | Açıklama |
|---|---|---|
| S1 | 24 saat tekrar kontrol | Her veri günlük doğrulanır |
| S2 | 72 saat trend doğrulama | 3 gün devam eden = güçlü |
| S3 | 7 gün yeniden analiz | Haftalık tam döngü |
| S4 | 20 gün ölüm kararı | Satış yoksa üretim durdur |
| S5 | Feedback loop | Satış verisi modeli günceller |
| S6 | Ağırlık güncelleme | Dinamik weight update |
| S7 | Veri doğrulama (Zod) | Kirli veri sisteme girmez |
| S8 | Çapraz platform doğrulama | 3 platformda varsa güçlü |
| S9 | Sahte trend filtreleme | Bot/manipülasyon tespiti |
| S10 | Stop-loss mekanizması | Zarar kesme otomatik |
| S11 | Numune zorunluluğu | TEST → ÜRET geçişinde numune şartı |
| S12 | Log / kayıt | Her işlem kayıt altında |

---

## BÖLÜM 5: PLATFORM HİYERARŞİSİ (KRİTİK KURAL)

| Platform | Rolü | NE İÇİN KULLANILIR | NE İÇİN KULLANILMAZ |
|---|---|---|---|
| Trendyol | GERÇEK SATIŞ | Satılıyor mu kararı | Trend tespiti |
| TikTok | ERKEN SİNYAL | Ne yükseliyor | Satış tahmini |
| Instagram | ERKEN SİNYAL | Trend doğrulama | Satış kararı |
| Pinterest | TASARIM YÖNÜ | Renk, desen, siluet | Satış/trend kararı |
| Google Trends | DESTEK | Arama hacmi, yön | Tek başına karar |

**ALTIN KURAL:** Platform verileri karıştırılmaz. Her platform kendi alanında değerlendirilir.
**KARAR HİYERARŞİSİ:** Pazar verisi > Sosyal veri > Yorum verisi

---

## BÖLÜM 6: SİSTEMİN KESİN İŞ AKIŞI

```
ADIM 1: Trend ürün bul (TikTok / Instagram)
   └── İzlenme artış, beğeni artış, içerik çoğalması
   
ADIM 2: Aynı ürünü Trendyol'da ara
   └── Ürün var mı? Satılıyor mu?
   
ADIM 3: Satış doğrulama
   └── Yorum artıyor mu? Stok eriyor mu?
   ├── EVET → devam
   └── HAYIR → RED
   
ADIM 4: Zaman analizi (3 gün karşılaştır)
   ├── Sürekli artış → güçlü trend
   ├── Ani artış + düşüş → balon → RED
   └── Stabil artış → kalıcı
   
ADIM 5: Balon filtresi
   ├── Sadece sosyal, satış yok → RED
   └── Satış + sosyal birlikte → devam
   
ADIM 6: Model parçalama
   └── Kalıp, renk, form, detay ayrı ayrı çıkarılır
   
ADIM 7: Kesişim bulma (KALP)
   ├── Dün trend + bugün trend → ortak ne?
   ├── Dün satan + bugün satan → ortak ne?
   └── İki kesişim birleşince → üretilecek model
   
ADIM 8: Davranış analizi
   └── Neden alıyor? Neden almıyor? Kritik fark
   
ADIM 9: Fırsat analizi
   └── Eksik beden, eksik renk, kalite açığı, fiyat fırsatı
   
ADIM 10: Test (24 saat + 72 saat tekrar kontrol)
   ├── Devam ediyorsa → güçlü
   └── Düşmüşse → RED
   
ADIM 11: Skor hesapla (TrendKararMotoru)
   └── 8 sinyal ağırlıklı skor → ÜRET / GİR / BEKLE / İPTAL
   
ADIM 12: Son karar
   ├── Trend ✔ + Satış ✔ + Zaman ✔ + Tekrar ✔ → ÜRET
   └── Herhangi biri ✘ → uygun karar
```

---

## BÖLÜM 7: 5 ÇAPRAZ ANALİZ SİSTEMİ

### Analiz 1: TREND ANALİZİ
- İçerik artış var mı? (farklı hesaplar, farklı videolar)
- İzlenme/beğeni artış hızı
- Klonlanma var mı? (küçük hesaplara yayılma)

### Analiz 2: SATIŞ ANALİZİ
- Trendyol'da stok eriyor mu?
- Yorum artıyor mu?
- Tekrar alım sinyali var mı?

### Analiz 3: ZAMAN ANALİZİ
- Dün vs bugün (24 saat delta)
- 3 gün vs bugün (süreklilik)
- Trend başlangıcı / pik / düşüş hangi aşamada

### Analiz 4: MODEL ANALİZİ
- Kalıp, renk, form ortak noktaları
- Satanların ortak kesimi
- Trendlerin ortak silueti

### Analiz 5: FIRSAT ANALİZİ
- Rakipte eksik varyant (beden/renk)
- Rakip kötü yorum → bizim fırsat
- Fiyat fırsatı → psikolojik eşik altı girebilir miyiz

---

## BÖLÜM 8: YASAL VERİ POLİTİKASI (DEĞİŞMEZ)

**İZİNLİ:**
- Kamuya açık sayfa görsellerinin screenshot'ı
- Screenshot'tan OCR / Vision AI ile bilgi okuma
- Kendi beynimize (DB'ye) analiz sonucu kaydetme
- Resmi API kullanımı (Google Trends / SerpAPI)

**YASAK:**
- Site veritabanı çekme (scraping backend)
- İzinsiz API kullanımı
- Telifli görsel kopyalama
- Kişisel veri işleme

**Model adı:** Competitive Intelligence (gözlem → analiz → yorum → kayıt)
Fotoğraf/veri kopyalanmaz, analiz sonucu kaydedilir.

---

## BÖLÜM 9: TEKNOLOJİ KARŞILAŞTIRMA

### ChatGPT Önerisi
| Alan | Teknoloji |
|---|---|
| Ana dil | Python 3.11 |
| Backend | FastAPI |
| DB | PostgreSQL 15 |
| Queue | Redis + RQ |
| ML | CatBoost + scikit-learn |
| NLP | transformers (distilbert) |
| Görsel | CLIP + YOLO |
| Zamanlama | APScheduler |

### Mevcut Mizanet Sistemi
| Alan | Teknoloji |
|---|---|
| Ana dil | JavaScript (Next.js) |
| DB | Supabase (PostgreSQL) |
| AI | Perplexity API |
| Frontend | React |
| Ajan sistemi | ajanlar-v2.js (7 ajan) |

### KARAR VERİLMESİ GEREKEN NOKTALAR
1. Python ayrı servis mi, JavaScript içinde mi?
2. Mevcut TrendKararMotoru.js korunacak mı, genişletilecek mi?
3. Screenshot + OCR sistemi hangi teknolojiyle?
4. Bot vs Agent ayrımı nasıl yapılacak?
5. Supabase yeterli mi, ayrı PostgreSQL mı?
6. AI modeli: açık kaynak (Llama/Mistral) mı, API (Gemini/Perplexity) mi?
7. Panel: mevcut Mizanet içinde mi, ayrı uygulama mı?
8. Telegram entegrasyonu: bildirim + komut mu, sadece bildirim mi?

---

## BÖLÜM 10: GÜNLÜK OPERASYON HEDEFLERİ

| Hedef | Minimum | Optimum |
|---|---|---|
| Ürün analiz | 100-200 | 300-500 |
| Trend raporu | 10 | 30 |
| Üretim fırsatı | 3-5 | 10 |

---

## BÖLÜM 11: BAŞARI KRİTERLERİ

| Kriter | Hedef |
|---|---|
| Trend tahmin doğruluğu | >= %90 |
| Yanlış üretim oranı | <= %10 |
| Stok dönüşümü | Yükselecek |
| Kâr marjı | Yükselecek |
| Veri birikimi | 6-12 ay minimum |

---

## BÖLÜM 12: BİLİNEN HATALAR (CANLI SİSTEMDE)

### 400 Bad Request Hatası
- **Belirti:** `GET https://cauptlsnqieeg... 400 (Bad Request)`
- **Analiz:** Backend isteği reddediyor — validation hatası
- **Olası sebepler:**
  1. Query parametresi eksik veya yanlış format
  2. Zod validation reject ediyor
  3. Zorunlu alan gönderilmemiş
  4. Veri tipi uyuşmazlığı (string vs number)
- **Çözüm:** Request payload + backend schema incelenmeli

---

## BÖLÜM 13: SONRAKI ADIMLAR (KARAR BEKLİYOR)

Bu dosya kayıt ve referans amaçlıdır. Final plan için:
1. Bu kayıtları oku + doğrula
2. Bölüm 9'daki teknoloji sorularına karar ver
3. 65 veri noktasını incele — eksik var mı, fazla var mı
4. Final mimari çiz
5. Ekip görevlendirmesi yap
6. Kuruluma başla
