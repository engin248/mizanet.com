# MİZANET — SİSTEM KONTROL KURALLARI
> Oluşturulma: 4 Nisan 2026
> Amaç: Tüm sistem genelinde geçerli denetim kuralları

---

## 1. KAYIT ZORUNLULUĞU
- Tüm işlemler kayıt altına alınır
- İşlem geçmişi silinemez
- Ses + video kayıt zorunlu (üretim aşamalarında)
- Her işlem: giriş zamanı, işlem, sonuç, operatör

---

## 2. YETKİ SİSTEMİ

| Seviye | Erişim |
|---|---|
| Karargâh | Tüm modüllere tam erişim + yetki yönetimi |
| Yönetici | Kendi departmanı + alt birimleri |
| Departman | Kendi modülü |
| Operatör | Kendi görevleri |
| İzleyici | Sadece okuma |

**Kural:** Herkes kendi yetki alanındaki bilgilere erişir.
Hassas bilgiler (maliyet, muhasebe, personel ücret) sınırlı erişimli.

---

## 3. İNSİYATİF KURALI
- İnsiyatif kesinlikle bırakılmaz
- Her işlem için talimat sistemden gelir
- İşlem nasıl yapılacak: yazılı + görsel + sesli talimat
- Doğru/yanlış yapım kaydı tutulur

---

## 4. ŞEFFAFLIK
- Maliyet şeffaf (yetki dahilinde)
- Performans şeffaf (kişiye özel)
- Adil ücret sistemi desteklenir
- Günlük/haftalık/aylık kayıtlar

---

## 5. DENETIM
- Her işlem ikinci kontrol mekanizmasından geçer
- Log'suz işlem kabul edilmez
- Tekrarlayan hatalarda otomatik uyarı
- Denetmen modülü bağımsız çalışır

---

## 6. GÜVENLİK
- 2FA zorunlu
- Oturum zaman aşımı
- Erişim logları saklanır
- Yetki değişiklikleri loglanır

---

## 7. HABERLEŞME
- Sistem içi bot/mesajlaşma sistemi
- Görev bildirim sistemi
- Kritik uyarı sistemi (stok, üretim, maliyet)

---

## 8. VERİ BÜTÜNLÜĞÜ
- Tek doğru kaynak: veritabanı
- MD dosyaları referans — ana kaynak olamaz
- Canlı veri zorunlu

---

## 9. ÜRETİM KAYIT
- Model hazırlama: her açı, her nokta kayıt
- Numune dikimi: ilk işlemden son işleme görsel + sesli kayıt
- Kalite kontrol: fotoğraf + ölçü raporu
- Hata: sebep + çözüm kaydı

---

## 10. PERFORMANS TAKİBI
- Her personel: günlük/haftalık/aylık iş kaydı
- Beceri matrisi güncellenir
- Gecikme ve hata oranları raporlanır
