/**
 * ═══════════════════════════════════════════════════════
 * HATA BİLDİRİM SİSTEMİ — Telegram'a Otomatik Alarm
 * Dosya: src/lib/hataBildirim.js
 * Hata Kodu: ERR-SYS-LB-006
 * Sentry yerine kendi altyapımızla hata izleme
 * ERR-{MODUL}-{KATMAN}-{NUMARA} formatını Telegram mesajına ekler.
 * ═══════════════════════════════════════════════════════
 */

import { hataKoduDogrula } from './errorCore';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Son gönderilen hatanın zamanı — aynı hatayı 5 dakika içinde tekrar gönderme
const _hataKontrol = new Map();

/**
 * Telegram'a hata bildirimi gönder
 * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA} formatında hata kodu
 * @param {string} modul - Hangi modülde hata? Örn: '/api/kumas-ekle'
 * @param {Error|string} hata - Hata objesi veya mesaj
 * @param {string} [ekBilgi] - Opsiyonel ek bilgi (IP, kullanıcı vs)
 */
export async function hataBildir(hataKodu, modul, hata, ekBilgi = '') {
    try {
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.warn(`[ERR-SYS-LB-006] TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID tanımlı değil — hata bildirimi gönderilemedi. Hata Kodu: ${hataKodu}, Modül: ${modul}`);
            return;
        }

        // Hata kodu format doğrulama
        const dogrulama = hataKoduDogrula(hataKodu);
        if (!dogrulama.gecerli) {
            console.error(`[ERR-SYS-LB-006] GEÇERSİZ HATA KODU: ${dogrulama.hata}`);
        }

        const hataMesaji = hata instanceof Error ? hata.message : String(hata);

        // Aynı hata 5 dakika içinde tekrar gelirse gönderme (spam önleme)
        const anahtar = `${hataKodu}:${modul}:${hataMesaji.slice(0, 50)}`;
        const sonGonderim = _hataKontrol.get(anahtar);
        if (sonGonderim && (Date.now() - sonGonderim) < 5 * 60 * 1000) return;
        _hataKontrol.set(anahtar, Date.now());

        const saat = new Date().toLocaleString('tr-TR', {
            timeZone: 'Europe/Istanbul',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            day: '2-digit', month: '2-digit'
        });

        const mesaj = [
            `🔴 <b>SİSTEM HATASI!</b>`,
            ``,
            `🏷️ <b>Hata Kodu:</b> <code>${hataKodu}</code>`,
            `📍 <b>Modül:</b> <code>${modul}</code>`,
            `❌ <b>Hata:</b> <code>${hataMesaji.slice(0, 200)}</code>`,
            ekBilgi ? `ℹ️ <b>Bilgi:</b> ${ekBilgi}` : '',
            `🕐 <b>Saat:</b> ${saat}`,
            ``,
            `<i>mizanet.com</i>`,
        ].filter(Boolean).join('\n');

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: mesaj,
                parse_mode: 'HTML'
            }),
            signal: AbortSignal.timeout(5000) // 5sn'den uzun bekleme
        });

    } catch (bildirimHata) {
        // H3 FIX: Bildirim gönderilemese bile sistemi engelleme — ama hata logla
        console.error(`[ERR-SYS-LB-006] Telegram'a gönderilemedi:`, bildirimHata?.message);
    }
}

/**
 * Kritik olmayan ama dikkat gerektiren durumlar için uyarı
 * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA} formatında hata kodu
 * @param {string} modul
 * @param {string} mesaj
 */
export async function uyariBildir(hataKodu, modul, mesaj) {
    try {
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

        // Hata kodu format doğrulama
        const dogrulama = hataKoduDogrula(hataKodu);
        if (!dogrulama.gecerli) {
            console.error(`[ERR-SYS-LB-006] GEÇERSİZ UYARI KODU: ${dogrulama.hata}`);
        }

        const saat = new Date().toLocaleString('tr-TR', {
            timeZone: 'Europe/Istanbul',
            hour: '2-digit', minute: '2-digit'
        });

        const metin = [
            `⚠️ <b>SİSTEM UYARISI</b>`,
            `🏷️ <b>Kod:</b> <code>${hataKodu}</code>`,
            `📍 <b>Modül:</b> <code>${modul}</code>`,
            `💬 <b>Mesaj:</b> ${mesaj}`,
            `🕐 ${saat}`,
        ].join('\n');

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: metin, parse_mode: 'HTML' }),
            signal: AbortSignal.timeout(5000)
        });
    } catch (_) { console.error('[ERR-SYS-LB-006] Telegram uyarı gönderilemedi'); }
}
