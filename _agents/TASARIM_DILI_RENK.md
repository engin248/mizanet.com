# MİZANET — TASARIM DİLİ, RENK SİSTEMİ VE PSİKOLOJİK PRENSIPLER
> Oluşturulma: 4 Nisan 2026
> Amaç: Tüm 25 sayfada kullanılacak görsel standart

---

## ANA RENK PALETİ

| Renk | Hex | Kullanım |
|---|---|---|
| Zümrüt Yeşili | #046A38 | Ana renk — başlıklar, üst bar, navigasyon |
| Koyu Gold | #C8A951 | Vurgu — ikonlar, butonlar, önemli bilgiler |
| Yumuşak Mavi | #4F7CAC | Destek — linkler, aktif seçim, hover efekt |
| Açık Gri | #F4F6F7 | Arka plan — sayfa zemin rengi |
| Beyaz | #FFFFFF | Kart arka planı |
| Koyu Gri | #2D3436 | Metin rengi |

---

## DURUM RENKLERİ

| Renk | Kullanım |
|---|---|
| Yeşil #27AE60 | Normal — sorun yok |
| Sarı #F39C12 | Dikkat — risk |
| Kırmızı #E74C3C | Sorun — acil müdahale |
| Mavi #3498DB | Bilgi — bilgilendirme |

---

## PSİKOLOJİK TASARIM PRENSİPLERİ

### Amaç
Çalışan stresini azaltmak, sakinlik ve güven hissi vermek.
Meslek gereği çok insanla çalışılıyor — görev yükü ve sorumluluk stresi var.

### Kurallar
1. **Ekran kalabalık olmaz** — her ekranda az ve net bilgi
2. **Renk sayısı az olur** — 3 ana renk + durum renkleri
3. **Veri kart sistemi** — bilgiler kutularda, düzenli
4. **Yazı okunabilir olur** — minimum 14px, net font
5. **Boşluklar geniş olur** — nefes alan tasarım
6. **Yoğun renk kullanılmaz** — pastel tonlar, yumuşak geçişler
7. **Animasyon minimal** — dikkat dağıtıcı efekt yok
8. **İkonlar sade** — tek renk, anlaşılır semboller

---

## TİPOGRAFİ

| Element | Font | Boyut |
|---|---|---|
| Başlık | Inter Bold | 20-24px |
| Alt başlık | Inter SemiBold | 16-18px |
| Normal metin | Inter Regular | 14-16px |
| Küçük metin | Inter Light | 12px |
| Sayısal veri | Inter Medium (monospace) | 16px |

---

## KART TASARIMI

```
┌──────────────────────────┐
│ Başlık            ikon   │
│──────────────────────────│
│                          │
│ Ana bilgi / grafik       │
│                          │
│──────────────────────────│
│ Durum: ● Normal          │
└──────────────────────────┘
```

- Köşeler: yuvarlatılmış (8px border-radius)
- Gölge: hafif drop shadow
- Hover: hafif büyüme efekti

---

## DİL DESTEĞİ

- Ana dil: Türkçe
- İkinci dil: Arapça
- Çok dilli destek: evet (RTL uyumlu olmalı)
