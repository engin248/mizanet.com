import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/core/db/supabaseAdmin';
import { rateLimitKontrol } from '@/lib/rateLimit';
import { musteriSchema, veriDogrula } from '@/lib/zodSchemas';
import { hataBildir } from '@/lib/hataBildirim';
import { handleError } from '@/lib/errorCore';

// ─── POST /api/musteri-ekle ────────────────────────────────────
export async function POST(request) {
    try {
        const ip = (request.headers.get('x-forwarded-for') || 'bilinmeyen').split(',')[0].trim();
        if (!rateLimitKontrol(ip, 10, 60)) {
            return NextResponse.json({ hata: 'Çok fazla istek.' }, { status: 429 });
        }

        const body = await request.json();

        const dogrulama = veriDogrula(musteriSchema, {
            musteri_kodu: body.musteri_kodu,
            ad_soyad: body.ad_soyad,
            telefon: body.telefon || null,
            email: body.email || null,
            adres: body.adres || null,
            musteri_tipi: body.musteri_tipi || 'bireysel',
            aktif: body.aktif !== false,
            notlar: body.notlar || null,
        });

        if (!dogrulama.basarili) {
            return NextResponse.json({ hata: 'Veri doğrulama hatası', detay: dogrulama.error }, { status: 422 });
        }

        // Mükerrer müşteri kodu
        const { data: mevcut } = await supabaseAdmin
            .from('b2_musteriler').select('id').eq('musteri_kodu', dogrulama.data.musteri_kodu);
        if (mevcut && mevcut.length > 0) {
            return NextResponse.json({ hata: 'Bu müşteri kodu zaten kayıtlı!' }, { status: 409 });
        }

        const { data, error } = await supabaseAdmin
            .from('b2_musteriler').insert([dogrulama.data]).select();
        if (error) throw error;

        return NextResponse.json({ basarili: true, musteri: data?.[0] }, { status: 201 });

    } catch (error) {
        handleError('ERR-MST-RT-001', 'api/musteri-ekle', error, 'yuksek', { tablo: 'b2_musteriler' });
        await hataBildir('/api/musteri-ekle', error);
        return NextResponse.json({ hata: 'Sunucu hatası: ' + error.message }, { status: 500 });
    }
}
