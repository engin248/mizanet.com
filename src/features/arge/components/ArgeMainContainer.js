'use client';
import { useState, useEffect, useRef } from 'react';
import {
    TrendingUp, Plus, CheckCircle2, XCircle, Clock, AlertTriangle,
    Bot, ChevronRight, Search, BarChart3, Tag, Eye, Lock, Camera,
    Network, Cpu, Database, Zap, Layers, RefreshCcw, Activity
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { debounce } from 'lodash';
import { cevrimeKuyrugaAl } from '@/lib/offlineKuyruk';

export default function ArgeMainContainer() {
    // YETKI KONTROLU
    const { kullanici, yukleniyor } = useAuth();
    const [yetkiliMi, setYetkiliMi] = useState(false);

    // STATE LER
    const [sekmeler] = useState(['Canlı İstihbarat (AI)', 'İncelenen Trendler', 'Onaylı/Üretime Gidenler', 'Reddedilen/Riskli']);
    const [aktifSekme, setAktifSekme] = useState(0);
    const [trendler, setTrendler] = useState([]);
    const [agentLoglari, setAgentLoglari] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let uretimPin = !!sessionStorage.getItem('sb47_uretim_token');
        const erisebilir = kullanici?.grup === 'tam' || uretimPin;
        setYetkiliMi(erisebilir);

        if (!erisebilir) {
            setLoading(false);
            return;
        }

        const verileriCek = async () => {
            setLoading(true);
            try {
                // Supabase'den trend verilerini çek
                const { data: trendData, error: trendHata } = await supabase
                    .from('b1_arge_trendler')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (!trendHata && trendData) setTrendler(trendData);

                // Supabase'den logları çek
                const { data: logData, error: logHata } = await supabase
                    .from('b1_agent_loglari')
                    .select('id, ajan_adi, islem_tipi, mesaj, created_at, sonuc')
                    .eq('ajan_adi', 'Trend Kâşifi')
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (!logHata && logData) setAgentLoglari(logData);

            } catch (err) {
                console.error("Veri çekme hatası:", err);
            }
            setLoading(false);
        };

        verileriCek();

        // GERCEK ZAMANLI ABONELIKLER
        const handleTrendChanges = debounce((payload) => {
            if (payload.eventType === 'INSERT') {
                setTrendler(prev => [payload.new, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
                setTrendler(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
            } else if (payload.eventType === 'DELETE') {
                setTrendler(prev => prev.filter(t => t.id !== payload.old.id));
            }
        }, 1000);

        const kanal = supabase.channel('m1-arge-gercek-zamanli')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'b1_arge_trendler' }, handleTrendChanges)
            .subscribe();

        const handleLogChanges = debounce((payload) => {
            if (payload.new && payload.new.ajan_adi === 'Trend Kâşifi') {
                setAgentLoglari(prev => [payload.new, ...prev].slice(0, 5));
            }
        }, 1000);

        const kanalLog = supabase.channel('m1-arge-log-gercek-zamanli')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'b1_agent_loglari' }, handleLogChanges)
            .subscribe();

        return () => {
            handleTrendChanges.cancel();
            handleLogChanges.cancel();
            supabase.removeChannel(kanal);
            supabase.removeChannel(kanalLog);
        }
    }, [kullanici]);

    // Trend Onay / İptal Aksiyonu
    const durumGuncelle = async (id, yeniDurum) => {
        try {
            const { error } = await supabase
                .from('b1_arge_trendler')
                .update({ durum: yeniDurum })
                .eq('id', id);

            if (!error && yeniDurum === 'onaylandi') {
                const onaylayanAd = kullanici?.ad || 'Atölye Lideri (PIN)';
                await supabase.from('b1_agent_loglari').insert([{
                    ajan_adi: 'Trend Kâşifi',
                    islem_tipi: 'Trend Onaylandı',
                    mesaj: `Trend Onaylandı! Onaylayan: ${onaylayanAd}`,
                    sonuc: 'basarili',
                    created_at: new Date().toISOString()
                }]);
            }
        } catch (err) {
            console.error(err);
        }
    };


    if (yukleniyor || loading) {
        return <div className="p-12 text-center text-indigo-400 font-bold tracking-widest animate-pulse">SUPABASE BAĞLANTISI KURULUYOR...</div>;
    }

    if (!yetkiliMi) {
        return (
            <div className="p-12 text-center bg-rose-950/20 border-2 border-rose-900/50 rounded-2xl m-8 shadow-2xl">
                <Lock size={48} className="mx-auto mb-4 text-rose-500" />
                <h2 className="text-xl font-black text-rose-500 uppercase tracking-widest">YETKİSİZ GİRİŞ ENGELLENDİ</h2>
                <p className="text-rose-300 font-bold mt-2">M1 Ar-Ge Verileri THE ORDER PİN yetkisi gerektirir.</p>
            </div>
        );
    }

    // Aktif Sekmeye Göre Filtre
    // 0: Hepsi (Canlı İstihbarat)
    // 1: İncelenen (inceleniyor)
    // 2: Onaylı (onaylandi)
    // 3: İptal (iptal)
    let gosterilenTrendler = trendler;
    if (aktifSekme === 1) gosterilenTrendler = trendler.filter(t => t.durum === 'inceleniyor');
    if (aktifSekme === 2) gosterilenTrendler = trendler.filter(t => t.durum === 'onaylandi');
    if (aktifSekme === 3) gosterilenTrendler = trendler.filter(t => t.durum === 'iptal');

    // Analitik Metrikler
    const incelenenSayisi = trendler.filter(t => t.durum === 'inceleniyor').length;
    const onaylananSayisi = trendler.filter(t => t.durum === 'onaylandi').length;
    const iptalSayisi = trendler.filter(t => t.durum === 'iptal').length;

    return (
        <div className="min-h-screen font-sans bg-[#0d1117] text-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6" style={{ animation: 'fadeUp 0.4s ease-out' }}>

                {/* 1. BAŞLIK VE AI DURUMU */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[#21262d] pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-500/30">
                            <Search size={24} className="text-indigo-50" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight m-0 uppercase flex items-center gap-3">
                                M1: Ar-Ge ve İstihbarat Merkezi
                            </h1>
                            <p className="text-xs font-bold text-indigo-300 mt-1 uppercase tracking-wider">
                                Aşama 1: Sinyal Yakalama & Eleme (CANLI VERİ AKIŞI ETKİN)
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="bg-[#122b27] text-emerald-400 border border-[#1e4a43] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2">
                            <Bot size={14} /> Supabase Realtime: AKTİF
                        </span>
                    </div>
                </div>

                {/* 2. ENTEGRE KARAR MOTORU KPI'LARI */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {[
                        { label: 'Toplam Taranan Trend', val: trendler.length.toString(), desc: 'Supabase b1_arge_trendler', color: 'text-blue-400', icon: Activity },
                        { label: 'İncelenen Modeller', val: incelenenSayisi.toString(), desc: 'Onay Bekliyor', color: 'text-amber-400', icon: TrendingUp },
                        { label: 'ÜRETİM KARARI', val: onaylananSayisi.toString(), desc: 'Kesinleşen Model', color: 'text-emerald-400', icon: CheckCircle2 },
                        { label: 'Yüksek Risk (İptal)', val: iptalSayisi.toString(), desc: 'Kalite/Risk Sebebiyle', color: 'text-rose-400', icon: AlertTriangle }
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col justify-between shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                                    <Icon size={14} className={s.color} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white">{s.val}</div>
                                    <div className="text-[10px] text-[#8b949e] font-semibold mt-1">{s.desc}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 3. İKİLİ PANE (SOL: CANLI TARAMA, SAĞ: YAPAY ZEKA FİLTRESİ) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                    {/* SOL PANEL (CANLI AJAN AKIŞI) */}
                    <div className="xl:col-span-1 bg-[#161b22] border border-[#21262d] rounded-xl flex flex-col h-[600px]">
                        <div className="p-4 border-b border-[#21262d] flex justify-between items-center">
                            <h2 className="text-xs font-bold text-[#c9d1d9] uppercase tracking-widest flex items-center gap-2">
                                <Network size={14} className="text-indigo-400" /> Ajan Logları (Supabase)
                            </h2>
                            <span className="flex w-2 h-2">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 styled-scroll">
                            {agentLoglari.length === 0 && <p className="text-[#8b949e] text-xs text-center">Log bekleniyor...</p>}
                            {agentLoglari.map((log) => (
                                <div key={log.id} className="text-[11px] bg-[#0d1117] border border-[#30363d] p-3 rounded-lg text-[#8b949e]">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-blue-400 font-mono">[{log.islem_tipi}]</span>
                                        <span className="text-[9px] opacity-70">{new Date(log.created_at).toLocaleTimeString('tr-TR')}</span>
                                    </div>
                                    <span className="text-white font-medium">{log.mesaj}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ PANEL (KARAR SÜRECİ & SEKMELER) */}
                    <div className="xl:col-span-2 flex flex-col">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {sekmeler.map((s, i) => (
                                <button key={i} onClick={() => setAktifSekme(i)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${aktifSekme === i ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/50' : 'bg-[#161b22] text-[#8b949e] border border-[#21262d] hover:text-white'
                                    }`}>
                                    {s} {aktifSekme === i && `(${gosterilenTrendler.length})`}
                                </button>
                            ))}
                        </div>

                        <div className="bg-[#161b22] border border-[#21262d] rounded-xl flex-1 p-4 overflow-y-auto h-[600px]">
                            {gosterilenTrendler.length === 0 && <p className="text-center text-[#8b949e] mt-20">Bu sekmede kayıt bulunamadı.</p>}

                            <div className="space-y-3">
                                {gosterilenTrendler.map((t) => (
                                    <div key={t.id} className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${t.durum === 'onaylandi' ? 'border-emerald-500/20 bg-emerald-500/5' :
                                        t.durum === 'iptal' ? 'border-rose-500/20 bg-rose-500/5' :
                                            'border-[#30363d] bg-[#0d1117] hover:bg-[#0b121a]'
                                        }`}>

                                        {/* Üst Kısım: Başlık & Durum */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-black uppercase bg-[#21262d] text-[#c9d1d9] px-2 py-0.5 rounded">{t.platform}</span>
                                                    {(t.durum === 'onaylandi') && <span className="text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">M2 KUMAŞ ONAYI BEKLİYOR</span>}
                                                </div>
                                                <h3 className="text-sm font-bold text-white">{t.baslik}</h3>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-xs font-black uppercase px-3 py-1 rounded border ${t.durum === 'onaylandi' ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10' :
                                                    t.durum === 'iptal' ? 'text-rose-400 border-rose-500/50 bg-rose-500/10' :
                                                        'text-amber-400 border-amber-500/50 bg-amber-500/10'
                                                    }`}>
                                                    {t.durum}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Alt Kısım: Veriler */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-t border-[#21262d] pt-3">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Kategori</span>
                                                <span className="text-[11px] font-mono text-white">{t.kategori}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Hedef Kitle</span>
                                                <span className="text-[11px] font-mono font-bold text-emerald-400">{t.hedef_kitle}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Talep Skoru</span>
                                                <span className="text-[11px] font-mono text-indigo-400 font-bold">{t.talep_skoru} / 10</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Platform</span>
                                                <span className="text-[11px] font-mono text-white">{t.platform}</span>
                                            </div>
                                        </div>

                                        {/* Aksiyon Barı */}
                                        <div className="flex justify-between items-center mt-1">
                                            <div className="text-[9px] text-[#8b949e] italic max-w-[60%] truncate">
                                                Ekleme: {new Date(t.created_at).toLocaleDateString('tr-TR')}
                                            </div>
                                            <div className="flex gap-2">
                                                {t.durum === 'inceleniyor' && (
                                                    <>
                                                        <button onClick={() => durumGuncelle(t.id, 'iptal')} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded transition-colors">İPTAL ET</button>
                                                        <button onClick={() => durumGuncelle(t.id, 'onaylandi')} className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                                                            <CheckCircle2 size={12} /> ONAYLA (M2)
                                                        </button>
                                                    </>
                                                )}
                                                {t.durum === 'onaylandi' && (
                                                    <Link href="/kumas" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                                                        İLERLE: M2 KUMAŞ SEÇİMİ <ChevronRight size={12} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
