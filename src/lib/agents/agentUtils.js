/**
 * src/lib/agents/agentUtils.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Ajan Yardımcı Fonksiyonları
 *
 * SORUMLULUK: Uyarı yazma, uyarı okuma, uyarı durumu güncelleme.
 * Tüm ajanlar bu modülü kullanır — kod tekrarı sıfır.
 * ─────────────────────────────────────────────────────────────────
 */
import { supabase } from '@/core/db/supabaseClient';

/**
 * Uyarı yazar. Son 2 saatte aynı kaynak için tekrar yazmaz.
 */
export async function uyariYaz(uyari_tipi, seviye, baslik, mesaj, kaynak_tablo, kaynak_id) {
    const ikiSaatOnce = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const { data: var_ } = await supabase
        .from('b1_sistem_uyarilari')
        .select('id')
        .eq('uyari_tipi', uyari_tipi)
        .eq('kaynak_id', kaynak_id || '00000000-0000-0000-0000-000000000000')
        .eq('durum', 'aktif')
        .gte('olusturma', ikiSaatOnce)
        .limit(1);

    if (var_?.length > 0) return null;

    const { data } = await supabase.from('b1_sistem_uyarilari').insert([{
        uyari_tipi, seviye, baslik, mesaj,
        kaynak_tablo,
        kaynak_id: kaynak_id || null,
        durum: 'aktif',
    }]).select().single();

    await supabase.from('b1_agent_loglari').insert([{
        ajan_adi: 'Sistem Ajani',
        islem_tipi: uyari_tipi,
        kaynak_tablo,
        kaynak_id: kaynak_id || null,
        sonuc: 'basarili',
        mesaj: baslik,
    }]);

    return data;
}

/** Aktif uyarıları getirir */
export async function aktifUyarilariGetir(limit = 100) {
    const { data } = await supabase
        .from('b1_sistem_uyarilari')
        .select('*')
        .eq('durum', 'aktif')
        .order('olusturma', { ascending: false })
        .limit(limit);
    return data || [];
}

/** Uyarıyı çözüldü olarak işaretler */
export async function uyariCoz(id) {
    await supabase.from('b1_sistem_uyarilari')
        .update({ durum: 'cozuldu', cozum_tarihi: new Date().toISOString() })
        .eq('id', id);
}

/** Uyarıyı göz ardı eder */
export async function uyariGozArd(id) {
    await supabase.from('b1_sistem_uyarilari')
        .update({ durum: 'goz_ardi' })
        .eq('id', id);
}
