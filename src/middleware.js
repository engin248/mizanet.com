/**
 * src/middleware.js
 * Hata Kodu: ERR-SYS-PG-004
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Middleware Orkestratör
 *
 * Bu dosya YALNIZCA koordinasyon yapar.
 * Tüm iş mantığı core/security/ modüllerindedir:
 *   · botBlocker.js  → bot/honeypot tespiti
 *   · jwtHelper.js   → JWT doğrulama
 *   · routeGuard.js  → route listesi ve yetki kararı
 *
 * Hata Kodları:
 *   ERR-SYS-PG-004 → Middleware iç hata
 *   ERR-AUTH-RT-*   → Kimlik doğrulama hataları
 *   ERR-GVN-RT-*    → Güvenlik hataları
 *
 * Toplam: ~100 satır (önceki: 244 satır)
 * ─────────────────────────────────────────────────────────────────
 */
import { NextResponse } from 'next/server';
import { honeypotMu, botMu, statikMi } from '@/core/security/botBlocker';
import { jwtDogrula, tokenCikar } from '@/core/security/jwtHelper';
import { apiKorumalıMi, korumaliSayfaMi, yetkiKontrol } from '@/core/security/routeGuard';
import { csrfTokenUret, csrfDogrula, csrfCookieEkle, CSRF_COOKIE_NAME } from '@/lib/csrf';

export async function middleware(request) {
    const url = request.nextUrl.pathname;

    // [0] Statik public dosyalar — dokunma
    if (statikMi(url)) return NextResponse.next();

    // [1] Honeypot yolları — anında reddet
    if (honeypotMu(url)) {
        console.warn(`[ERR-GVN-RT-001] Honeypot tuzağı tetiklendi: ${url}`);
        return new NextResponse(null, { status: 403 });
    }

    // [2] ENV sağlık kontrolü — kritik eksik ise sistemi kilitle
    const sirri = process.env.JWT_SIRRI || process.env.INTERNAL_API_KEY;
    if (!sirri) {
        console.error('[ERR-SYS-PG-004] JWT_SIRRI ve INTERNAL_API_KEY eksik — sistem kilitlendi!');
        return new NextResponse(
            JSON.stringify({ hata: 'Sistem yapılandırma hatası. Yöneticiye başvurun.', hata_kodu: 'ERR-SYS-PG-004' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const userAgent = request.headers.get('user-agent') || '';

    // [3] API route — bot engeli
    if (url.startsWith('/api/') && botMu(userAgent)) {
        console.warn(`[ERR-GVN-RT-001] Bot erişimi engellendi: ${userAgent.slice(0, 50)}`);
        return new NextResponse(
            JSON.stringify({ hata: 'Bot erişimi engellendi.', hata_kodu: 'ERR-GVN-RT-001' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // [4] Korunan API route'lar — JWT zorunlu
    if (apiKorumalıMi(url)) {
        // Sunucu-sunucu çağrısı (cron, edge-watcher): key ile bypass
        const dahiliKey = request.headers.get('x-internal-api-key');
        const sunucuKey = process.env.INTERNAL_API_KEY?.replace(/[\r\n'"]/g, '').trim();
        const dahiliGecerli = dahiliKey && sunucuKey && dahiliKey === sunucuKey;

        if (!dahiliGecerli) {
            const token = tokenCikar(request);
            const payload = await jwtDogrula(token, sirri);
            if (!payload || !yetkiKontrol(payload, url)) {
                console.warn(`[ERR-AUTH-RT-001] Yetkisiz API erişimi: ${url}`);
                return NextResponse.json(
                    { hata: 'Yetkisiz — JWT geçersiz veya süresi dolmuş.', hata_kodu: 'ERR-AUTH-RT-001' },
                    { status: 401 }
                );
            }
        }
    }

    // [5] Korunan sayfa route'ları — JWT cookie zorunlu
    const eslesenSayfa = korumaliSayfaMi(url);
    if (eslesenSayfa) {
        const jwtCookie = request.cookies.get('sb47_jwt_token')?.value;
        const payload = await jwtDogrula(jwtCookie, sirri);
        if (!payload?.grup) {
            console.warn(`[ERR-AUTH-PG-001] Yetkisiz sayfa erişimi: ${url}`);
            const geriDonusUrl = new URL('/giris?hata=yetkisiz', request.url);
            return NextResponse.redirect(geriDonusUrl);
        }
    }

    // [6] CSRF Koruması — Mutasyon isteklerinde token doğrula
    const method = request.method;
    const csrfMuafYollar = ['/api/pin-dogrula', '/api/telegram-webhook', '/api/health'];
    const csrfMuaf = csrfMuafYollar.some(y => url.startsWith(y));

    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && url.startsWith('/api/') && !csrfMuaf) {
        // Sunucu-sunucu çağrıları CSRF'den muaf (internal key ile geliyorsa)
        const dahiliKey = request.headers.get('x-internal-api-key');
        const sunucuKey = process.env.INTERNAL_API_KEY?.replace(/[\r\n'"]/g, '').trim();
        const dahiliGecerli = dahiliKey && sunucuKey && dahiliKey === sunucuKey;

        if (!dahiliGecerli) {
            const csrfSonuc = csrfDogrula(request);
            if (!csrfSonuc.gecerli) {
                console.warn(`[ERR-GVN-LB-001] CSRF doğrulama başarısız: ${url} — ${csrfSonuc.hata}`);
                return NextResponse.json(
                    { hata: csrfSonuc.hata, hata_kodu: 'ERR-GVN-LB-001' },
                    { status: 403 }
                );
            }
        }
    }

    // [7] Güvenlik başlıkları — her yanıta ekle
    const response = NextResponse.next();
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.headers.set('X-Powered-By', 'Mizanet v4.0');

    // [8] CSRF Cookie — Yoksa üret ve ekle
    const mevcutCsrf = request.cookies.get(CSRF_COOKIE_NAME)?.value;
    if (!mevcutCsrf) {
        const yeniToken = csrfTokenUret();
        const isProd = process.env.NODE_ENV === 'production';
        csrfCookieEkle(response, yeniToken, isProd);
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icons/).*)',
    ],
};
