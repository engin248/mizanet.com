// ============================================================
// AJAN 4 — ZİNCİRCİ
// Sorumluluk: M1–M8 tüm üretim zinciri, 8 kontrol noktası
// Olay bazlı tetiklenir — her modül geçişinde devreye girer
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function zincirci(tetikleyenModul = null, tetikleyenId = null) {
    const isim = AJAN_ISIMLERI.ZINCIR;
    /** @type {{ islenenler: number, gecisler: string[] }} */
    const sonuc = { islenenler: 0, gecisler: [] };

    try {

        // ── KONTROL NOKTASI 1: Yeni Onaylanan Trendler (M1→M2) ─
        sonuc.islenenler++;
        const { data: yeniTrendler } = await sb.from('b1_arge_trendler')
            .select('id, baslik, kategori')
            .eq('durum', 'onaylandi')
            .is('zincir_bildirim_m2', null)
            .limit(5);
        for (const t of (yeniTrendler || [])) {
            await sb.from('b1_sistem_uyarilari').insert([{
                uyari_tipi: 'diger', seviye: 'bilgi',
                baslik: `Yeni Trend Ar-Ge'den Onaylandı: ${t.baslik}`,
                mesaj: `Kumaş seçimi yapılması gerekiyor. Kategori: ${t.kategori || '-'}`,
                kaynak_tablo: 'b1_arge_trendler', kaynak_id: t.id, durum: 'aktif',
            }]);
            await sb.from('b1_arge_trendler').update({ zincir_bildirim_m2: new Date().toISOString() }).eq('id', t.id);
            sonuc.gecisler.push(`M1→M2: ${t.baslik}`);
            await logYaz(isim, 'zincir_m1_m2', `${t.baslik} → Kumaş aşamasına bildirildi`);
        }

        // ── KONTROL NOKTASI 2: Kumaş Seçilenleri Kalıba (M2→M3) ─
        sonuc.islenenler++;
        const { data: kumasSecilen } = await sb.from('b1_kumas_arsiv')
            .select('id, kumas_adi, model_id')
            .eq('durum', 'model_icin_secildi')
            .is('zincir_bildirim_m3', null)
            .limit(5);
        for (const k of (kumasSecilen || [])) {
            await sb.from('b1_sistem_uyarilari').insert([{
                uyari_tipi: 'diger', seviye: 'bilgi',
                baslik: `Kumaş Seçildi: ${k.kumas_adi}`,
                mesaj: `Kalıp çıkarılması gerekiyor.`,
                kaynak_tablo: 'b1_kumas_arsiv', kaynak_id: k.id, durum: 'aktif',
            }]);
            await sb.from('b1_kumas_arsiv').update({ zincir_bildirim_m3: new Date().toISOString() }).eq('id', k.id);
            sonuc.gecisler.push(`M2→M3: ${k.kumas_adi}`);
        }

        // ── KONTROL NOKTASI 3: Kalıp→Modelhane (M3→M4) ─────────
        sonuc.islenenler++;
        const { data: kalipHazir } = await sb.from('b1_model_taslaklari')
            .select('id, model_adi, durum')
            .eq('durum', 'kalip_tamamlandi')
            .is('zincir_bildirim_m4', null)
            .limit(5);
        for (const k of (kalipHazir || [])) {
            await sb.from('b1_sistem_uyarilari').insert([{
                uyari_tipi: 'diger', seviye: 'bilgi',
                baslik: `Kalıp Hazır: ${k.model_adi}`,
                mesaj: `Modelhane numune dikimini başlatabilir.`,
                kaynak_tablo: 'b1_model_taslaklari', kaynak_id: k.id, durum: 'aktif',
            }]);
            await sb.from('b1_model_taslaklari').update({ zincir_bildirim_m4: new Date().toISOString() }).eq('id', k.id);
            sonuc.gecisler.push(`M3→M4: ${k.model_adi}`);
        }

        // ── KONTROL NOKTASI 4: Modelhane→Kesim (M4→M5) ─────────
        sonuc.islenenler++;
        const { data: numuneOnay } = await sb.from('b1_modelhane_kayitlari')
            .select('id, model_id, adim_adi')
            .eq('numune_onaylandi', true)
            .is('zincir_bildirim_m5', null)
            .limit(5);
        for (const n of (numuneOnay || [])) {
            await sb.from('b1_sistem_uyarilari').insert([{
                uyari_tipi: 'diger', seviye: 'bilgi',
                baslik: `Numune Onaylandı`,
                mesaj: `Kesim emri oluşturulabilir.`,
                kaynak_tablo: 'b1_modelhane_kayitlari', kaynak_id: n.id, durum: 'aktif',
            }]);
            await sb.from('b1_modelhane_kayitlari').update({ zincir_bildirim_m5: new Date().toISOString() }).eq('id', n.id);
            sonuc.gecisler.push(`M4→M5: Numune onaylı`);
        }

        // ── KONTROL NOKTASI 5: Kesim→Üretim (M5→M6) ────────────
        sonuc.islenenler++;
        const { data: kesimBitti } = await sb.from('b1_kesim_emirleri')
            .select('id, model_id, adet')
            .eq('durum', 'tamamlandi')
            .is('zincir_bildirim_m6', null)
            .limit(5);
        for (const k of (kesimBitti || [])) {
            await sb.from('b1_sistem_uyarilari').insert([{
                uyari_tipi: 'diger', seviye: 'bilgi',
                baslik: `Kesim Tamamlandı — ${k.adet} adet`,
                mesaj: `Üretim bandına alınabilir.`,
                kaynak_tablo: 'b1_kesim_emirleri', kaynak_id: k.id, durum: 'aktif',
            }]);
            await sb.from('b1_kesim_emirleri').update({ zincir_bildirim_m6: new Date().toISOString() }).eq('id', k.id);
            sonuc.gecisler.push(`M5→M6: ${k.adet} adet kesim bitti`);
        }

        // ── KONTROL NOKTASI 6: Üretim→Maliyet (M6→M7) ──────────
        sonuc.islenenler++;
        const { data: uretimBitti } = await sb.from('b1_uretim_kayitlari')
            .select('id, model_id, adet')
            .eq('durum', 'tamamlandi')
            .is('zincir_bildirim_m7', null)
            .limit(5);
        for (const u of (uretimBitti || [])) {
            await sb.from('b1_maliyet_kalemleri').insert([{
                uretim_kaydı_id: u.id,
                hesaplama_durumu: 'bekliyor',
                notlar: 'Zincirci otomatik oluşturdu',
            }]).select();
            await sb.from('b1_uretim_kayitlari').update({ zincir_bildirim_m7: new Date().toISOString() }).eq('id', u.id);
            sonuc.gecisler.push(`M6→M7: Üretim bitti, maliyet hesabı açıldı`);
        }

        // ── KONTROL NOKTASI 7: Maliyet→Muhasebe (M7→M8) ─────────
        sonuc.islenenler++;
        const { data: maliyetOnay } = await sb.from('b1_maliyet_kalemleri')
            .select('id, toplam_maliyet')
            .eq('hesaplama_durumu', 'onaylandi')
            .is('zincir_bildirim_m8', null)
            .limit(5);
        for (const m of (maliyetOnay || [])) {
            await sb.from('b1_muhasebe_raporlari').insert([{
                rapor_tipi: 'uretim_maliyet',
                maliyet_kalemi_id: m.id,
                hedeflenen_maliyet_tl: m.toplam_maliyet,
                rapor_durumu: 'taslak',
                notlar: 'Zincirci otomatik aktarım — M7→M8',
            }]).select();
            await sb.from('b1_maliyet_kalemleri').update({ zincir_bildirim_m8: new Date().toISOString() }).eq('id', m.id);
            sonuc.gecisler.push(`M7→M8: Maliyet muhasebeye aktarıldı ₺${m.toplam_maliyet}`);
        }

        // ── KONTROL NOKTASI 8: Genel Zincir Sağlık ──────────────
        sonuc.islenenler++;
        await logYaz(isim, 'zincir_tarama',
            `${sonuc.gecisler.length > 0 ? sonuc.gecisler.join(' | ') : 'Aktif zincir geçişi yok. Sistem normal.'}`,
            sonuc.gecisler.length > 0 ? 'basarili' : 'basarili'
        );

        console.log(`[${isim}] ⛓️ ${sonuc.islenenler} modül kontrol | ${sonuc.gecisler.length} geçiş`);
        return { basarili: true, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-113', 'src/lib/agents/v2/zincirci.js', e, 'orta');
        await logYaz(isim, 'zincir_tarama', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
