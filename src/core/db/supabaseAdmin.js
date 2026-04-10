/**
 * core/db/supabaseAdmin.js
 * Hata Kodu: ERR-SYS-CR-001
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Service Role Client (Sunucu Tarafı ONLY)
 *
 * KURAL: Bu client ASLA client-side kodda kullanılamaz.
 * Yalnızca: API route'lar, cron görevler, ajan motorları.
 *
 * Service Role → RLS bypass → tam tablo erişimi.
 * Yanlış kullanım → güvenlik delikleri.
 * ─────────────────────────────────────────────────────────────────
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!supabaseUrl || !serviceRoleKey) {
    console.error(
        '[ERR-SYS-CR-001] SUPABASE_SERVICE_ROLE_KEY veya SUPABASE_URL eksik!\n' +
        'Service Role gerektiren tüm işlemler (ajan, cron, admin) başarısız olacak.\n' +
        'Vercel Dashboard → Settings → Environment Variables düzeltilmeli.'
    );
}

/** Service Role client — sadece sunucu tarafında kullan */
export const supabaseAdmin = createClient(
    supabaseUrl || 'https://placeholder-mimari-alarm.supabase.co',
    serviceRoleKey || 'placeholder-service-role-key-set-env',
    {
        auth: { autoRefreshToken: false, persistSession: false }
    }
);
