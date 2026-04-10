/**
 * src/lib/agents/maliyetAgent.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Maliyet Aşımı Ajanı
 *
 * SORUMLULUK: Yalnızca b1_muhasebe_raporlari tarar.
 * %10+ aşım → uyarı, %25+ → kritik.
 * ─────────────────────────────────────────────────────────────────
 */
import { supabase } from '@/core/db/supabaseClient';
import { handleError, logCatch } from '@/lib/errorCore';
import { uyariYaz } from './agentUtils';

/**
 * @returns {{ tarandi: number, uyarilar: Array }}
 */
export async function maliyetAjani() {
    const sonuc = { tarandi: 0, uyarilar: [] };
    try {
        const { data: raporlar } = await supabase
            .from('b1_muhasebe_raporlari')
            .select('id, hedeflenen_maliyet_tl, gerceklesen_maliyet_tl, fark_tl')
            .not('hedeflenen_maliyet_tl', 'is', null)
            .neq('rapor_durumu', 'kilitlendi')
            .order('created_at', { ascending: false })
            .limit(50);

        if (!raporlar) return sonuc;
        sonuc.tarandi = raporlar.length;

        for (const r of raporlar) {
            const hedef = parseFloat(r.hedeflenen_maliyet_tl || 0);
            const fark = parseFloat(r.fark_tl || 0);
            if (hedef <= 0) continue;
            const yuzde = (fark / hedef) * 100;
            if (yuzde > 10) {
                const uyari = await uyariYaz(
                    'maliyet_asimi',
                    yuzde > 25 ? 'kritik' : 'uyari',
                    `Maliyet Aşımı: %${yuzde.toFixed(1)}`,
                    `Hedef: ₺${hedef.toFixed(0)} | Gerçek: ₺${parseFloat(r.gerceklesen_maliyet_tl).toFixed(0)} | Fark: +₺${fark.toFixed(0)}`,
                    'b1_muhasebe_raporlari',
                    r.id
                );
                if (uyari) sonuc.uyarilar.push(uyari);
            }
        }
    } catch (e) {
        handleError('ERR-AJN-LB-104', 'src/lib/agents/maliyetAgent.js', e, 'orta');
    }
    return sonuc;
}
