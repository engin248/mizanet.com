# KONU 11: 54 KRİTER SİSTEM TEST VE KABUL RAPORU ŞABLONU
> Amaç: Sistemin canlıya alınmadan önce fiziksel olarak test edilmesi için kullanılan kontrol formu
> Kullanım: Denetmen her kriteri FİZİKEN test edip ✅/❌ işaretler

---

**Test Tarihi:** ..../..../2026
**Testi Uygulayan / Denetmen:** ......................................
**Saha Platformu:** [ ] Tablet  [ ] Telefon  [ ] Bilgisayar
**İnternet Durumu:** [ ] Wi-Fi  [ ] Mobil Veri  [ ] Çevrimdışı

---

## BÖLÜM 1: ARAYÜZ (UI/UX) TESTLERİ

| No | Kod | Kriter | Sonuç |
|----|-----|--------|:-----:|
| 01 | G1 | Butonlar/yazılar 1m mesafeden okunabiliyor mu, parlama var mı | |
| 02 | O | Alt sekmeler sayfa yenilenmeden açılıyor mu | |
| 03 | P | Hızlı butonlar parmak boyutunda ve doğru konumda mı | |
| 04 | Q | 10 kez hızlı tıklamada ekran çöküyor mu | |
| 05 | T | Tabloda uzun metin taşıyor mu, alt satıra geçiyor mu | |
| 06 | B | Gereksiz veri gizlenebiliyor mu (akordiyon/tıklama) | |
| 07 | A | Input alanları gerçekten gerekli mi | |
| 08 | E | Binlik ayraç ve para birimi sembolleri doğru mu | |
| 09 | L | Zıt renk var mı, Gold/Emerald standart mı | |
| 10 | YY | Ekran işçiyi pasif dirence mi itiyor, buton dili basit mi | |

> 🕵️ **DENETMEN KANIT TESTİ 1**: Karargâh'ta "Rakamları Gizle" ikonuna tıklayınca ciro yerine hangi semboller çıkıyor?
> Cevap: [ ........................................................ ]

---

## BÖLÜM 2: FONKSİYON, HIZ ve ÇÖKERTME TESTLERİ

| No | Kod | Kriter | Sonuç |
|----|-----|--------|:-----:|
| 11 | R | Veri Supabase'e sorunsuz yazılıyor mu | |
| 12 | X | Negatif sayı girişi (-50) reddediliyor mu | |
| 13 | JJ | 3 hızlı tıklamada mükerrer kayıt oluşuyor mu | |
| 14 | DD | Yüksek meblağda Telegram'a alarm düşüyor mu | |
| 15 | W | Kayıt silinmeden düzenlenebiliyor mu | |
| 16 | U | Silme öncesi "Emin misiniz?" onayı çıkıyor mu | |
| 17 | S | Zorunlu alan boş geçilince hata veriyor mu | |
| 18 | N | Menü linkleri doğru sayfaya götürüyor mu, 404 var mı | |
| 19 | V | PDF/yazdırma çıktısı doğru sığıyor mu | |
| 20 | FF | Tablet A'da silinen veri Tablet B'de anında kalkıyor mu | |

> 🕵️ **DENETMEN KANIT TESTİ 2**: Boş form spam gönderilince çıkan hata metninin TAM CÜMLESİ:
> Cevap: [ ........................................................ ]

---

## BÖLÜM 3: GÜVENLİK, SİBER KALKAN, KVKK TESTLERİ

| No | Kod | Kriter | Sonuç |
|----|-----|--------|:-----:|
| 21 | AA | Pin olmadan URL ile zorla giriş engelliyor mu | |
| 22 | PP | Supabase API anahtarları istemcide görünüyor mu | |
| 23 | WW | Operatör başka çalışanın maaşına erişebiliyor mu | |
| 24 | Spam | F5 spam / bot atağında IP bloklama var mı | |
| 25 | KK | Silinen veri b0_sistem_loglari'na kopyalanıyor mu | |
| 26 | Session | 8 saat işlemsiz kalınca oturum kilitleniyor mu | |
| 27 | C | Pin değişince eski pin anında iptal oluyor mu | |
| 28 | Storage | 100MB dosya yüklemesi reddediliyor mu | |

> 🕵️ **DENETMEN KANIT TESTİ 3**: Pin kapatıldıktan sonra /imalat'a tıklayınca ekran tepkisi:
> Cevap: [ ........................................................ ]

---

## BÖLÜM 4: FİZİKSEL SAHA, OFFLİNE ve MİMARİ TESTLERİ

| No | Kod | Kriter | Sonuç |
|----|-----|--------|:-----:|
| 29 | XX | Stok sayım farkı düzeltilebiliyor mu | |
| 30 | Off1 | İnternet kesilince kırmızı çerçeveli uyarı çıkıyor mu | |
| 31 | Off2 | İnternet gelince F5 yapmadan sayfa normale dönüyor mu | |
| 32 | B1 | QR kodlar yazıcıdan doğru basılıyor mu | |
| 33 | B2 | QR tarayıcı anlık okuyor mu | |
| 34 | Y | 100 cihaz aynı anda kullanımda yavaşlama var mı | |
| 35 | M | Gereksiz API loop yerine React state kullanılıyor mu | |
| 36 | PWA | Cep telefonunda "Ana Ekrana Ekle" ile kurulabiliyor mu | |

> 🕵️ **DENETMEN KANIT TESTİ 4**: Offline kalkan panelindeki EN BÜYÜK BAŞLIK ne yazıyor?
> Cevap: [ ........................................................ ]

---

## BÖLÜM 5: YAPAY ZEKA VE İLERİ TEKNOLOJİ TESTLERİ

| No | Kod | Kriter | Sonuç |
|----|-----|--------|:-----:|
| 37 | AI-1 | Fotoğraf yükleme ile hata analizi yapıyor mu | |
| 38 | AI-2 | AR-GE trend analizi stabil çalışıyor mu | |
| 39 | AI-3 | SQL Injection / DDOS komutları engelleniyor mu | |
| 40 | AI-4 | Türkçe sesle Speech-to-Text doğru mu | |

> 🕵️ **DENETMEN KANIT TESTİ 5**: Mikrofon açılınca yuvarlaktaki yanıp sönen ışığın rengi:
> Cevap: [ ........................................................ ]

---

## BÖLÜM 6: DEPARTMAN BAZLI SİSTEMATİK TESTLER

| No | Modül | Kriter | Sonuç |
|----|-------|--------|:-----:|
| 41 | Karargâh M0 | Göstergeler canlı mı, pin yetkisi kilitliyor mu | |
| 42 | AR-GE M1 | Tasarım yükleme sorunsuz mu | |
| 43 | Modelhane M3 | Kalıp/numune kayıtları hatasız mı | |
| 44 | Kumaş M2 | Negatif metraj (-10) girildiğinde hata fırlatıyor mu | |
| 45 | Kalıphane M4 | Reçeteler fiziki ölçülerle kaydedilebiliyor mu | |
| 46 | Kesim M5 | Fason parça statü değişimi anında mı | |
| 47 | İmalat M5 | Bant üretim sayıları doğru mu | |
| 48 | Stok M6 | QR ile sevkiyat fişi oluşuyor mu | |
| 49 | Katalog M10 | Döviz kur hesaplaması doğru mu | |
| 50 | Sipariş M12 | Kapora otomatik kasaya düşüyor mu | |
| 51 | Kasa M7 | Nakit/KK hareketleri realtime mi | |
| 52 | Personel M9 | Maaş bilgileri yetkisizlere kapalı mı | |
| 53 | Muhasebe M8 | Zarar uyarısı kırmızı çalışıyor mu | |
| 54 | Yönetim | Tüm modüller tek panelden saniyeler içinde izlenebiliyor mu | |

---

## SONUÇ ONAYI

**Tüm 54 kriter ve kanıtlar olumlu:**
- [ ] EVET — Sistem canlıya hazır
- [ ] HAYIR — Eksikler aşağıda

**Hatalar / Notlar:**
.........................................................................................................
.........................................................................................................

**İMZA (Tarih + Saat):**
......................................
