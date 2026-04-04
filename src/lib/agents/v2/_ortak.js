// ============================================================
// AJAN SİSTEMİ — PAYLAŞILAN ORTAK MODÜL
// Dosya: src/lib/agents/v2/_ortak.js
// Supabase bağlantısı, ajan isimleri, log ve alarm yardımcıları
// ============================================================
import { createClient } from '@supabase/supabase-js';

// [AUDIT-FIX #14]: Mock fallback kaldırıldı — ENV yoksa error log atılır.
const sbUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const sbKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
if (!sbUrl || !sbKey) {
    console.error('[KRİTİK] agents/v2: Supabase URL veya KEY tanımlı değil!');
}
export const sb = sbUrl && sbKey ? createClient(sbUrl, sbKey) : null;

// ─── AJAN İSİMLERİ KONFİGÜRASYONU ──────────────────────────
// Koordinatör istediğinde sadece bu bölümü değiştirir.
export const AJAN_ISIMLERI = {
    SABAH: 'Sabah Subayı',
    AKSAM: 'Akşamcı',
    NABIZ: 'Nabız',
    ZINCIR: 'Zincirci',
    FINANS: 'Finans Kalkanı',
    KASIF: 'Trend Kâşifi',
    MUHASEBE: 'Muhasebe Yazıcı',
};

// ─── YARDIMCI: Log yaz ───────────────────────────────────────
export async function logYaz(ajan_adi, islem_tipi, mesaj, sonuc = 'basarili', tablo = null) {
    try {
        await sb.from('b1_agent_loglari').insert([{
            ajan_adi, islem_tipi,
            kaynak_tablo: tablo,
            sonuc, mesaj,
        }]);
    } catch (e) { console.error('[Log hatası]', e.message); }
}

// ─── YARDIMCI: Alarm yaz (duplicate önleme 2 saat) ──────────
export async function alarmYaz(uyari_tipi, seviye, baslik, mesaj, kaynak_tablo = null, kaynak_id = null) {
    try {
        const ikiSaatOnce = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
        const { data: mevcut } = await sb.from('b1_sistem_uyarilari')
            .select('id')
            .eq('uyari_tipi', uyari_tipi)
            .eq('kaynak_id', kaynak_id || '00000000-0000-0000-0000-000000000000')
            .eq('durum', 'aktif')
            .gte('olusturma', ikiSaatOnce)
            .limit(1);
        if (mevcut?.length) return null;

        const { data } = await sb.from('b1_sistem_uyarilari').insert([{
            uyari_tipi, seviye, baslik, mesaj,
            kaynak_tablo, kaynak_id: kaynak_id || null,
            durum: 'aktif',
        }]).select().single();
        return data;
    } catch (e) { console.error('[Alarm hatası]', e.message); return null; }
}
