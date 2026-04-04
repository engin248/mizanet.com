# KONU 6: PROJE YÖNETİM PANELİ (İHTİYAÇ ANALİZİ)
> Amaç: Masaüstü proje yönetim paneli gereksinimleri

---

## ANA HEDEF

- Sen yokken: görev oluşturma → yürütme → kontrol → rapor → bildirim
- Minimum maliyet, tek makinede çalışır
- Bilgisayar başında olmadan görev yönetimi

---

## TEMEL İLKELER

1. Görevler metin değil → **dosya**
2. Çıktılar metin değil → **kanıtlı rapor dosyası**
3. "Yaptım" demek yok → **kanıt yoksa işlem yok**
4. Güvene dayalı değil → **herkez görevini kanıtlı icra eder**

---

## GÖREV DOSYA FORMATI

```json
{
  "task_id": "uuid",
  "type": "code | exec | analysis",
  "input": {
    "description": "ne yapılacak",
    "files": ["input.txt"]
  },
  "mission": {
    "goal": "nihai hedef",
    "purpose": "ne işe yarayacak",
    "reason": "neden yapılıyor",
    "success_criteria": ["kriter 1", "kriter 2"]
  },
  "expected_output": {
    "files": ["output.txt"],
    "checks": ["file_exists", "content_match"]
  },
  "rules": {
    "no_fake_completion": true,
    "proof_required": true
  }
}
```

---

## DONE ŞARTI (3 KATMAN — ZORUNLU)

| Katman | Kontrol | Geçmezse |
|--------|---------|----------|
| 1. Execution | Kod çalıştı mı, dosya üretildi mi | DONE değil |
| 2. Teknik | Test geçti mi, hata var mı | DONE değil |
| 3. Mission | Amaç gerçekleşti mi, hedef karşılandı mı | DONE değil |

> 3 katman da EVET → DONE. Biri bile HAYIR → DONE DEĞİL.

---

## RAPOR DOSYA FORMATI

```json
{
  "task_id": "uuid",
  "status": "done",
  "proof": {
    "files_created": ["output.txt"],
    "hashes": { "output.txt": "sha256_hash" },
    "logs": "..."
  },
  "execution": "ok",
  "technical_validation": "ok",
  "mission_validation": {
    "goal_met": true,
    "purpose_met": true,
    "reason_resolved": true
  }
}
```

---

## ONAY SİSTEMİ

| Mod | Açıklama |
|-----|----------|
| Auto | Confidence ≥ %85 + test geçti → otomatik onay |
| Manual | Kritik görevlerde durup onay ister |
| Hybrid | Basit işler auto, riskli işler manual |

### Telegram Onay Komutları
- `/approve 123` → onayla
- `/reject 123` → reddet
- `/retry 123` → tekrar dene

---

## 14 ALAN GÖREV ŞABLONU

1. Durum — mevcut durum ne
2. Görev — ne yapılacak
3. Neden — neden yapılıyor
4. Beklenen çıktı — ne elde edeceğiz
5. Nasıl — nasıl yapılacak
6. Kaynak/Bağımlılık — neye bağlı
7. Sorumlu — kim yapacak, kim kontrol edecek
8. Başarı kriterleri — doğru yapıldığını nasıl anlayacağız
9. Risk — ne yanlış gidebilir
10. Zaman — ne zaman tamamlanacak
11. **Öncelik** — önem seviyesi
12. **Kapsam** — neler dahil/hariç
13. **Kısıtlar** — limitler
14. **Onay noktası** — nerede kim durdurup kontrol edecek

---

## TELEGRAM BOT

- Bildirim gönderir
- Uzaktan görev verir
- Durum sorgular
- Onay/red verir

---

## SİSTEM BİLEŞENLERİ

| Bileşen | Rol |
|---------|-----|
| Panel | Kontrol merkezi (Electron masa üstü) |
| Backend | Beyin (FastAPI) |
| Agent | Karar verici (AI destekli) |
| Worker | İşi yapan (local execution) |
| Validator | Denetçi (agent'tan bağımsız) |
| Telegram | Uzaktan göz |

---

## AÇIK KARAR

Teknoloji seçimi henüz netleşmedi:
- Antigravity entegrasyonu mu?
- Tam bağımsız (self-hosted) mi?
- Kullanıcı C (tam bağımsız) eğilimli
