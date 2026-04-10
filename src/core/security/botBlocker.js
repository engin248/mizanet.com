/**
 * core/security/botBlocker.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Bot ve Honeypot Engel Katmanı
 *
 * KURAL: Sadece bot tespiti. JWT veya route auth bilgisi içermez.
 * Edge Runtime uyumludur (Node API kullanmaz).
 * ─────────────────────────────────────────────────────────────────
 */

/** Bilinen saldırı/tarayıcı imzaları */
export const BOT_IMZALARI = [
    'sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab',
    'python-requests', 'go-http-client', 'curl/',
    'wget/', 'libwww-perl', 'scrapy', 'ahrefsbot',
    'semrushbot', 'dotbot', 'mj12bot', 'petalbot',
];

/** WordPress/CMS tarama ve honeypot yolları */
export const HONEYPOT_YOLLARI = [
    '/wp-admin', '/wp-login', '/wp-content', '/wp-includes',
    '/wordpress', '/wp-json', '/xmlrpc.php', '/wp-cron.php',
    '/phpmyadmin', '/pma', '/admin/config', '/setup-config.php',
    '/.env', '/.git', '/.htaccess', '/config.php',
    '/backup', '/old', '/new', '/blog', '/tmp',
];

/** Statik public dosyalar — middleware'den muaf */
export const PUBLIC_STATIK_YOLLAR = [
    '/sitemap.xml', '/robots.txt', '/favicon.ico', '/favicon.png',
    '/sw.js', '/service-worker.js', '/manifest.json', '/offline.html',
    '/icon.png', '/adalet_muhuru.png',
];

/**
 * URL'nin honeypot yoluna denk gelip gelmediğini kontrol eder.
 * @param {string} url
 * @returns {boolean}
 */
export function honeypotMu(url) {
    return HONEYPOT_YOLLARI.some(
        (yol) => url === yol || url.startsWith(yol + '/') || url.startsWith(yol + '.')
    );
}

/**
 * User-Agent'ın bot imzası taşıyıp taşımadığını kontrol eder.
 * @param {string} userAgent
 * @returns {boolean}
 */
export function botMu(userAgent) {
    const ua = (userAgent || '').toLowerCase();
    return BOT_IMZALARI.some((imza) => ua.includes(imza));
}

/**
 * URL'nin public statik dosya olup olmadığını kontrol eder.
 * @param {string} url
 * @returns {boolean}
 */
export function statikMi(url) {
    return PUBLIC_STATIK_YOLLAR.includes(url) || url.startsWith('/icons/');
}
