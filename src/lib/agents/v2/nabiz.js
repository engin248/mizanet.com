// ============================================================
// AJAN 3 — NABIZ
// Sorumluluk: 4 modül, 5 kontrol noktası
// Her 2 saatte — anlık tehlike sinyali izler
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz, alarmYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function nabiz() {
    const isim = AJAN_ISIMLERI.NABIZ;
    /** @type {{ kontrol_sayisi: number, alarmlar: any[] }} */
    const sonuc = { kontrol_sayisi: 0, alarmlar: [] };

    try {
        const bugun = new Date().toISOString().split('T')[0];
        const ikiSaatOnce = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

        // ── KONTROL NOKTASI 1: Stok Alarmı ─────────────────
        sonuc.kontrol_sayisi++;
        const { data: kritikStok } = await sb.from('b2_urun_katalogu')
            .select('id, urun_adi_tr, stok_adeti, min_stok_alarm')
            .eq('aktif', true)
            .not('min_stok_alarm', 'is', null);
        for (const u of (kritikStok || [])) {
            if (u.stok_adeti <= u.min_stok_alarm) {
                const alarm = await alarmYaz(
                    'dusuk_stok',
                    u.stok_adeti === 0 ? 'kritik' : 'uyari',
                    `${u.stok_adeti === 0 ? 'Stok Sıfır' : 'Düşük Stok'}: ${u.urun_adi_tr}`,
                    `${u.stok_adeti} adet | Min: ${u.min_stok_alarm}`,
                    'b2_urun_katalogu', u.id
                );
                if (alarm) sonuc.alarmlar.push(alarm);
            }
        }

        // ── KONTROL NOKTASI 2: Maliyet Aşımı ───────────────
        sonuc.kontrol_sayisi++;
        const { data: maliyetler } = await sb.from('b1_muhasebe_raporlari')
            .select('id, hedeflenen_maliyet_tl, gerceklesen_maliyet_tl, fark_tl')
            .not('hedeflenen_maliyet_tl', 'is', null)
            .neq('rapor_durumu', 'kilitlendi')
            .order('created_at', { ascending: false })
            .limit(5);
        for (const r of (maliyetler || [])) {
            const hedef = parseFloat(r.hedeflenen_maliyet_tl || 0);
            const fark = parseFloat(r.fark_tl || 0);
            if (hedef > 0 && (fark / hedef) * 100 > 15) {
                await alarmYaz('maliyet_asimi', fark / hedef > 0.25 ? 'kritik' : 'uyari',
                    `Maliyet Aşımı: %${((fark / hedef) * 100).toFixed(1)}`,
                    `Hedef: ₺${hedef.toFixed(0)} | Fark: +₺${fark.toFixed(0)}`,
                    'b1_muhasebe_raporlari', r.id
                );
            }
        }

        // ── KONTROL NOKTASI 3: Üretim Durdu mu? ─────────────
        sonuc.kontrol_sayisi++;
        const { data: sonHareket } = await sb.from('b1_agent_loglari')
            .select('created_at')
            .ilike('ajan_adi', '%Zincirci%')
            .order('created_at', { ascending: false })
            .limit(1);
        if (sonHareket?.length) {
            const gecenSure = Date.now() - new Date(sonHareket[0].created_at);
            if (gecenSure > 4 * 60 * 60 * 1000) {
                await alarmYaz('diger', 'uyari', 'Üretim Zinciri 4 Saattir Hareketsiz',
                    'Zincirci ajanında hareket tespit edilmedi', 'b1_agent_loglari');
            }
        }

        // ── KONTROL NOKTASI 4: Vadesi Geçen Ödemeler ────────
        sonuc.kontrol_sayisi++;
        const { data: vadeli } = await sb.from('b2_kasa_hareketleri')
            .select('id, tutar')
            .eq('hareket_tipi', 'borc')
            .eq('odendi', false)
            .lt('vade_tarihi', bugun)
            .limit(1);
        if (vadeli && vadeli.length > 0) {
            await alarmYaz('diger', 'uyari', 'Vadesi Geçmiş Borç Var',
                `${vadeli.length} ödeme gecikmiş`, 'b2_kasa_hareketleri');
        }

        // ── KONTROL NOKTASI 5: Kritik Stok Erken Uyarı ──────
        sonuc.kontrol_sayisi++;
        const { data: yaklasanStok } = await sb.from('b2_urun_katalogu')
            .select('id, urun_adi_tr, stok_adeti, min_stok_alarm')
            .eq('aktif', true)
            .not('min_stok_alarm', 'is', null);
        const yaklasanlar = (yaklasanStok || []).filter(u =>
            u.stok_adeti > u.min_stok_alarm && u.stok_adeti <= u.min_stok_alarm * 1.5
        );
        if (yaklasanlar.length > 0) {
            sonuc.alarmlar.push({ tip: 'yaklaşan_stok_alarm', sayi: yaklasanlar.length });
        }

        console.log(`[${isim}] 💓 ${sonuc.kontrol_sayisi} kontrol | ${sonuc.alarmlar.length} yeni alarm`);
        return { basarili: true, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-110', 'src/lib/agents/v2/nabiz.js', e, 'orta');
        await logYaz(isim, 'nabiz_kontrol', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
