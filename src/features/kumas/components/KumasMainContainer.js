'use client';
import { useState } from 'react';
import {
    Layers, Plus, Search, AlertTriangle, CheckCircle2, Package, Scissors,
    Trash2, Eye, Lock, QrCode, Tag, ExternalLink, ChevronRight, Scale
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useKumas } from '@/features/kumas/hooks/useKumas';

export default function KumasMainContainer() {
    const { kullanici } = useAuth();
    const {
        yetkiliMi, sekme, setSekme, kumaslar, m1Talepleri,
        loading, m3eAktar
    } = useKumas(kullanici);

    const sekmeler = ['kumas', 'aksesuar', 'firsat', 'm1', 'risk'];
    const sekmeIsimleri = ['Kumaş Arşivi', 'Aksesuar Deposu', 'Ölü Stok Radarı (AI)', "M1'den Gelen Talepler", 'Tedarik Risk Analizi'];

    const setAktifSekme = (ind) => setSekme(sekmeler[ind]);
    const aktifSekme = sekmeler.indexOf(sekme) !== -1 ? sekmeler.indexOf(sekme) : 0;

    const kumasRaporu = kumaslar.map(k => ({
        id: k.id, kodu: k.kumas_kodu, ad: k.kumas_adi, kompozisyon: k.kompozisyon,
        stok: parseFloat(k.stok_mt) || 0, minStok: parseFloat(k.min_stok_mt) || 0, birimFiyat: k.birim_maliyet_tl,
        tedarikci: k.tedarikci_adi || 'Bilinmiyor', riskSuresi: 'Bilinmiyor', alternatifVar: true,
        durum: parseFloat(k.stok_mt) < parseFloat(k.min_stok_mt) ? 'riskli' : 'guvenli'
    }));

    if (loading) {
        return <div className="p-12 text-center text-emerald-400 font-bold tracking-widest animate-pulse">SUPABASE M2 BAĞLANTISI KURULUYOR...</div>;
    }

    if (!yetkiliMi) {
        return (
            <div className="p-12 text-center bg-rose-950/20 shadow-2xl rounded-2xl m-8">
                <Lock size={48} className="mx-auto mb-4 text-rose-500" />
                <h2 className="text-xl font-black text-rose-500 uppercase">YETKİSİZ GİRİŞ (M2)</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans bg-[#0d1117] text-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6" style={{ animation: 'fadeUp 0.4s ease-out' }}>

                {/* 1. BAŞLIK VE HEDEF GÖSTERİCİ */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-[#21262d] pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-500/30">
                            <Layers size={24} className="text-emerald-50" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight m-0 uppercase flex items-center gap-3">
                                M2: Malzeme & Kumaş Kütüphanesi
                            </h1>
                            <p className="text-xs font-bold text-emerald-300 mt-1 uppercase tracking-wider">
                                Aşama 2: Tedarik Riski & Maliyet Filtresi (Kural: Tek Tedarikçi = RİSK)
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2">
                            <Plus size={16} /> YENİ MATERYAL GİRİŞİ
                        </button>
                    </div>
                </div>

                {/* 2. TEDARİK RİSK (4 NOKTA) KPI'LARI */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Aktif Kod Sayısı', val: '412', desc: 'Sisteme Kayıtlı Materyal', color: 'text-emerald-400' },
                        { label: 'Tek Tedarikçi (RİSK)', val: '14', desc: 'Alternatifi Yok (Ted. Riski)', color: 'text-rose-400' },
                        { label: 'Sürekli Kumaş', val: '158', desc: 'Kesintisiz Tedarik Devamı', color: 'text-blue-400' },
                        { label: 'Yüksek MOQ', val: '5', desc: 'Minimum Sipariş Riski', color: 'text-amber-400' }
                    ].map((s, i) => (
                        <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col justify-between shadow-md">
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</span>
                            <div className="text-2xl font-black text-white mt-2 border-b border-[#30363d] pb-2">{s.val}</div>
                            <div className="text-[10px] text-[#8b949e] font-semibold mt-2">{s.desc}</div>
                        </div>
                    ))}
                </div>

                {/* 3. İKİLİ PANE (SOL: M1'DEN GELEN TALEPLER, SAĞ: ENVANTER / DİJİTAL KÜTÜPHANE) */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">

                    {/* SOL PANEL (M1 ONAY BEKLEYENLER) */}
                    <div className="xl:col-span-1 bg-[#161b22] border border-[#21262d] rounded-xl flex flex-col h-[600px]">
                        <div className="p-4 border-b border-[#21262d]">
                            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <AlertTriangle size={14} /> M1'den Bekleyenler
                            </h2>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {m1Talepleri.length === 0 && <p className="text-[#8b949e] text-[10px] text-center mt-4">Henüz onaylanmış yeni bir M1 Karar talebi yok.</p>}
                            {m1Talepleri.map(talep => (
                                <div key={talep.id} className="bg-[#0d1117] border border-amber-500/30 p-3 rounded-lg flex flex-col gap-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] text-amber-400 font-bold uppercase">YENİ MODEL (AŞAMA 2)</span>
                                        <span className="text-[10px] text-emerald-400 font-bold border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-500/10">M1 ONAYLI</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-white">{talep.baslik}</h3>
                                    {talep.aciklama && (
                                        <div className="text-[10px] text-[#8b949e] border-l-2 border-amber-500/50 pl-2 bg-[#21262d] p-2 rounded italic">
                                            {talep.aciklama.substring(0, 100)}...
                                        </div>
                                    )}
                                    <button
                                        onClick={() => m3eAktar(talep)}
                                        className="w-full text-[10px] font-bold text-center py-2 bg-emerald-600 hover:bg-emerald-500 rounded mt-2 text-white transition-colors"
                                    >
                                        KUMAŞ & REÇETE SEÇ (M3'E AT)
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ PANEL (KÜTÜPHANE / RİSK ANALİZ LİSTESİ) */}
                    <div className="xl:col-span-3 flex flex-col">
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {sekmeIsimleri.map((s, i) => (
                                <button key={i} onClick={() => setAktifSekme(i)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${aktifSekme === i ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/50' : 'bg-[#161b22] text-[#8b949e] border border-[#21262d] hover:text-white'
                                    }`}>
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="bg-[#161b22] border border-[#21262d] rounded-xl flex-1 p-4 overflow-y-auto">
                            <div className="relative mb-4 w-full max-w-md">
                                <Search className="absolute left-3 top-2.5 text-[#8b949e]" size={14} />
                                <input type="text" placeholder="Kumaş Kodu, Adı veya Kompozisyon (Örn: Polyamid)..." className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-emerald-500 outline-none transition-colors" />
                            </div>

                            <div className="space-y-3">
                                {sekme === 'firsat' ? (
                                    <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6 text-center">
                                        <h3 className="text-lg font-black text-amber-500 mb-2 uppercase tracking-wide">AI Fırsat Radarı (Upcycle) Devrede</h3>
                                        <p className="text-sm text-amber-200/70 mb-6">Depoda bekleyen, hareketsiz kumaşlarınızı (Ölü Stok) sisteme yükleyin. M1 Trend İstihbarat motoru ile eşleşen güncel modelleri bulup, doğrudan M3 Modelhaneye üretim tavsiyesi ve marj analizi sunalım.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                            {/* Sahte Fırsat 1 */}
                                            <div className="bg-[#0b121a] border border-[#21262d] rounded-xl p-4 flex gap-4">
                                                <div className="w-20 h-20 bg-[#161b22] rounded-lg border border-[#30363d] shrink-0 overflow-hidden flex items-center justify-center">
                                                    <span className="text-[10px] text-[#8b949e]">FOTOĞRAF</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-white text-sm">Bordo Kadife Şifon (180 Günlük Zayiat)</h4>
                                                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">%85 TAHMİNİ MARJ</span>
                                                    </div>
                                                    <p className="text-[11px] text-[#8b949e] mt-1 mb-2">M1 Trend Eşleşmesi: "Yırtmaçlı Göğüs Dekolteli Abiye" trendi şu an Instagram'da revaçta. Bu kumaş yapısı bu kalıba tam uygun.</p>
                                                    <button className="text-[10px] font-bold text-black bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded-md transition-colors w-full">MODEL UYARLA VE M3'E YOLLA</button>
                                                </div>
                                            </div>

                                            {/* Sahte Fırsat 2 */}
                                            <div className="bg-[#0b121a] border border-[#21262d] rounded-xl p-4 flex gap-4">
                                                <div className="w-20 h-20 bg-[#161b22] rounded-lg border border-[#30363d] shrink-0 overflow-hidden flex items-center justify-center">
                                                    <span className="text-[10px] text-[#8b949e]">FOTOĞRAF</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-white text-sm">Zümrüt Yeşili Saten (Hurda)</h4>
                                                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">%60 TAHMİNİ MARJ</span>
                                                    </div>
                                                    <p className="text-[11px] text-[#8b949e] mt-1 mb-2">M1 Trend Eşleşmesi: Satenden "Tül Detaylı Mini Abiye" yapımı için yeterli metraj (80 MT) mevcut.</p>
                                                    <button className="text-[10px] font-bold text-black bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded-md transition-colors w-full">MODEL UYARLA VE M3'E YOLLA</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    kumasRaporu.map((k, idx) => (
                                        <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between gap-4 transition-colors ${k.durum === 'riskli' ? 'border-rose-500/20 bg-rose-500/5' : 'border-[#30363d] bg-[#0d1117] hover:bg-[#0b121a]'
                                            }`}>

                                            {/* Kumaş Kimliği */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[9px] font-black uppercase bg-[#21262d] text-emerald-400 px-2 py-0.5 rounded border border-[#30363d]">{k.kodu}</span>
                                                    {k.durum === 'riskli' && <span className="text-[9px] font-black uppercase bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded border border-rose-500/30">⚠️ TEDARİK RİSKİ</span>}
                                                </div>
                                                <h3 className="text-sm font-bold text-white tracking-wide">{k.ad}</h3>
                                                <p className="text-[11px] text-[#8b949e] mt-1">{k.kompozisyon}</p>
                                            </div>

                                            {/* Stok ve Maliyet Barları (M7 İle Senkron - Taslak) */}
                                            <div className="grid grid-cols-2 gap-4 border-l border-[#21262d] pl-4 shrink-0 min-w-[250px]">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Maliyet (TL/mt)</span>
                                                    <span className="text-lg font-mono text-white">₺{k.birimFiyat.toFixed(2)}</span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Depo Stok (M11)</span>
                                                    <span className={`text-lg font-mono font-bold ${k.stok <= k.minStok ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                        {k.stok} <span className="text-xs">mt</span>
                                                    </span>
                                                </div>
                                                <div className="col-span-2 pt-2 border-t border-[#21262d] flex flex-col gap-1">
                                                    <span className="text-[9px] text-[#8b949e] font-bold uppercase tracking-wider">Tedarik Zinciri</span>
                                                    <div className="flex justify-between items-center text-[11px]">
                                                        <span className={k.alternatifVar ? 'text-[#c9d1d9]' : 'text-rose-400 font-bold'}>{k.tedarikci}</span>
                                                        <span className="text-amber-400">Temin: {k.riskSuresi}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Aksiyon Barı */}
                                            <div className="flex flex-col justify-end gap-2 shrink-0 border-l border-[#21262d] pl-4">
                                                <button className="text-[10px] font-bold text-[#c9d1d9] hover:text-white bg-[#21262d] hover:bg-[#30363d] px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                                                    <Eye size={14} /> DETAY
                                                </button>
                                                <Link href="/kalip" className="text-[10px] font-bold text-center text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-2 rounded-lg transition-colors border border-emerald-500/20 border-b-emerald-500/50 flex items-center justify-center gap-1">
                                                    REÇETEYE EKLE M3 <ChevronRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
