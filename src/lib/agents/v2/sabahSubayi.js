// ============================================================
// AJAN 1 — SABAH SUBAY'I
// Sorumluluk: 6 modül, 8 kontrol noktası
// Her sabah 08:00 — tüm sistemi tarar, koordinatöre brifing verir
// ============================================================
import { sb, AJAN_ISIMLERI, logYaz, alarmYaz } from './_ortak';
import { handleError, logCatch } from '@/lib/errorCore';

export async function sabahSubayi() {
    const isim = AJAN_ISIMLERI.SABAH;
    /** @type {{ kontrol_sayisi: number, bulgular: string[], kritik: number }} */
    const sonuc = { kontrol_sayisi: 0, bulgular: [], kritik: 0 };
    const tarih = new Date().toLocaleDateString('tr-TR');

    try {
        // ── KONTROL NOKTASI 1: Bekleyen Siparişler ──────────
        sonuc.kontrol_sayisi++;
        const { data: siparisler } = await sb.from('b2_siparisler')
            .select('id, siparis_kodu, durum, teslim_tarihi')
            .in('durum', ['bekliyor', 'hazirlaniyor'])
            .order('teslim_tarihi', { ascending: true })
            .limit(20);
        const bugeymanTeslim = (siparisler || []).filter(s => {
            if (!s.teslim_tarihi) return false;
            const gun = Math.ceil((new Date(s.teslim_tarihi) - Date.now()) / 86400000);
            return gun <= 2;
        });
        if (bugeymanTeslim.length > 0) {
            sonuc.bulgular.push(`⚠️ ${bugeymanTeslim.length} sipariş 2 gün içinde teslim edilmeli`);
            sonuc.kritik++;
        }

        // ── KONTROL NOKTASI 2: Sıfır Stok Ürünler ──────────
        sonuc.kontrol_sayisi++;
        const { data: sifirStok } = await sb.from('b2_urun_katalogu')
            .select('id, urun_adi_tr, stok_adeti')
            .eq('aktif', true)
            .eq('stok_adeti', 0)
            .limit(10);
        if (sifirStok && sifirStok.length > 0) {
            sonuc.bulgular.push(`🔴 ${sifirStok.length} ürün stok sıfır: ${sifirStok.slice(0, 3).map(u => u.urun_adi_tr).join(', ')}`);
            sonuc.kritik++;
            await alarmYaz('dusuk_stok', 'kritik', `${sifirStok.length} ürün stok sıfır`, 'Sabah taraması bulgusu', 'b2_urun_katalogu');
        }

        // ── KONTROL NOKTASI 3: Onay Bekleyen Trendler ───────
        sonuc.kontrol_sayisi++;
        const { data: trendler } = await sb.from('b1_arge_trendler')
            .select('id')
            .eq('durum', 'inceleniyor');
        if (trendler && trendler.length > 0) {
            sonuc.bulgular.push(`🔍 ${trendler.length} Ar-Ge trendi koordinatör onayı bekliyor`);
        }

        // ── KONTROL NOKTASI 4: Gecikmiş Üretim Emirleri ─────
        sonuc.kontrol_sayisi++;
        const bugun = new Date().toISOString().split('T')[0];
        const { data: gecikme } = await sb.from('b1_uretim_kayitlari')
            .select('id, modul, durum')
            .in('durum', ['bekliyor', 'devam_ediyor'])
            .lt('bitis_tarihi', bugun)
            .limit(10);
        if (gecikme && gecikme.length > 0) {
            sonuc.bulgular.push(`⏰ ${gecikme.length} üretim emri gecikmeli`);
            sonuc.kritik++;
        }

        // ── KONTROL NOKTASI 5: Ödenmemiş Faturalar ──────────
        sonuc.kontrol_sayisi++;
        const { data: faturalar } = await sb.from('b2_kasa_hareketleri')
            .select('id, tutar, aciklama')
            .eq('hareket_tipi', 'borc')
            .eq('odendi', false)
            .lt('vade_tarihi', bugun)
            .limit(10);
        if (faturalar && faturalar.length > 0) {
            const toplam = faturalar.reduce((s, f) => s + (f.tutar || 0), 0);
            sonuc.bulgular.push(`💸 ${faturalar.length} vadesi geçmiş borç — Toplam: ₺${toplam.toFixed(0)}`);
            sonuc.kritik++;
        }

        // ── KONTROL NOKTASI 6: Kasa Durumu ──────────────────
        sonuc.kontrol_sayisi++;
        const { data: kasaHar } = await sb.from('b2_kasa_hareketleri')
            .select('hareket_tipi, tutar')
            .order('created_at', { ascending: false })
            .limit(50);
        if (kasaHar?.length) {
            const giris = kasaHar.filter(k => k.hareket_tipi === 'gelir').reduce((s, k) => s + (k.tutar || 0), 0);
            const cikis = kasaHar.filter(k => k.hareket_tipi === 'gider').reduce((s, k) => s + (k.tutar || 0), 0);
            const bakiye = giris - cikis;
            if (bakiye < 500) {
                sonuc.bulgular.push(`🚨 KRİTİK: Kasa bakiyesi düşük ₺${bakiye.toFixed(0)}`);
                sonuc.kritik++;
                await alarmYaz('diger', 'kritik', 'Kasa Bakiyesi Kritik Seviyede', `Tahmini bakiye: ₺${bakiye.toFixed(0)}`, 'b2_kasa_hareketleri');
            } else {
                sonuc.bulgular.push(`💰 Kasa durumu: ₺${bakiye.toFixed(0)}`);
            }
        }

        // ── KONTROL NOKTASI 7: Personel Devam ───────────────
        sonuc.kontrol_sayisi++;
        const { data: personel } = await sb.from('b1_personel')
            .select('id')
            .eq('aktif', true);
        sonuc.bulgular.push(`👥 Aktif personel: ${personel?.length || 0} kişi`);

        // ── KONTROL NOKTASI 8: Bekleyen Ajan Görevleri ──────
        sonuc.kontrol_sayisi++;
        const { data: ajanGorev } = await sb.from('b1_ajan_gorevler')
            .select('id')
            .eq('durum', 'bekliyor');
        if (ajanGorev && ajanGorev.length > 0) {
            sonuc.bulgular.push(`🤖 ${ajanGorev.length} ajan görevi çalıştırılmayı bekliyor`);
        }

        // ── BRİFİNG YAZI ────────────────────────────────────
        const durum = sonuc.kritik === 0 ? '✅ NORMAL' : `🔴 ${sonuc.kritik} KRİTİK BULGU`;
        const brifing = `📋 SABAH BRİFİNGİ — ${tarih}\n${durum}\n\n${sonuc.bulgular.map((b, i) => `${i + 1}. ${b}`).join('\n')}`;

        await sb.from('b1_agent_loglari').insert([{
            ajan_adi: isim,
            islem_tipi: 'sabah_brifing',
            kaynak_tablo: 'sistem_geneli',
            sonuc: sonuc.kritik > 0 ? 'uyari' : 'basarili',
            mesaj: brifing,
        }]);

        console.log(`[${isim}] ✅ ${sonuc.kontrol_sayisi} kontrol, ${sonuc.kritik} kritik`);
        return { basarili: true, brifing, sonuc };

    } catch (e) {
        handleError('ERR-AJN-LB-111', 'src/lib/agents/v2/sabahSubayi.js', e, 'orta');
        await logYaz(isim, 'sabah_brifing', `Hata: ${e.message}`, 'hata');
        return { basarili: false, hata: e.message };
    }
}
