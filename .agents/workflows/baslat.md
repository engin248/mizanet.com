---
description: /baslat — Oturum acilis brifingi. Her yeni sohbet basinda calistirilir.
---

# BASLAT — Oturum Acilis Protokolu

## SiSTEM SABiT BiLGiLERi — HER AGENT OKUYACAK

| Bilgi | Deger |
|---|---|
| Sistem Adi | Mizanet ERP |
| Canli Domain | **https://mizanet.com** |
| Proje Klasoru | `C:\Users\Esisya\Desktop\Mizanet` |
| Veritabani | Supabase |
| Sistem Kurucusu | Engin |
| Renk Standardi | Zumrut #047857 + Koyu Gold #B8860B + Mavi #1D4ED8 |

Her yeni sohbet basinda asagidaki adimlar sirayla calistirilir.

## Adim 1 — Git Guncelleme
```
git pull origin main
```
Yerel dosyalar GitHub ile senkronize edilir.

## Adim 2 — SESSION_HANDOFF Oku
Son oturum notlari okunur:
- `C:\Users\Esisya\Desktop\Mizanet\_agents\SESSION_HANDOFF.md`

Bu dosya: tamamlanan isler, acik gorevler, deployment durumu ve bir sonraki adimlari icerir.

## Adim 3 — GEMINI.md Oku (varsa)
Dosya: `C:\Users\Esisya\Desktop\Mizanet\GEMINI.md`
Yoksa bu adimi atla.

## Adim 4 — Brifing Uret

```
=============================================
MIZANET ERP — OTURUM BRiFiNGi
Tarih : [BUGUN]
=============================================
GiT DURUMU     : [up-to-date / degisiklik var]
SON YAPILAN    : [SESSION_HANDOFF'dan - tamamlananlar]
YAPILMAYAN     : [SESSION_HANDOFF'dan - acik gorevler]
SIRADAKI ADIM  : [Onerilen sonraki gorev]
BiLiNEN SORUN  : [Varsa bilinen sorunlar]
=============================================
```

## Adim 5 — Hazir Bekle
Brifing sonrasi kullanicidan komut bekle. Izinsiz is baslatma.
