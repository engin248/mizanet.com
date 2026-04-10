'use client';
import { useState, useEffect } from 'react';
import {
    Layers, Plus, Search, AlertTriangle, CheckCircle2, Package, Scissors,
    Trash2, Eye, Lock, QrCode, Tag, ExternalLink, ChevronRight, Scale,
    Bell, Globe, User, Clock, Info, HelpCircle, Activity, Users, Database
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/core/auth';
import { useKumas } from '@/features/kumas/hooks/useKumas';

export default function KumasMainContainer() {
    const { kullanici } = useAuth();
    const {
        yetkiliMi, sekme, setSekme, kumaslar, m1Talepleri, firsatlar,
        loading, m3eAktar
    } = useKumas(kullanici);

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [fizibiliteModalAcik, setFizibiliteModalAcik] = useState(false);
    const [seciliTalep, setSeciliTalep] = useState(null);
    const [maliyetForm, setMaliyetForm] = useState({ kumasFiyat: '', kumasMiktar: '', iscilik: '', rakipSatis: '499.90' });

    const moduller = [
        { id: 1, ad: 'Karargâh', durum: 'normal' },
        { id: 2, ad: 'Ar-Ge', durum: 'dikkat' },
        { id: 3, ad: 'Kumaş', durum: 'normal' },
        { id: 4, ad: 'Modelhane', durum: 'normal' },
        { id: 5, ad: 'Kalıp', durum: 'normal' },
        { id: 6, ad: 'Kesimhane', durum: 'normal' },
        { id: 7, ad: 'İmalat', durum: 'normal' },
        { id: 8, ad: 'Maliyet', durum: 'normal' },
        { id: 9, ad: 'Muhasebe', durum: 'normal' },
        { id: 10, ad: 'Kasa', durum: 'normal' },
        { id: 11, ad: 'Stok', durum: 'sorun' },
        { id: 12, ad: 'Katalog', durum: 'normal' },
        { id: 13, ad: 'Siparişler', durum: 'normal' },
        { id: 14, ad: 'Müşteriler', durum: 'normal' },
        { id: 15, ad: 'Personel', durum: 'normal' },
        { id: 16, ad: 'Görevler', durum: 'normal' },
        { id: 17, ad: 'Kameralar', durum: 'normal' },
        { id: 18, ad: 'Ajanlar', durum: 'normal' },
        { id: 19, ad: 'Denetmen', durum: 'normal' },
        { id: 20, ad: 'Raporlar', durum: 'normal' },
        { id: 21, ad: 'Tasarım', durum: 'normal' },
        { id: 22, ad: 'Üretim', durum: 'normal' },
        { id: 23, ad: 'Güvenlik', durum: 'normal' },
        { id: 24, ad: 'Ayarlar', durum: 'normal' },
        { id: 25, ad: 'Giriş', durum: 'none' }
    ];

    const getStatusColor = (durum) => {
        if (durum === 'normal') return '#27AE60';
        if (durum === 'dikkat') return '#F39C12';
        if (durum === 'sorun') return '#E74C3C';
        return '#BDC3C7';
    };

    if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-[#F4F6F7] text-[#046A38] font-bold text-xl animate-pulse">SİSTEM YÜKLENİYOR...</div>;
    if (!yetkiliMi) return <div className="h-screen w-screen flex items-center justify-center bg-[#F4F6F7]"><div className="bg-white p-12 rounded-3xl shadow-2xl text-center border-t-8 border-[#E74C3C]"><Lock size={64} className="mx-auto text-[#E74C3C] mb-4" /><h2 className="text-2xl font-black text-[#2D3436]">YETKİSİZ ERİŞİM</h2><p className="text-[#8b949e] mt-2 font-bold">M2 MODÜLÜNE ERİŞİM YETKİNİZ BULUNMAMAKTADIR.</p></div></div>;

    const toplamMaliyet = (parseFloat(maliyetForm.kumasFiyat || 0) * parseFloat(maliyetForm.kumasMiktar || 0)) + parseFloat(maliyetForm.iscilik || 0);
    const karMarjiTutar = parseFloat(maliyetForm.rakipSatis || 0) - toplamMaliyet;
    const karMarjiYuzde = parseFloat(maliyetForm.rakipSatis || 0) > 0 ? ((karMarjiTutar / parseFloat(maliyetForm.rakipSatis)) * 100).toFixed(1) : 0;
    const karlilikUygun = karMarjiYuzde >= 40;

    return (
        <div className="flex flex-col h-screen w-full bg-[#F4F6F7] font-sans selection:bg-[#C8A951] selection:text-white">

            {/* ÜST BİLGİ BAR */}
            <header className="h-16 bg-[#046A38] flex items-center justify-between px-6 shadow-lg z-50 shrink-0">
                <div className="flex items-center gap-4 text-white">
                    <Layers className="text-[#C8A951]" size={28} />
                    <div>
                        <h1 className="text-lg font-black tracking-tight leading-none uppercase">Kumaş ve Malzeme</h1>
                        <p className="text-[10px] font-bold text-[#C8A951] mt-1 space-x-2">
                            <span>SİSTEM</span> <ChevronRight size={10} className="inline" /> <span>M2 TEDARİK</span>
                        </p>
                    </div>
                </div>

                <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F4F6F7]/50" size={16} />
                    <input
                        type="text"
                        placeholder="Hızlı Materyal veya Kod Arama..."
                        className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-12 pr-4 text-sm text-white placeholder:text-white/40 focus:bg-white/20 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-6">
                    <button className="relative text-[#C8A951] hover:scale-110 transition-transform">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E74C3C] rounded-full border-2 border-[#046A38]"></span>
                    </button>
                    <div className="flex items-center gap-3 border-l border-white/20 pl-6 text-white text-right hidden lg:flex">
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase">{kullanici?.ad || 'Admin'}</span>
                            <span className="text-[9px] font-bold text-[#C8A951]">KARARGÂH YÖNETİCİSİ</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#C8A951] flex items-center justify-center text-[#046A38] border-2 border-white/50">
                            <User size={24} />
                        </div>
                    </div>
                    <div className="text-white text-xs font-mono font-bold border-l border-white/20 pl-6 flex flex-col items-end">
                        <span>{currentTime.toLocaleDateString('tr-TR')}</span>
                        <span className="text-[#C8A951]">{currentTime.toLocaleTimeString('tr-TR')}</span>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                {/* SOL MENÜ */}
                <nav className="w-64 bg-white border-r border-[#046A38]/10 flex flex-col shrink-0">
                    <div className="p-4 border-b border-[#F4F6F7] flex items-center justify-between">
                        <span className="text-[10px] font-black tracking-widest text-[#046A38] uppercase">Modül Listesi</span>
                        <span className="text-[9px] bg-[#046A38]/10 text-[#046A38] px-2 py-0.5 rounded font-bold">V 2.0</span>
                    </div>
                    <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                        {moduller.map((m) => (
                            <button
                                key={m.id}
                                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F6F7] border-l-4 transition-all ${m.id === 3 ? 'bg-[#046A38]/5 border-[#046A38]' : 'border-transparent'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold text-[#8b949e] w-4">{m.id}</span>
                                    <span className={`text-xs font-bold ${m.id === 3 ? 'text-[#046A38]' : 'text-[#2D3436]'}`}>{m.ad}</span>
                                </div>
                                {m.durum !== 'none' && (
                                    <div
                                        className="w-2.5 h-2.5 rounded-full shadow-inner animate-pulse"
                                        style={{ backgroundColor: getStatusColor(m.durum), boxShadow: `0 0 8px ${getStatusColor(m.durum)}` }}
                                    ></div>
                                )}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* ANA ÇALIŞMA ALANI */}
                <main className="flex-1 flex flex-col bg-[#F4F6F7] p-6 lg:p-8 overflow-y-auto overflow-x-hidden">

                    {/* KPI CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { title: 'Aktif Materyal', val: '412', icon: <Package size={20} />, color: '#046A38' },
                            { title: 'Tedarik Riski', val: '14', icon: <AlertTriangle size={20} />, color: '#E74C3C' },
                            { title: 'Piyasa Fırsatı', val: '8', icon: <Tag size={20} />, color: '#F39C12' },
                            { title: 'Stok Verimliliği', val: '%88', icon: <Activity size={20} />, color: '#4F7CAC' }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-[#046A38]/5 hover:shadow-md transition-shadow relative overflow-hidden group">
                                <div className="absolute -right-2 -bottom-2 text-[#F4F6F7] opacity-60 group-hover:scale-125 transition-transform">
                                    {card.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase text-[#8b949e] tracking-widest">{card.title}</span>
                                <div className="text-3xl font-black mt-2" style={{ color: card.color }}>{card.val}</div>
                                <div className="mt-2 text-[9px] text-[#27AE60] font-bold">↑ SON 7 GÜN: +%2.4</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                        {/* LİSTE / TABLO ALANI */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-[#046A38]/5 overflow-hidden">
                                <div className="p-6 border-b border-[#F4F6F7] flex justify-between items-center">
                                    <h2 className="text-sm font-black text-[#046A38] uppercase tracking-wider">M2 Materyal Kütüphanesi</h2>
                                    <button className="bg-[#046A38] hover:bg-[#046A38]/90 text-[#F4F6F7] px-4 py-2 rounded-lg text-[10px] font-black shadow-sm flex items-center gap-2 transition-all">
                                        <Plus size={14} /> YENİ KAYIT
                                    </button>
                                </div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-[#F4F6F7] text-[10px] font-black text-[#8b949e] uppercase">
                                            <tr>
                                                <th className="px-6 py-4">Kod</th>
                                                <th className="px-6 py-4">Materyal Adı</th>
                                                <th className="px-6 py-4">Stok</th>
                                                <th className="px-6 py-4 text-right">Maliyet</th>
                                                <th className="px-6 py-4 text-center">İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#F4F6F7]">
                                            {kumaslar.slice(0, 10).map((k) => (
                                                <tr key={k.id} className="hover:bg-[#F4F6F7]/30 transition-colors">
                                                    <td className="px-6 py-4 text-[11px] font-bold text-[#046A38]">{k.kumas_kodu}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-xs font-bold text-[#2D3436]">{k.kumas_adi}</div>
                                                        <div className="text-[9px] text-[#8b949e]">{k.kompozisyon}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${parseFloat(k.stok_mt) < parseFloat(k.min_stok_mt) ? 'bg-[#E74C3C]/10 text-[#E74C3C]' : 'bg-[#27AE60]/10 text-[#27AE60]'}`}>
                                                            {k.stok_mt} mt
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-xs font-mono font-bold text-[#2D3436]">
                                                        ₺{parseFloat(k.birim_maliyet_tl || 0).toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button className="p-2 text-[#046A38] hover:bg-[#046A38]/5 rounded-md transition-colors"><Eye size={16} /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* M1 TALEPLERİ (ARGE’DEN GELENLER) */}
                        <div className="space-y-6">
                            <div className="bg-[#046A38] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-[#C8A951] mb-1">M1 Trend Alarmı</h2>
                                    <div className="text-xl font-black mb-4">Ar-Ge'den Gelen Talepler</div>
                                    <p className="text-[10px] font-bold text-white/70 leading-relaxed mb-6">M2 Tedarik birimi, bu modeller için alternatif kumaş/kartela maliyeti çalışmalıdır.</p>

                                    <div className="space-y-3">
                                        {m1Talepleri.map(talep => (
                                            <div key={talep.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-all cursor-pointer">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[9px] font-black bg-[#C8A951] text-[#046A38] px-2 py-0.5 rounded uppercase tracking-wider">AŞAMA 2</span>
                                                    <span className="text-[9px] text-white/50">{currentTime.toLocaleTimeString('tr-TR')}</span>
                                                </div>
                                                <div className="text-xs font-bold text-white mb-2">{talep.baslik}</div>
                                                <button
                                                    onClick={() => { setSeciliTalep(talep); setFizibiliteModalAcik(true); }}
                                                    className="w-full py-2 bg-white text-[#046A38] rounded-lg text-[10px] font-black uppercase hover:bg-[#C8A951] transition-all"
                                                >
                                                    FİZİBİLİTE ÇALIŞ
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute -right-8 -top-8 text-white/10 rotate-12"><Activity size={160} /></div>
                            </div>
                        </div>

                    </div>
                </main>

                {/* SAĞ YARDIM PANELİ */}
                <aside className="w-80 bg-white border-l border-[#046A38]/10 p-6 shrink-0 hidden 2xl:flex flex-col">
                    <div className="flex items-center gap-3 mb-8">
                        <HelpCircle size={20} className="text-[#C8A951]" />
                        <h2 className="text-sm font-black text-[#046A38] uppercase tracking-widest">Yardım Merkezi</h2>
                    </div>

                    <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
                        <div className="bg-[#F4F6F7] p-4 rounded-xl">
                            <h3 className="text-[10px] font-black text-[#046A38] uppercase mb-2">Maliyet Kuralı</h3>
                            <p className="text-[11px] text-[#2D3436] leading-relaxed">
                                Patron talimatı gereği, brüt kâr marjı **%40'ın altında** olan hiçbir kumaş talebi Kalıphaneye (M3) gönderilemez.
                            </p>
                        </div>
                        <div className="bg-[#F4F6F7] p-4 rounded-xl">
                            <h3 className="text-[10px] font-black text-[#046A38] uppercase mb-2">Tedarikçi Risk Notu</h3>
                            <p className="text-[11px] text-[#2D3436] leading-relaxed italic">
                                "Tek tedarikçisi olan kumaşlarda 'sorun' ışığı yanar. Mutlaka bir alternatif kartela bulunmalıdır."
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#F4F6F7]">
                        <button className="w-full p-4 bg-[#F4F6F7] border border-[#046A38]/5 rounded-2xl flex items-center gap-4 hover:bg-[#046A38]/5 transition-all text-left">
                            <div className="bg-[#C8A951]/20 p-2 rounded-lg text-[#C8A951]"><Info size={20} /></div>
                            <div>
                                <div className="text-[11px] font-black text-[#046A38]">DÖKÜMANTASYON</div>
                                <div className="text-[9px] text-[#8B949E]">Kullanım Klavuzu ve SOP</div>
                            </div>
                        </button>
                    </div>
                </aside>

            </div>

            {/* ALT DURUM BAR */}
            <footer className="h-10 bg-white border-t border-[#046A38]/10 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#27AE60] rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black text-[#8b949e] uppercase">Sistem: Çevrimiçi</span>
                    </div>
                    <div className="flex items-center gap-2 border-l border-[#F4F6F7] pl-6 text-[#8b949e]">
                        <Users size={12} />
                        <span className="text-[9px] font-bold">12 Aktif Kullanıcı</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black text-[#046A38] bg-[#046A38]/5 px-3 py-1 rounded-full flex items-center gap-2">
                        <Database size={10} /> GERÇEK ZAMANLI VERİ SENKRONİZASYONU AKTİF
                    </span>
                    <span className="text-[9px] font-bold text-[#8b949e]">MIZANET V2026.04.06</span>
                </div>
            </footer>

            {/* MODALS */}
            {fizibiliteModalAcik && seciliTalep && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2D3436]/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-[#F4F6F7] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border-t-8 border-[#C8A951]">
                        <div className="p-8 border-b border-white bg-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black text-[#C8A951] tracking-[0.2em] uppercase">Fizibilite Analizi</span>
                                    <h2 className="text-2xl font-black text-[#046A38] uppercase mt-2">{seciliTalep.baslik}</h2>
                                </div>
                                <button onClick={() => setFizibiliteModalAcik(false)} className="text-[#8B949E] hover:rotate-90 transition-transform"><Plus size={32} style={{ transform: 'rotate(45deg)' }} /></button>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[9px] font-black text-[#8B949E] uppercase mb-2 block">Kumaş Metre Fiyatı (₺)</label>
                                        <input type="number" value={maliyetForm.kumasFiyat} onChange={e => setMaliyetForm({ ...maliyetForm, kumasFiyat: e.target.value })} className="w-full bg-white border border-[#046A38]/10 rounded-xl px-4 py-3 outline-none focus:border-[#C8A951] font-mono text-sm" placeholder="100.00" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] font-black text-[#8B949E] uppercase mb-2 block">Kullanım Miktarı (mt)</label>
                                        <input type="number" value={maliyetForm.kumasMiktar} onChange={e => setMaliyetForm({ ...maliyetForm, kumasMiktar: e.target.value })} className="w-full bg-white border border-[#046A38]/10 rounded-xl px-4 py-3 outline-none focus:border-[#C8A951] font-mono text-sm" placeholder="2.50" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[9px] font-black text-[#8B949E] uppercase mb-2 block">İşçilik & Aksesuar (₺)</label>
                                        <input type="number" value={maliyetForm.iscilik} onChange={e => setMaliyetForm({ ...maliyetForm, iscilik: e.target.value })} className="w-full bg-white border border-[#046A38]/10 rounded-xl px-4 py-3 outline-none focus:border-[#C8A951] font-mono text-sm" placeholder="50.00" />
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-[#046A38]/10 shadow-inner">
                                        <span className="text-[9px] font-black text-[#8B949E] uppercase block mb-1">Toplam Maliyet</span>
                                        <span className="text-xl font-black text-[#046A38] font-mono">₺ {toplamMaliyet.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`p-8 rounded-3xl flex justify-between items-center mb-8 transition-colors ${karlilikUygun ? 'bg-[#27AE60]/10 border border-[#27AE60]/30' : 'bg-[#E74C3C]/10 border border-[#E74C3C]/30'}`}>
                                <div>
                                    <div className="text-[10px] font-black uppercase text-[#8B949E] mb-1">Tahmini Kar Marjı</div>
                                    <div className={`text-4xl font-black font-mono ${karlilikUygun ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>%{karMarjiYuzde}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-[#8B949E] uppercase mb-1">Birim Karı</div>
                                    <div className="text-2xl font-black font-mono text-[#2D3436]">₺ {karMarjiTutar.toFixed(2)}</div>
                                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full mt-2 inline-block ${karlilikUygun ? 'bg-[#27AE60] text-white' : 'bg-[#E74C3C] text-white'}`}>
                                        {karlilikUygun ? '✓ FİZİBİLİTE ONAYI' : '⚠ ZARAR KESME RİSKİ'}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={!karlilikUygun}
                                onClick={() => { setFizibiliteModalAcik(false); m3eAktar({ ...seciliTalep, maliyet: toplamMaliyet, kar_marji: karMarjiYuzde }); }}
                                className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl transition-all ${karlilikUygun ? 'bg-[#046A38] text-white hover:bg-[#046A38]/90 shadow-[#046A38]/20' : 'bg-[#BDC3C7] text-white cursor-not-allowed'}`}
                            >
                                <Scissors className="inline-block mr-3" size={18} /> M3 KALIPHANEYE GÖNDER
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #046A3822; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #046A3844; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    );
}
