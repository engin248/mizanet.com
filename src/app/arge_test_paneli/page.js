'use client';
import { Settings, Lock, FlaskConical, Beaker, Play, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useState, useEffect } from 'react';

export default function ArgeTestPaneli() {
    const { kullanici, yukleniyor } = useAuth();
    const [yetkiliMi, setYetkiliMi] = useState(false);

    useEffect(() => {
        let uretimPin = false;
        try {
            uretimPin = !!sessionStorage.getItem('sb47_uretim_pin');
        } catch (e) { }

        const erisebilir = kullanici?.grup === 'tam' || uretimPin;
        setYetkiliMi(erisebilir);
    }, [kullanici]);

    if (yukleniyor) {
        return <div className="p-12 text-center text-indigo-400 font-bold animate-pulse">SUPABASE SORGULANIYOR...</div>;
    }

    if (!yetkiliMi) {
        return (
            <div className="p-12 text-center bg-rose-950/20 shadow-2xl rounded-2xl m-8 border border-rose-900/50">
                <Lock size={48} className="mx-auto mb-4 text-rose-500" />
                <h2 className="text-xl font-black text-rose-500 uppercase">YETKİSİZ GİRİŞ (ZIRH DEVREDE)</h2>
                <p className="text-rose-300 font-bold mt-2">Bu test paneline girmek için Yöneticinin PIN kodu ile giriş yapmalısınız.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans bg-[#0d1117] text-white">
            <div className="max-w-[1200px] mx-auto px-6 py-10" style={{ animation: 'fadeUp 0.4s ease-out' }}>
                <div className="flex items-center gap-4 mb-8 border-b border-[#21262d] pb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-500/30">
                        <FlaskConical size={28} className="text-indigo-100" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tight m-0">
                            Ar-Ge Test Paneli (Yönetici)
                        </h1>
                        <p className="text-xs font-bold text-indigo-300 mt-1 uppercase tracking-wider">
                            Sistem Zırhı ve Yapay Zeka Test Laboratuvarı
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Test 1: M1 Kumaş & Materyal Otonom Test */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Layers className="text-indigo-400" size={24} />
                                <h3 className="text-sm font-bold text-[#c9d1d9]">Trend Öneri Motoru</h3>
                            </div>
                            <p className="text-xs text-[#8b949e] font-medium leading-relaxed mb-6">
                                M1 (Ar-Ge & Trend) modülüne ait sahte trend verilerini tetikler ve Ajanların bu trendi nasıl analiz ettiğini denetler.
                            </p>
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors text-xs tracking-wider flex items-center justify-center gap-2">
                            <Play size={16} /> TESTİ BAŞLAT
                        </button>
                    </div>

                    {/* Test 2: PIN Sistemi Zırh Tetiklemesi */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="text-rose-400" size={24} />
                                <h3 className="text-sm font-bold text-[#c9d1d9]">Sistem Zırhı Testi</h3>
                            </div>
                            <p className="text-xs text-[#8b949e] font-medium leading-relaxed mb-6">
                                Ardışık olarak hatalı PIN değerleri göndererek Rate Limit ve Ban sisteminin "30sn Kilit" animasyonunu ve savunmasını tetikler.
                            </p>
                        </div>
                        <button className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl transition-colors text-xs tracking-wider flex items-center justify-center gap-2">
                            <Play size={16} /> SPAM SALDIRISI SİMÜLE ET
                        </button>
                    </div>

                    {/* Test 3: Kiosk Offline Mode */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Beaker className="text-amber-400" size={24} />
                                <h3 className="text-sm font-bold text-[#c9d1d9]">PWA Çevrimdışı Test</h3>
                            </div>
                            <p className="text-xs text-[#8b949e] font-medium leading-relaxed mb-6">
                                Üretim sahası (M6) tabletinde veya Depo (M11) tarafında internetsiz kalınması durumunu tetkikler ve Supabase kuyruğunu simüle eder.
                            </p>
                        </div>
                        <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-colors text-xs tracking-wider flex items-center justify-center gap-2 text-shadow-sm">
                            <RefreshCw size={16} /> OFFLINE MODU AÇ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
