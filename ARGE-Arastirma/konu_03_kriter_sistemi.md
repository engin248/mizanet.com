# KONU 3: AR-GE KRİTER SİSTEMİ (138 KRİTER)
> Amaç: Kriterlerin tam analizi, sınıflandırması ve karar mekanizması

---

## 138 KRİTERİN 4'LÜ AYRIMI

> KRİTİK KARAR: Veri, hesap, karar ve sistem davranışı birbirine karışmıştı. Ayrılması zorunlu.

### TİP 1: VERİ (Ham Input)
> Dışarıdan gelir, toplanır, ölçülür, saklanır. Karar vermez.

**Talep/Trend**: Saatlik favori ivmesi, görüntülenme, favori/yorum oranı, sepet deltası, stok eriyik hızı, beden bazlı stok, kategori sıralama, arama hacmi, Google Lens hacmi, bölgesel arama, ikame arama, sosyal→satış geçiş, URL paylaşım hızı

**Kullanıcı Davranışı**: Cüzdan/alım gücü, kupon kullanımı, yorumlar, soru sayısı, bounce rate

**Sosyal Medya**: Takipçi, Pinterest kayıt, TikTok izlenme/yorum, kaydetme oranı, influencer veri, reklam verisi, hashtag veri, demografi veri

**Ürün**: Görsel veri, kumaş yorumları, şikayet/iade verisi, ürün görselleri/açıklamaları

**Pazar**: Fiyat verisi, stok verisi, rekabet verisi, kargo süresi, trend verisi, global veri

**İç Sistem**: Tedarikçi/maliyet/üretim kapasite/kur/depo verisi

---

### TİP 2: HESAP (Türetilen — Matematikle)
> Veriden hesaplanır. Ham olarak toplanamaz.

- Favori/yorum oranı, yorum/izlenme oranı
- Sepet terk oranı (proxy), trend ivmesi (24-48 saat), 7 gün artış hızı
- Pazar doygunluk, arz-talep farkı, ortalama fiyat
- Psikolojik fiyat analizi, rekabet yoğunluk skoru
- Yıldız kalite filtresi, iade oranı hesap
- Risk/getiri oranı, break-even, kar marjı, CAC hesap
- Ölçek ekonomisi, fire oranı, kapasite kullanımı
- Trend ömür tahmini, global vs lokal fark, veri çakışma çözümü

---

### TİP 3: KARAR (Aksiyon Çıktısı)
> Sistemin verdiği net aksiyon — para kazandıran nokta.

ÜRET | TEST ÜRETİMİ | RED | BEKLE | ALARM | FİYAT DÜŞÜR | RENK EKLE | BEDEN GENİŞLET | KUMAŞ DEĞİŞTİR | PAZARA GİR | PAZARDAN ÇIK | STOK ARTIR | REKLAM AÇ | ÜRÜN İPTAL | NUMUNE ÜRET

---

### TİP 4: SİSTEM DAVRANIŞI (Mekanik)
> Sistemin nasıl çalıştığını tanımlar — kriter değil.

24/7/15/20 gün tekrar kontrol, feedback loop, ağırlık güncelleme, Zod validation, bot birleştirme, çakışma çözümü, hiyerarşik veri önceliği, numune zorunluluğu, stop-loss, log/geçmiş, yeniden değerlendirme, sahte veri filtreleme, AI son kontrol, etik/telif kontrol, kalite blokajı

---

## 5-AÇILI KRİTER DENETİMİ

| Boyut | Odak |
|-------|------|
| Stratejik | İş hedefleri, pazar konumu |
| Teknik | Veri güvenilirliği, entegrasyon |
| Operasyonel | Günlük iş akışı |
| Ekonomik/Risk | Maliyet, ROI |
| İnsan/Sürdürülebilir | Yorumlanabilirlik, etik |

**Sonuç**: 27 çekirdek (CORE) + ~49 destek (SUPPORT) + ~62 çöp (TRASH)

---

## VERİ KALİTESİ SINIFLANDIRMASI

| Sınıf | Oran | Örnek |
|-------|:----:|-------|
| %100 güvenilir | ~%40 | Fiyat, stok, yorum sayısı, kargo, kur |
| Temizleme gerekli | ~%30 | TikTok/IG izlenme, beğeni, hashtag |
| Dolaylı | ~%15 | Sepet deltası, dark social |
| Riskli/manipüle | ~%10 | Influencer, sponsorlu reklam, "çok satan" badge |
| AI bağımlı | ~%5 | Kumaş kalitesi (görsel), kalıp duruşu |

---

## EKSİK TESPİT EDİLEN 13 KRİTİK VERİ

| # | Eksik Veri | Neden Gerekli |
|---|-----------|---------------|
| 1 | Günlük snapshot (T-3/T-1/T-0) | Değişim olmadan trend bilinemez |
| 2 | Tahmini satış hızı (adet/gün) | İzlenme ≠ satış |
| 3 | Dönüşüm oranı (proxy) | Sahte trend eleme |
| 4 | Trend ömrü tahmini | Yanlış zamanda üretim = zarar |
| 5 | Trend sebebi | Yanlış ürün üretme önleme |
| 6 | Almama sebebi | Rakip açığı bulma |
| 7 | Varyant boşluğu (beden/renk) | Direkt satış fırsatı |
| 8 | Fiyat elastikiyeti | Maksimum kâr noktası |
| 9 | Erken alan kitle tipi | Trend başı yakalama |
| 10 | Trend güven skoru | Sahte trend engelleme |
| 11 | Rekabet kırılma noktası | Geç girme hatası önleme |
| 12 | Üretim süresi vs trend süresi | Yetişir mi kontrolü |
| 13 | İlk 3 gün satış tahmini | Test üretim kararı |

---

## BALON FİLTRE KURALLARI
- Sadece sosyalde var + satış yok → **RED**
- Influencer tek kaynak → **RED**
- Reklam tek kaynak → **RED**
- Ani sıçrama + hızlı düşüş → **BALON**

## RED KRİTERLERİ
- Sadece influencer ürünü
- Sadece reklam ürünü
- Satış yok, yorum yok
- Ani düşüş
- Üretim süresi > trend süresi

## ÇAPRAZ TEST MODELİ
| Durum | Karar |
|-------|-------|
| 3 platformda var (TikTok+IG+Trendyol) | ✅ Doğru |
| 2 platformda var | ⚠ Riskli |
| 1 platformda var | ❌ Yanlış |

## ANA KARAR FORMÜLÜ
```
Trend + Satış + Süreklilik + Fırsat = ÜRET
```
