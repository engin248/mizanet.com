import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from '@/lib/auth';

/**
 * Sunucu Yük/Stres Testi Endpoint'i
 * Sadece admin yetkisi olanlar tetikleyebilir.
 * Parametreler: url, count, concurrency
 */
export async function POST(req) {
    try {
        // Güvenlik ve yetki kontrolü
        const session = await getServerSession();
        if (!session || (session.rol !== 'admin' && session.grup !== 'tam')) {
            return NextResponse.json({ error: 'Yetkisiz erişim. Bu testi sadece yöneticiler başlatabilir.' }, { status: 403 });
        }

        const body = await req.json();
        const { url, count = 100, concurrency = 10 } = body;

        // URL doğrulaması
        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Geçerli bir hedef URL belirtilmelidir.' }, { status: 400 });
        }

        // Test Parametreleri Limitleri (Vercel'i kilitlememek için koruyucu sınırlar)
        const vCount = Math.min(Math.max(1, count), 1000); // Maks 1000 istek
        const vConcurrency = Math.min(Math.max(1, concurrency), 100); // Maks 100 eşzamanlı istek

        const startTime = Date.now();
        const results = {
            totalRequests: vCount,
            concurrency: vConcurrency,
            targetUrl: url,
            success: 0,
            failed: 0,
            statusCodes: {},
            latencies: [],
            totalTimeMs: 0,
            avgLatencyMs: 0
        };

        // İstek yığınlarını işleme (Batch processing)
        const fetchUrl = url.startsWith('http') ? url : `http://localhost:${process.env.PORT || 3000}${url.startsWith('/') ? '' : '/'}${url}`;

        let completed = 0;
        const requestPromises = [];

        // Concurrency kontrolü için basit bir asenkron kuyruk yapısı
        async function worker() {
            while (completed < vCount) {
                // Fetch context
                const reqStartTime = Date.now();
                completed++;
                try {
                    const response = await fetch(fetchUrl, {
                        method: 'GET',
                        headers: {
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache'
                        },
                        // Timeout: 30 saniye
                        signal: AbortSignal.timeout(30000)
                    });

                    const latency = Date.now() - reqStartTime;
                    const status = response.status;

                    results.latencies.push(latency);
                    results.statusCodes[status] = (results.statusCodes[status] || 0) + 1;

                    if (response.ok) {
                        results.success++;
                    } else {
                        results.failed++;
                    }
                } catch (error) {
                    const latency = Date.now() - reqStartTime;
                    results.latencies.push(latency);
                    results.failed++;
                    const errName = error.name || 'UnknownError';
                    results.statusCodes[errName] = (results.statusCodes[errName] || 0) + 1;
                }
            }
        }

        // Çalışanları (workers) başlat
        for (let i = 0; i < vConcurrency; i++) {
            requestPromises.push(worker());
        }

        await Promise.allSettled(requestPromises);

        // İstatistikleri hesapla
        results.totalTimeMs = Date.now() - startTime;
        if (results.latencies.length > 0) {
            results.avgLatencyMs = Math.round(results.latencies.reduce((a, b) => a + b, 0) / results.latencies.length);
        }

        // Test sonucunu ajan loglarına yazalım
        try {
            await supabase.from('b1_agent_loglari').insert([{
                ajan_adi: 'Sistem Hafızası',
                islem_tipi: 'Stres Testi',
                mesaj: `Yük Testi: ${url} hedefine ${vCount} istek atıldı. Başarılı: ${results.success}, Ort. Gecikme: ${results.avgLatencyMs}ms`,
                seviye: 'uyari',
                sonuc: results.failed === 0 ? 'basarili' : 'basarisiz'
            }]);
        } catch (e) {
            console.error('Test logu kaydedilemedi:', e);
        }

        return NextResponse.json(results, { status: 200 });

    } catch (error) {
        console.error('Stres test error:', error);
        return NextResponse.json({ error: error.message || 'Test yürütülürken dahili hata oluştu.' }, { status: 500 });
    }
}
