/**
 * core/db/index.js
 * ─────────────────────────────────────────────────────────────────
 * core/db katmanının barrel export noktası.
 * Tüm DB erişimi bu tek noktadan geçer.
 * ─────────────────────────────────────────────────────────────────
 */
export { supabase, supabaseBagliMi } from './supabaseClient';
export { supabaseAdmin } from './supabaseAdmin';
