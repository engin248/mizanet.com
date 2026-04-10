import { NextResponse } from 'next/server';
import { KuyrugaEkle } from '../../../../src/lib/redis_kuyruk';
import { handleError } from '@/lib/errorCore';

export async function POST(req) {
    try {
        // Ajan görevlerini kuyruğa ASENKRON olarak ekler (UI Asla Kilitlenmez)
        // Bu, arkaplanda calisan worker.js tarafından işlenecektir.

        // Örnek tetiklemeler: TikTok ve Trendyol saha taramaları
        await KuyrugaEkle('scraper_jobs', {
            hedef: 'trendyol_indirim',
            ajanadi: 'Vision Trendyol Ajani',
            timestamp: Date.now()
        });

        await KuyrugaEkle('scraper_jobs', {
            hedef: 'tiktok_trend',
            ajanadi: 'Sokak Trend Ajani',
            timestamp: Date.now()
        });

        return NextResponse.json({
            success: true,
            message: 'Görevler Sentinel/Worker havuzuna sevk edildi. Arka planda asenkron yürütülecek.'
        }, { status: 200 });

    } catch (error) {
        handleError('ERR-AJN-RT-001', 'api/trigger-agents', error, 'yuksek');
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
