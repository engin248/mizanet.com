# MİZANET — 54 KRİTER MERKEZLİ SİSTEM TEST VE KABUL RAPORU
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare (orijinal 54 kriter + genişletilmiş 76 kriter)
> Amaç: Her modül için sahada fiziken uygulanacak test formu

---

## KULLANIM TALİMATI

Test Tarihi: ..../..../2026
Testi Uygulayan / Denetmen: ......................................
Saha Platformu: [ ] Tablet  [ ] Telefon  [ ] Bilgisayar
İnternet Durumu: [ ] Wi-Fi  [ ] Mobil Veri  [ ] Çevrimdışı

**KURAL:** Her bölümün sonundaki DENETMEN KANIT TESTİ boş bırakılırsa test geçersiz sayılır.

---

## BÖLÜM 1: ARAYÜZ VE UX TESTLERİ (Kriter 1–10)

| # | ID | Kriter | Kontrol |
|---|---|---|---|
| 1 | G1 | Buton ve yazılar 1 metreden okunabiliyor mu | |
| 2 | O | Alt sekmeler sayfa yenilemeden açılıyor mu | |
| 3 | P | Hızlı butonlar parmak boyutunda mı | |
| 4 | Q | 10 kez hızlı tıklamada UI çöküyor mu | |
| 5 | T | Uzun metin tablo dışına taşıyor mu | |
| 6 | B | Gereksiz veri gizlenebiliyor mu | |
| 7 | A | Input alanları gerçekten gerekli mi | |
| 8 | E | Para birimi ve binlik ayracı doğru mu | |
| 9 | L | Renk kontrastı ve standart uyumu doğru mu | |
| 10 | YY | Arayüz işçi psikolojisine uygun mu | |

**DENETMEN KANIT TESTİ 1:** Karargâh'ta "Rakamları Gizle" ikonuna tıklayınca ne çıkıyor?
Cevap: [ ........................................................ ]

---

## BÖLÜM 2: FONKSİYON VE HIZ TESTLERİ (Kriter 11–20)

| # | ID | Kriter | Kontrol |
|---|---|---|---|
| 11 | R | Yeni kayıt veritabanına yazılıyor mu | |
| 12 | X | Negatif değer girişi engelleniyor mu | |
| 13 | JJ | Çift tıklamada mükerrer kayıt oluşuyor mu | |
| 14 | DD | Yüksek meblağda Telegram alarmı düşüyor mu | |
| 15 | W | Kayıt düzenlenebiliyor mu (silmeden) | |
| 16 | U | Silme işlemi onay penceresi çıkarıyor mu | |
| 17 | S | Zorunlu alan boş geçildiğinde hata veriyor mu | |
| 18 | N | Menü linkleri doğru sayfaya götürüyor mu | |
| 19 | V | PDF rapor çıktısı düzgün mü | |
| 20 | FF | Realtime veri güncelleniyor mu | |

**DENETMEN KANIT TESTİ 2:** Boş form spam gönderildiğinde çıkan hata metni nedir?
Cevap: [ ........................................................ ]

---

## BÖLÜM 3: GÜVENLİK VE KVKK TESTLERİ (Kriter 21–28)

| # | ID | Kriter | Kontrol |
|---|---|---|---|
| 21 | AA | Pin girmeden URL ile sayfa açılabiliyor mu | |
| 22 | PP | API anahtarları istemci tarafında görünüyor mu | |
| 23 | WW | Operatör başka birinin maaşını görebiliyor mu | |
| 24 | Spam | F5 spam saldırısı engelleniyor mu | |
| 25 | KK | Silinen kayıt soft delete ile loglanıyor mu | |
| 26 | Session | 8 saat aktif olmayınca çıkış yapıyor mu | |
| 27 | C | Pin değişince eski pin iptal oluyor mu | |
| 28 | Zırh | 100MB dosya yükleme engelleniyor mu | |

**DENETMEN KANIT TESTİ 3:** Pin yetkisi kapatılırsa /imalat'a ne olur?
Cevap: [ ........................................................ ]

---

## BÖLÜM 4: SAHA VE OFFLİNE TESTLERİ (Kriter 29–36)

| # | ID | Kriter | Kontrol |
|---|---|---|---|
| 29 | XX | Stok sayım farkı düzeltilebiliyor mu | |
| 30 | Off1 | İnternet kesilince offline kalkan çıkıyor mu | |
| 31 | Off2 | İnternet gelince otomatik senkron oluyor mu | |
| 32 | B1 | QR kod yazıcıdan doğru çıkıyor mu | |
| 33 | B2 | Kamera QR kodu hızlı okuyor mu | |
| 34 | Y | 100 cihazda sistem yavaşlıyor mu | |
| 35 | M | Gereksiz API çağrısı var mı | |
| 36 | PWA | Mobil uygulama kurulabiliyor mu | |

**DENETMEN KANIT TESTİ 4:** Offline kalkan ekranındaki en büyük başlık nedir?
Cevap: [ ........................................................ ]

---

## BÖLÜM 5: AI TESTLERİ (Kriter 37–40)

| # | ID | Kriter | Kontrol |
|---|---|---|---|
| 37 | AI1 | Fotoğraf AI kalite analizi çalışıyor mu | |
| 38 | AI2 | Trend analiz motoru çalışıyor mu | |
| 39 | AI3 | SQL injection/prompt saldırısı engelleniyor mu | |
| 40 | AI4 | Speech-to-text doğru çalışıyor mu | |

**DENETMEN KANIT TESTİ 5:** Mikrofon ikonuna tıklayınca çıkan ışık rengi nedir?
Cevap: [ ........................................................ ]

---

## BÖLÜM 6: DEPARTMAN BAZLI TEST (Kriter 41–54)

| # | Modül | Kriter | Kontrol |
|---|---|---|---|
| 41 | Karargah M0 | Gösterge panelleri canlı mı | |
| 42 | Ar-Ge M1 | Tasarım yükleme çalışıyor mu | |
| 43 | Modelhane M3 | Kalıp ve numune kayıtları doğru mu | |
| 44 | Kumaş M2 | Negatif metraj engelleniyor mu | |
| 45 | Kalıp M4 | Reçete kayıtları doğru mu | |
| 46 | Kesim M5 | Fason statü değişimi çalışıyor mu | |
| 47 | İmalat M5 | Bant üretim sayıları doğru mu | |
| 48 | Stok M6 | QR sevkiyat çalışıyor mu | |
| 49 | Katalog M10 | Döviz fiyat hesaplaması doğru mu | |
| 50 | Sipariş M12 | Kapora kasaya düşüyor mu | |
| 51 | Kasa M7 | Realtime kasa hareketleri var mı | |
| 52 | Personel M9 | Maaş gizliliği korunuyor mu | |
| 53 | Muhasebe M8 | Zarar uyarısı çalışıyor mu | |
| 54 | Yönetim | Tüm modüller tek panelden izleniyor mu | |

---

## BÖLÜM 7: GENİŞLETİLMİŞ KRİTERLER (Kriter 55–76)

| # | Kategori | Kriter | Kontrol |
|---|---|---|---|
| 55 | Fonksiyon | Her sayfada Ekle/Sil/Düzenle butonu standart mı | |
| 56 | Fonksiyon | Tablolarda sütun ekle/gizle var mı | |
| 57 | Fonksiyon | Her sayfada filtreleme + arama var mı | |
| 58 | Fonksiyon | Toplu işlem (bulk edit) var mı | |
| 59 | Sistem | Hata log görüntüleme paneli var mı | |
| 60 | Sistem | Veritabanı işlem sayacı var mı | |
| 61 | Güvenlik | Yetki bazlı buton görünürlüğü var mı | |
| 62 | Audit | Her sekmede işlem geçmişi var mı | |
| 63 | Stabilite | API başarısızlık retry sistemi var mı | |
| 64 | Güvenlik | Kritik işlem geri alma (undo) var mı | |
| 65 | Rapor | Tablo export (Excel) var mı | |
| 66 | Audit | İşlem zaman damgası var mı | |
| 67 | DevOps | Sistem performans metriği var mı | |
| 68 | Performans | Sayfa yüklenme süresi ölçülüyor mu | |
| 69 | Performans | Cache kontrolü var mı | |
| 70 | Veri | Veri senkron kontrolü var mı | |
| 71 | DB | b0_sistem_loglari tablosu var mı | |
| 72 | DB | b0_hata_loglari tablosu var mı | |
| 73 | DB | b0_islem_gecmisi tablosu var mı | |
| 74 | DB | b0_performans_metrikleri tablosu var mı | |
| 75 | DB | b0_retry_queue tablosu var mı | |
| 76 | DB | b0_offline_queue tablosu var mı | |

---

## MEVCUT SİSTEM MODÜL İŞLEM RAPORU

| Modül | İşlem | Alt İşlem (DB) | Yama | Hata |
|---|---|---|---|---|
| Ar-Ge (M1) | 61 | 13 | 4 | 0 |
| Kumaş (M2) | 57 | 12 | 4 | 0 |
| Modelhane (M3) | 80 | 19 | 4 | 0 |
| Kalıp (M4) | 53 | 10 | 4 | 0 |
| Kesim (M5) | 50 | 13 | 4 | 0 |
| Stok/Depo (M6) | 46 | 9 | 4 | 0 |
| Kasa (M7) | 80 | 10 | 4 | 0 |
| Muhasebe (M8) | 37 | 10 | 3 | 0 |
| Personel (M9) | 84 | 15 | 4 | 0 |
| Katalog (M10) | 75 | 13 | 4 | 0 |
| Müşteriler (M11) | 65 | 14 | 4 | 0 |
| Siparişler (M12) | 71 | 17 | 4 | 0 |
| Denetmen (M14) | 38 | 10 | 3 | 0 |
| Ajanlar | 76 | 6 | 4 | 0 |
| Raporlar | 51 | 11 | 2 | 0 |
| Ayarlar | 25 | 4 | 3 | 0 |
| Üretim (Ana Panel) | 73 | 14 | 4 | 0 |
| **TOPLAM** | **982** | **180** | **60** | **0** |

---

## SONUÇ ONAYI

BÜTÜN KRİTERLER VE KANITLAR OLUMLUDUR:
[ ] EVET — SİSTEM HAZIR
[ ] HAYIR — EKSİKLER VAR (aşağıya yaz)

**Açıklamalar:**
.........................................................................................................

**İMZA:**
*(Tarih ve Saatli)*
