import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/core/db/supabaseAdmin';
import { mesajCoz } from '@/lib/kripto';
import { handleError } from '@/lib/errorCore';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const hedef_oda = searchParams.get('oda');

        if (!hedef_oda) {
            return NextResponse.json({ error: 'Oda bilgisi eksik (Karargâh bağlantısı kurulamadı)' }, { status: 400 });
        }

        // Sadece Hedef Odaya veya Genel Karargaha ait (veya odanın gönderdiği) mesajları çek
        const { data, error } = await supabaseAdmin
            .from('b1_askeri_haberlesme')
            .select('*')
            .or(`hedef_oda.eq.${hedef_oda},gonderen_rutbe.eq.${hedef_oda},hedef_oda.eq.hepsi`)
            .order('created_at', { ascending: true })
            .limit(100);

        if (error) {
            handleError('ERR-HBR-RT-004', 'api/haberlesme/oku/db-select', error, 'yuksek', { tablo: 'b1_askeri_haberlesme' });
            return NextResponse.json({ error: `Veri çekme hatası: ${error.message}` }, { status: 500 });
        }

        if (!data || data.length === 0) return NextResponse.json({ mesajlar: [] });

        // Veritabanındaki şifreli (Hex) paketleri çöz
        const cozulmusMesajlar = data.map(msg => {
            const orjinal = mesajCoz(msg.sifreli_mesaj, msg.iv_vektoru, msg.auth_tag);
            return {
                id: msg.id,
                gonderen_rutbe: msg.gonderen_rutbe,
                gonderen_adi: msg.gonderen_adi || msg.gonderen_rutbe,
                hedef: msg.hedef_oda,
                konu: msg.konu,
                oncelik: msg.oncelik,
                tip: msg.tip,
                urun_kodu: msg.urun_kodu,
                urun_adi: msg.urun_adi,
                metin: orjinal,
                tarih: new Date(msg.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
                created_at: msg.created_at
            };
        });

        return NextResponse.json({ mesajlar: cozulmusMesajlar });
    } catch (e) {
        handleError('ERR-HBR-RT-003', 'api/haberlesme/oku', e, 'yuksek', { tablo: 'b1_askeri_haberlesme' });
        return NextResponse.json({ error: `OKUMA HATASI: ${e.message}` }, { status: 500 });
    }
}

