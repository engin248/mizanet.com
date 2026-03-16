import { NextResponse } from 'next/server';

// go2rtc stream sunucu sağlık kontrolü
export const dynamic = 'force-dynamic';
export const maxDuration = 5;

export async function GET() {
    const go2rtcUrl = process.env.NEXT_PUBLIC_GO2RTC_URL || process.env.GO2RTC_URL || 'http://localhost:1984';

    // Eğer URL localhost ise (production sunucusunda go2rtc yoktur) — 200 ile kapali döndür
    // NOT: 503 değil 200 kullanılıyor — tarayıcı konsol kırmızı hatası önleniyor
    const isLocalhost = go2rtcUrl.includes('localhost') || go2rtcUrl.includes('127.0.0.1');
    if (isLocalhost && (process.env.VERCEL || process.env.VERCEL_URL || process.env.NODE_ENV === 'production')) {
        return NextResponse.json({
            durum: 'kapali',
            url: go2rtcUrl,
            mesaj: 'go2rtc production ortamında çalışmaz — yerel NVR/sunucu gerekli',
        }, {
            status: 200,
            headers: { 'Cache-Control': 'public, max-age=300' }
        });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);

        let res;
        try {
            res = await fetch(`${go2rtcUrl}/api`, {
                signal: controller.signal,
                cache: 'no-store',
            });
        } finally {
            clearTimeout(timeout);
        }

        if (res.ok) {
            const data = await res.json().catch(() => ({}));
            return NextResponse.json({
                durum: 'aktif',
                url: go2rtcUrl,
                kamera_sayisi: Object.keys(data).length || 0,
                mesaj: 'Stream sunucusu çalışıyor',
            });
        }

        // HTTP hata — ama 503 döndürme, 200 ile hata durumunu bildir
        return NextResponse.json({ durum: 'hata', url: go2rtcUrl, mesaj: `HTTP ${res.status}` }, { status: 200 });

    } catch {
        // Bağlantı hatası — 200 döndür, durum 'kapali' yap
        return NextResponse.json({
            durum: 'kapali',
            url: go2rtcUrl,
            mesaj: 'NVR sunucusuna bağlanılamadı',
        }, { status: 200 });
    }
}
