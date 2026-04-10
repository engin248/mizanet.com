const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SUPABASE_URL, SUPABASE_ROLE_KEY);

/**
 * SENTINEL: Güvenlik, İzleme ve Mahkeme (Kill-Switch) Sınıfı
 * Dosya: src/lib/sentinel.js
 * Hata Kodu: ERR-SYS-LB-009
 *
 * Ajanların saniye saniye izlenebilmesi ve süre sınırını aşarsa acımasızca
 * infaz edilebilmesi için yazılmıştır (Mizanet İnisiyatif Yok Kuralı).
 *
 * Hata Kodları:
 *   ERR-SYS-LB-009 → Sentinel iç hata
 *   ERR-AJN-RT-*    → İlgili ajan route hatası
 */
class Sentinel {
    constructor(jobId, ajanAdi, hedef) {
        this.jobId = jobId;
        this.ajanAdi = ajanAdi;
        this.hedef = hedef;
        this.timer = null;
    }

    // Ajanı Göreve Sür ve Süre Sayacını Kur (Watchdog)
    async baslat(timeoutMs = 60000) {
        // Karargah Paneli için İlk Fişeği Ateşle
        await supabase.from('bot_tracking_logs').insert([{
            job_id: this.jobId,
            ajan_adi: this.ajanAdi,
            hedef_kavram: this.hedef,
            ilerleme_yuzdesi: 5,
            durum: 'isleniyor',
            hata_kodu: null,
            son_mesaj: `[ERR-SYS-LB-009] ${this.ajanAdi}: Göreve başladı. Süre işlemeye başladı.`,
            rota_url: 'init_sequence'
        }]);

        // Acımasız İnfaz Sayacını Kur (Timeout)
        this.timer = setTimeout(async () => {
            const infazKodu = 'ERR-SYS-LB-009';
            console.error(`\n[${infazKodu}] [SENTINEL KILL-SWITCH TRIPPED] ${this.ajanAdi} sınırı (${timeoutMs} ms) aştı veya kayboldu! İMHA EDİLİYOR.`);

            // Supabase'de Ölümünü İlan Et (Karargah Paneli Kırmızı Olacak)
            await supabase.from('bot_tracking_logs').update({
                durum: 'INFAZ_EDILDI',
                hata_kodu: infazKodu,
                son_mesaj: `[${infazKodu}] Ajan kontrolden çıktı, mermi ile imha edildi.`,
                ilerleme_yuzdesi: 0
            }).eq('job_id', this.jobId).eq('ajan_adi', this.ajanAdi);

            // Gerçekten İşlemi Kapat (İnisiyatif Yok, Beklemek Yok)
            process.exit(1);
        }, timeoutMs);
    }

    // Ajan iş yaparken Karargah Panelinde barı doldurur (Telemetri)
    async guncelle(yuzde, mesaj, url = '') {
        await supabase.from('bot_tracking_logs').update({
            ilerleme_yuzdesi: yuzde,
            son_mesaj: mesaj,
            rota_url: url
        }).eq('job_id', this.jobId).eq('ajan_adi', this.ajanAdi);
    }

    // Ajan görevi kusursuz yaparsa, süreyi durdur ve başarı ver.
    async bitir(mesaj) {
        if (this.timer) clearTimeout(this.timer);
        await supabase.from('bot_tracking_logs').update({
            ilerleme_yuzdesi: 100,
            son_mesaj: mesaj,
            durum: 'basarili',
            hata_kodu: null,
            rota_url: 'tamamlandi'
        }).eq('job_id', this.jobId).eq('ajan_adi', this.ajanAdi);
    }

    // Ajan normal hata (yazılımsal try/catch) verirse infaz eder (Timeout'a gerek kalmadan)
    async infaz(hataKodu, mesaj) {
        if (this.timer) clearTimeout(this.timer);
        console.error(`[${hataKodu}] [SENTINEL İNFAZ] ${this.ajanAdi}: ${mesaj}`);
        await supabase.from('bot_tracking_logs').update({
            ilerleme_yuzdesi: 0,
            son_mesaj: `[${hataKodu}] ${mesaj} - İnfaz Edildi.`,
            durum: 'INFAZ_EDILDI',
            hata_kodu: hataKodu,
            rota_url: 'failed'
        }).eq('job_id', this.jobId).eq('ajan_adi', this.ajanAdi);
    }
}

module.exports = { Sentinel };
