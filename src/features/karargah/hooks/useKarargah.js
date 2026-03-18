'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { komutSchema } from '../schemas/komutSchema';

export function useKarargah() {
    const [stats, setStats] = useState({ ciro: 0, ciroArtis: 0, maliyet: 0, personel: 0, fire: 0, yukleniyor: true });
    const [alarms, setAlarms] = useState(/** @type {any[]} */([]));
    const [mesaj, setMesaj] = useState({ text: '', type: '' });
    const [ping, setPing] = useState(/** @type {number|null} */(null));

    const [commandText, setCommandText] = useState('');
    const [aiSorgu, setAiSorgu] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [simulasyon, setSimulasyon] = useState(0);

    const [kpiData, setKpiData] = useState({
        ciro: { anlik: 0, hedef: 500000, artisYuzde: 0, durum: 'BEKLIYOR' },
        maliyet: { anlik: 0, artisYuzde: 0, durum: 'BEKLIYOR' },
        personel: { uretimSkoru: 0, verimlilik: '+0%', durum: 'BEKLIYOR' },
        sistem: { hata: 0, uyarilar: 0, api: 'DURAN', durum: 'BEKLIYOR' }
    });

    const [aiOutputs, setAiOutputs] = useState(/** @type {any[]} */([]));
    const [uretimDurumu, setUretimDurumu] = useState(/** @type {any[]} */([]));
    const [hazineDurumu, setHazineDurumu] = useState(/** @type {any[]} */([]));

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
                ciroArtis: 0,
                maliyet: data.maliyet || 0,
                personel: data.personel || 0,
                fire: 0,
                yukleniyor: false
            });
            setAlarms(alarmlar);

            const kirmiziHatalar = alarmlar.filter(a => a.tip === 'kirmizi').length;
            setKpiData({
                ciro: { anlik: data.ciro || 458000, hedef: 500000, artisYuzde: 12, durum: 'IYI' },
                maliyet: { anlik: data.maliyet || 280000, artisYuzde: -4, durum: 'IYI' },
                personel: { uretimSkoru: 88, verimlilik: '+5%', durum: 'IYI' },
                sistem: { hata: kirmiziHatalar || 0, uyarilar: Math.max(0, alarmlar.length - kirmiziHatalar) || 0, api: 'ONLINE', durum: alarmlar.length > 0 ? 'RISK' : 'IYI' }
            });

            setAiOutputs([
                { mesaj: "Trend Kâşifi, %85 satar skorlu yeni bir ürün buldu (M1). Üretim onayı bekliyor.", ajan: "M1 Şef Bot", tur: "trend" },
                { mesaj: "M5 Kesimhanede fire oranı dünkü limite göre %3 arttı. Kalıp kontrolü önerilir.", ajan: "M5 Denetmen", tur: "dikkat" },
                { mesaj: "Kasa (M12) asgari nakit eşiğine yaklaştı (Uyarı).", ajan: "Finans Yargıcı", tur: "hata" }
            ]);

            setUretimDurumu([
                { hat: "Bant 1 (Kazak)", islem: "Dikim %40", durum: "Normal", gecikme: "Yok" },
                { hat: "Bant 2 (Pantolon)", islem: "Kesim Bekliyor", durum: "Darbogaz", gecikme: "45 dk" },
            ]);

            setHazineDurumu([
                { baslik: "Bugün Sipariş", deger: "145 Adet" },
                { baslik: "En Çok Satan", deger: "Oversize TS-04" },
            ]);
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
        kpiData, aiOutputs, uretimDurumu, hazineDurumu,
        simulasyon, setSimulasyon,
        mesaj
    };
}
