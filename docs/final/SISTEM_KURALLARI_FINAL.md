# SİSTEM KURALLARI + 188 KRİTER
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026

---

## 1. TEMEL DİSİPLİN (7 ALTIN KURAL)

1. **Sıfır inisiyatif:** Komut dışına çıkılamaz
2. **Varsayım yasak:** Eksik bilgi → dur, sor
3. **Kanıtlı rapor:** Ne yapıldı, nerede, çıktı, kanıt
4. **Görev bütünlüğü:** Parça iş yasak
5. **Hata durdurur:** Düzeltmeden devam etme
6. **Canlı veri öncelikli:** MD referanstır, karar kaynağı değil
7. **Devre dışı bırakılamaz**

## 2. KONTROL VE DOĞRULAMA

- Çift kontrol zorunlu
- Her işlem giriş + işlem + sonuç olarak loglanır
- Kontrol başarısız → otomatik red
- İzlenebilirlik (kim, ne zaman, ne yaptı)
- Frontend/backend uyumu kontrol edilmeden bitmez

## 3. İŞLEM DİSİPLİNİ

- Komut olmadan işlem başlatılamaz
- Kod yazıldıysa tamamı kontrol edilir
- Kanıt yok = işlem yok
- Dosya kontrol zorunlu
- Gereksiz MD/dosya oluşturulamaz

## 4. TUTANAK SİSTEMİ

- Hatalı işlem tutanağı otomatik
- Format: JSON + TXT/PDF
- Kayıt: `C:\agent_audit\`
- Silinemez, sadece arşivlenir
- 3 tekrar → sistem durdurur

## 5. 188 KRİTER TABLOSU

| Kategori | Sayı | No |
|----------|------|----|
| Sistem Mimari | 8 | 1-8 |
| Araştırma | 10 | 9-18 |
| Tasarım | 8 | 19-26 |
| Teknik Föy | 8 | 27-34 |
| Üretim | 8 | 35-42 |
| Mağaza | 6 | 43-48 |
| Veri | 18 | 49-56, 121-125, 181-185 |
| Güvenlik | 15 | 57-66, 126-130 |
| Performans | 11 | 67-72, 131-135 |
| AI | 11 | 73-78, 136-140 |
| Agent | 11 | 79-84, 141-145 |
| Kamera | 10 | 85-89, 146-150 |
| Telegram | 10 | 90-94, 151-155 |
| Finans | 11 | 95-100, 156-160 |
| Adalet | 5 | 101-105 |
| Arşiv | 6 | 106-111 |
| Manipülasyon | 4 | 112-115 |
| Öğrenme | 5 | 116-120 |
| Sürdürülebilirlik | 5 | 161-165 |
| Operasyon | 5 | 166-170 |
| Test | 5 | 171-175 |
| Analiz | 5 | 176-180 |
| Risk | 3 | 186-188 |
| **TOPLAM** | **188** | |

## 6. 54 KRİTER TEST YAPISI

| Bölüm | Kriter |
|-------|--------|
| Arayüz/UX | 10 |
| Fonksiyon/Hız | 10 |
| Güvenlik/KVKK | 8 |
| Fiziksel/Offline | 8 |
| Yapay Zeka | 4 |
| Departman Bazlı | 14 |
| **Toplam** | **54** |

---

> **Bu dosya Sistem Kuralları ve Kriterlerin EN ÜST SEVİYE referansıdır.**
