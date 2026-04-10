/**
 * core/security/routeGuard.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Route Koruma Tanımları
 *
 * KURAL: Yalnızca route listeleri ve erişim karar mantığı.
 * JWT doğrulama jwtHelper.js'de, bot kontrolü botBlocker.js'de.
 * ─────────────────────────────────────────────────────────────────
 */

/** Genel giriş gerektirmeyen (public) API route'lar */
export const PUBLIC_API_ROTALAR = [
    '/api/pin-dogrula',
    '/api/telegram-bildirim',
];

/**
 * JWT token zorunlu API route'lar.
 * x-internal-api-key ile sunucu-sunucu çağrıları bypass edebilir.
 */
export const KORUNAN_API_ROTALAR = [
    '/api/ajan-calistir',
    '/api/ajan-tetikle',
    '/api/musteri-ekle',
    '/api/siparis-ekle',
    '/api/stok-hareket-ekle',
    '/api/gorev-ekle',
    '/api/is-emri-ekle',
    '/api/kumas-ekle',
    '/api/personel-ekle',
    '/api/stok-alarm',
    '/api/cron-ajanlar',
    '/api/rapor',
    '/api/batch-ai',
    '/api/deepseek-analiz',
    '/api/perplexity-arama',
    '/api/trend-ara',
];

/**
 * Sadece 'tam' yetkisi gerektiren route'lar.
 * Diğer korunanlar 'tam' veya 'uretim' grubunu kabul eder.
 */
export const SADECE_TAM_ROTALAR = [
    '/api/ajan-calistir',
    '/api/ajan-tetikle',
];

/** Cookie auth + JWT gerektiren sayfa route'ları */
export const KORUNAN_SAYFA_ROTALAR = [
    '/imalat', '/kesim', '/modelhane', '/muhasebe', '/kasa',
    '/ayarlar', '/guvenlik', '/denetmen', '/personel', '/arge',
    '/kumas', '/kalip', '/maliyet', '/uretim', '/musteriler',
    '/siparisler', '/stok', '/katalog', '/gorevler', '/raporlar',
    '/ajanlar', '/haberlesme', '/tasarim', '/kameralar',
];

/**
 * API route'ın JWT korumalı olup olmadığını kontrol eder.
 * @param {string} url
 * @returns {boolean}
 */
export function apiKorumalıMi(url) {
    return KORUNAN_API_ROTALAR.some((r) => url.startsWith(r));
}

/**
 * Sadece tam yetkisi gerektirip gerektirmediğini kontrol eder.
 * @param {string} url
 * @returns {boolean}
 */
export function sadeceTamMi(url) {
    return SADECE_TAM_ROTALAR.some((r) => url.startsWith(r));
}

/**
 * Sayfa route'ının korumalı olup olmadığını kontrol eder.
 * @param {string} url
 * @returns {string|undefined} Eşleşen rota prefix'i
 */
export function korumaliSayfaMi(url) {
    return KORUNAN_SAYFA_ROTALAR.find((rota) => url.startsWith(rota));
}

/**
 * Verilen payload ve rota için yetki kontrolü.
 * @param {object|null} payload - JWT payload
 * @param {string} url
 * @returns {boolean}
 */
export function yetkiKontrol(payload, url) {
    if (!payload?.grup) return false;
    if (sadeceTamMi(url)) return payload.grup === 'tam';
    return payload.grup === 'tam' || payload.grup === 'uretim';
}
