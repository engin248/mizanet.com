# AR-GE İSTİŞARE KAYITLARI — ChatGPT Sohbetlerinden Çıkarılan Bilgiler
> Kaynak: Kullanıcının ChatGPT ile yaptığı kapsamlı AR-GE istişare sohbetleri
> Amaç: Karşılaştırma ve final analiz için tüm kararların/bilgilerin kaydı
> Durum: KAYIT — Analiz için hazır

---

## 1. SİSTEMİN MEVCUT DURUM TESPİTİ

- Sistem şu an prompt tabanlı MVP — gerçek mühendislik değil
- 138 kriter fiziksel olarak yazılmamış
- Botlar simülasyon — gerçek veri akışı yok
- ARGE motoru karar veren değil, yorumlayan — riskli
- **3 ana problem**: veri güvenilmez, karar mekanizması zayıf (if/else + prompt), fiziksel doğrulama yok

---

## 2. 138 KRİTERİN 4'LÜ AYRIM (KRİTİK KARAR)

Kriterler 4 farklı tipte karışmış durumda. **Ayrılması zorunlu**:

### 2.1 VERİ (Ham Input — Dışarıdan Gelen)
> Toplanır, ölçülür, saklanır. Karar vermez.

- Saatlik favori ivmesi / görüntülenme
- Favori/yorum oranı, sepet deltası
- Saatlik stok eriyik hızı, beden bazlı stok
- Kategori sıralama, arama hacmi
- Google Lens hacmi, bölgesel arama, ikame arama
- Sosyal→satış geçiş, URL paylaşım hızı
- Cüzdan/alım gücü, kupon kullanımı
- Yorumlar (tüm içerik), soru sayısı
- Takipçi sayısı, Pinterest kayıt
- TikTok izlenme/yorum, kaydetme oranı, bounce rate
- Influencer veri, reklam verisi, hashtag veri
- Demografi veri, görsel veri (Vision AI input)
- Kumaş yorumları, şikayet/iade verisi
- Fiyat verisi (taban/tavan), stok verisi, rekabet verisi
- Kargo süresi, ürün görselleri/açıklamaları
- Trend verisi (Google/Pinterest), global veri
- Tedarikçi/maliyet/üretim kapasite/kur/depo verisi

### 2.2 HESAP (Türetilen — Matematikle Üretilen)
> Veriden hesaplanır. Doğrudan toplanamaz.

- Favori/yorum oranı, yorum/izlenme oranı
- Sepet terk oranı (proxy), trend ivmesi (24-48 saat)
- 7 gün artış hızı, pazar doygunluk hesap
- Arz-talep farkı, ortalama fiyat
- Psikolojik fiyat analizi, rekabet yoğunluk skoru
- Yıldız kalite filtresi, iade oranı hesap
- Risk/getiri oranı, break-even, kar marjı
- CAC hesap, ölçek ekonomisi, fire oranı
- Kapasite kullanımı, trend ömür tahmini
- Global vs lokal fark, veri çakışma çözümü

### 2.3 KARAR (Aksiyon — Sistemin Çıktısı)
> Para kazandıran nokta.

- ÜRET / TEST ÜRETİMİ / RED / BEKLE / ALARM
- FİYAT DÜŞÜR / RENK EKLE / BEDEN GENİŞLET
- KUMAŞ DEĞİŞTİR / PAZARA GİR / PAZARDAN ÇIK
- STOK ARTIR / REKLAM AÇ / ÜRÜN İPTAL / NUMUNE ÜRET

### 2.4 SİSTEM DAVRANIŞI (Mekanik — Omurga)
> Sistemin nasıl çalıştığını tanımlar.

- 24 saat/7 gün/15 gün/20 gün tekrar kontrol
- Feedback loop, ağırlık güncelleme
- Veri doğrulama (Zod), bot veri birleştirme
- Çakışma çözümü, hiyerarşik veri önceliği
- Numune zorunluluğu, stop-loss mekanizması
- Log/geçmiş kayıt, yeniden değerlendirme
- Sahte veri filtreleme, AI son kontrol (vision)
- Etik kontrol, telif kontrol, kalite blokajı

---

## 3. 5-AÇILI KRİTER DENETİMİ

| Boyut | Odak |
|-------|------|
| Stratejik | İş hedefleri, pazar konumlandırma |
| Teknik | Veri güvenilirliği, entegrasyon |
| Operasyonel | Günlük iş akışı, otomasyon |
| Ekonomik/Risk | Maliyet, ROI, hata riski |
| İnsan/Sürdürülebilirlik | Yorumlanabilirlik, etik |

### Denetim Sonucu
- **27 Çekirdek (CORE)** → 5 boyutta geçti
- **~49 Destek (SUPPORT)** → koşullu kabul, pilot doğrulama gerekli
- **~62 Çöp (TRASH)** → en az 1 boyutta başarısız

---

## 4. VERİ KALİTESİ SINIFLANDIRMASI

| Sınıf | Açıklama | Oran |
|-------|----------|------|
| %100 Güvenilir | Fiyat, stok, yorum sayısı, kargo, kur, kapasite | ~%40 |
| Güvenilir ama temizleme gerekli | TikTok/IG izlenme, beğeni, hashtag, Pinterest | ~%30 |
| Dolaylı (türetilmeden kullanılmaz) | Sepet deltası, dark social, bounce rate | ~%15 |
| Riskli/manipüle edilebilir | Influencer etkisi, sponsorlu reklam, "çok satan" badge | ~%10 |
| AI bağımlı (son kontrol) | Kumaş kalitesi, kalıp duruşu, estetik | ~%5 |

---

## 5. PLATFORM AYRIM KURALI (KESİN)

| Platform | Rolü | Karar Gücü |
|----------|------|:----------:|
| **Trendyol** | Satış doğrulama (TEK GERÇEK) | ●●●●● |
| **TikTok** | Erken trend sinyali | ●●●○○ |
| **Instagram** | Erken trend sinyali | ●●●○○ |
| **Pinterest** | Tasarım yönü / stil | ●●○○○ |
| **Google Trends** | Arama hacmi desteği | ●●○○○ |

> **KRİTİK**: Satış platformu verisi ile sosyal medya verisi KARIŞTIRILMAZ. Her biri kendi alanında değerlendirilir.

---

## 6. ANA KARAR MODELİ (KESİŞİM)

```
DÜN TREND + BUGÜN TREND → ortak ne?
DÜN SATAN + BUGÜN SATAN → ortak ne?
Bu iki ortak birleşince → SATILABİLİR ÜRÜN
```

### Karar Tablosu
| Durum | Karar |
|-------|-------|
| Trend var + satış var | ✅ ÜRET |
| Trend var + satış yok | ❌ Üretme (balon) |
| Satış var + trend yok | ⚠ Geç kalmış |
| İkisi de yok | ❌ RED |

### Formül
```
Trend + Satış + Süreklilik + Fırsat = ÜRET
```

---

## 7. BALON FİLTRE (ZORUNLU)

- Sadece sosyalde var, satış yok → **RED**
- Influencer tek kaynak → **RED**
- Reklam tek kaynak → **RED**
- Ani sıçrama + hızlı düşüş → **BALON**

---

## 8. ZAMAN KATMANI (EKSİK TESPİT EDİLDİ — ZORUNLU EKLEME)

Her veri için 3 zaman noktası:
- T-3 (3 gün önce)
- T-1 (dün)
- T-0 (bugün)

> Değişim (delta) hesaplanmadan trend tespit **edilemez**.

---

## 9. EKSİK TESPİT EDİLEN KRİTİK VERİLER

| Eksik Veri | Neden Gerekli |
|------------|---------------|
| Günlük snapshot (T-3/T-1/T-0) | Değişim olmadan trend bilinemez |
| Tahmini satış hızı (adet/gün) | İzlenme ≠ satış |
| Dönüşüm oranı (proxy) | Sahte trend elenir |
| Trend ömrü tahmini | Yanlış zamanda üretim = zarar |
| Trend sebebi (neden satıyor?) | Yanlış ürün üretmeyi önler |
| Almama sebebi | Rakibin açığı bulunur |
| Varyant boşluğu (beden/renk) | Direkt satış fırsatı |
| Fiyat elastikiyeti | Maksimum kâr noktası |
| Erken alan kitle tipi | Trend başı yakalama |
| Trend güven skoru | Sahte trend engellemesi |
| Rekabet kırılma noktası | Geç girme hatası önleme |
| Üretim süresi vs trend süresi | Yetişir mi kontrolü |
| İlk 3 gün satış tahmini | Test üretim kararı |

---

## 10. 75 SORU ÇERÇEVESİ (15 KATEGORİ × 5 SORU)

1. **Trend tespiti** — ne yükseliyor, 24 saat artış, yeni ürün, balon, stabil
2. **Satış doğrulama** — gerçekten satıyor mu, hangi model, kaç satıcı, yorum, stok
3. **Trend+satış kesişimi** — ikisi birlikte mi, trend olup satmayan, satış olup trend olmayan
4. **Ürün model analizi** — kalıp, oversize/dar, boy, kesim, form
5. **Renk & görsel** — en çok satan renk, trend renk, tek/çoklu, açık/koyu
6. **Kumaş & malzeme** — tür, yorum, mevsim uyumu, alternatif
7. **Fiyat analizi** — en çok satan fiyat aralığı, ucuz/pahalı satışı, fiyat elastikiyeti
8. **Müşteri analizi** — kim alıyor, yaş, beden tercihi, yorum, şikayet
9. **Rekabet analizi** — kaç rakip, aynı ürün mü, eksik ne, varyant, neden satıyor
10. **Satmama sebebi** — neden satmıyor, görsel iyi ama satış yok, yorum, fiyat, güven
11. **Fırsat analizi** — eksik beden/renk, daha iyi kumaş/kalıp/fiyat
12. **Zaman analizi** — kaç gündür, yeni mi, bitmeye yakın mı, hızlanıyor mu
13. **Model üretim kararı** — hangisi alınacak/elenecek/geliştirilecek/değiştirilecek
14. **Birleştirme** — dün+bugün trend ortağı, dün+bugün satış ortağı, kesişim modeli
15. **Son karar** — satılır mı, neden, satmazsa neden, risk, üretime girilir mi

---

## 11. VERİ TOPLAMA YÖNTEMİ (YASAL — KESİN KURAL)

- **Yöntem**: Screenshot → OCR / AI okuma
- **Kural**: Veri çekilmez, görsel okunur, kendi beynimize kaydedilir
- ✅ Kamuya açık sayfa ekran görüntüsü
- ✅ Resmi API (izinli)
- ✅ Kendi yüklediğimiz veri
- ❌ İzinsiz scraping
- ❌ Telifli içerik kopyalama
- ❌ Başka veritabanı çekme

---

## 12. SİSTEM KATMANLARI (FİNAL KARAR)

```
1. VERİ → Ham input (sosyal, pazar, kullanıcı)
2. ZAMAN → Delta hesaplama (T-3, T-1, T-0)
3. ANALİZ → Artış/düşüş, süreklilik, balon filtre
4. KARAR → ÜRET / TEST / BEKLE / RED
```

> Karar katmanına veri doğrulanmadan geçilmez.

---

## 13. MALİYET MODELİ (DOĞRU AYRIŞTIRILDI)

> **Maliyet, satılabilir ürün seçiminde kullanılMAZ.**
> Maliyet ancak "satılır" kararı verildikten SONRA devreye girer.

**Doğru akış:**
1. Satılabilir ürün bul (trend + satış)
2. Üretilebilir mi kontrol et (maliyet, süre, kapasite)
3. Kârlı mı hesapla
4. Final karar

---

## 14. AJAN/BOT MİMARİSİ ÖNERİLERİ

### Hibrit Bot Mimarisi
- %80 → JSON/API botları (yapılandırılmış veri)
- %20 → Visual AI botları (kritik görsel kontrol)

### M1 Beyin (Karar Motoru)
- 138 kriter → Zod + matematik
- LLM karar mekanizmasından tamamen devre dışı
- Çıktı: ÜRET / TEST / RED

### API Gateway
- Tek giriş: `ingestAjanVerisi()`
- Zod filtre: kirli veri = RED

---

## 15. TEST SİSTEMİ (ZORUNLU)

Her veri için:
1. Gün 1 → al
2. Gün 2 → tekrar al (24 saat)
3. Gün 4 → tekrar al (72 saat)
4. Karşılaştır → değişim var mı?

| Sonuç | Karar |
|-------|-------|
| Tekrar ediyor, artıyor | ✅ Doğru veri |
| Değişim yok | ❌ Kullanma |

### Çapraz Test
| Durum | Karar |
|-------|-------|
| 3 platformda var (TikTok+IG+Trendyol) | ✅ Doğru |
| 2 platformda var | ⚠ Riskli |
| 1 platformda var | ❌ Yanlış |

---

## 16. RED KRİTERLERİ (HATA ENGELİ)

- Sadece influencer ürünü
- Sadece reklam ürünü
- Satış yok
- Yorum yok
- Ani düşüş
- Üretim süresi > trend süresi

---

## 17. PROJE YÖNETİCİ PANELİ İSTEĞİ

Kullanıcı ayrıca bir **masaüstü proje yönetim paneli** istiyor:
- Görevler dosya olarak verilecek, dosya olarak alınacak
- Kanıt zorunlu (hash + log + çıktı dosyası)
- Telegram bot ile uzaktan kontrol
- AI agents görevleri yürütecek
- Validator bağımsız denetleyecek
- "Yaptım" demek yok → kanıt yoksa işlem yok

### Görev Done şartı (3 katman):
1. **Execution** doğrulaması (kod çalıştı, dosya üretildi)
2. **Teknik** doğrulama (test geçti, hata yok)
3. **Mission** doğrulaması (amaç gerçekleşti, hedef karşılandı)

---

## 18. AÇIK SORULAR (HENÜZ CEVAPLANMAMIŞ)

1. Hangi kategoriler öncelikli?
2. Günde kaç ürün analiz edilecek?
3. Trendyol satıcı paneli verisi nasıl alınacak?
4. Instagram hesap durumu?
5. 138 kriterin hangilerinin final listede kalacağı (tek tek analiz sonrası)
6. Proje yönetim paneli teknoloji seçimi
7. AR-GE sistemi ile mevcut Mizanet ERP entegrasyonu detayları
