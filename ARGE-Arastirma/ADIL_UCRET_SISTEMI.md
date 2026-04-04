# ADİL ÜCRET VE ŞEFFAFLIK SİSTEMİ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları
> Amaç: 37 yıllık tecrübeye dayalı, veri bazlı adil ücretlendirme

---

## SİSTEMİN TEMEL FELSEFESİ

Bu sistem klasik ERP değildir.
Bu bir **Üretim Adalet ve Şeffaflık Sistemi**dir.

Amaç:
- İnsan kayırmacılığını ortadan kaldırmak
- Veri, bilgi ve analize dayalı karar
- Adil, şeffaf, adaletli ücret
- İnsan inisiyatifini kaldırmak

---

## ADİL ÜCRET HESAPLAMA VERİLERİ

| Veri | Amaç |
|---|---|
| İşlem süresi | Gerçek üretim zorluğu |
| İşçi başlangıç-bitiş saati | Performans ölçümü |
| İşlem zorluk puanı | Zorluk bazlı ücret |
| Ürün işlem sayısı | Toplam iş yükü |
| Üretilen adet | Miktar bazlı ücret |
| Kalite sonucu | Kalite bazlı prim |

---

## ÜCRET HESAPLAMA FORMÜLlERİ

```
Birim Ücret = (İşlem Zorluk Puanı × Makine Katsayısı × Süre) / Standart Zaman
Günlük Performans = Üretilen Adet × Birim Ücret × Kalite Katsayısı
Aylık Maaş = (Günlük Performanslar Toplamı) + Sabit Taban + Prim
```

---

## ŞEFFAFLIK KURALLARI

1. Çalışan yaptığı işi görebilir
2. Ücret hesaplaması açıktır (kendi verisi için)
3. Geçmiş kayıtlar değiştirilemez
4. Patron verileri değiştiremez (log kalır)
5. Günlük/haftalık/aylık iş kayıtları sistemde
6. Performans takibi şeffaf

---

## MANİPÜLASYON KORUMASI

| Kural | Detay |
|---|---|
| Üretim verisi değiştirilmez | Log korunur |
| Satış verisi değiştirilmez | Log korunur |
| Kasa verisi değiştirilmez | Log korunur |
| Üretim sayıları şişirilemez | Sistem kontrol |
| Geçmiş kayıtlar silinemez | Soft delete + log |
| Patron dahil kimse veri manipüle edemez | Audit trail |

---

## PATRON - ÇALIŞAN DENGESİ

| Soru | Cevap |
|---|---|
| Patron sistemi manipüle edebilir mi | Hayır — tüm değişiklikler loglanır |
| Çalışan verileri görebiliyor mu | Evet — kendi verisini |
| Veri tek taraflı mı | Hayır — çift taraflı şeffaf |
| Ücret hesabı açık mı | Evet — çalışan görebilir |

---

## İNSAN PSİKOLOJİSİ KRİTERLERİ

| Kriter | Kontrol |
|---|---|
| Sistem çalışanı strese sokuyor mu | Hayır olmalı |
| Sistem çalışanı motive ediyor mu | Evet olmalı |
| Çalışan sistemi kullanmak istiyor mu | Evet olmalı |
| Arayüz basit ve anlaşılır mı | Evet |
| Çalışan karmaşık hissediyor mu | Hayır olmalı |

---

## PERFORMANS TAKİBİ

- Her personel: günlük/haftalık/aylık iş kaydı
- Beceri matrisi güncellenir
- Gecikme ve hata oranları raporlanır
- Prim sistemi adil ve ölçülebilir

---

## MESLEĞE KATKI

Bu sistem sadece işletme için değil, meslek için:
- Sektörde standart olabilir
- Başka işletmeler için uygulanabilir
- Meslekte adalet sağlayabilir
- İnsanlık hayrına — mesleğimizde çalışan diğer insanların faydalanması için
