/**
 * src/lib/ajanlar.js
 * ─────────────────────────────────────────────────────────────────
 * CANLI KAYNAK: src/lib/agents/agentRunner.js
 *
 * Bu dosya artık yalnızca agents/ katmanına yönlendirir.
 * Yeni kodda @/lib/agents/agentRunner kullanın.
 * ─────────────────────────────────────────────────────────────────
 */
export {
    tumAjanlariCalistir,
    aktifUyarilariGetir,
    uyariCoz,
    uyariGozArd,
} from './agents/agentRunner';

// Bireysel ajanlar (doğrudan referans gerektiğinde)
export { stokAlarmAjani } from './agents/stokAgent';
export { maliyetAjani } from './agents/maliyetAgent';
export { gecikmeAjani } from './agents/gecikmeAgent';
