import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/core/db/supabaseAdmin';
import { mesajSifrele } from '@/lib/kripto';
import { handleError } from '@/lib/errorCore';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            gonderen_rutbe, hedef_oda, mesaj_metni,
            konu, oncelik, tip, urun_id, urun_kodu, urun_adi, gonderen_adi
        } = body;

        if (!gonderen_rutbe || !hedef_oda || !mesaj_metni) {
            return NextResponse.json({ error: 'Eksik parametre (Rütbe, Oda veya Mesaj metni yok)' }, { status: 400 });
        }

        // AES-256-GCM ŞİFRELEME (Server-side Master Key ile)
        const sifreliPaket = mesajSifrele(mesaj_metni);
        if (!sifreliPaket || typeof sifreliPaket === 'string') {
            return NextResponse.json({ error: 'SİBER KRİPTO HATASI: Şifreleme paket yapısı bozuk' }, { status: 500 });
        }

        const { data, error } = await supabaseAdmin
            .from('b1_askeri_haberlesme')
            .insert([{
                gonderen_rutbe,
                hedef_oda,
                sifreli_mesaj: sifreliPaket.encrypted,
                iv_vektoru: sifreliPaket.iv,
                auth_tag: sifreliPaket.authTag,

                okundu_mu: false,
                konu: konu || null,
                oncelik: oncelik || 'normal',
                tip: tip || 'bilgi',
                urun_id: urun_id || null,
                urun_kodu: urun_kodu || null,
                urun_adi: urun_adi || null,
                gonderen_adi: gonderen_adi || gonderen_rutbe
            }]);

        if (error) {
            handleError('ERR-HBR-RT-002', 'api/haberlesme/gonder/db-insert', error, 'yuksek', { tablo: 'b1_askeri_haberlesme' });
            // KURAL 9: HATA VARSA SİSTEM DURUR (Gerçek hata döner)
            return NextResponse.json({ error: `Veritabanı Yazma Hatası: ${error.message}` }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: 'Emir uçtan uca şifrelendi ve Karargâh mühürüyle hedefe iletildi.',
            info: { gonderen: gonderen_rutbe, hedef: hedef_oda }
        });
    } catch (e) {
        handleError('ERR-HBR-RT-001', 'api/haberlesme/gonder', e, 'yuksek', { tablo: 'b1_askeri_haberlesme' });
        return NextResponse.json({ error: `SİSTEM HATASI: ${e.message}` }, { status: 500 });
    }
}

