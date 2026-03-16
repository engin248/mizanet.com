// /api/cikis — Server-side HttpOnly cookie temizleme
// HttpOnly cookie'ler JavaScript (document.cookie) ile SİLİNEMEZ
// Bu endpoint server-side Set-Cookie ile expire eder
import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ basarili: true, mesaj: 'Çıkış başarılı.' });

    // Tüm auth cookie'lerini expire et
    const cookieIsimleri = [
        'sb47_jwt_token',
        'sb47_auth_session',
        'sb47_uretim_pin',
        'sb47_genel_pin',
    ];

    for (const isim of cookieIsimleri) {
        response.cookies.set(isim, '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 0, // Anında expire
        });
    }

    return response;
}
