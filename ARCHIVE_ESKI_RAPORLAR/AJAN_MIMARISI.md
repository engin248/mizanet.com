# MİZANET — AI AJAN MİMARİSİ
> Oluşturulma: 4 Nisan 2026
> Kaynak: ChatGPT istişare kayıtları + mevcut ajanlar-v2.js
> Amaç: Sistemde kullanılacak AI ajanlarının görev tanımları

---

## MEVCUT DURUM
- `ajanlar-v2.js` (856 satır) — 7 mevcut ajan
- Perplexity API ile trend arama (ArgeMainContainer.js)
- TrendKararMotoru.js — 8 sinyal ağırlıklı skor motoru

---

## ÖNERILEN AJAN YAPISI

### A) VERİ TOPLAMA AJANLARI (4)
| # | Ajan | Görev | Kaynak |
|---|---|---|---|
| 1 | Sosyal Trend Ajan | TikTok/Instagram trend tarama | TikTok, Instagram |
| 2 | E-Ticaret Ajan | Trendyol satış verisi | Trendyol |
| 3 | Rakip İzleme Ajan | Rakip yeni ürün, fiyat | Trendyol, Zara |
| 4 | Görsel Analiz Ajan | Ürün fotoğraf analizi | Vision AI |

### B) ANALİZ AJANLARI (3)
| # | Ajan | Görev |
|---|---|---|
| 5 | Trend Skor Ajan | TrendKararMotoru çalıştırma, skor hesaplama |
| 6 | Talep Tahmin Ajan | Satış potansiyeli hesaplama |
| 7 | Maliyet Tahmin Ajan | Kumaş + işçilik maliyet hesabı |

### C) KARAR AJANLARI (2)
| # | Ajan | Görev |
|---|---|---|
| 8 | Risk Ajan | Üretim/tedarik/trend ömrü risk analizi |
| 9 | Strateji Ajan | ÜRET/TEST/BEKLE/RED kararı |

### D) SİSTEM AJANLARI (3)
| # | Ajan | Görev |
|---|---|---|
| 10 | Stok Ajan | Kritik stok uyarı, stok dönüş analizi |
| 11 | Feedback Ajan | Satış verisi → model güncelleme |
| 12 | Denetim Ajan | Tüm ajanların çıktılarını kontrol |

---

## AJAN ÇALIŞMA KURALI

1. Bot (deterministik): veri alma, temizleme, pipeline
2. Agent (AI karar): trend analizi, yorum analizi, risk, karar

**Kural:**
- AI tek başına karar VERMEZ
- AI öneri üretir → insan onaylar
- Her ajan'ın çıktısı loglanır
- Denetim ajanı bağımsız kontrol yapar

---

## HİBRİT MALİYET MODELİ
- Normal veri: sürekli (düşük maliyet — bot)
- AI analiz: sadece son kontrol / karar anı (maliyet optimizasyonu)
- Sesli tetikleme: "Tim uyansın, X ara" → ajanlar aktif

---

## TELEGRAM ENTEGRASYONU
- Bildirim: trend uyarı, kritik stok, üretim gecikme
- Komut: sesli/yazılı görev verme
- Rapor: günlük trend raporu

---

## KARAR VERİLMESİ GEREKEN
1. Ajan sayısı: 8 (düşük maliyet) mı, 12 (optimum) mu?
2. AI modeli: açık kaynak (Llama/Mistral) mı, API (Gemini/Perplexity) mi?
3. Mevcut 7 ajan korunacak mı, yeniden mi yapılandırılacak?
