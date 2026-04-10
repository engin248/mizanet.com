# ⚔️ İŞ GÖREV EMRİ: KARARGÂH HABERLEŞME ONARIM OPERASYONU
**Emir No:** 2026-04-06-001
**Tarih:** 6 Nisan 2026, 02:25 (TRT)
**Sorumlu:** Başmimar (Albay)
**Durum:** 🔴 KRİTİK SORUN (Haberleşme Kesintisi)

---

## 1. DURUM TESPİTİ (KÖK SEBEP ANALİZİ)
Yürütülen teknik denetim sonucunda "Karargâh Haberleşme" sisteminin çökmesine neden olan "Split-Brain" (Çift Başlılık) sendromu tespit edilmiştir:

1.  **Algoritma Uyuşmazlığı:** Sunucu tarafındaki `kripto.js` (Askeri) ile istemci tarafındaki `mesajSifrele.js` (Web Crypto) farklı formatlarda ve farklı anahtar türetme yöntemleriyle çalışmaktadır. Biri "SFR:" prefixi kullanırken diğeri JSON paket yapısı kullanmaktadır.
2.  **Veritabanı Karmaşası:** Sistemde `b1_ic_mesajlar` (Eski/Açık) ve `b1_askeri_haberlesme` (Yeni/Şifreli) adında iki ayrı haberleşme tablosu mevcuttur. Arayüz eski tabloya bakarken, yeni kurulan API'ler yeni tabloya yazmaktadır.
3.  **Politika (RLS) Duvarı:** `b1_askeri_haberlesme` tablosu sadece `service_role` yetkisine kilitlenmiş, ancak arayüz bu yetkiye sahip olmayan doğrudan Supabase çağrıları yapmaktadır.
4.  **Sahte Başarı Beyanı:** API katmanında tablo bulunamadığında dahi "Success" dönen hatalı hata yakalama blokları, sistemi "hazır" gibi göstermektedir.

---

## 2. OPERASYON PLANI (ÇÖZÜM ADIMLARI)
Bu gece, 25 AI iş parçacığı (Asker) ile şu adımlar icra edilecektir:

1.  **Standardizasyon:** Tüm haberleşme trafiği `b1_askeri_haberlesme` (Askeri Şifreli) tablosuna ve merkezi `/api/haberlesme` rotalarına taşınacaktır.
2.  **Kripto Birleştirme:** Sunucu tarafındaki AES-256-GCM (Node `crypto`) ana güvenli yöntem olarak belirlenmiştir. İstemci taraflı şifreleme, anahtar sızıntısı riskine karşı devre dışı bırakılacak; şifreleme/çözme işlemi merkezi sunucu (API) üzerinden yapılacaktır.
3.  **Arayüz Senkronizasyonu:** `HaberlesmeMainContainer.js` ve `MesajBildirimButonu.js` doğrudan veritabanına bakmak yerine, `/api/haberlesme/oku` ve `/api/haberlesme/gonder` uç noktalarını kullanacak şekilde güncellenecektir.
4.  **Realtime Tetikleyici:** Yeni mesaj geldiğinde `Karargah` ekranındaki tüm askerlerin (modüllerin) anında haberdar olması için Supabase Realtime kanalları yeni tabloya lehimlenecektir.

---

## 3. GÖREV DAĞILIMI
*   **Ajan 1-5 (Veri Mimarları):** `b1_askeri_haberlesme` tablosundaki eksik kolonları (urun_id vb.) tamamlayıp RLS politikalarını stabilize edecek.
*   **Ajan 6-15 (API Mühendisleri):** `/api/haberlesme` rotalarındaki "Fake Success" bug'larını temizleyip gerçek hata raporlamasını aktif edecek.
*   **Ajan 16-20 (Frontend Komandoları):** UI üzerindeki doğrudan Supabase çağrılarını API çağrılarına çevirecek.
*   **Ajan 21-25 (Denetim & Test):** Tarayıcı simülasyonu ile mesajların uçtan uca şifreli ulaştığını ve Karargâh ekranında göründüğünü doğrulayacak.

---

## 4. İNFAZ VE MÜHÜR
Operasyon sonunda sahte beyanda bulunan yapı tasfiye edilecek, sistem **TEK VE SARSILMAZ** bir haberleşme köprüsüne kavuşturulacaktır.

**BAŞMİMAR (ALBAY)**
*Rapor arz edilmiştir.*
