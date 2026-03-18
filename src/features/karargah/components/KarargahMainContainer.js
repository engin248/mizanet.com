'use client';
import {
    Activity, ShieldCheck, Zap, Bot, Camera, ArrowRight, AlertCircle, Send,
    MessageSquare, Cpu, Network, ChevronRight, Search, BarChart3, Scissors,
    Factory, ShoppingBag, Package, Users, Wallet, FileText, Settings,
    Lock, Palette, ClipboardCheck, BookOpen, Eye, Radio, Shirt, Ruler, Layers,
    Boxes, UserCircle, Receipt, PieChart, Database, MonitorPlay, TrendingUp, AlertTriangle, PlayCircle, Clock, CheckCircle2, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useKarargah } from '../hooks/useKarargah';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import AjanKomutaGostergesi from '@/components/AjanKomutaGostergesi';
import { ServerCrash, Gauge } from 'lucide-react';

const GUN_45_ONCE = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString();

export function KarargahMainContainer() {
    const { kullanici } = useAuth();
    const {
        stats, alarms, ping,
        commandText, setCommandText, hizliGorevAtama,
        aiSorgu, setAiSorgu, isAiLoading, aiAnalizBaslat, aiSonuc,
        aiOnerileri, canliUretim,
        simulasyon, setSimulasyon,
        mesaj
    } = useKarargah();

    const [kameraStreamDurum, setKameraStreamDurum] = useState('aktif');
    const isAdmin = true;

    // --- GERCEK VERILER (useKarargah Hook'undan gelir) ---
    // Mevcut durumları mocklamak yerine dinamik renderlayacağız
    const renderAiOnerileri = aiOnerileri?.length > 0 ? aiOnerileri : [
        { mesaj: "Bekleyen kritik AI uyarısı bulunamadı. Sistem optimum seviyede çalışıyor.", tur: "firsat", skor: 10 }
    ];

    const renderCanliUretim = canliUretim?.length > 0 ? canliUretim : [
        { model: "Bant Boş", asama: "Bekleniyor", durum: "normal", msj: "Sistem veri akışı bekleniyor...", time: "00:00" }
    ];

    return (
        <div className="min-h-screen font-sans bg-[#0d1117] text-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6" style={{ animation: 'fadeUp 0.4s ease-out' }}>

                {/* 1. ÜST PANEL: KPI VE DURUM (KARARGAH ANA GÖSTERGELERİ) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Ciro / Karlılık */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-bold text-[#8b949e] uppercase tracking-wider">Bugün Net Ciro</span>
                            <TrendingUp size={16} className="text-emerald-400" />
                        </div>
                        <span className="text-3xl font-black text-white">₺{stats?.ciro ? stats.ciro.toLocaleString('tr-TR') : '0'}</span>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-emerald-400">
                            <span>{stats?.ciroArtis ? `+ ₺${stats.ciroArtis}` : 'Hesaplanıyor...'} (Düne Göre)</span>
                        </div>
                    </div>

                    {/* Ortalama Marj (Çok Kritik) */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-bold text-[#8b949e] uppercase tracking-wider">Maliyet Gideri</span>
                            <PieChart size={16} className="text-amber-400" />
                        </div>
                        <span className="text-3xl font-black text-amber-400">₺{stats?.maliyet ? stats.maliyet.toLocaleString('tr-TR') : '0'}</span>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-amber-500/80">
                            <span>Sistem Gözetimi Altında</span>
                        </div>
                    </div>

                    {/* Aktif Üretim Bandı */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-bold text-[#8b949e] uppercase tracking-wider">Personel Gideri</span>
                            <Factory size={16} className="text-blue-400" />
                        </div>
                        <span className="text-3xl font-black text-white">₺{stats?.personel ? stats.personel.toLocaleString('tr-TR') : '0'}</span>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-blue-400">
                            <span>Performans Takibi Aktif</span>
                        </div>
                    </div>

                    {/* Kırmızı Alarm (Hatalar/Fireler) */}
                    <div className="bg-[#161b22] border border-red-500/30 rounded-xl p-5 shadow-lg flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[12px] font-bold border border-red-500/50 bg-red-500/10 text-red-400 px-2 py-0.5 rounded uppercase tracking-wider">Kritik Uyarı</span>
                            <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                        </div>
                        <span className="text-3xl font-black text-white">{alarms?.length || 0} <span className="text-sm font-normal text-red-400">Alarm</span></span>
                        <div className="flex items-center gap-2 mt-2 text-[11px] font-medium text-red-400/80">
                            <span className="truncate">{alarms?.length > 0 ? alarms[0].text : 'Sistem güvenli seviyede'}</span>
                        </div>
                    </div>
                </div>

                {/* 2. ORTA PANEL: AI YÖNETİMİ & CANLI ÜRETİM AKIŞI */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                    {/* SOL (2 KOLON) - AI BEYİN (Bugün ne yapmalısın?) */}
                    <div className="xl:col-span-2 flex flex-col gap-4">
                        <div className="bg-[#122b27] border border-[#1e4a43] rounded-xl p-6 shadow-md h-full flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                    <Bot size={18} /> Ajan Karar Motoru (AI Önerileri)
                                </h2>
                                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 line-clamp-1 truncate">CANLI BAĞLANTI AKTİF</span>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <input value={aiSorgu} onChange={(e) => setAiSorgu(e.target.value)} placeholder="Yapay Zekaya Pazar Analizi veya Rapor İsteyin..."
                                    className="flex-1 bg-[#0b1d1a] border border-[#1e4a43] rounded-lg px-4 py-3 text-sm text-white placeholder-emerald-600/50 outline-none focus:border-emerald-500/50 transition-colors" />
                                <button onClick={aiAnalizBaslat} disabled={isAiLoading}
                                    className="px-6 py-3 font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-40 flex items-center gap-2 max-h-[46px]">
                                    {isAiLoading ? 'ANALİZ EDİLİYOR...' : 'ANALİZ BAŞLAT'}
                                </button>
                            </div>

                            {aiSonuc && (
                                <div className="bg-[#0b1d1a] border border-emerald-500/30 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-emerald-100 leading-relaxed whitespace-pre-wrap">{aiSonuc}</p>
                                </div>
                            )}

                            <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px] styled-scroll pr-2">
                                {renderAiOnerileri.map((oneri, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${oneri.tur === 'risk' ? 'bg-[#2b1216] border-[#4a1e24] hover:bg-[#3d1a20]' :
                                        oneri.tur === 'firsat' ? 'bg-[#122b17] border-[#1e4a27] hover:bg-[#1a3d21]' :
                                            'bg-[#2b2412] border-[#4a3f1e] hover:bg-[#3d331a]'
                                        }`}>
                                        <div className="flex items-start gap-4">
                                            <div className="mt-0.5 shrink-0">
                                                {oneri.tur === 'risk' ? <AlertTriangle size={24} className="text-red-400" /> :
                                                    oneri.tur === 'firsat' ? <TrendingUp size={24} className="text-emerald-400" /> :
                                                        <AlertCircle size={24} className="text-amber-400" />}
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-semibold text-white/90 leading-relaxed mb-1">{oneri.mesaj}</p>
                                                <span className={`text-[10px] font-black uppercase tracking-wider ${oneri.tur === 'risk' ? 'text-red-400' :
                                                    oneri.tur === 'firsat' ? 'text-emerald-400' : 'text-amber-400'
                                                    }`}>Analiz Etkisi Skoru: {oneri.skor}/10</span>
                                            </div>
                                        </div>
                                        {oneri.tur !== 'firsat' && oneri.skor !== 10 && (
                                            <div className="shrink-0 pl-4 border-l border-white/10 hidden sm:block">
                                                <button className={`text-xs font-bold px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${oneri.tur === 'risk' ? 'bg-red-500/20 hover:bg-red-500/40 border-red-500/50 text-red-200' :
                                                    oneri.tur === 'firsat' ? 'bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-500/50 text-emerald-200' :
                                                        'bg-amber-500/20 hover:bg-amber-500/40 border-amber-500/50 text-amber-200'
                                                    }`}>AKSİYON AL</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SAĞ (1 KOLON) - CANLI ÜRETİM İZLEME */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 shadow-md h-full flex flex-col">
                        <div className="flex items-center justify-between mb-5 border-b border-[#30363d] pb-4">
                            <h2 className="text-sm font-bold text-[#c9d1d9] uppercase tracking-widest flex items-center gap-2">
                                <Activity size={18} className="text-blue-400" /> Üretim Hattı (Canlı)
                            </h2>
                            <Link href="/uretim" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-bold whitespace-nowrap">Tümünü Gör <ChevronRight size={12} /></Link>
                        </div>

                        <div className="flex-1 space-y-3 overflow-y-auto max-h-[350px] styled-scroll pr-2">
                            {renderCanliUretim.map((islem, idx) => (
                                <div key={idx} className="bg-[#0d1117] border border-[#30363d] rounded-lg p-3 flex flex-col gap-2 relative overflow-hidden hover:border-[#8b949e] transition-colors cursor-pointer group">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${islem.durum === 'darbogaz' ? 'bg-red-500/80 shadow-[0_0_10px_red]' :
                                        islem.durum === 'gecikti' ? 'bg-amber-500/80 shadow-[0_0_10px_orange]' : 'bg-emerald-500/80 shadow-[0_0_10px_green]'
                                        }`}></div>
                                    <div className="flex justify-between items-center pl-2">
                                        <span className="text-[12px] font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">{islem.model}</span>
                                        <span className="text-[10px] text-[#8b949e] font-mono bg-[#21262d] px-1.5 py-0.5 rounded">{islem.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center pl-2">
                                        <span className="text-[10px] text-[#c9d1d9] font-medium tracking-wide bg-[#161b22] px-2 py-0.5 border border-[#30363d] rounded-md">{islem.asama}</span>
                                        <span className={`text-[9px] font-black uppercase tracking-wider text-right line-clamp-1 ml-2 ${islem.durum === 'darbogaz' ? 'text-red-400' :
                                            islem.durum === 'gecikti' ? 'text-amber-400' : 'text-emerald-400'
                                            }`}>{islem.msj}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. ALT PANEL: SİSTEM BAĞLANTILARI KATMANI (M1 -> M22) */}
                <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 shadow-md">
                    <h2 className="text-sm font-bold text-[#8b949e] uppercase tracking-widest mb-4 flex items-center justify-between border-b border-[#30363d] pb-4">
                        <span className="flex items-center gap-2"><Network size={18} className="text-indigo-400" /> Sinir Ağı Modülleri (Merkezî Geçiş Sistemi)</span>
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                        {/* Karargah Mimarisine uygun ana modüller */}
                        <Link href="/arge" className="group bg-[#0d1117] border border-[#30363d] hover:border-emerald-500/50 hover:bg-[#122b27] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Search size={22} className="text-[#8b949e] group-hover:text-emerald-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-emerald-400 uppercase tracking-widest text-center">M1<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Ar-Ge</span></span>
                        </Link>
                        <Link href="/kumas" className="group bg-[#0d1117] border border-[#30363d] hover:border-blue-500/50 hover:bg-[#112a46] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Layers size={22} className="text-[#8b949e] group-hover:text-blue-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-blue-400 uppercase tracking-widest text-center">M2<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Kumaş</span></span>
                        </Link>
                        <Link href="/kalip" className="group bg-[#0d1117] border border-[#30363d] hover:border-purple-500/50 hover:bg-[#201538] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Ruler size={22} className="text-[#8b949e] group-hover:text-purple-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-purple-400 uppercase tracking-widest text-center">M3<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Kalıp</span></span>
                        </Link>
                        <Link href="/modelhane" className="group bg-[#0d1117] border border-[#30363d] hover:border-pink-500/50 hover:bg-[#341624] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Shirt size={22} className="text-[#8b949e] group-hover:text-pink-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-pink-400 uppercase tracking-widest text-center">M4<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Modelhane</span></span>
                        </Link>
                        <Link href="/kesim" className="group bg-[#0d1117] border border-[#30363d] hover:border-amber-500/50 hover:bg-[#3b2813] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Scissors size={22} className="text-[#8b949e] group-hover:text-amber-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-amber-400 uppercase tracking-widest text-center">M5<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Kesim</span></span>
                        </Link>
                        <Link href="/imalat" className="group bg-[#0d1117] border border-[#30363d] hover:border-orange-500/50 hover:bg-[#381b11] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <Factory size={22} className="text-[#8b949e] group-hover:text-orange-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-orange-400 uppercase tracking-widest text-center">M6<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">İmalat/Bant</span></span>
                        </Link>
                        <Link href="/maliyet" className="group bg-[#0d1117] border border-[#30363d] hover:border-emerald-500/50 hover:bg-[#122b27] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <PieChart size={22} className="text-[#8b949e] group-hover:text-emerald-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-emerald-400 uppercase tracking-widest text-center">M7<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Maliyet</span></span>
                        </Link>
                        <Link href="/katalog" className="group bg-[#0d1117] border border-[#30363d] hover:border-indigo-500/50 hover:bg-[#171638] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-sm">
                            <ShoppingBag size={22} className="text-[#8b949e] group-hover:text-indigo-400 transition-colors" />
                            <span className="text-[11px] font-bold text-[#8b949e] group-hover:text-indigo-400 uppercase tracking-widest text-center">M9<br /><span className="text-white/80 group-hover:text-white capitalize tracking-normal font-semibold">Katalog</span></span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export { KarargahMainContainer as default };
