'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { komutSchema } from '../schemas/komutSchema';

export function useKarargah() {
    const [stats, setStats] = useState({ ciro: 0, maliyet: 0, personel: 0, fire: 0, yukleniyor: true });
    const [alarms, setAlarms] = useState(/** @type {any[]} */([]));
    const [mesaj, setMesaj] = useState({ text: '', type: '' });
    const [ping, setPing] = useState(/** @type {number|null} */(null));

    const [commandText, setCommandText] = useState('');
    const [aiSorgu, setAiSorgu] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [simulasyon, setSimulasyon] = useState(0);

    const goster = (text, type = 'success') => {
        setMesaj({ text, type });
        setTimeout(() => setMesaj({ text: '', type: '' }), 5000);
    };

    const hizliGorevAtama = async () => {
        try {
            komutSchema.parse({ komut: commandText });
            goster(`Görev alındı: ${commandText}`);
            setCommandText('');
        } catch (error) {
            goster(error.errors[0].message, 'error');
        }
    };

    const [aiSonuc, setAiSonuc] = useState('');

    const aiAnalizBaslat = async () => {
        if (!aiSorgu.trim()) return goster('Sorgu boş olamaz.', 'error');
        setIsAiLoading(true);
        setAiSonuc('');
        try {
            const res = await fetch('/api/ajan-calistir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sorgu_metni: aiSorgu.trim() }),
            });
            const data = await res.json();
            if (data?.basarili && data?.sonuc?.ozet) {
                setAiSonuc(data.sonuc.ozet);
                goster('AI analizi tamamlandı.', 'success');
            } else {
                goster('AI yanıt veremedi: ' + (data?.error || 'Sunucu hatası'), 'error');
            }
        } catch (err) {
            goster('AI bağlantı hatası: ' + err.message, 'error');
        } finally {
            setIsAiLoading(false);
            setAiSorgu('');
        }
    };

    const veriCek = useCallback(async () => {
        setStats(prev => ({ ...prev, yukleniyor: true }));
        const t0 = performance.now();
        try {
            // ⚡ EKİP GAMMA - Yüksek Performans Arka Plan İsteği
            const response = await fetch('/api/kasa-ozet');
            if (!response.ok) throw new Error('Ozet API Hatasi');
            const data = await response.json();

            const alarmlar = data.alarmlar.map(a => ({
                id: a.id,
                text: a.baslik || a.uyari_tipi || 'Sistem Uyarısı',
                tip: a.seviye === 'krt' ? 'kirmizi' : 'sari',
                zarar: 0,
                neden: a.mesaj || 'Analiz bekleniyor.'
            }));

            setPing(Math.round(performance.now() - t0));
            setStats({
                ciro: data.ciro || 0,
                maliyet: data.maliyet || 0,
                personel: data.personel || 0,
                fire: 0,
                yukleniyor: false
            });
            setAlarms(alarmlar);
        } catch (err) {
            console.error('Karargah veri hatası:', err);
            setStats(prev => ({ ...prev, yukleniyor: false }));
        }
    }, []);

    useEffect(() => {
        veriCek();
        // Sadece ilgili tablolarda değişiklik olunca yenile (tüm DB değil)
        const kanal = supabase.channel('karargah-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'b2_kasa_hareketleri' }, () => { if (!document.hidden) veriCek(); })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'b1_sistem_uyarilari' }, () => { if (!document.hidden) veriCek(); })
            .subscribe();
        return () => { supabase.removeChannel(kanal); };
    }, [veriCek]);

    return {
        stats, alarms, ping,
        commandText, setCommandText, hizliGorevAtama,
        aiSorgu, setAiSorgu, isAiLoading, aiAnalizBaslat, aiSonuc,
        simulasyon, setSimulasyon,
        mesaj
    };
}
