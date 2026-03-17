import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { GoogleGenAI } from '@google/genai';

// ═══════════════════════════════════════════════════════════
//  /api/ai-kahin-ajan — Kâhin AI Ajanı
//  @google/genai v0.7.0 SDK ile düzgün entegrasyon
// ═══════════════════════════════════════════════════════════

export async function POST(req) {
    try {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return NextResponse.json({ error: 'GEMINI_API_KEY tanımlı değil.' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        // 1. Personel verisi çek (b1_personel — sadece var olan kolonlar)
        const { data: pData, error: pError } = await supabaseAdmin
            .from('b1_personel')
            .select('id, ad_soyad, aylik_maliyet_tl')
            .limit(50);

        if (pError) {
            console.error('[Kahin] Personel sorgu hatasi:', pError.message);
            return NextResponse.json({ error: `Personel sorgusu hata: ${pError.message}` }, { status: 500 });
        }

        if (!pData || pData.length === 0) {
            return NextResponse.json({ error: 'Personel tablosu bos.' }, { status: 404 });
        }

        // 2. Bu ayın performans verisi çek
        const ayBasi = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
        const { data: perfData } = await supabaseAdmin
            .from('b1_personel_performans')
            .select('personel_id, isletmeye_katilan_deger, kazanilan_prim, uretilen_adet, kalite_puani')
            .gte('created_at', ayBasi);

        // 3. Prompt için analiz metni oluştur
        let isciAnalizMetni = 'Fabrikanın bu ayki üretim verileri:\n\n';

        for (const p of pData) {
            const raporlar = (perfData || []).filter(l => l.personel_id === p.id);
            const adet = raporlar.reduce((s, r) => s + (Number(r.uretilen_adet) || 0), 0);
            const deger = raporlar.reduce((s, r) => s + (Number(r.isletmeye_katilan_deger) || 0), 0);
            const prim = raporlar.reduce((s, r) => s + (Number(r.kazanilan_prim) || 0), 0);
            const kalite = raporlar.length
                ? raporlar.reduce((s, r) => s + (Number(r.kalite_puani) || 10), 0) / raporlar.length
                : 10;
            const maliyet = Number(p.aylik_maliyet_tl) || 0;

            isciAnalizMetni += `Personel: ${p.ad_soyad}
  - Aylik Maliyet: ${maliyet} TL
  - Uretilen Adet: ${adet}
  - Katma Deger: ${deger} TL  
  - Kalite Puani: ${kalite.toFixed(1)}/10
  - Kazanilan Prim: ${prim} TL
  - Amorti: %${maliyet > 0 ? ((deger / maliyet) * 100).toFixed(0) : 0}\n\n`;
        }

        const prompt = `Sen acımasız ve net bir Yalın Üretim Yapay Zeka Başdenetçisi (Kâhin Agent) sin.
Fabrika patronuna Türkçe, kısa (max 5 paragraf), eyleme geçirilebilir "Kârlılık ve Adalet Raporu" sun.
KURALLAR: Maliyet>Deger→Zarar Yazdırıyor. Deger>Maliyet→Liyakat Yıldızı. Kalite<5→Disiplin. MD formatı, agresif kurumsal dil.

VERİLER:
${isciAnalizMetni}`;

        // 4. Gemini API — @google/genai SDK v0.7.0
        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        const aiCevap = response.text || 'AI yargic sessiz kaldi.';

        // 5. Ajan log yaz (hata kritik degil)
        try {
            await supabaseAdmin.from('b1_agent_loglari').insert([{
                ajan_adi: 'Kahin Ajani',
                islem_tipi: 'personel_analiz',
                kaynak_tablo: 'b1_personel',
                sonuc: 'basarili',
                mesaj: `${pData.length} personel analiz edildi.`,
            }]);
        } catch (_) { }

        return NextResponse.json({ success: true, aiCevap, personel_sayisi: pData.length });

    } catch (error) {
        console.error('[Kahin AI Hatasi]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
