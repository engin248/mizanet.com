# 25 SAYFA SİSTEM HARİTASI + ÜRETİM 19 AŞAMA + 138 KRİTER SİSTEMİ + VERİ KAYNAKLARI
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_01, konu_02, konu_03, konu_04 (YENİ DOSYA)

---

## 1. 25 SAYFA HARİTASI

| # | Sayfa | Route | Rol |
|---|-------|-------|-----|
| 1 | Karargâh | /karargah | Komuta merkezi |
| 2 | AR-GE | /arge | Trend araştırma |
| 3 | Kumaş Arşivi | /kumas | Kumaş veri |
| 4 | Modelhane | /modelhane | Prototip |
| 5 | Kalıp | /kalip | Kalıp sistemi |
| 6 | Kesimhane | /kesim | Kumaş kesim |
| 7 | İmalat | /imalat | Dikiş üretim |
| 8 | Maliyet | /maliyet | Maliyet hesap |
| 9 | Muhasebe | /muhasebe | Finans |
| 10 | Kasa | /kasa | Nakit kontrol |
| 11 | Stok | /stok | Stok yönetimi |
| 12 | Katalog | /katalog | Ürün kataloğu |
| 13 | Siparişler | /siparisler | Sipariş |
| 14 | Müşteriler | /musteriler | CRM |
| 15 | Personel | /personel | HR |
| 16 | Görevler | /gorevler | Task yönetimi |
| 17 | Kameralar | /kameralar | Üretim izleme |
| 18 | Ajanlar | /ajanlar | AI agent |
| 19 | Denetmen | /denetmen | Sistem kontrol |
| 20 | Raporlar | /raporlar | Analiz |
| 21 | Tasarım | /tasarim | Ürün çizim |
| 22 | Üretim | /uretim | Üretim planı |
| 23 | Güvenlik | /guvenlik | Güvenlik |
| 24 | Ayarlar | /ayarlar | Yapılandırma |
| 25 | Giriş | /giris | Auth |

---

## 2. 19 AŞAMALI ÜRETİM AKIŞI (Dünya Standardı)

### Üretim Öncesi 5 Zorunlu Dosya
| # | Dosya | İçerik |
|---|-------|--------|
| 1 | **Tech Pack** | Teknik çizim, ölçü, dikiş, parça listesi |
| 2 | **BOM** | Kumaş, iplik, düğme, fermuar, etiket |
| 3 | **Operation Bulletin** | Operasyon listesi, makine, süre |
| 4 | **Time Study** | Her operasyonun standart süresi |
| 5 | **Cost Sheet** | Ham maliyet + işçilik + genel gider |

### 19 Aşama
1. Pazar ve Trend Araştırması → Ürün konsepti
2. Ürün Tasarım Briefi → Teknik dosya
3. Teknik Tasarım → Tech Pack
4. Malzeme Planlama → BOM
5. Operasyon Analizi → Operation Bulletin
6. Zorluk ve Beceri Analizi → Beceri matrisi
7. Kalıp Geliştirme → Kalıp dosyası (DXF)
8. Numune Üretimi → İlk ürün (video+foto zorunlu)
9. Numune Değerlendirme → Ölçü, kalite, rahatlık
10. Üretim Hattı Planlaması → Makine, operatör, sıra
11. Zaman Etüdü → Time Study
12. Maliyet Analizi → Cost Sheet
13. Üretim Emri → Miktar, plan, teslim tarihi
14. Kesim Planlaması → Pastal, kumaş yerleşim
15. Seri Üretim → Kesim → dikim → kalite
16. Kalite Kontrol → Ölçü, dikiş, görsel
17. Ütü ve Paketleme
18. Stok ve Lojistik → Depo → sevkiyat
19. Satış Analizi → Hız, geri dönüş, iade

---

## 3. 138 KRİTER 4'LÜ AYRIM

### TİP 1: VERİ (Ham Input) — ~65 kriter
Talep/trend, kullanıcı davranışı, sosyal medya, ürün, pazar, iç sistem verileri

### TİP 2: HESAP (Türetilen) — ~25 kriter
Favori/yorum oranı, sepet terk, trend ivmesi, doygunluk, risk/getiri, break-even, fire oranı

### TİP 3: KARAR (Aksiyon) — ~15 kriter
ÜRET | TEST | RED | BEKLE | ALARM | FİYAT DÜŞÜR | RENK EKLE | BEDEN GENİŞLET | KUMAŞ DEĞİŞTİR | PAZARA GİR/ÇIK | STOK ARTIR | REKLAM AÇ | ÜRÜN İPTAL | NUMUNE ÜRET

### TİP 4: SİSTEM DAVRANIŞI — ~33 kriter
Tekrar kontrol, feedback loop, ağırlık güncelleme, Zod validation, bot birleştirme, stop-loss, log/geçmiş

### Sonuç: 27 Çekirdek (CORE) + ~49 Destek (SUPPORT) + ~62 Çöp (TRASH)

---

## 4. VERİ KALİTESİ SINIFLANDIRMASI

| Sınıf | Oran | Örnek |
|-------|:----:|-------|
| %100 güvenilir | ~%40 | Fiyat, stok, yorum sayısı |
| Temizleme gerekli | ~%30 | TikTok/IG izlenme, beğeni |
| Dolaylı | ~%15 | Sepet deltası, dark social |
| Riskli/manipüle | ~%10 | Influencer, sponsorlu |
| AI bağımlı | ~%5 | Kumaş kalitesi (görsel) |

---

## 5. EKSİK TESPİT EDİLEN 13 KRİTİK VERİ

| # | Eksik | Neden Gerekli |
|---|-------|---------------|
| 1 | Günlük snapshot (T-3/T-1/T-0) | Değişim olmadan trend bilinemez |
| 2 | Tahmini satış hızı (adet/gün) | İzlenme ≠ satış |
| 3 | Dönüşüm oranı (proxy) | Sahte trend eleme |
| 4 | Trend ömrü tahmini | Yanlış zamanda üretim = zarar |
| 5 | Trend sebebi | Yanlış ürün önleme |
| 6 | Almama sebebi | Rakip açığı bulma |
| 7 | Varyant boşluğu (beden/renk) | Direkt satış fırsatı |
| 8 | Fiyat elastikiyeti | Maksimum kâr noktası |
| 9 | Erken alan kitle tipi | Trend başı yakalama |
| 10 | Trend güven skoru | Sahte trend engelleme |
| 11 | Rekabet kırılma noktası | Geç girme hatası |
| 12 | Üretim süresi vs trend süresi | Yetişir mi? |
| 13 | İlk 3 gün satış tahmini | Test üretim kararı |

---

## 6. VERİ TOPLAMA (33 MADDE — 6 KATEGORİ)

### A) Trend Verisi (Sosyal — 8 veri)
TikTok/IG izlenme, beğeni, yorum, kaydetme, video çoğalma, ilk çıkış, arama hacmi

### B) Satış Verisi (Pazar — 8 veri)
Trendyol: yorum, stok, satıcı, fiyat, varyant, sıralama, "Son X adet", satın alma sinyali

### C) Zaman Verisi (3 veri)
Günlük snapshot, trend delta, trend ömrü

### D) Davranış Verisi (5 veri)
Almama sebebi, varyant eksikliği, negatif trend, kumaş/kalıp şikayetleri

### E) Rekabet Verisi (4 veri)
Rekabet yoğunluğu, reklam yoğunluğu, görsel kalite, renk&model

### F) İç Veri (5 veri)
Kumaş maliyet, işçilik, üretim süresi, satış tahmini proxy, dönüşüm proxy

---

## 7. TREND SKOR FORMÜLÜ
```
TrendScore = (SatışBüyümesi × 0.35) + (SosyalBüyümesi × 0.30) + (RakipKullanım × 0.20) + (SezonUyumu × 0.15)
FırsatScore = TrendScore + KârMarjı − RiskScore
```

| Skor | Karar |
|:----:|-------|
| 85-100 | ÜRET |
| 70-85 | TEST |
| 50-70 | BEKLE |
| 0-50 | RED |

---

## 8. BALON FİLTRE + ÇAPRAZ TEST

### Balon = RED
- Sadece sosyalde var + satış yok
- Influencer/reklam tek kaynak
- Ani sıçrama + hızlı düşüş

### Çapraz Test
| Durum | Karar |
|-------|-------|
| 3 platformda var | ✅ Doğru |
| 2 platformda var | ⚠ Riskli |
| 1 platformda var | ❌ Yanlış |

---

> **Bu dosya Sistem Haritası, Üretim Akışı, 138 Kriter ve Veri Kaynakları'nın EN ÜST SEVİYE referansıdır.**
