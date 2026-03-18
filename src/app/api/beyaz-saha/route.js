import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// AR-GE Ajanlarının Gerçek Importları (Local/VPS Ortamında Çalışır)
// Uyarı: Vercel üzerinde Playwright Chromium barındırmadığı için, 
// Vercel'e deploy edildiğinde bu fonksiyonlar çöker. 
// Gerçek prodüksiyonda bu botları ayrı bir Node.js mikro-servisinde (VPS) çalıştırmalıyız.
import { bot3GoogleTalepAjani } from '../../../../arge_ajanlari/talep_google';
import { bot4MetaReklamAjani } from '../../../../arge_ajanlari/reklam_meta';
import { bot5MerkeziSorguHakemi } from '../../../../arge_ajanlari/filtre_suzgec';

export async function POST(req) {
    try {
        const body = await req.json();
        const { hedefParametre } = body;

        const hedef = hedefParametre || 'Genel Saha Taraması';

        // 1. Ekranları Beslemek İçin Log Başlangıcı
        await supabaseAdmin.from('b1_agent_loglari').insert([{
            ajan_adi: 'BEYAZ_SAHA_ORKESTRATOR',
            islem_tipi: 'TETIKLENDI',
            mesaj: `Hedef "${hedef}" için Ajanlar (Bot 3, Bot 4, Bot 5) cehenneme sürülüyor...`,
            sonuc: 'bekliyor'
        }]);

        // UYARI: Vercel'de zaman aşımını (timeout) önlemek için işlemi arka plana itiyoruz.
        // Aslında tam çözüm ayrı sunucudur, şu an yerel/geliştirme ortamı için zinciri tetikliyoruz.
        async function runAjanZinciri() {
            try {
                // Adım 1: Perplexity ve Google Trends Makro Taraması
                await supabaseAdmin.from('b1_agent_loglari').insert([{
                    ajan_adi: 'BOT 3: GOOGLE',
                    islem_tipi: 'TETIKLENDI',
                    mesaj: `Hedef aranıyor: ${hedef}`,
                    sonuc: 'bekliyor'
                }]);
                await bot3GoogleTalepAjani(hedef);

                // Adım 2: Meta Reklam Sıçraması (Organiklik) Taraması
                await supabaseAdmin.from('b1_agent_loglari').insert([{
                    ajan_adi: 'BOT 4: META',
                    islem_tipi: 'TETIKLENDI',
                    mesaj: `Reklam kütüphanesine dalındı: ${hedef}`,
                    sonuc: 'bekliyor'
                }]);
                await bot4MetaReklamAjani(hedef);

                // Adım 3: Merkezi Yargıç (Hermania) Karar Versin
                await supabaseAdmin.from('b1_agent_loglari').insert([{
                    ajan_adi: 'BOT 5: HERMANIA',
                    islem_tipi: 'TETIKLENDI',
                    mesaj: `Ajanların topladığı veriler ${hedef} için yargılanıyor...`,
                    sonuc: 'bekliyor'
                }]);
                await bot5MerkeziSorguHakemi(hedef);

            } catch (err) {
                console.error("Ajan Zinciri Çöktü:", err);
                await supabaseAdmin.from('b1_agent_loglari').insert([{
                    ajan_adi: 'BEYAZ_SAHA_ORKESTRATOR',
                    islem_tipi: 'ZİNCİR_KIRILDI',
                    mesaj: `Ajanlar ${hedef} görevinde ağır yara aldı: ${err.message}`,
                    sonuc: 'hata'
                }]);
            }
        }

        // Zinciri asenkron başlat, arayüzü (15sn limitinde) kilitli bırakma
        // Next.js development serverında bu çalışmaya devam eder.
        runAjanZinciri();

        return NextResponse.json({
            success: true,
            mesaj: `Siber Ordu "${hedef}" için sahaya sürüldü. Karargah radarını (Ajan Logları) izleyin.`,
        });

    } catch (error) {
        // Çökme durumunda kırmızı uyarı
        await supabaseAdmin.from('b1_agent_loglari').insert([{
            ajan_adi: 'BEYAZ_SAHA_ORKESTRATOR',
            islem_tipi: 'FATAL_ERROR',
            mesaj: `Orkestratör çöktü: ${error.message}`,
            sonuc: 'hata'
        }]);

        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
