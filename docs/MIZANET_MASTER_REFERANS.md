# MİZANET — MASTER REFERANS BELGESİ
> **Belge Kodu:** MZN-MR-001  
> **Tarih:** 10 Nisan 2026 | 09:30 (UTC+3)  
> **Kurucu:** Engin  
> **Doktrin:** THE ORDER / NİZAM  
> **Kaynak:** 8 klasör, 350+ dosya taranarak konsolide edilmiştir  
> **Varsayım:** SIFIR — Tüm bilgiler canlı dosya sistemi taramasından üretilmiştir

---

## İÇİNDEKİLER

1. [SİSTEM KURALLARI VE DOKTRİN](#1-sistem-kurallari-ve-doktrin)
2. [ARGE & TREND ANALİZ SİSTEMİ](#2-arge--trend-analiz-sistemi)
3. [BOT & AJAN MİMARİSİ](#3-bot--ajan-mimarisi)
4. [SİSTEM MİMARİSİ (MODÜLER)](#4-sistem-mimarisi-modüler)
5. [188 KRİTER DENETİM TABLOSU](#5-188-kriter-denetim-tablosu)
6. [GÜVENLİK MİMARİSİ](#6-güvenlik-mimarisi)
7. [TASARIM DİLİ & STANDARTLARI](#7-tasarim-dili--standartlari)
8. [ADİL ÜCRET & PERFORMANS SİSTEMİ](#8-adil-ücret--performans-sistemi)
9. [TEKNOLOJİ ALTYAPISI & MALİYET](#9-teknoloji-altyapisi--maliyet)
10. [VERİ TOPLAMA MİMARİSİ](#10-veri-toplama-mimarisi)
11. [ÜRETİM AKIŞ MODELİ](#11-üretim-akis-modeli)
12. [YAPAY ZEKA OFİSİ](#12-yapay-zeka-ofisi)
13. [MEVCUT KOD DURUMU (GERÇEK)](#13-mevcut-kod-durumu-gerçek)

---

# 1. SİSTEM KURALLARI VE DOKTRİN

## 1.1 THE ORDER / NİZAM Anayasası

**Sıfır İnisiyatif Felsefesi:**
> "İnsan ve makine kararlarını veriye, bilgiye ve analize bağlamak. Sübjektif tercih ve kayırmacılığı ortadan kaldırmak."

## 1.2 Temel Kurallar (1–10)

| # | Kural |
|---|-------|
| 1 | Sıfır inisiyatif: Komut dışına çıkılamaz |
| 2 | Komut dışı işlem yasak |
| 3 | Her işlem doğrulanır |
| 4 | Kanıt zorunlu |
| 5 | Eksik işlem geçersiz |
| 6 | Varsayım yasak |
| 7 | Tüm işlemler kayıt altına alınır |
| 8 | Yetkisiz işlem yapılamaz |
| 9 | Hata varsa sistem durur |
| 10 | İşlem tamamlanmadan sonraki başlatılamaz |

## 1.3 Kontrol Kuralları (11–20)

| # | Kural |
|---|-------|
| 11 | Çift kontrol zorunlu |
| 12 | Log zorunlu (giriş, işlem, sonuç ayrı ayrı) |
| 13 | Kontrol başarısızsa → otomatik red |
| 14 | İşlem öncesi yetki kontrolü zorunlu |
| 15 | Her işlem geri dönülebilir, kim yaptığı görülebilir |
| 16 | Canlı veri zorunlu (MD dosyaları sadece referans) |
| 17 | MD bağımlılığı yasak (gerçek sistem verisi öncelikli) |
| 18 | Görev tamamlama zorunlu (eksiksiz ve tam) |
| 19 | Ara durdurma yasak |
| 20 | Sistem yapabileceği işlem için kullanıcıdan yetki isteyemez |

## 1.4 Disiplin Kuralları (21–30)

| # | Kural |
|---|-------|
| 21 | Eksik bilgi varsa işlem durur, tahmin edilmez |
| 22 | Görev dışına çıkılamaz |
| 23 | Kullanıcı "başla" demeden işlem başlatılamaz |
| 24 | Kod yazıldıysa tamamı kontrol edilmeden bitmemiş |
| 25 | Görevin bir kısmı yapılıp tamamlandı denemez |
| 26 | Her işlem sonrası: ne, nerede, çıktı, kanıt raporlanır |
| 27 | Kanıtlanamayan işlem yapılmamış sayılır |
| 28 | Dosya kontrol zorunlu (içerik ve doğruluk) |
| 29 | Sistem sağlığı canlı sistemden kontrol edilir |
| 30 | Gereksiz dosya oluşturulamaz |

## 1.5 Performans Kuralları (31–40)

| # | Kural |
|---|-------|
| 31 | Mevcut kapasite kullanılır, gereksiz bekleme yok |
| 32 | Çoklu dosya kontrol kapasitesi kullanılmalı |
| 33 | Push: sadece tamamlanmış + test + kontrol + kanıtlanmış |
| 34 | Commit: açıklamalı, izlenebilir, geri alınabilir |
| 35 | Eksik/kontrolsüz işlem push edilemez |
| 36 | Frontend-backend uyumu kontrol edilmeden işlem bitmemiş |
| 37 | Her işlem ikinci sistem tarafından doğrulanır |
| 38 | Hata varsa durur, raporlanır, düzeltilmeden devam etmez |
| 39 | Sistem yaptığı işlemi kendisi test eder |
| 40 | "Yaptım" demek için: kod çalışmalı, çıktı doğru, test geçmeli, kanıt sunulmalı |

## 1.6 Denetim Kuralları (41–58)

| # | Kural |
|---|-------|
| 41 | Doğrulanamayan işlem için otomatik tutanak |
| 42 | Tutanak: komut, işlem, hata türü, tarih, süre, sorumlu, kanıt |
| 43 | Kanıt yoksa işlem yapılmamış sayılır |
| 44 | Kayıt klasörü: `C:\agent_audit\` |
| 45 | Dosya formatı: JSON + TXT/PDF |
| 46 | Kayıtlar silinemez, sadece arşivlenir |
| 47 | Tutanaklar periyodik yöneticilere gönderilir |
| 48 | Tekrarlayan hatalarda otomatik uyarı |
| 49 | 3 tekrar → sistem durur |
| 50 | Harcanan zaman kaydedilir |
| 51 | Beklemeler kayıt altına alınır |
| 52 | Kullanıcı şikayetleri otomatik eklenir |
| 53 | Tutanaklar değiştirilemez |
| 54 | Sistem hataları analiz eder |
| 55 | Varsayımla işlem yapan sistem hatalı kabul edilir |
| 56 | Doğrulanmayan işlem reddedilir |
| 57 | Sadece doğrulanmış veri ile işlem yapılır |
| 58 | Bu kurallar devre dışı bırakılamaz |

## 1.7 Adım Adım Çalışma Kuralları (59–70)

| # | Kural |
|---|-------|
| 59 | Tüm işlemler tek tek verilir |
| 60 | Yeni adıma geçmek için onay zorunlu |
| 61 | Her adım: nerede, nasıl, ne yazılacak, ne görülecek açıklanır |
| 62 | Kullanıcıya yorum yapma hakkı tanınmaz |
| 63 | Her adım hata yapılmayacak şekilde ayrıntılı verilir |
| 64 | Tek doğru yol verilir, seçenek sunulmaz |
| 65 | Her adım sonrası kullanıcıdan doğrulama alınır |
| 66 | Konu dışına çıkılamaz |
| 67 | Adımlar atlanamaz, sırası değiştirilemez |
| 68 | Sistem yapabileceği işi kullanıcıya yaptırmaz |
| 69 | Her komut kopyala-yapıştır şeklinde verilir |
| 70 | Bir işlem bitmeden yeni işlem başlatılamaz |

## 1.8 Sistem Kontrol Kuralları

| Alan | Kural |
|------|-------|
| **Kayıt** | Tüm işlemler kayıt altında, ses + video (üretimde), işlem geçmişi silinemez |
| **Yetki** | 5 seviye: Karargah > Yönetici > Departman > Operatör > İzleyici |
| **İnisiyatif** | Talimat sistemden gelir, yazılı + görsel + sesli talimat |
| **Şeffaflık** | Maliyet şeffaf, performans şeffaf, günlük/haftalık/aylık kayıtlar |
| **Denetim** | Çift kontrol, log'suz işlem kabul edilmez, bağımsız denetmen modülü |
| **Güvenlik** | 2FA zorunlu, oturum zaman aşımı, erişim logları |
| **Veri Bütünlüğü** | Tek doğru kaynak: veritabanı, MD referanstır ana kaynak değildir |

---

# 2. ARGE & TREND ANALİZ SİSTEMİ

## 2.1 DEHŞET MOTORU — 138 KRİTER

### 8 BİNGO KRİTERİ (NİHAİ KARAR MOTORU)

Bu 8 şartın TAMAMI aynı üründe "Evet (True)" yanıtı verirse sistem direkt üretime geçer:

| # | BİNGO Kriteri | Açıklama |
|---|--------------|----------|
| 1 | **Dönüşüm** | Ürün sadece izlenmiyor, fiilen sepete atılıyor |
| 2 | **Talep Sürekliliği** | Saman alevi değil; grafik günlerdir istikrarlı yukarı |
| 3 | **Viral Çarpanı** | Diğer hesaplar da ürünü klonlayıp paylaşıyor |
| 4 | **Rekabet Temizliği** | Pazarda satıcı yığılması yok, fiyat kıran rakip yok |
| 5 | **Yorum Kalitesi** | 1-2 yıldız şikayet yok, iade oranı düşük |
| 6 | **Fiyat Stabilitesi** | Ürün sürekli indirim yemeden değerinde satılıyor |
| 7 | **Favori Sinyali** | Müşteri "sonra alacağım" diye kaydetmiş |
| 8 | **Sosyal↔Pazar Eşleşmesi** | TikTok'ta patlama saati ile satış saati örtüşüyor |

### 138 Kriterin Platform Bazlı Dağılımı

#### BOT 1: TİKTOK TREND AJANI (Kriter 1–20)
İzlenme, beğeni, paylaşım, kaydetme, video süresi, hashtag, ses/müzik, yayın tarihi, takipçi, tamamlama oranı, bounce, format, reel, içerik tipi, takipçi artış, tekrar performans, klonlama, şelale yayılım, 3 saniye kancası.

#### BOT 2: META/IG DEDEKTİFİ (Kriter 21–35)
Profil tıklama, link tıklama, takipçi, görüntüleme, sayfa takipçi, reklam doğrulama, reklam yoğunluğu skoru, organik/reklam oranı, paylaşım hızı, dark social, UGC klonlanma, görsel yorum, sosyal kanıt, çapraz satış, izleyici tutma.

#### BOT 3: PAZAR YERİ HAFİYESİ — Trendyol (Kriter 36–60)
Stok tükenme, arama terimi evrimi, arz uçurumu, rakip doygunluk, soru-cevap ivmesi, çapraz satış, kategori sıçrama, hacimsel sıkışma, fiyat tutarlılığı, indirim algısı, rakibe göre fiyat, fiyat bandı, buybox lideri, sepete ekleme hızı, favori artışı, ürün yeniliği, sepet terk oranı, sepet bekleme süresi, iade gecikmesi, 1-2-5 yıldız yorum metinleri, fotoğraflı yorum, satıcı puanı, tıklanma/sepet oranı.

#### BOT 4: ALGI VE KÜRESEL — Google/Pinterest (Kriter 61–70)
Görsel arama hacmi, Pinterest kaydetme, global arbitraj, mikro-mevsimsellik, Google Trends, muadil potansiyel, renk/doku ivmesi, ürün basitliği, arama-arz uçurumu, kanca gecikmesi.

#### YAPAY ZEKA BEYNİ — Gemini / NLP (Kriter 71–95)
Yorum sahteliği, kitle yaşı analizi, satış sinyali, ana şikayet, rakip farkı, giyim bağlamı, en övülen detay, en çok iade kusuru, kumaş terletme, kalıp hatası, yıkama bozulması, şikayet oranı %20 eşiği, iade zırhı, duygu analizi (-100/+100), niş beden talebi, tükenme dedikodusu, rakip NLP skoru, UGC estetiği, beden kapsayıcılık, kumaş döküm, varyantlanabilirlik, video uyumu, trend ürün tespiti, hedef kitle doğrulama, reklam dili samimiyeti.

#### BOT 6: GÖLGE ZAMAN MAKİNESİ (Kriter 96–110)
Yorum/izlenme oranı, kaydetme/beğeni oranı, trend kırılım noktası, zamanlı engagement rate, viral hız (ilk 24 saat), izlenme/satış korelasyonu, trend ömrü eğrisi, influencer etkisi, trend süresi tahmini, yorum artış deltası, kargoya çıkış tarihi, 299/499 TL eşiği, zirve kontrolü, düşüş kontrolü, fiyat esnekliği.

#### İÇ KARARGAH — Üretim & Finans Cenderesi (Kriter 111–138)
Parça sayısı, dikim zorluk seviyesi, özel makine ihtiyacı, işçilik süresi, fire riski, kumaş tedarik süresi, üretim süresi, günlük kapasite, kumaş+aksesuar maliyeti, işçilik maliyeti, genel gider payı, kâr marjı (min %30), kumaş sürekliliği, alternatif tedarikçi, MOQ engeli, tek kişi riski, 2x üretim kapasitesi, ek vardiya çözümü, darboğaz makinesi, ürün görseli, paketleme zorluğu, hasar/kutu riski, kargo desi maliyeti, maliyet/marj eşiği, bant skalabilite, modelhane çevikliği, ivme pisti, zamanlama onayı.

## 2.2 Bot 5 — Dinamik Eşik Algoritması (SÜZGEÇ)

**Kural: Eşik uydurulmaz, veriden çıkarılır.**

**5 Adımlı Eşik Çıkarma:**
1. Geçmişte patlamış 20-50 başarılı ürün toplanır
2. Her ürün için 138 kriter çekilir
3. Hız çarpanı hesaplanır: `Delta = (Bugün - Dün) / Dün`
4. Matematiksel matris çıkarılır
5. En kötü skor = MİNİMUM BARAJ, ortalama = GÜVENLİ BARAJ

**Örnek Eşik Değerleri:**
- Kaydetme ≥ %130
- Sepet ≥ %70
- İade ≤ %8
- Kâr ≥ %35
- Arz/Talep > 2
- Viral Tekrar ≥ 3 Hesap

**Kategorik Ayrım:**
- Abiye Giyim → Kaydetme "Çok Yüksek" olmalı (düğünü bekler, kaydeder)
- Basic Tişört → Kaydetme "Düşük" olabilir (dümdüz satar)
- Eşofman → Kaydetme "Orta" seviye

**Dinamik Güncelleme (Self-Learning):**
Sistem kendi kararını pazar gerçeğiyle karşılaştırır. Tutmadıysa eşikleri otomatik günceller. Enflasyon/resesyon şartlarına göre barajlar esner.

## 2.3 — 139 İstihbarat Noktası (6 Bot Görev Beyanı)

| Bot | Radar | Sorumluluk |
|-----|-------|------------|
| Bot 1: TikTok | 19 nokta | Viral trend, video analizi, kaydetme/beğeni kesişimi |
| Bot 2: Trendyol | 32 nokta | Satış gerçekliği, sepet, favori, fiyat, iade, rakip |
| Bot 3: Google/Pinterest | 18 nokta | Talep hacmi, Google Lens, Pinterest pano, sezon sinyali |
| Bot 4: Meta/IG Reklam | 10 nokta | Sahte trend ifşası, organik/paralı ayrımı |
| Bot 5: Filtre/Süzgeç | 15 nokta | Bot temizleme, anomali tespiti, manipülasyon filtresi |
| Bot 6: Gölge Zaman | 10 nokta | İptal edilen ürün takibi, diriliş kontrolü, ML öğrenme |
| Yapay Zeka + Bingo | 35 nokta | Maliyet cenderesi, kâr marjı, üretim karar motoru |
| **TOPLAM** | **139** | |

## 2.4 NİHAİ ONAY — Perplexity Küresel Dedektif

6 ajan inceledi → Bingo Şefi 8/8 onay verdi → **BİTMEDİ**:
- Perplexity AI (Küresel Dedektif) tetiklenir
- Global kaynaklarda negatif kırılma haberi arar
- Vogue/Zara global raporlarında düşüş makalesi kontrol eder
- Kriz/balon tespit etmezse **NİHAİ ONAY MÜHRÜ** basılır

---

# 3. BOT & AJAN MİMARİSİ

## 3.1 Ajan Yapısı (12 Ajan)

### A) Veri Toplama Ajanları (4)

| # | Ajan | Görev | Kaynak |
|---|------|-------|--------|
| 1 | Sosyal Trend Ajan | TikTok/Instagram trend tarama | TikTok, Instagram |
| 2 | E-Ticaret Ajan | Trendyol satış verisi | Trendyol |
| 3 | Rakip İzleme Ajan | Rakip yeni ürün, fiyat | Trendyol, Zara |
| 4 | Görsel Analiz Ajan | Ürün fotoğraf analizi | Vision AI |

### B) Analiz Ajanları (3)

| # | Ajan | Görev |
|---|------|-------|
| 5 | Trend Skor Ajan | TrendKararMotoru çalıştırma, skor hesaplama |
| 6 | Talep Tahmin Ajan | Satış potansiyeli hesaplama |
| 7 | Maliyet Tahmin Ajan | Kumaş + işçilik maliyet hesabı |

### C) Karar Ajanları (2)

| # | Ajan | Görev |
|---|------|-------|
| 8 | Risk Ajan | Üretim/tedarik/trend ömrü risk analizi |
| 9 | Strateji Ajan | ÜRET / TEST / BEKLE / RED kararı |

### D) Sistem Ajanları (3)

| # | Ajan | Görev |
|---|------|-------|
| 10 | Stok Ajan | Kritik stok uyarı, stok dönüş analizi |
| 11 | Feedback Ajan | Satış verisi → model güncelleme |
| 12 | Denetim Ajan | Tüm ajanların çıktılarını kontrol |

## 3.2 Ajan Çalışma Kuralları

1. **Bot** (deterministik): Veri alma, temizleme, pipeline
2. **Agent** (AI karar): Trend analizi, yorum analizi, risk, karar

**Altın Kurallar:**
- AI tek başına karar **VERMEZ**
- AI öneri üretir → insan onaylar
- Her ajanın çıktısı **loglanır**
- Denetim ajanı **bağımsız** kontrol yapar

## 3.3 Hibrit Maliyet Modeli

- Normal veri: sürekli (düşük maliyet — bot)
- AI analiz: sadece son kontrol / karar anı (maliyet optimizasyonu)
- Sesli tetikleme: "Tim uyansın, X ara" → ajanlar aktif

## 3.4 Mevcut Ajan Dosyaları (23 dosya — `arge_ajanlari/`)

| Dosya | İşlev |
|-------|-------|
| `vision_trendyol_ajani.js` | Trendyol ekran görüntüsü → Gemini Vision |
| `trend_tiktok.js` | TikTok viral analiz |
| `trend_instagram.js` | Instagram trend tarama |
| `talep_google.js` | Google arama hacmi analiz |
| `reklam_meta.js` | Meta Ad Library analiz |
| `satis_trendyol.js` | Trendyol satış veri çekme |
| `lens_google_ajani.js` | Google Lens görsel arama |
| `zaman_golge.js` | Gölge zaman makinesi — iptal takibi |
| `filtre_suzgec.js` | Bot 5 — veri temizleme |
| `138_altin_kriter_ajani.js` | 138 kriter hesaplama |
| `bas_tasarimci.js` | Tasarım asistanı |
| `b2b_tedarikci_ajani.js` | B2B tedarikçi araştırma |
| `hava_durumu_etkisi.js` | Hava durumu → satış korelasyonu |
| `m2_finans_kar_ajani.js` | Finans & kâr hesaplama |
| `m4_muhasebe_ajani.js` | Muhasebe entegrasyonu |
| `m4_satin_alma_ajani.js` | Satın alma optimizasyonu |
| `sentinel_savas_oyunu.js` | Güvenlik test simülasyonu |
| `hermania_operator_ajani.js` | Operatör asistanı |
| `hermania_seo_mail_ajani.js` | SEO ve e-posta analiz |
| `vitrin_senkronizasyon_ajani.js` | Vitrin senkronizasyonu |
| `Ajan1_OluIsci.js` | İstihbarat veri çekme |
| `Ajan2_Yargic.js` | Karar & değerlendirme |
| `EKIP_GOREVLENDİRME_PROMPT.md` | Ekip görevlendirme şablonu |

---

# 4. SİSTEM MİMARİSİ (MODÜLER)

## 4.1 Sistem Genel Mimari Şeması

```
┌─────────────────────────────────────────────────────────────┐
│                    KULLANICI KATMANI                         │
│  Web App (Next.js) | PWA (Mobile) | Telegram Bot | Kiosk    │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS / WSS
┌────────────────────────────▼────────────────────────────────┐
│                    API KATMANI (Next.js API Routes)          │
│  Auth | CRUD | AI/Ajan | Webhook                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  MIDDLEWARE: Rate Limit → CSRF → Auth → ZOD →        │   │
│  │  Sentinel → ApiZırh                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    VERİ KATMANI                              │
│  Supabase PostgreSQL + RLS | Upstash Redis | Self-Learn DB   │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    AJAN KATMANI (HERMEZ AI)                  │
│  İstihbarat (1-10) | Yargı (11-20) | Karargah (21-25)       │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                    DENETİM KATMANI                           │
│  L1 Yapıcı | L2 Validator | L3 Hakem | L4 İnsan | L5 Öğren │
└─────────────────────────────────────────────────────────────┘
```

## 4.2 Modül Haritası (18+ Modül)

| # | Modül Kodu | Modül Adı | Sayfa | Buton | API | DB Tablo |
|---|-----------|-----------|-------|-------|-----|----------|
| 1 | KRG | Karargah | 3 | 30 | 10 | 4 |
| 2 | ARG | AR-GE | 4 | 40 | 12 | 5 |
| 3 | KMS | Kumaş | 4 | 35 | 10 | 4 |
| 4 | MDL | Modelhane | 5 | 45 | 14 | 6 |
| 5 | KLP | Kalıp | 3 | 30 | 9 | 4 |
| 6 | KSM | Kesim | 4 | 35 | 11 | 4 |
| 7 | MLT | İmalat | 4 | 38 | 12 | 4 |
| 8 | STK | Stok/Depo | 4 | 35 | 11 | 4 |
| 9 | KSA | Kasa | 3 | 40 | 12 | 4 |
| 10 | MHS | Muhasebe | 3 | 30 | 10 | 4 |
| 11 | PRS | Personel | 4 | 42 | 13 | 5 |
| 12 | KTL | Katalog | 3 | 35 | 10 | 4 |
| 13 | MST | Müşteriler | 3 | 30 | 9 | 4 |
| 14 | SPR | Sipariş | 4 | 40 | 12 | 5 |
| 15 | DNT | Denetmen | 2 | 25 | 8 | 3 |
| 16 | AJN | Agent Sistemi | 2 | 20 | 8 | 3 |
| 17 | RPR | Raporlar | 3 | 28 | 9 | 3 |
| 18 | AYR | Ayarlar | 2 | 18 | 7 | 3 |
| | **TOPLAM** | | **61** | **~596** | **~177** | **~69** |

## 4.3 Veritabanı Tablo Yapısı

### Ana İş Tabloları
`kullanicilar`, `roller`, `personel`, `musteriler`, `siparisler`, `siparis_urunleri`, `urunler`, `stoklar`, `kumaslar`, `model_kaliplari`, `uretim_isleri`, `fasonlar`, `sevkiyatlar`, `kasa_hareketleri`, `maliyetler`

### Sistem Tabloları
`b0_sistem_loglari`, `b0_hata_loglari`, `b0_islem_gecmisi`, `b0_performans_metrikleri`, `b0_retry_queue`, `b0_offline_queue`

### AI/Agent Tabloları
`ai_analizler`, `agent_gorevleri`, `agent_loglari`

### ARGE Tabloları
`b1_arge_products`, `b1_piyasa_gozlem`, `b1_maliyet_kayitlari`, `b1_sistem_uyarilari`

---

# 5. 188 KRİTER DENETİM TABLOSU

## Kategori Dağılımı

| Kategori | Kriter Aralığı | Adet |
|----------|----------------|------|
| Sistem Mimari | 1–8 | 8 |
| Araştırma | 9–18 | 10 |
| Tasarım | 19–26 | 8 |
| Teknik Föy | 27–34 | 8 |
| Üretim | 35–42 | 8 |
| Mağaza | 43–48 | 6 |
| Veri | 49–56 | 8 |
| Güvenlik | 57–66 | 10 |
| Performans | 67–72 | 6 |
| AI | 73–78 | 6 |
| Agent | 79–84 | 6 |
| Kamera | 85–89 | 5 |
| Telegram | 90–94 | 5 |
| Finans | 95–100 | 6 |
| Adalet | 101–105 | 5 |
| Arşiv | 106–111 | 6 |
| Manipülasyon | 112–115 | 4 |
| Öğrenme | 116–120 | 5 |
| Veri Detay | 121–125 | 5 |
| Güvenlik Detay | 126–130 | 5 |
| Performans Detay | 131–135 | 5 |
| AI Detay | 136–140 | 5 |
| Agent Detay | 141–145 | 5 |
| Kamera Detay | 146–150 | 5 |
| Telegram Detay | 151–155 | 5 |
| Finans Detay | 156–160 | 5 |
| Sürdürülebilirlik | 161–165 | 5 |
| Operasyon | 166–170 | 5 |
| Test | 171–175 | 5 |
| Analiz | 176–180 | 5 |
| Veri İleri | 181–185 | 5 |
| Risk | 186–188 | 3 |
| **TOPLAM** | | **188** |

## Zorunlu Veritabanı Tabloları (188 Kriterden)

| Tablo | Amaç |
|-------|------|
| `b0_sistem_loglari` | Sistem log kayıtları |
| `b0_hata_loglari` | Hata kayıtları |
| `b0_islem_gecmisi` | İşlem audit trail |
| `b0_performans_metrikleri` | Performans ölçümleri |
| `b0_retry_queue` | API tekrar kuyruğu |
| `b0_offline_queue` | Offline işlem saklama |

---

# 6. GÜVENLİK MİMARİSİ

| Katman | Çözüm |
|--------|-------|
| **Authentication** | Supabase Auth |
| **RBAC** | 5 seviyeli yetki sistemi |
| **SQL Injection** | Parametre kontrolü |
| **XSS** | Input sanitize |
| **CSRF** | Token doğrulama |
| **Rate Limit** | IP bazlı API koruma |
| **WAF** | Cloudflare |
| **Audit Log** | İşlem geçmişi — silinemez |
| **Şifre** | bcrypt hash |
| **Veri** | AES şifreleme |
| **2FA** | TOTP zorunlu |
| **Oturum** | Zaman aşımı aktif |
| **Bot Gizleme** | Playwright + headless Chrome + user-agent |

---

# 7. TASARIM DİLİ & STANDARTLARI

## 7.1 Ana Renk Paleti

| Renk | Hex | Kullanım |
|------|-----|----------|
| Zümrüt Yeşili | `#046A38` | Ana renk — başlıklar, üst bar, navigasyon |
| Koyu Gold | `#C8A951` | Vurgu — ikonlar, butonlar, önemli bilgiler |
| Yumuşak Mavi | `#4F7CAC` | Destek — linkler, aktif seçim, hover |
| Açık Gri | `#F4F6F7` | Arka plan — sayfa zemin |
| Beyaz | `#FFFFFF` | Kart arka planı |
| Koyu Gri | `#2D3436` | Metin rengi |

## 7.2 Durum Renkleri

| Renk | Hex | Kullanım |
|------|-----|----------|
| Yeşil | `#27AE60` | Normal — sorun yok |
| Sarı | `#F39C12` | Dikkat — risk |
| Kırmızı | `#E74C3C` | Sorun — acil müdahale |
| Mavi | `#3498DB` | Bilgi — bilgilendirme |

## 7.3 Tipografi

| Element | Font | Boyut |
|---------|------|-------|
| Başlık | Inter Bold | 20-24px |
| Alt başlık | Inter SemiBold | 16-18px |
| Normal metin | Inter Regular | 14-16px |
| Küçük metin | Inter Light | 12px |
| Sayısal veri | Inter Medium (monospace) | 16px |

## 7.4 Psikolojik Tasarım Kuralları

1. Ekran kalabalık olmaz — az ve net bilgi
2. Renk sayısı az — 3 ana renk + durum renkleri
3. Veri kart sistemi — bilgiler kutularda, düzenli
4. Yazı okunabilir — minimum 14px
5. Boşluklar geniş — nefes alan tasarım
6. Yoğun renk kullanılmaz — pastel tonlar
7. Animasyon minimal — dikkat dağıtıcı efekt yok
8. İkonlar sade — tek renk, anlaşılır

## 7.5 Dil Desteği

- Ana dil: **Türkçe**
- İkinci dil: **Arapça**
- RTL uyum zorunlu

---

# 8. ADİL ÜCRET & PERFORMANS SİSTEMİ

## 8.1 Temel Felsefe

Bu sistem klasik ERP değildir. Bu bir **Üretim Adalet ve Şeffaflık Sistemi**dir.
- İnsan kayırmacılığını ortadan kaldırmak
- Veri, bilgi ve analize dayalı karar
- Adil, şeffaf, adaletli ücret
- İnsan inisiyatifini kaldırmak

## 8.2 Ücret Hesaplama Formülleri

```
Birim Ücret = (İşlem Zorluk Puanı × Makine Katsayısı × Süre) / Standart Zaman
Günlük Performans = Üretilen Adet × Birim Ücret × Kalite Katsayısı
Aylık Maaş = (Günlük Performanslar Toplamı) + Sabit Taban + Prim
```

## 8.3 Manipülasyon Koruması

| Kural | Detay |
|-------|-------|
| Üretim verisi değiştirilmez | Log korunur |
| Satış verisi değiştirilmez | Log korunur |
| Kasa verisi değiştirilmez | Log korunur |
| Üretim sayıları şişirilemez | Sistem kontrol |
| Geçmiş kayıtlar silinemez | Soft delete + log |
| **Patron dahil kimse veri manipüle edemez** | **Audit trail** |

---

# 9. TEKNOLOJİ ALTYAPISI & MALİYET

## 9.1 Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js (React) + TypeScript + TailwindCSS + Zustand |
| **Backend** | Next.js API Routes + ZOD validasyon |
| **Database** | Supabase (PostgreSQL) + RLS |
| **Cache/Queue** | Upstash Redis |
| **AI** | Gemini API + Perplexity API + Vision AI |
| **Bot** | Telegram Bot API (Grammy) |
| **Browser** | Playwright + Chromium (headless) |
| **Hosting** | Vercel + Cloudflare CDN |
| **Monitoring** | Sentry |

## 9.2 Aylık Maliyet Analizi

| Paket | Supabase | Vercel | Cloudflare | AI | Toplam |
|-------|----------|--------|------------|-----|--------|
| **Minimum** | 25$ | 20$ | 0$ | 10$ | **~55$/ay** |
| **Standart** | 75$ | 50$ | 20$ | 100$ | **~245$/ay** |
| **Profesyonel** | 150$ | 100$ | 20$ | 200$ | **~470$/ay** |

## 9.3 Sıfır Finansal Yük Politikası

- Ücretsiz kota aşılmadan ücretli servis kullanılmaz
- Dış bağımlılık minimum — iç kaynak öncelikli
- Her maliyet artışı kurucu onayı gerektirir

---

# 10. VERİ TOPLAMA MİMARİSİ

## 10.1 4 Eksen Modeli

```
TREND → TASARIM → ÜRETİM → SATIŞ
```

## 10.2 Yasal Veri Toplama Modeli

| Yöntem | Durum |
|--------|-------|
| Scraping (HTML parse) | ❌ YASAK — hukuki risk |
| API kullanımı | ✅ YASAL — izinli veri |
| Screenshot → OCR → AI | ✅ YASAL — gözlem verisi |
| Manuel gözlem kaydı | ✅ YASAL |

**Kural:** Sistem kişisel veri işlemez. Sadece halka açık, gözlemlenebilir veri.

## 10.3 Platform Hiyerarşisi

| Öncelik | Platform | Neden |
|---------|----------|-------|
| 1 | **Trendyol** | Satış gerçekliği — para ödenen yer |
| 2 | TikTok / Instagram | Trend sinyali — ilgi ≠ satış |
| 3 | Pinterest / Google | Tasarım referansı |

## 10.4 Veri Kalite Sınıfları

| Sınıf | Tanım | Kullanım |
|-------|-------|----------|
| A | %100 güvenilir, direkt ölçülebilir | Çekirdek karar |
| B | Güvenilir ama gürültü var | Oran + çapraz doğrulama |
| C | Dolaylı, tek başına anlamsız | Hesap katmanında |
| D | Manipüle edilebilir (reklam, badge) | Tek başına karar vermez |
| E | AI bağımlı (görsel yorum) | Final kontrol, destek |

## 10.5 Sahte Trend Filtresi

| Kontrol | Süre | Amaç |
|---------|------|------|
| İlk kontrol | 24 saat | Veri doğrulama |
| İkinci kontrol | 72 saat | Süreklilik testi |
| Üçüncü kontrol | 7 gün | Haftalık değerlendirme |
| Stop-loss | 20 gün | Satış yoksa otomatik iptal |

## 10.6 Veri Akışı

```
Platform → Screenshot → OCR/AI → Ham Veri → Zod Doğrulama → Temiz Veri → Hesap Katmanı → Karar Motoru
```

---

# 11. ÜRETİM AKIŞ MODELİ

```
TREND TESPİT → TASARIM → KALIP → NUMUNE → ONAY → KESİM → İMALAT → KALİTE KONTROL → PAKETLEME → SEVKİYAT
```

## Test Üretim Kuralı (Shein Taktiği)
- İlk üretim HER ZAMAN **50 adet**
- 3 gün test edilir
- Skor: 0-50 Çöpe At / 50-70 İzle / 70-85 Test Üretimi / 85-100 Seri Üretim

---

# 12. YAPAY ZEKA OFİSİ

## 12.1 Görev Listesi

| # | Analiz | Amaç |
|---|--------|------|
| 1 | Satış Analizi | Hangi ürün satıyor, hangisi satmıyor |
| 2 | Üretim Verim | Hangi işlem yavaş, darboğaz nerede |
| 3 | Trend Analizi | Yeni ürün önerisi üretme |
| 4 | Hata Analizi | Üretim hatalarını tespit ve azaltma |
| 5 | Maliyet Analizi | Maliyet optimizasyonu önerileri |
| 6 | Performans | Personel/makine performans ölçümü |
| 7 | Stok Analizi | Kritik stok, yavaş dönen ürün |
| 8 | Müşteri Analizi | Müşteri tercihleri, bölge analizi |

## 12.2 Kamera + Agent Entegrasyonu

İşletmede **12 adet Necron kamera** sistemi mevcut.

| Bileşen | Görev |
|---------|-------|
| Kamera | İşçi hareketi / işlem gözlemi |
| Vision Agent | Video / görüntü analizi |
| Performans Agent | Üretim hızı ölçümü |
| Kalite Agent | Ürün kalite kontrolü (görsel) |

## 12.3 AI Karar Kuralları

1. AI tek başına karar **VERMEZ**
2. AI öneri üretir → sistem/insan onaylar
3. Her AI çıktısı **loglanır**
4. Yanlış öneri → otomatik geri bildirim
5. AI sadece son kontrol/karar anında devreye girer (maliyet kontrolü)

## 12.4 Sistem Öğrenmesi (3-6-9-12 Ay Planı)

| Süre | Beklenen Gelişim |
|------|-----------------|
| 3 ay | Temel veri toplama, ilk analizler |
| 6 ay | Trend tahmin doğruluğu artışı |
| 9 ay | Üretim optimizasyonu önerileri |
| 12 ay | Otonom karar destek sistemi |

---

# 13. MEVCUT KOD DURUMU (GERÇEK — ŞEFFAF RAPOR)

> **Bu bölüm 18 Mart 2026 tarihli dürüst bot raporundan alınmıştır.**

## Bot 1 — TikTok (trend_tiktok.js)

**Çalışan:** Beğeni, yorum, kaydetme, video açıklama/etiket
**Eksik:** Tamamlama/bounce oranı (DOM kapalı), dark social, klonlama analizi

## Bot 2 — Trendyol Vision (vision_trendyol_ajani.js)

**Çalışan:** Ürün başlığı, fiyat, yorum sayısı, favori, rozetler, ekran görüntüsü → Gemini Vision
**Eksik:** Stok zehri, yıldız bazlı şikayet analizi, rakip fiyat karşılaştırma loop'u

## Bot 3 — Google/Pinterest (talep_google.js)

**Çalışan:** Google arama hacmi, sponsorlu reklam yoğunluğu
**Eksik:** Google Lens, Pinterest pano, 30 günlük trend ivmesi

## Bot 4 — Meta/IG (reklam_meta.js)

**Çalışan:** Aktif reklam sayısı, spam reklam tespiti
**Eksik:** Reklam bütçesi tahmini (API kapalı), hedef kitle demografisi

## Bingo Şefi — İÇ KARARGAH

**KRİTİK EKSİK:** 139 noktanın son 35 maddesi (Kâr Marjı, Üretim Cenderesi, Bant Darboğazı, Lojistik) **HİÇBİR DOSYAYA KODLANMAMIŞTIR.** Bingo sistemi sadece 6 ajanın Trend Skoru ortalamasını alıp onay veriyor. 35 kriterlik maliyet/üretim matematiği henüz yoktur.

---

> **Belge Durumu:** KONSOLİDE — TEK REFERANS KAYNAĞI  
> **Kaynak Klasörler:** Engin-Sistem, 47_SilBaştan, Mizanet, mizanet.com, New-mizanet, ARSIV_THE_ORDER_NIZAM, SISTEM_KONTROL_PANELI  
> **Varsayım:** SIFIR  
> **Tarih:** 10 Nisan 2026 — 09:30 (UTC+3)
