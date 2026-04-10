import { handleError, logCatch } from '@/lib/errorCore';

/**
 * core/security/jwtHelper.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Edge Runtime JWT Doğrulama Yardımcısı
 *
 * KURAL: Yalnızca JWT imzalama/doğrulama.
 * Node.js crypto değil — Web Crypto API (edge runtime uyumlu).
 * ─────────────────────────────────────────────────────────────────
 */

/**
 * HMAC-SHA256 imzalı JWT doğrulama.
 * Edge Runtime uyumludur (SubtleCrypto kullanır).
 *
 * @param {string|undefined} token
 * @param {string|undefined} sirri - JWT imza anahtarı
 * @returns {Promise<object|null>} Geçerliyse payload, değilse null
 */
export async function jwtDogrula(token, sirri) {
    if (!token || !sirri) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [header, payload, signature] = parts;

        // İmza doğrulama — Web Crypto API
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            'raw',
            encoder.encode(sirri),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );

        const veri = encoder.encode(`${header}.${payload}`);
        const imzaBuf = Uint8Array.from(
            atob(signature.replace(/-/g, '+').replace(/_/g, '/')),
            (c) => c.charCodeAt(0)
        );

        const gecerli = await crypto.subtle.verify('HMAC', key, imzaBuf, veri);
        if (!gecerli) return null;

        // Payload çözümle
        const payloadJson = JSON.parse(
            atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        );

        // Süre kontrolü
        if (payloadJson.exp && Date.now() / 1000 > payloadJson.exp) return null;

        return payloadJson;
    } catch (hata) {
        handleError('ERR-AUTH-CR-102', 'src/core/security/jwtHelper.js', hata, 'orta');
        return null;
    }
}

/**
 * Request'ten JWT token'ı çıkarır.
 * Önce Authorization header, sonra cookie dener.
 *
 * @param {Request} request
 * @returns {string|undefined}
 */
export function tokenCikar(request) {
    const authHeader = request.headers.get('authorization') || '';
    const cookieToken = request.cookies.get('sb47_jwt_token')?.value;
    return authHeader.replace('Bearer ', '') || cookieToken;
}
