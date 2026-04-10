/**
 * src/lib/agents/stokAgent.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Stok Alarm Ajanı
 *
 * SORUMLULUK: Yalnızca b2_urun_katalogu tarar, düşük/sıfır
 * stok tespiti yapar ve uyarı kayıt fonksiyonuna iletir.
 * ─────────────────────────────────────────────────────────────────
 */
import { supabase } from '@/core/db/supabaseClient';
import { handleError, logCatch } from '@/lib/errorCore';
import { uyariYaz } from './agentUtils';

/**
 * b2_urun_katalogu tablosunu tarar.
 * min_stok_alarm altındaki ürünler için uyarı oluşturur.
 * @returns {{ tarandi: number, uyarilar: Array }}
 */
export async function stokAlarmAjani() {
    const sonuc = { tarandi: 0, uyarilar: [] };
    try {
        const { data: urunler } = await supabase
            .from('b2_urun_katalogu')
            .select('id, urun_adi_tr, stok_adeti, min_stok_alarm, urun_kodu')
            .eq('aktif', true)
            .not('min_stok_alarm', 'is', null);

        if (!urunler) return sonuc;
        sonuc.tarandi = urunler.length;

        for (const u of urunler) {
            if (u.stok_adeti <= u.min_stok_alarm) {
                const sifir = u.stok_adeti === 0;
                const uyari = await uyariYaz(
                    'dusuk_stok',
                    sifir ? 'kritik' : 'uyari',
                    `${sifir ? 'Stok Sıfır' : 'Düşük Stok'}: ${u.urun_adi_tr}`,
                    `${u.stok_adeti} adet | Min: ${u.min_stok_alarm} adet`,
                    'b2_urun_katalogu',
                    u.id
                );
                if (uyari) sonuc.uyarilar.push(uyari);
            }
        }
    } catch (e) {
        handleError('ERR-AJN-LB-106', 'src/lib/agents/stokAgent.js', e, 'orta');
    }
    return sonuc;
}
