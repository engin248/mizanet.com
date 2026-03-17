import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabaseAdmin';
import { GoogleGenAI } from '@google/genai';

// THE ORDER / NIZAM V3
// BATCH AI İŞLEYİCİ - Kör Nokta Analizi Güvenlik Yaması (AI Toplu Çağrı)

const AI_MODEL_VERSION = 'gemini-2.5-flash';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        // Güvenlik (Cron job tokenı veya admin onayı ile çalışmalı)
        if (searchParams.get('token') !== process.env.CRON_SECRET && process.env.NODE_ENV !== 'development') {
            return NextResponse.json({ basarili: false, mesaj: 'Yetkisiz erişim' }, { status: 401 });
        }

        // 1. BEKLEYEN İŞLERİ GETİR (Batch)
        const { data: bekleyenIsler, error: fetchErr } = await supabase
            .from('b1_ai_is_kuyrugu')
            .select('*')
            .eq('durum', 'bekliyor')
            .limit(100);

        if (fetchErr || !bekleyenIsler || bekleyenIsler.length === 0) {
            return NextResponse.json({ basarili: true, mesaj: 'Kuyrukta bekleyen AI işlemi (Batch) yok.' });
        }

        // 2. İŞLERİ TEK BİR MEGA-PROMPT ÜZERİNDE GRUPLA (%95 API Tasarrufu)
        let topluPrompt = `Sen THE ORDER sisteminin ana yapay zekasısın. Aşağıda sistemdeki ajanlar tarafından kuyruğa (Queue) alınan bir dizi farklı analiz talebi (Batch) mevcuttur. 
Her bir talebi ID numarasıyla değerlendir ve sonucunu tam olarak şu JSON formatında dön: 
{ 
  "sonuclar": [
    { "id": "uuid", "analiz_sonucu": { /* talep türüne göre beklenen nesne */ }, "hata": false }
  ]
}
\n\nBEKLEYEN İŞLER LİSTESİ:\n`;

        bekleyenIsler.forEach(is => {
            topluPrompt += `\n---İŞ ID: ${is.id}---\nTİP: ${is.istek_tipi}\nDATA: ${JSON.stringify(is.istek_datasi)}\n`;
        });

        // 3. GEMİNİ API'YE TEK ÇAĞRI
        const apiKey = process.env.GEMINI_API_KEY?.trim();
        if (!apiKey) throw new Error('GEMINI_API_KEY bulunamadı');
        const genai = new GoogleGenAI({ apiKey });

        const startTime = Date.now();
        const response = await genai.models.generateContent({
            model: AI_MODEL_VERSION,
            contents: topluPrompt,
        });
        const duration = Date.now() - startTime;

        let rawText = response.text || '';
        if (rawText.includes('\`\`\`json')) {
            rawText = rawText.split('\`\`\`json')[1].split('\`\`\`')[0].trim();
        }

        const parsedResponse = JSON.parse(rawText);

        if (!parsedResponse.sonuclar) {
            throw new Error('AI sonuc formatı beklenen düzende değil.');
        }

        // 4. SONUÇLARI VERİTABANINA GERİ YAZ (Ve durumlarını 'tamamlandi' yap)
        let basariliKayitlar = 0;
        for (const aiSonuc of parsedResponse.sonuclar) {
            if (!aiSonuc.id) continue;

            await supabase
                .from('b1_ai_is_kuyrugu')
                .update({
                    durum: aiSonuc.hata ? 'hata' : 'tamamlandi',
                    sonuc_datasi: aiSonuc.analiz_sonucu,
                    islenme_tarihi: new Date().toISOString(),
                    ai_maliyeti_token: Math.round(duration / 100) // Tahmini süre/puan ağırlığı
                })
                .eq('id', aiSonuc.id);

            basariliKayitlar++;
        }

        return NextResponse.json({
            basarili: true,
            mesaj: `Batch Processing Tamamlandı. ${bekleyenIsler.length} istek değerlendirildi. Toplam süre: ${duration}ms.`,
            islenenKayit: basariliKayitlar
        });

    } catch (e) {
        console.error('Batch AI Error:', e);
        return NextResponse.json({ basarili: false, mesaj: 'Kritik Batch Hatası: ' + e.message }, { status: 500 });
    }
}
