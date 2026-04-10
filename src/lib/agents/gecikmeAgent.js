/**
 * src/lib/agents/gecikmeAgent.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Gecikmiş İş Emri Ajanı
 *
 * SORUMLULUK: Yalnızca production_orders tarar,
 * gecikmiş iş emirleri için uyarı oluşturur.
 * ─────────────────────────────────────────────────────────────────
 */
import { fetchGecikmiIsEmirleri } from '@/features/uretim/services/uretimApi';
import { handleError, logCatch } from '@/lib/errorCore';
import { uyariYaz } from './agentUtils';

/**
 * @returns {{ tarandi: number, uyarilar: Array }}
 */
export async function gecikmeAjani() {
    const sonuc = { tarandi: 0, uyarilar: [] };
    try {
        const emirler = await fetchGecikmiIsEmirleri();
        if (!emirler || emirler.length === 0) return sonuc;
        sonuc.tarandi = emirler.length;

        for (const e of emirler) {
            const gun = Math.floor((Date.now() - new Date(e.planned_end_date)) / 86400000);
            const model = e.b1_model_taslaklari?.model_kodu || '?';
            const uyari = await uyariYaz(
                'diger',
                gun > 7 ? 'kritik' : 'uyari',
                `Gecikme: ${model} — ${gun} gün`,
                `Hedef bitiş: ${e.planned_end_date} | Durum: ${e.status} | Adet: ${e.quantity}`,
                'production_orders',
                e.id
            );
            if (uyari) sonuc.uyarilar.push(uyari);
        }
    } catch (e) {
        handleError('ERR-AJN-LB-103', 'src/lib/agents/gecikmeAgent.js', e, 'orta');
    }
    return sonuc;
}
