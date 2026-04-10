const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase Sunucu Bağlantısı
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Karargaha (M1) anlık telemetri (hayatta kalma sinyali ve yüzdelik) basar.
 * Dosya: src/lib/sentinel_kalkan.js
 * Hata Kodu: ERR-SYS-LB-010
 *
 * @param {string} job_id
 * @param {number} ilerleme
 * @param {string} mesaj
 * @param {string} [durum]
 * @param {string} [hataKodu] - ERR-{MODUL}-{KATMAN}-{NUMARA}
 */
async function telemetriGuncelle(job_id, ilerleme, mesaj, durum = 'çalışıyor', hataKodu = null) {
    try {
        const guncelleme = {
            ilerleme_yuzdesi: ilerleme,
            son_mesaj: hataKodu ? `[${hataKodu}] ${mesaj}` : mesaj,
            durum: durum,
            son_guncelleme: new Date().toISOString(),
        };
        if (hataKodu) guncelleme.hata_kodu = hataKodu;

        await supabase.from('bot_tracking_logs')
            .update(guncelleme)
            .eq('job_id', job_id);
    } catch (err) {
        console.error("[ERR-SYS-LB-010] [TELEMETRİ HATASI]:", err.message);
    }
}

/**
 * Sentinel Zırhı: Siber İnfaz ve Çapraz Denetim Başlatıcısı (Kill Switch)
 * @param {string} job_id - Redis Görev ID'si
 * @param {string} hedef - Hedef Kavram
 * @param {Function} botFonksiyonu - Çalıştırılacak sahadaki ajan
 * @param {number} zamanAsimiSaniye - Ajanın hayatta kalma limiti (Varsayılan 45 sn)
 */
async function SentinelZirhi(job_id, hedef, botFonksiyonu, zamanAsimiSaniye = 45) {
    let killSwitchTetiklendi = false;

    // 1. Ekip 3 (Tester/Güvenlik) Gözlem Başlatır
    await telemetriGuncelle(job_id, 30, `[SENTINEL ZIRHI] ${hedef} için ajan Serbest Bırakıldı. İmha Sayacı: ${zamanAsimiSaniye}s.`);

    return new Promise(async (resolve, reject) => {
        // İNFAZ (KILL SWITCH) MANTIGI: Zombi Bot Süresi Dolduğunda Parçalanır
        const infazZamanlayici = setTimeout(async () => {
            killSwitchTetiklendi = true;
            const infazKodu = 'ERR-SYS-LB-010';
            console.error(`[${infazKodu}] [SENTINEL İNFAZ TİMİ] ⚡ Ajan ${zamanAsimiSaniye} saniyeyi aştı. Hedefte kayboldu. Kellesi Alındı!`);

            await telemetriGuncelle(job_id, 0, `Ajan kontrolden çıktığı için Sentinel tarafından (Zaman Aşımı) mermi ile öldürüldü.`, 'INFAZ_EDILDI', infazKodu);

            // Yeni Asker (Reincarnation) için Error fırlat
            reject(new Error("SENTINEL_KILL_SWITCH_TETIKLENDI"));
        }, zamanAsimiSaniye * 1000);

        try {
            // Ajanı sahaya salıp döndürdüğü veriyi bekleriz
            // Not: Botun kendi içinde try/catch/finally (browser.close) yapması mecburi KURAL 1'dir.
            const botSonucu = await botFonksiyonu(hedef, job_id, telemetriGuncelle);

            clearTimeout(infazZamanlayici); // Ajan başarıyla dönerse silahı (İnfazı) indir.

            if (!killSwitchTetiklendi) {
                await telemetriGuncelle(job_id, 100, `[SENTINEL ONAYI] Başarılı Veri Sağlandı. Çapraz Test'ten Geçti.`, 'onaylandı');
                resolve(botSonucu);
            }
        } catch (botHatasi) {
            clearTimeout(infazZamanlayici); // İç hata varsa infaz sayacını iptal et, çünkü bot kendi öldü
            if (!killSwitchTetiklendi) {
                const cokmeKodu = 'ERR-SYS-LB-010';
                console.error(`[${cokmeKodu}] [SENTINEL HATA TESPİTİ] Ajan iç çökme ile parçalandı:`, botHatasi.message);
                await telemetriGuncelle(job_id, 0, `Ajan iç hatadan dolayı kalbinden patladı: ${botHatasi.message}`, 'INFAZ_EDILDI', cokmeKodu);
                reject(botHatasi);
            }
        }
    });
}

module.exports = { telemetriGuncelle, SentinelZirhi };
