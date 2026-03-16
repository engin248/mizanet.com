// =========================================================================
// 4. EKİP: "KÖPRÜ AJANI" (Bridge Agent)
// GÖREVİ: Yargıç'ın verdiği kararları aksiyona çevirir.
//         1. Yüksek skorlu ürünler için Telegram bildirimi gönderir
//         2. 7 günden eski reddedilmiş kayıtları temizler
// SINIR:  Sadece okuma + bildirim. Hiçbir karara müdahale etmez.
// =========================================================================

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env.local') });

// ─── GÜVENLİK DÜZELTME: Service Role Key kullanılıyor ─────────
// ─── SUPABASE BAĞLANTISI (Service Role Key — DELETE işlemi için RLS bypass gerekli) ───
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('[KÖPRÜ] ⚠️ UYARI: SUPABASE_SERVICE_ROLE_KEY bulunamadı, anon key ile devam ediliyor.');
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseKey);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// ─── TELEGRAM BİLDİRİM ────────────────────────────────────────
async function telegramBildirimGonder(urunAdi, firsatSkoru, karar, agentNote) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('[KÖPRÜ] ⚠️ Telegram token/chat_id yok. Bildirim atlanadı.');
        return false;
    }

    const emoji = karar === 'ÜRETİM' ? '🏭' : '🧪';
    const mesaj = `${emoji} *THE ORDER — YENİ KARAR*

📦 *Ürün:* ${urunAdi}
📊 *Fırsat Skoru:* ${firsatSkoru.toFixed(1)}/100
⚡ *Karar:* ${karar}

📝 _${agentNote || 'Detay yok.'}_

_Karargah panelinden onaylayın._`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: mesaj,
                parse_mode: 'Markdown'
            })
        });

        if (res.ok) {
            console.log(`[KÖPRÜ] 📱 Telegram bildirimi gönderildi: ${urunAdi.substring(0, 30)}...`);
            return true;
        } else {
            console.log(`[KÖPRÜ] ⚠️ Telegram hata: HTTP ${res.status}`);
            return false;
        }
    } catch (err) {
        console.log(`[KÖPRÜ] ⚠️ Telegram bağlantı hatası: ${err.message}`);
        return false;
    }
}

// ─── YENİ KARARLARI TARA VE BİLDİR ───────────────────────────
async function yeniKararlariTara() {
    console.log('[KÖPRÜ] 🔍 Son 1 saatteki yeni kararlar taranıyor...');

    const birSaatOnce = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: yeniKararlar, error } = await supabase
        .from('b1_arge_strategy')
        .select('*')
        .in('nizam_decision', ['ÜRETİM', 'TEST ÜRETİMİ (Numune)'])
        .gte('created_at', birSaatOnce)
        .order('opportunity_score', { ascending: false });

    if (error) {
        console.log(`[KÖPRÜ] ⚠️ Strateji tablosu okunamadı: ${error.message}`);
        return;
    }

    if (!yeniKararlar || yeniKararlar.length === 0) {
        console.log('[KÖPRÜ] Bildirilecek yeni karar yok.');
        return;
    }

    console.log(`[KÖPRÜ] ${yeniKararlar.length} adet yeni karar bulundu. Telegram bildirimleri gönderiliyor...`);

    let gonderilen = 0;
    for (const karar of yeniKararlar) {
        const basarili = await telegramBildirimGonder(
            karar.product_name || 'Bilinmeyen Ürün',
            karar.opportunity_score || 0,
            karar.nizam_decision,
            karar.agent_note
        );
        if (basarili) gonderilen++;

        // Telegram rate limit koruması — mesajlar arası 1sn bekle
        await new Promise(r => setTimeout(r, 1000));
    }

    console.log(`[KÖPRÜ] ✅ ${gonderilen}/${yeniKararlar.length} bildirim gönderildi.`);
}

// ─── ÇÖP SÜPÜRGESİ (7 GÜNLÜK TEMİZLİK) ─────────────────────
async function copSupurgesi() {
    console.log('[KÖPRÜ] 🧹 7 günden eski işlenmiş kayıtlar temizleniyor...');

    const yediGunOnce = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
        .from('b1_arge_products')
        .delete()
        .eq('islenen_durum', 'islendi')
        .lt('created_at', yediGunOnce)
        .select('id');

    if (error) {
        console.log(`[KÖPRÜ] ⚠️ Temizlik hatası: ${error.message}`);
        return;
    }

    const silinen = data?.length || 0;
    console.log(`[KÖPRÜ] 🧹 ${silinen} eski kayıt temizlendi.`);
}

// ─── ANA ÇALIŞTIRICI ──────────────────────────────────────────
async function kopruAjaniCalistir() {
    console.log('\n[KÖPRÜ] 🌉 Köprü Ajanı başlatıldı...');
    console.log(`[KÖPRÜ] Telegram: ${TELEGRAM_BOT_TOKEN ? '✅ Aktif' : '❌ Token yok'}`);

    await yeniKararlariTara();
    await copSupurgesi();

    console.log('[KÖPRÜ] ✅ Tüm görevler tamamlandı.\n');
}

// Çalıştırma: node src/scripts/ai_mastermind/kopru_ajan.js
kopruAjaniCalistir();
