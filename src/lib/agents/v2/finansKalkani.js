// ============================================================
// AJAN 5 — FİNANS KALKANI
// Sorumluluk: 3 modül (Maliyet, Kasa, Muhasebe), 6 kontrol
// Eşik aşımında tetiklenir — parayı korur
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz, alarmYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function finansKalkani() {
    const isim = AJAN_ISIMLERI.FINANS;
    /** @type {{ kontrol_sayisi: number, alarmlar: any[] }} */
    const sonuc = { kontrol_sayisi: 0, alarmlar: [] };

    try {
        const bugun = new Date().toISOString().split('T')[0];
        const otuzGunOnce = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];

        // ── KONTROL NOKTASI 1: Maliyet Aşımları ─────────────
        sonuc.kontrol_sayisi++;
        const { data: maliyetler } = await sb.from('b1_muhasebe_raporlari')
            .select('id, hedeflenen_maliyet_tl, gerceklesen_maliyet_tl, fark_tl')
            .not('hedeflenen_maliyet_tl', 'is', null)
            .not('gerceklesen_maliyet_tl', 'is', null)
            .order('created_at', { ascending: false }).limit(20);
        for (const r of (maliyetler || [])) {
            const hedef = parseFloat(r.hedeflenen_maliyet_tl || 0);
            const gercek = parseFloat(r.gerceklesen_maliyet_tl || 0);
            if (hedef <= 0) continue;
            const yuzde = ((gercek - hedef) / hedef) * 100;
            if (yuzde > 15) {
                const a = await alarmYaz('maliyet_asimi', yuzde > 25 ? 'kritik' : 'uyari',
                    `Maliyet Aşımı %${yuzde.toFixed(1)}`,
                    `Hedef ₺${hedef.toFixed(0)} → Gerçek ₺${gercek.toFixed(0)} → Fark +₺${(gercek - hedef).toFixed(0)}`,
                    'b1_muhasebe_raporlari', r.id);
                if (a) sonuc.alarmlar.push(a);
            }
        }

        // ── KONTROL NOKTASI 2: Vadesi Geçen Alacaklar ─────── (PASİF)
        // sonuc.kontrol_sayisi++;
        // ... (pasif — gelecekte aktif edilecek)

        // ── KONTROL NOKTASI 3: Kasa Kritik Seviye ─────────── (PASİF)
        // sonuc.kontrol_sayisi++;
        // ... (pasif — gelecekte aktif edilecek)

        // ── KONTROL NOKTASI 4: Aylık Gider Artışı ───────────
        sonuc.kontrol_sayisi++;
        const { data: giderlerBu } = await sb.from('b2_kasa_hareketleri')
            .select('tutar').eq('hareket_tipi', 'gider')
            .gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString());
        const { data: giderlerOnce } = await sb.from('b2_kasa_hareketleri')
            .select('tutar').eq('hareket_tipi', 'gider')
            .gte('created_at', new Date(Date.now() - 60 * 86400000).toISOString())
            .lt('created_at', new Date(Date.now() - 30 * 86400000).toISOString());
        const buAy = (giderlerBu || []).reduce((s, g) => s + (g.tutar || 0), 0);
        const oncekiAy = (giderlerOnce || []).reduce((s, g) => s + (g.tutar || 0), 0);
        if (oncekiAy > 0 && buAy > oncekiAy * 1.2) {
            await alarmYaz('diger', 'uyari',
                `Gider Artışı %${(((buAy - oncekiAy) / oncekiAy) * 100).toFixed(0)}`,
                `Bu ay ₺${buAy.toFixed(0)} | Önceki ay ₺${oncekiAy.toFixed(0)}`, 'b2_kasa_hareketleri');
        }

        // ── KONTROL NOKTASI 5: Net Kâr Marjı ────────────────
        sonuc.kontrol_sayisi++;
        const { data: tumHareketler } = await sb.from('b2_kasa_hareketleri')
            .select('hareket_tipi, tutar')
            .gte('created_at', new Date(Date.now() - 30 * 86400000).toISOString());
        if (tumHareketler?.length) {
            const gelir = tumHareketler.filter(k => k.hareket_tipi === 'gelir').reduce((s, k) => s + k.tutar, 0);
            const gider = tumHareketler.filter(k => k.hareket_tipi === 'gider').reduce((s, k) => s + k.tutar, 0);
            if (gelir > 0) {
                const marj = ((gelir - gider) / gelir) * 100;
                if (marj < 10) {
                    await alarmYaz('diger', 'uyari',
                        `Net Kâr Marjı Düşük: %${marj.toFixed(1)}`,
                        `Aylık gelir ₺${gelir.toFixed(0)} | Gider ₺${gider.toFixed(0)}`, 'b2_kasa_hareketleri');
                }
            }
        }

        // ── KONTROL NOKTASI 6: Gelecek Ödemeler ───────────── (PASİF)
        // ... (pasif — gelecekte aktif edilecek)

        await logYaz(isim, 'finans_kontrol',
            `${sonuc.kontrol_sayisi} kontrol | ${sonuc.alarmlar.length} yeni alarm`);
        console.log(`[${isim}] 🛡️ ${sonuc.kontrol_sayisi} kontrol | ${sonuc.alarmlar.length} alarm`);
        return { basarili: true, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-108', 'src/lib/agents/v2/finansKalkani.js', e, 'orta');
        await logYaz(isim, 'finans_kontrol', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
