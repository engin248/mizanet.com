import { NextResponse } from 'next/server';
import { handleError, logCatch } from '@/lib/errorCore';

export async function POST() {
    try {
        const response = NextResponse.json({ success: true, message: 'Çıkış başarılı' });

        // HttpOnly olan JWT token cookie'sini sil
        response.cookies.set({
            name: 'sb47_token',
            value: '',
            httpOnly: true,
            expires: new Date(0),
            path: '/',
            sameSite: 'lax',
        });

        return response;
    } catch (error) {
        handleError('ERR-AUTH-RT-005', 'api/cikis', error, 'yuksek');
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
