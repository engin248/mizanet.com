'use client';
import { useState } from 'react';
import {
    Shirt, Plus, Search, AlertTriangle, CheckCircle2, Factory, Scissors,
    Trash2, Eye, Lock, QrCode, ClipboardList, Zap, ShieldAlert,
    Clock, Gauge, ChevronRight, Layers, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function ModelhaneMainContainer() {
    const isAdmin = true;

    // --- MOCK VERILER (Mimari için) ---
    const [sekmeler] = useState(['Dikim Onayı Bekleyenler (M3\'ten)', 'Teknik Analiz', 'Prova/Numune Geçmişi', 'Riskli Modeller']);
    const [aktifSekme, setAktifSekme] = useState(0);

    const m3Talepleri = [
        { id: 1, baslik: 'Paraşüt Kargo Pantolon', kodu: 'MDL-KRG-001', adet: 'Numune 1/1', onaylayan: 'Kalıphane (M3)' }
    ];

    const teknikAnalizListesi = [
        {
            id: 1, kodu: 'PR-KPM-992', ad: 'Kadın Deri Ceket', parcasi: 18,
            zorluk: 'Yüksek', ozelMakine: true, iscilikSuresi: '145 dk',
            hataRiski: '%25', riskDurumu: 'kritik',
            kapsam: 'Deri Çift İğne Özel Makine',
            durumLabel: 'Riskli (Özel Makine + Zorluk)', durumColor: 'text-rose-400',
            bgKutu: 'bg-rose-500/10 border-rose-500/30'
        },
        {
            id: 2, kodu: 'PR-TSH-004', ad: 'Oversize Baskılı Tişört', parcasi: 4,
            zorluk: 'Düşük', ozelMakine: false, iscilikSuresi: '12 dk',
            hataRiski: '%2', riskDurumu: 'guvenli',
            kapsam: 'Düz Overlok, Reçme',
            durumLabel: 'Üretime Hazır (M5\'e Aktar)', durumColor: 'text-emerald-400',
            bgKutu: 'bg-[#0d1117] border-[#30363d] hover:bg-[#0b121a]'
        }
    ];

    if (!isAdmin) {
        return (
            <div className="p-12 text-center bg-rose-950/20 shadow-2xl rounded-2xl m-8 border-2 border-rose-900/50">
                <Lock size={48} className="mx-auto mb-4 text-rose-500" />
                <h2 className="text-xl font-black text-rose-500 uppercase tracking-widest">YETKİSİZ GİRİŞ (M4)</h2>
                <p className="text-rose-300 font-bold mt-2">Bu modül Teknik İnceleme ve Modelhane personeline özeldir.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans bg-[#0d1117] text-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6" style={{ animation: 'fadeUp 0.4s ease-out' }}>

                {/* 1. BAŞLIK VE HEDEF GÖSTERİCİ */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[#21262d] pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-500/30">
                            <Shirt size={24} className="text-purple-50" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight m-0 uppercase flex items-center gap-3">
                                M4: Modelhane ve Teknik Analiz
                            </h1>
                            <p className="text-xs font-bold text-purple-300 mt-1 uppercase tracking-wider flex items-center gap-2">
                                <ShieldAlert size={14} /> Aşama 4 Teknik Kurallar: (Zor Model + Özel Makine = RİSK)
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2">
                            <Plus size={16} /> NUMUNE DİKİM FORMU Aç
                        </button>
                    </div>
                </div>

                {/* 2. TEKNİK ANALİZ (5 SORU) KPI'LARI */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
                    {[
                        { label: 'Şu Anki Numune Yükü', val: '12', desc: 'Dikilen Numuneler', color: 'text-purple-400', icon: Shirt },
                        { label: 'M3 Kalıp Bekleyen', val: '4', desc: 'Onay Bekliyor', color: 'text-blue-400', icon: FileText },
                        { label: 'Ort. İşçilik Süresi', val: '42 dk', desc: 'Tüm Modeller Ortalaması', color: 'text-emerald-400', icon: Clock },
                        { label: 'Özel Makine İhtiyacı', val: '2', desc: 'Kritik Darboğaz Riski', color: 'text-amber-400', icon: Factory },
                        { label: 'İmalat Hatası Öngörüsü', val: '%8.4', desc: 'Karargah Risk Ortalaması', color: 'text-rose-400', icon: AlertTriangle }
                    ].map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={i} className="bg-[#161b22] border border-[#21262d] flex flex-col justify-between rounded-xl p-4 shadow-md">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[9px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                                    <Icon size={14} className={s.color} />
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white mt-1 border-b border-[#30363d] pb-1">{s.val}</div>
                                    <div className="text-[10px] text-[#8b949e] font-semibold mt-2">{s.desc}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 3. İKİLİ PANE (SOL: M3 KALIP ONAYLARI, SAĞ: TEKNİK BİLGİ/ANALİZ LİSTESİ) */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">

                    {/* SOL PANEL (M3'TEN GELEN TALEPLER - NUMUNE İÇİN) */}
                    <div className="xl:col-span-1 bg-[#161b22] border border-[#21262d] rounded-xl flex flex-col h-[600px]">
                        <div className="p-4 border-b border-[#21262d]">
                            <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                                <Scissors size={14} /> M3 Kalıphane Çıktıları
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {m3Talepleri.map(talep => (
                                <div key={talep.id} className="bg-[#0d1117] border border-blue-500/30 p-3 rounded-lg flex flex-col gap-2">
                                    <div className="text-[10px] text-blue-400 font-bold uppercase">NUMUNE DİKİM EMRİ</div>
                                    <h3 className="text-sm font-bold text-white">{talep.baslik}</h3>
                                    <div className="text-[11px] text-[#8b949e] bg-[#21262d] p-1.5 rounded flex justify-between">
                                        <span>Kod: <span className="text-white">{talep.kodu}</span></span>
                                        <span className="text-purple-400">{talep.adet}</span>
                                    </div>
                                    <p className="text-[10px] text-[#8b949e] italic mb-1">Onaylayan: {talep.onaylayan}</p>
                                    <button className="w-full text-[10px] font-bold py-2 bg-purple-600 hover:bg-purple-500 transition-colors border-2 border-purple-500 rounded text-white shadow-lg shadow-purple-500/20">
                                        DİKİME BAŞLA (SAYAÇ)
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ PANEL (TEKNİK ANALİZ VE 5 SORU RAPORLARI) */}
                    <div className="xl:col-span-3 flex flex-col">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {sekmeler.map((s, i) => (
                                <button key={i} onClick={() => setAktifSekme(i)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${aktifSekme === i ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50' : 'bg-[#161b22] text-[#8b949e] border border-[#21262d] hover:text-white'
                                    }`}>
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="bg-[#161b22] border border-[#21262d] rounded-xl flex-1 p-4 overflow-y-auto">
                            <div className="relative mb-4 w-full max-w-md">
                                <Search className="absolute left-3 top-2.5 text-[#8b949e]" size={14} />
                                <input type="text" placeholder="Model Kodu veya Adı..." className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-purple-500 outline-none transition-colors" />
                            </div>

                            <div className="space-y-3">
                                {teknikAnalizListesi.map((k, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between gap-4 transition-colors ${k.bgKutu}`}>

                                        {/* Model Kimliği */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[9px] font-black uppercase bg-[#21262d] text-white px-2 py-0.5 rounded border border-[#30363d]">{k.kodu}</span>
                                                {k.riskDurumu === 'kritik' && <span className="text-[9px] font-black uppercase bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.4)] animate-pulse">KRİTİK RİSK (Aşama 4 İptali Gerekebilir)</span>}
                                            </div>
                                            <h3 className="text-sm font-bold text-white tracking-wide">{k.ad}</h3>
                                            <p className="text-[11px] text-[#8b949e] mt-2 mb-1 font-mono">{k.kapsam}</p>
                                        </div>

                                        {/* Analiz Matrixi (AŞAMA 4: Teknik 5 Soru) */}
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-l border-[#21262d] pl-4 shrink-0">
                                            <div className="flex flex-col gap-1 justify-center">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Parça / Zorluk</span>
                                                <span className="text-[12px] font-mono text-white">{k.parcasi} Prç. / <span className={k.zorluk === 'Yüksek' ? 'text-amber-400' : 'text-emerald-400'}>{k.zorluk}</span></span>
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center bg-[#0d1117] px-2 rounded">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">İşçilik Süresi</span>
                                                <span className="text-[15px] font-mono font-bold text-white flex items-center gap-1">
                                                    <Clock size={12} className="text-purple-400" /> {k.iscilikSuresi}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Özel Makine</span>
                                                <span className={`text-[12px] font-mono font-bold ${k.ozelMakine ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                    {k.ozelMakine ? 'EVET (Darboğaz Riski)' : 'HAYIR (Standart Bant)'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center">
                                                <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Hata/İade Riski</span>
                                                <span className={`text-[15px] font-mono font-bold ${parseFloat(k.hataRiski) > 10 ? 'text-rose-400' : 'text-emerald-400'} flex items-center gap-1`}>
                                                    <Gauge size={12} /> {k.hataRiski}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Aksiyon Barı */}
                                        <div className="flex flex-col justify-center items-end gap-2 shrink-0 border-l border-[#21262d] pl-4">
                                            <span className={`text-[10px] font-bold uppercase tracking-wide mb-1 ${k.durumColor}`}>{k.durumLabel}</span>

                                            {k.riskDurumu === 'kritik' ? (
                                                <button className="text-[10px] w-full font-bold text-center text-white bg-rose-600/80 hover:bg-rose-500 border border-rose-500/50 px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-md shadow-rose-500/20">
                                                    M1 BEYİNE GERİ GÖNDER (İPTAL)
                                                </button>
                                            ) : (
                                                <Link href="/kesim" className="text-[10px] font-bold text-center text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 rounded-lg transition-colors border border-emerald-500/20 border-b-emerald-500/50 flex items-center justify-center gap-1 w-full">
                                                    M5 KESİM SÜRECİNİ BAŞLAT <ChevronRight size={14} />
                                                </Link>
                                            )}
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
