# PROJE YÖNETİM PANELİ + GÖREV SİSTEMİ
> **Versiyon:** FINAL 1.0 | **Tarih:** 10 Nisan 2026  
> **Kaynak:** konu_06 (YENİ DOSYA)

---

## 1. ANA HEDEF
Sen yokken: görev oluşturma → yürütme → kontrol → rapor → bildirim

## 2. TEMEL İLKELER
1. Görevler metin değil → **dosya**
2. Çıktılar metin değil → **kanıtlı rapor dosyası**
3. "Yaptım" demek yok → **kanıt yoksa işlem yok**
4. Güvene dayalı değil → **herkez kanıtlı icra eder**

## 3. GÖREV DOSYA FORMATI
```json
{
  "task_id": "uuid",
  "type": "code | exec | analysis",
  "input": { "description": "ne yapılacak", "files": [] },
  "mission": {
    "goal": "nihai hedef",
    "purpose": "ne işe yarayacak",
    "reason": "neden yapılıyor",
    "success_criteria": ["kriter 1", "kriter 2"]
  },
  "expected_output": { "files": [], "checks": ["file_exists", "content_match"] },
  "rules": { "no_fake_completion": true, "proof_required": true }
}
```

## 4. DONE ŞARTI (3 KATMAN — ZORUNLU)

| Katman | Kontrol | Geçmezse |
|--------|---------|----------|
| 1. Execution | Kod çalıştı mı, dosya üretildi mi | DONE değil |
| 2. Teknik | Test geçti mi, hata var mı | DONE değil |
| 3. Mission | Amaç gerçekleşti mi | DONE değil |

> 3 katman da EVET → DONE. Biri bile HAYIR → DONE DEĞİL.

## 5. ONAY SİSTEMİ
| Mod | Açıklama |
|-----|----------|
| Auto | Confidence ≥ %85 + test geçti → otomatik |
| Manual | Kritik görevlerde durup onay ister |
| Hybrid | Basit auto, riskli manual |

## 6. 14 ALAN GÖREV ŞABLONU
1. Durum 2. Görev 3. Neden 4. Beklenen çıktı 5. Nasıl 6. Kaynak/Bağımlılık 7. Sorumlu 8. Başarı kriterleri 9. Risk 10. Zaman 11. Öncelik 12. Kapsam 13. Kısıtlar 14. Onay noktası

## 7. SİSTEM BİLEŞENLERİ
| Bileşen | Rol |
|---------|-----|
| Panel | Kontrol merkezi |
| Backend | Beyin (FastAPI) |
| Agent | Karar verici (AI) |
| Worker | İşi yapan |
| Validator | Denetçi (bağımsız) |
| Telegram | Uzaktan göz |

---

> **Bu dosya Proje Yönetim Paneli'nin EN ÜST SEVİYE referansıdır.**
