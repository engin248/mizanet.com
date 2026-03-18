const { KuyruktanAl } = require('./src/lib/redis_kuyruk.js');
const { createClient } = require('@supabase/supabase-js');
const { SentinelZirhi } = require('./src/lib/sentinel_kalkan.js');
const { bot1TiktokTrendAjani } = require('./arge_ajanlari/trend_tiktok.js');
require('dotenv').config({ path: '.env.local' });

// Supabase Sunucu Bağlantısı
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const GOREV_LIMITI = 2; // Server yorulmaması için Max Concurrency
let aktifGorevler = 0;

/**
 * Siber İşçi Motoru: 
 * Sentinel İnfaz (Kill Switch) Zırhı ile donatılmış yeni sistem.
 */
async function isciMotoru() {
    try {
        if (aktifGorevler >= GOREV_LIMITI) return;

        const job = await KuyruktanAl('scraper_jobs');
        if (!job) return;

        aktifGorevler++;
        console.log(`\n[İŞÇİ] 🎯 Yeni Görev Alındı: ${job.data.hedef} | Job ID: ${job.id}`);

        await supabase.from('bot_tracking_logs').insert([{
            job_id: job.id,
            ajan_adi: 'DAĞITICI_MİMAR',
            hedef_kavram: job.data.hedef,
            ilerleme_yuzdesi: 10,
            durum: 'çalışıyor',
            son_mesaj: 'Sentinel Telemetri zırhı aktifleştirildi, ajan hedefe yollanıyor.'
        }]);

        // AŞAMA 2: Güvenlik Ajanı (Sentinel) Zırhıyla Ajanın Tetiklenmesi
        try {
            // bot1TiktokTrendAjani 60 saniye içinde dönmezse Sentinel tarafından vurulacak!
            const sonuc = await SentinelZirhi(job.id, job.data.hedef, bot1TiktokTrendAjani, 60);
            console.log(`[İŞÇİ] ✅ Etki başarıyla tamamlandı. Karar: ${sonuc ? sonuc.ai_satis_karari : 'BOŞ'}`);

            // Eğer sonuc başarılıysa B1_ARGE_PRODUCTS tablosuna kaydetmeli (İleriki Yargıç aşaması)
        } catch (infazHatasi) {
            console.log(`[İŞÇİ - YENİ ASKER UYARISI] Ajan sahadan dönemedi veya İnfaz edildi. Kural 16 (Reincarnation) Devrede.`);
            // KURAL 16: Eğer bot ölürse, inisiyatif alması yasaklanan YENİ ASKER işi devralacak (Yakında Kodlanacak)
        }

        aktifGorevler--;
    } catch (err) {
        console.error("[İŞÇİ MOTOR ÇÖKMESİ]:", err.message);
        aktifGorevler--;
    }
}

// Kalp atışı
setInterval(isciMotoru, 2000);
console.log("\n🛡️ SİBER İŞÇİ VE (AŞAMA 2) SENTINEL İNFAZ ZIRHI BAŞLATILDI...\n");
