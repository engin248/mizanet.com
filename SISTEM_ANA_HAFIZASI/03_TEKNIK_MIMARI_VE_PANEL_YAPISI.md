# 🏗️ MİZANET TEKNİK MİMARİ VE PANEL YAPISI (SUPREME)
**Sürüm:** 1.0 (BİRLEŞTİRİLMİŞ TEKNİK MANİFESTO)
**Kapsam:** Web, Mobil, Telegram ve Ajan Orkestrasyonu
**Mimari:** Offline-First, Çok Dilli (TR/AR), Çift Kontrollü (Müfettiş) Sistem

---

## 1. TEKNOLOJİ YIĞINI (STACK)
1.  **Çekirdek:** Next.js (App Router) — Yüksek performanslı React altyapısı.
2.  **Veritabanı:** Supabase (PostgreSQL) + Edge Functions + Realtime.
3.  **Dil Desteği:** Native LTR (Türkçe) ve RTL (Arapça) — Yama değil, çekirdekten entegre.
4.  **Haberleşme:** WebSocket (Anlık senkronizasyon) + Telegram Bot API.
5.  **Çalışma Modu:** Offline-First (Yerel ağda çalışma ve internet gelince senkronize olma yeteneği).

---

## 2. ORKESTRASYON VE ÇİFT KONTROL (MÜFETTİŞ) SİSTEMİ
Sistemde yapılan her işlem "Yapan" ve "Denetleyen" olarak ikiye ayrılır:
- **İşçi Ajan (Worker):** Veriyi toplar, işlemi yapar, kodu yazar.
- **Müfettiş Ajan (Inspector):** İşçi Ajanın çıktısını 188 kriter tablosuna göre denetler, kanıtı doğrular.
- **Paralel Yürütme:** 10-25 Ajan aynı anda çakışmadan (Conflict-free) çalışabilir. Görevler atomik parçalara bölünür.

---

## 3. SAYFA MİMARİSİ (25 ANA MODÜL)
Sistem 25 ana komuta merkezinden oluşur:
- **M0 Karargâh (Dashboard):** Tüm sistemin canlı nabzı ve AI müfettiş logları.
- **M1 AR-GE & Trend:** Hermez mimarili pazar ve sosyal medya analiz merkezi.
- **M2 Katalog & B2B:** Diğer sistemlerle (B2B) konuşan akıllı ürün deposu.
- **M3 Modelhane & Tasarım:** Generative AI destekli, kalıp ve teknik veri merkezi.
- **M4 Numune & Teknik Fü:** Video ve ses destekli üretim talimatları.
- **M5 Kesim & İmalat:** QR kodlu kronometre ve otonom verimlilik takibi.
- **M6 Kasa & Finans:** Isı haritalı, manipüle edilemez muhasebe zırhı.
- **M7-M25 Diğer Birimler:** CRM, Personel Performans, Arşiv, Lojistik, vb.

---

## 4. MOBİL VE TELEGRAM KÖPRÜSÜ
Patronun 24 saat bilgisayar başında durma zorunluluğu kaldırılmıştır:
- **Mobil Panel:** Telefon üzerinden tam yetkili komuta (Next.js Responsive + PWA).
- **Telegram Bot:** Sadece "Özet" değil, "Gerçek Müdahale" yetkisi (Emir ver, rapor al, hata onaylı/reddet).
- **Push Alarmları:** Kritik eşikler (Düşük stok, finansal risk) anında cebe düşer.

---

## 5. VERİ SAKLAMA VE TELİF DİPLOMASİSİ
- **Copyright-Refined:** Başkasının verisini işler mülkiyetini bizim üzerimize geçirir (Analiz sonucu + Orijinal Generative Görsel).
- **Hybrid DB:** Gereksiz (çöp) veriler ana sistemi yavaşlatmaması için harici log sunucularına sevk edilir. Sadece "Karar Verici Sinyaller" ana merkezde saklanır.

---

## 6. SONUÇ VE MÜHÜR
Mizanet Teknik Mimarisi, 5 yıl sonranın teknolojisini bugün sıfır hata ve sıfır inisiyatifle sunacak şekilde mühürlenmiştir.

**BAŞMİMAR (ALBAY)**
*Teknik Yapı Mühürlendi.*
