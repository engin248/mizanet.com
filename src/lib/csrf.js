/**
 * src/lib/csrf.js
 * Hata Kodu: ERR-GVN-LB-001
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — CSRF Token Koruma Sistemi
 *
 * Double Submit Cookie Pattern:
 * 1. Sunucu rastgele token üretir → HttpOnly cookie'ye yazar
 * 2. Client bu token'ı form/header ile geri gönderir
 * 3. Sunucu cookie vs header eşleşmesini kontrol eder
 *
 * Neden: Cross-Site Request Forgery (CSRF) saldırılarını engeller.
 * Örnek: Kötü niyetli site, kullanıcının oturumunu kullanarak
 *        veri silme/değiştirme istekleri gönderemez.
 * ─────────────────────────────────────────────────────────────────
 */

const CSRF_COOKIE_NAME = 'sb47_csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const TOKEN_UZUNLUK = 32;

/**
 * Kriptografik olarak güvenli rastgele CSRF token üretir.
 * @returns {string} 64 karakter hex token
 */
export function csrfTokenUret() {
    const bytes = new Uint8Array(TOKEN_UZUNLUK);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * CSRF token'ı doğrular.
 * Cookie'deki token ile header/body'deki token eşleşmeli.
 *
 * @param {Request} request - Gelen HTTP isteği
 * @returns {{ gecerli: boolean, hata?: string }}
 */
export function csrfDogrula(request) {
    // Cookie'den token al
    const cookieToken = request.cookies?.get(CSRF_COOKIE_NAME)?.value;

    // Header'dan token al (öncelik) veya body'den
    const headerToken = request.headers?.get(CSRF_HEADER_NAME);

    if (!cookieToken) {
        return { gecerli: false, hata: 'CSRF cookie bulunamadı. Sayfayı yenileyin.' };
    }

    if (!headerToken) {
        return { gecerli: false, hata: 'CSRF token header\'da eksik. İstek reddedildi.' };
    }

    // Timing-safe karşılaştırma (side-channel attack önlemi)
    if (cookieToken.length !== headerToken.length) {
        return { gecerli: false, hata: 'CSRF token uzunluk uyuşmazlığı.' };
    }

    let esit = true;
    for (let i = 0; i < cookieToken.length; i++) {
        if (cookieToken.charCodeAt(i) !== headerToken.charCodeAt(i)) {
            esit = false;
        }
    }

    if (!esit) {
        return { gecerli: false, hata: 'CSRF token eşleşmedi. Olası CSRF saldırısı.' };
    }

    return { gecerli: true };
}

/**
 * Response'a CSRF cookie ekler.
 * @param {Response} response - NextResponse nesnesi
 * @param {string} token - CSRF token
 * @param {boolean} isProd - Production ortamı mı
 * @returns {Response}
 */
export function csrfCookieEkle(response, token, isProd = false) {
    response.cookies.set(CSRF_COOKIE_NAME, token, {
        httpOnly: false,  // Client JS tarafından okunabilmeli (header'a eklenmesi için)
        secure: isProd,
        sameSite: 'strict',
        path: '/',
        maxAge: 8 * 3600, // 8 saat (JWT ile aynı)
    });
    return response;
}

export { CSRF_COOKIE_NAME, CSRF_HEADER_NAME };
