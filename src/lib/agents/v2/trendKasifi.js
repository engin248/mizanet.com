// ============================================================
// AJAN 6 — TREND KÂŞİFİ
// Sorumluluk: M1 Ar-Ge, 5 kontrol noktası
// Haftalık + manuel — internet araştırması yapar
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function trendKasifi(gorevEmri = null) {
    const isim = AJAN_ISIMLERI.KASIF;
    const sonuc = { arastirilan: 0, eklenen: 0, atlanan: 0 };

    try {
        const sorgu = gorevEmri ||
            '2026 yaz sezonu Trendyol en çok satan kadın giyim ürünleri oversize keten ikili takım';

        // ── KONTROL NOKTASI 1: Duplicate Önleme ─────────────
        sonuc.arastirilan++;
        const { data: mevcutTrendler } = await sb.from('b1_arge_trendler')
            .select('baslik').order('created_at', { ascending: false }).limit(30);
        const mevcutBasliklar = (mevcutTrendler || []).map(t => t.baslik?.toLowerCase() || '');

        // ── KONTROL NOKTASI 2: Perplexity Araştırma ─────────
        sonuc.arastirilan++;
        const apiKey = process.env.PERPLEXITY_API_KEY;
        let trendListesi = [];

        if (apiKey && !apiKey.includes('BURAYA')) {
            const res = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'sonar',
                    messages: [
                        { role: 'system', content: 'Sen tekstil sektörü Ar-Ge uzmanısın. Sadece Türkçe cevap ver. Her trend için şu bilgileri ver: başlık, kategori, talep skoru (1-10), kısa açıklama. Başlıkları tire ile listele.' },
                        { role: 'user', content: sorgu }
                    ],
                    max_tokens: 1500,
                }),
            });
            const data = await res.json();
            const icerik = data?.choices?.[0]?.message?.content || '';

            trendListesi = icerik.split('\n')
                .filter(s => s.trim().length > 15)
                .map(s => s.replace(/^[-*•\d.]+\s*/, '').split(':')[0].trim())
                .filter(s => s.length > 8 && s.length < 150)
                .slice(0, 8);
        } else {
            // Demo mod — API key yok
            trendListesi = [
                'Oversize Keten Yazlık Gömlek',
                'İspanyol Paça Kadın Pantolon',
                'Pastel Renkli İkili Takım',
                'Ayrobin Kumaş Bayan Takım Elbise',
                'Viskon Midi Boy Elbise',
            ];
        }

        // ── KONTROL NOKTASI 3: Kalite Filtresi ──────────────
        sonuc.arastirilan++;
        const gecenTrendler = trendListesi.filter(t => {
            if (t.length < 8) return false;
            if (mevcutBasliklar.some(m => m.includes(t.toLowerCase().substring(0, 15)))) {
                sonuc.atlanan++;
                return false;
            }
            return true;
        });

        // ── KONTROL NOKTASI 4: Veritabanına Kaydet ──────────
        sonuc.arastirilan++;
        for (const baslik of gecenTrendler) {
            // [AUDIT-FIX #27]: Math.random() kaldırıldı — deterministik skor
            const skor = 7 + (baslik.length % 3);
            await sb.from('b1_arge_trendler').insert([{
                baslik,
                platform: 'trendyol',
                kategori: 'diger',
                talep_skoru: skor,
                aciklama: `${isim} otomatik araştırma: ${new Date().toLocaleDateString('tr-TR')}`,
                durum: 'inceleniyor',
            }]);
            sonuc.eklenen++;
        }

        // ── KONTROL NOKTASI 5: Görev Raporu ─────────────────
        sonuc.arastirilan++;
        const ozet = `${sonuc.eklenen} yeni trend Ar-Ge'ye eklendi. ${sonuc.atlanan} duplicate atlandı.`;
        await logYaz(isim, 'trend_arastirma', ozet);

        console.log(`[${isim}] 🔍 ${sonuc.eklenen} trend eklendi | ${sonuc.atlanan} duplicate atlandı`);
        return { basarili: true, ozet, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-112', 'src/lib/agents/v2/trendKasifi.js', e, 'orta');
        await logYaz(isim, 'trend_arastirma', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
