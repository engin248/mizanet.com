/**
 * core/db/supabaseClient.js
 * Hata Kodu: ERR-SYS-CR-001
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Tek Doğruluk Kaynağı: Supabase Client
 *
 * KURAL: Bu dosya YALNIZCA Supabase bağlantısını oluşturur.
 * Sorgulama, iş mantığı, transformasyon buraya GIREMEZ.
 *
 * Mimaride bu dosya: core/db katmanının tek giriş noktasıdır.
 * Tüm feature servisler, hook'lar ve API route'lar bu dosyadan
 * import yapar — hiçbiri doğrudan @supabase/supabase-js çağırmaz.
 * ─────────────────────────────────────────────────────────────────
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// ── MİMARİ ZİRHI: Sessiz başarısızlık engellendi ─────────────────
// ENV eksikse sistem açıkça duyurur, sessizce sahte bağlantıyla
// devam etmez. Kör uçuş (veri yazılmıyor sanılan başarı) önlenir.
if (!supabaseUrl || !supabaseKey) {
    if (typeof window === 'undefined') {
        console.error(
            '[ERR-SYS-CR-001] NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY eksik!\n' +
            'Vercel Dashboard → Settings → Environment Variables kısmına ekleyin.\n' +
            'Tüm veritabanı işlemleri başarısız olacak.'
        );
    }
}

/** Genel kullanım (client-side + server-side API route) */
export const supabase = createClient(
    supabaseUrl || 'https://placeholder-mimari-alarm.supabase.co',
    supabaseKey || 'placeholder-key-set-env-variables'
);

/** Bağlantı sağlık kontrolü (UI guard için) */
export const supabaseBagliMi = !!(
    supabaseUrl &&
    supabaseKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseKey.includes('placeholder')
);
