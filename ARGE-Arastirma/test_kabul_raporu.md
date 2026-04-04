# 54 KRİTER SİSTEM TEST VE KABUL RAPORU

> Bu form denetmen tarafından fiziksel olarak doldurulur. Boş bırakılamaz.

---

**Test Tarihi:** ..../..../2026
**Testi Uygulayan / Denetmen:** ......................................
**Saha Platformu:** [ ] Tablet  [ ] Telefon  [ ] Bilgisayar
**İnternet Durumu:** [ ] Wi-Fi  [ ] Mobil Veri  [ ] Çevrimdışı

---

## BÖLÜM 1: ARAYÜZ (UI/UX) TESTLERİ

| # | Kriter | Açıklama | Sonuç |
|---|--------|----------|-------|
| 1 | G1 — Okunabilirlik | Butonlar, yazılar 1 metreden okunabiliyor mu | |
| 2 | O — Alt Sekmeler | Sekmeler sayfa yenilemeden açılıyor mu | |
| 3 | P — Hızlı Butonlar | Butonlar parmak boyutunda ve doğru konumda mı | |
| 4 | Q — Beyaz Ekran | 10 kez hızlı basınca ekran çöküyor mu | |
| 5 | T — Sütun Genişliği | Uzun metin tablo dışına taşıyor mu | |
| 6 | B — Bilgi Obezitesi | Gereksiz veri gizlenebiliyor mu | |
| 7 | A — Gereklilik | Input alanları gerçekten gerekli mi | |
| 8 | E — Gösterim Kalitesi | Para birimi ve binlik ayracı doğru mu | |
| 9 | L — Renk Uyumu | Renk kontrastı standart mı | |
| 10 | YY — İşçi Psikolojisi | Arayüz işçiye "karmaşık" dedirtir mi | |

**🕵️ DENETMEN KANIT TESTİ 1:** Karargâh'ta "Rakamları Gizle" ikonuna tıklanınca cironun yerine ne çıkıyor?
**Cevap:** [ ........................................................ ]

---

## BÖLÜM 2: FONKSİYON, HIZ VE ÇÖKERTME TESTLERİ

| # | Kriter | Açıklama | Sonuç |
|---|--------|----------|-------|
| 11 | R — Veri Ekleme | Kayıt veritabanına yazılıyor mu | |
| 12 | X — Negatif Kalkan | Negatif sayı girişi engelleniyor mu | |
| 13 | JJ — Çift Tıklama | Mükerrer kayıt oluşuyor mu | |
| 14 | DD — Telegram Alarm | Yüksek işlemde patron bildirimi geliyor mu | |
| 15 | W — Düzenleme | Kayıt düzenlenebiliyor mu | |
| 16 | U — Silme Onay | Silme öncesi onay penceresi çıkıyor mu | |
| 17 | S — Eksik Form | Zorunlu alan boş geçince hata veriyor mu | |
| 18 | N — Yönlendirme | Menü linkleri doğru çalışıyor mu | |
| 19 | V — PDF Rapor | Raporlar PDF/yazıcıya sığıyor mu | |
| 20 | FF — Realtime | Cihazlar arası veri anında güncelleniyor mu | |

**🕵️ DENETMEN KANIT TESTİ 2:** "Hızlı Görev Ekle" boş bırakılıp spam basılınca çıkan hata mesajı ne?
**Cevap:** [ ........................................................ ]

---

## BÖLÜM 3: GÜVENLİK VE KVKK TESTLERİ

| # | Kriter | Açıklama | Sonuç |
|---|--------|----------|-------|
| 21 | AA — URL Kalkan | Pin girmeden /kasa açılabiliyor mu | |
| 22 | PP — Tünel Kontrol | API anahtarları açıkta mı | |
| 23 | WW — KVKK Maaş | Operatör başkasının maaşını görebiliyor mu | |
| 24 | Spam — Rate Limit | F5 spam engelleniyor mu | |
| 25 | Kara Kutu — Soft Delete | Silinen veri log tablosuna gidiyor mu | |
| 26 | Session — Oturum | 8 saat inaktiflikte oturum kapanıyor mu | |
| 27 | C — Pin Güncelleme | Eski pin değişince iptal oluyor mu | |
| 28 | Storage — Dosya Sınır | 100 MB dosya yükleme reddediliyor mu | |

**🕵️ DENETMEN KANIT TESTİ 3:** "Üretim" pini kapatılıp /imalat'a tıklanırsa ne olur?
**Cevap:** [ ........................................................ ]

---

## BÖLÜM 4: SAHA, OFFLİNE VE MİMARİ TESTLERİ

| # | Kriter | Açıklama | Sonuç |
|---|--------|----------|-------|
| 29 | XX — Stok Farkı | Sayım farkı düzeltilebiliyor mu | |
| 30 | Offline 1 | İnternet kesilince kırmızı kalkan çıkıyor mu | |
| 31 | Offline 2 | İnternet gelince otomatik düzeliyor mu | |
| 32 | Barkod 1 | QR kod yazıcıdan doğru çıkıyor mu | |
| 33 | Barkod 2 | Kamera QR'ı hızlı okuyor mu | |
| 34 | Y — Yük Testi | 100 cihazda sistem yavaşlıyor mu | |
| 35 | M — Sorgu Ekonomisi | Gereksiz API çağrısı var mı | |
| 36 | PWA — Mobil | "Ana Ekrana Ekle" çalışıyor mu | |

**🕵️ DENETMEN KANIT TESTİ 4:** Offline kalkan ekranındaki en büyük başlık ne yazıyor?
**Cevap:** [ ........................................................ ]

---

## BÖLÜM 5: YAPAY ZEKA TESTLERİ

| # | Kriter | Açıklama | Sonuç |
|---|--------|----------|-------|
| 37 | AI-1 — Foto Analiz | Hatalı ürün fotoğrafı analiz ediliyor mu | |
| 38 | AI-2 — Trend Analiz | Moda analiz modülü çalışıyor mu | |
| 39 | AI-3 — Prompt Güvenlik | SQL injection engelleniyor mu | |
| 40 | AI-4 — Ses Tanıma | Speech-to-text doğru çalışıyor mu | |

**🕵️ DENETMEN KANIT TESTİ 5:** Mimari ajan mikrofon aktifken yanıp sönen ışık rengi ne?
**Cevap:** [ ........................................................ ]

---

## BÖLÜM 6: DEPARTMAN BAZLI SİSTEMATİK TEST

| # | Modül | Kontrol | Sonuç |
|---|-------|---------|-------|
| 41 | Karargah (M0) | Canlı veri gösterimi doğru mu | |
| 42 | Ar-Ge (M1) | Tasarım yükleme çalışıyor mu | |
| 43 | Modelhane (M3) | Kalıp kayıtları doğru mu | |
| 44 | Kumaş (M2) | Negatif metraj engelleniyor mu | |
| 45 | Kalıphane (M4) | Reçete kayıtları doğru mu | |
| 46 | Kesim (M5) | Fason statü değişimi çalışıyor mu | |
| 47 | İmalat (M5) | Bant üretim sayıları doğru mu | |
| 48 | Stok (M6) | QR sevkiyat çalışıyor mu | |
| 49 | Katalog (M10) | Kur hesaplaması doğru mu | |
| 50 | Sipariş (M12) | Kapora otomatik kasaya düşüyor mu | |
| 51 | Kasa (M7) | Realtime kasa hareketleri var mı | |
| 52 | Personel (M9) | Maaş gizliliği korunuyor mu | |
| 53 | Muhasebe (M8) | Zarar uyarısı çalışıyor mu | |
| 54 | Yönetim Final | Tek panelden tüm modüller izleniyor mu | |

---

## SONUÇ ONAYI

> 5 denetmen kanıt testi boş veya yanlışsa rapor GEÇERSİZ sayılır.

**TÜM 54 KRİTER OLUMLU:**
- [ ] EVET — Sistem canlıya hazır
- [ ] HAYIR — Eksikler var (aşağıya yaz)

**Açıklamalar:** .........................................

**İMZA:** ..................... **TARİH / SAAT:** .....................
