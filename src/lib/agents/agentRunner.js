/**
 * src/lib/agents/agentRunner.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Ajan Orkestratörü
 *
 * SORUMLULUK: Tüm ajanları paralel çalıştırır.
 * Her ajan bağımsız — biri çöküse diğerleri çalışmaya devam eder.
 * ─────────────────────────────────────────────────────────────────
 */
import { stokAlarmAjani } from './stokAgent';
import { maliyetAjani } from './maliyetAgent';
import { gecikmeAjani } from './gecikmeAgent';
export { aktifUyarilariGetir, uyariCoz, uyariGozArd } from './agentUtils';

/**
 * Tüm ajanları paralel çalıştırır.
 * @returns {{ stok: object, maliyet: object, gecikme: object }}
 */
export async function tumAjanlariCalistir() {
    const [stok, maliyet, gecikme] = await Promise.all([
        stokAlarmAjani(),
        maliyetAjani(),
        gecikmeAjani(),
    ]);
    return { stok, maliyet, gecikme };
}
