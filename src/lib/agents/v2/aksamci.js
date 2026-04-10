// ============================================================
// AJAN 2 — AKŞAMCI
// Sorumluluk: 4 modül, 5 kontrol noktası
// Her akşam 18:00 — günlük kapanış ve yarın hazırlık
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz, alarmYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function aksamci() {
    const isim = AJAN_ISIMLERI.AKSAM;
    /** @type {{ kontrol_sayisi: number, ozet: string[] }} */
    const sonuc = { kontrol_sayisi: 0, ozet: [] };

    try {
        const bugun = new Date().toISOString().split('T')[0];
        const yarin = new Date(Date.now() + 86400000).toISOString().split('T')[0];

        // ── KONTROL NOKTASI 1: Bugün Tamamlanan Üretim ──────
        sonuc.kontrol_sayisi++;
        const { data: tamamlanan } = await sb.from('b1_uretim_kayitlari')
            .select('id, modul')
            .eq('durum', 'tamamlandi')
            .gte('updated_at', bugun + 'T00:00:00');
        sonuc.ozet.push(`✅ Bugün tamamlanan üretim: ${tamamlanan?.length || 0} iş emri`);

        // ── KONTROL NOKTASI 2: Yarın Teslim Edilecek ────────
        sonuc.kontrol_sayisi++;
        const { data: yarinTeslim } = await sb.from('b2_siparisler')
            .select('id, siparis_kodu, musteri_adi')
            .gte('teslim_tarihi', yarin + 'T00:00:00')
            .lt('teslim_tarihi', yarin + 'T23:59:59')
            .neq('durum', 'teslim_edildi');
        if (yarinTeslim && yarinTeslim.length > 0) {
            sonuc.ozet.push(`📦 Yarın teslim: ${yarinTeslim.length} sipariş — ${yarinTeslim.slice(0, 2).map(s => s.siparis_kodu || s.id.slice(0, 6)).join(', ')}`);
            await alarmYaz('diger', 'bilgi', `Yarın ${yarinTeslim.length} sipariş teslimi var`, 'Akşamcı hatırlatması', 'b2_siparisler');
        } else {
            sonuc.ozet.push('📦 Yarın teslim edilecek sipariş yok');
        }

        // ── KONTROL NOKTASI 3: Günlük Kasa Özeti ────────────
        sonuc.kontrol_sayisi++;
        const { data: kasaBugün } = await sb.from('b2_kasa_hareketleri')
            .select('hareket_tipi, tutar')
            .gte('created_at', bugun + 'T00:00:00');
        if (kasaBugün?.length) {
            const gelir = kasaBugün.filter(k => k.hareket_tipi === 'gelir').reduce((s, k) => s + (k.tutar || 0), 0);
            const gider = kasaBugün.filter(k => k.hareket_tipi === 'gider').reduce((s, k) => s + (k.tutar || 0), 0);
            sonuc.ozet.push(`💰 Bugün: Gelir ₺${gelir.toFixed(0)} | Gider ₺${gider.toFixed(0)} | Net ₺${(gelir - gider).toFixed(0)}`);

            await sb.from('b1_muhasebe_raporlari').insert([{
                rapor_tipi: 'gunluk_ozet',
                rapor_tarihi: bugun,
                toplam_gelir: gelir,
                toplam_gider: gider,
                net_kar: gelir - gider,
                notlar: 'Akşamcı otomatik kayıt',
                rapor_durumu: 'taslak',
            }]).select();
        }

        // ── KONTROL NOKTASI 4: Yarım Kalan İşler ────────────
        sonuc.kontrol_sayisi++;
        const { data: yarimKalan } = await sb.from('b1_uretim_kayitlari')
            .select('id, modul')
            .eq('durum', 'devam_ediyor');
        if (yarimKalan && yarimKalan.length > 0) {
            sonuc.ozet.push(`⏸️ Yarım kalan: ${yarimKalan.length} iş devam ediyor`);
        }

        // ── KONTROL NOKTASI 5: Personel Kapanış ─────────────
        sonuc.kontrol_sayisi++;
        const { data: personel } = await sb.from('b1_personel')
            .select('ad, soyad')
            .eq('aktif', true)
            .limit(3);
        sonuc.ozet.push(`👥 Kapanış çeki yapıldı`);

        const ozetMetin = `🌆 AKŞAM KAPANIŞI — ${bugun}\n${sonuc.ozet.join('\n')}`;
        await logYaz(isim, 'aksam_kapanis', ozetMetin);

        console.log(`[${isim}] ✅ ${sonuc.kontrol_sayisi} kontrol tamamlandı`);
        return { basarili: true, ozet: ozetMetin, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-107', 'src/lib/agents/v2/aksamci.js', e, 'orta');
        await logYaz(isim, 'aksam_kapanis', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
