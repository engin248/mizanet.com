# M0 — KARARGAH KOMUTA MERKEZİ
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** 4 dosya analiz edildi

---

## 1. MODÜL TANIMI

**Sayfa:** `/` (Anasayfa)  
**Dosya:** `src/features/karargah/`  
**Amaç:** Tüm işletmenin kuşbakışı tek ekrandan (Single Pane of Glass) izlenmesi. NİZAM sisteminin beyni.

---

## 2. ÜST BİLGİ KARTLARI

| Kart | Veri |
|------|------|
| Bugünkü üretim | Adet |
| Bekleyen sipariş | Adet |
| Kritik stok | Uyarı sayısı |
| Günlük ciro | TL (KVKK gizli — göz ikonu ile açılır) |
| Online personel | Kişi sayısı |

---

## 3. SAYFA YAPISI

### Üst Bar
Sayfa adı, hızlı arama, bildirimler, kullanıcı bilgisi, dil seçimi (TR/AR), tarih/saat

### Ana Çalışma Alanı
- Günlük üretim grafiği
- Sipariş durumu özet
- AI önerileri kartları

### Alt Alan
- Son işlemler log listesi
- Sistem uyarıları (kritik → kırmızı şerit, normal → standart)
- Personel durumu

---

## 4. KVKK SANSÜR ZIRHI
- `finansGizli` state = varsayılan `true`
- Tüm maddi veriler "₺ ••••••" gizlendi
- Sağ üstte göz ikonu ile açılır

---

## 5. MODÜL PORTALLARI
Gradientli, iconlu, hover-scale büyük yönlendirme kartları:
- Her modüle tek tıkla geçiş
- Kritik alarm → kırmızıya döner → tıkla → ilgili sayfaya ışınlanma

---

## 6. ALARM HİYERARŞİSİ

| Seviye | Görünüm | Aksiyon |
|--------|---------|---------|
| Kritik | Yanıp sönen kırmızı şerit | Tıkla → ilgili modüle deep-link |
| Uyarı | Sarı çerçeve | Bilgilendirme |
| Normal | Standart log | Kayıt |

---

## 7. CANLI RADAR ANİMASYONU
- Sağ üstte sürekli dönen/nabız atan UI animasyonu
- AI ajanının devrede olduğunu gösterir
- Supabase Realtime ile canlı veri akışı

---

## 8. VERİ KAYNAKLARI
Karargah TÜM modüllerden veri çeker:
Üretim, Sipariş, Stok, Personel, Kasa, AI, Kamera

---

## 9. KONTROL KURALLARI
- Realtime veri senkronizasyonu zorunlu
- Kritik alarm → otomatik Telegram bildirim
- Yetki seviyesine göre veri görünürlüğü (5 seviye RBAC)

---

## 10. MEVCUT DURUM

### ✅ Çalışan
- Finansal özet kartları (KVKK gizli)
- Modül portalları (gradientli)
- Alarm rota bağlantıları
- PIN kalkanı
- Kamera Cron entegrasyonu

### ❌ Eksik
- Deep-link (kumaş bitti → doğrudan o ID'ye)
- Acil durum hiyerarşisi (renk kodlu)
- Canlı radar animasyonu
- Modüller arası anlık veri akışı

---

> **Bu dosya Mizanet Karargah modülünün EN ÜST SEVİYE referansıdır.**
