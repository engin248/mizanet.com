// ============================================================
// AJAN 7 — MUHASEBE YAZICI
// Sorumluluk: M7-M8 Maliyet & Muhasebe, 6 kontrol noktası
// Aylık + manuel — kapsamlı finansal rapor
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function muhasebeYazici() {
    const isim = AJAN_ISIMLERI.MUHASEBE;
    const sonuc = {};

    try {
        const bugun = new Date();
        const ayBasi = new Date(bugun.getFullYear(), bugun.getMonth(), 1).toISOString();
        const ayAdi = bugun.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

        // ── KONTROL NOKTASI 1: Aylık Gelir/Gider ────────────
        const { data: kasaHar } = await sb.from('b2_kasa_hareketleri')
            .select('hareket_tipi, tutar, aciklama')
            .gte('created_at', ayBasi);
        const gelir = (kasaHar || []).filter(k => k.hareket_tipi === 'gelir').reduce((s, k) => s + (k.tutar || 0), 0);
        const gider = (kasaHar || []).filter(k => k.hareket_tipi === 'gider').reduce((s, k) => s + (k.tutar || 0), 0);
        sonuc.gelir = gelir;
        sonuc.gider = gider;
        sonuc.net_kar = gelir - gider;

        // ── KONTROL NOKTASI 2: Model Kârlılık Analizi ───────
        const { data: maliyetler } = await sb.from('b1_muhasebe_raporlari')
            .select('*').gte('created_at', ayBasi).neq('rapor_durumu', 'iptal');
        sonuc.uretim_maliyet_toplam = (maliyetler || [])
            .reduce((s, m) => s + (m.gerceklesen_maliyet_tl || 0), 0);

        // ── KONTROL NOKTASI 3: Tamamlanan Üretim ────────────
        const { data: uretimler } = await sb.from('b1_uretim_kayitlari')
            .select('id, model_id, adet, durum').eq('durum', 'tamamlandi').gte('created_at', ayBasi);
        sonuc.uretim_tamamlanan = uretimler?.length || 0;

        // ── KONTROL NOKTASI 4: Sipariş Durumu ───────────────
        const { data: siparisler } = await sb.from('b2_siparisler')
            .select('durum').gte('created_at', ayBasi);
        const teslimEdilen = (siparisler || []).filter(s => s.durum === 'teslim_edildi').length;
        sonuc.siparis_teslim = teslimEdilen;
        sonuc.siparis_toplam = siparisler?.length || 0;

        // ── KONTROL NOKTASI 5: Personel Verimliliği ─────────
        const { data: personel } = await sb.from('b1_personel')
            .select('id, ad, soyad, prim_puani').eq('aktif', true);
        sonuc.aktif_personel = personel?.length || 0;

        // ── KONTROL NOKTASI 6: Raporu Kaydet ─────────────────
        const raporMetni = `
📊 AYLIK MUHASEBE RAPORU — ${ayAdi}
══════════════════════════════
💰 Gelir:        ₺${gelir.toFixed(2)}
💸 Gider:        ₺${gider.toFixed(2)}
📈 Net Kâr:      ₺${(gelir - gider).toFixed(2)}
📊 Kâr Marjı:    %${gelir > 0 ? (((gelir - gider) / gelir) * 100).toFixed(1) : '0'}
──────────────────────────────
⚙️ Tamamlanan Üretim: ${sonuc.uretim_tamamlanan} iş emri
📦 Teslim Edilen:     ${teslimEdilen}/${siparisler?.length || 0} sipariş
👥 Aktif Personel:    ${sonuc.aktif_personel} kişi
══════════════════════════════
        `.trim();

        await sb.from('b1_muhasebe_raporlari').insert([{
            rapor_tipi: 'aylik_ozet',
            rapor_tarihi: bugun.toISOString().split('T')[0],
            toplam_gelir: gelir,
            toplam_gider: gider,
            net_kar: gelir - gider,
            notlar: raporMetni,
            rapor_durumu: 'taslak',
        }]);

        await logYaz(isim, 'aylik_rapor', `${ayAdi} raporu oluşturuldu. Net kâr: ₺${(gelir - gider).toFixed(0)}`);

        console.log(`[${isim}] 📊 ${ayAdi} raporu yazıldı`);
        return { basarili: true, rapor: raporMetni, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-109', 'src/lib/agents/v2/muhasebeYazici.js', e, 'orta');
        await logYaz(isim, 'aylik_rapor', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
