"use client";

import React, { useEffect, useState } from 'react';

export default function M4LojistikPaneli() {
    const [lojistikKayitlari, setLojistikKayitlari] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Burada ileride Supabase'den veya Shopify Webhook'tan gelen gerçek veriler okunacak.
        // Şimdilik arayüzün (Skeleton) görsel çatısını çiziyoruz.
        const mockData = [
            { id: 1, urun: "T-001 Özel Kesim Kaşe", kumaş: "350 Metre B2B Siparişi Geçildi", shopify: "SEO Eklendi (Yayında)", status: "BEKLİYOR" },
            { id: 2, urun: "Vintage Yaka Gömlek", kumaş: "Stok Yetersiz (B2B Red)", shopify: "Beklemede", status: "HATA" }
        ];
        setTimeout(() => {
            setLojistikKayitlari(mockData);
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <div className="p-8 min-h-screen text-white" style={{ background: '#0a0a0d', fontFamily: 'Inter, sans-serif' }}>

            {/* ÜST BAR */}
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-fuchsia-500 drop-shadow-md">M4 E-TİCARET VE LOJİSTİK ÜSSÜ</h1>
                    <p className="text-gray-400 mt-1 text-sm font-medium tracking-wide border-l-2 border-fuchsia-600 pl-3">Üretilen Ürünlerin B2B Tedarik Takibi, Shopify Ön-Satış Yayını ve Muhasebe Entegrasyonu</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="animate-pulse bg-red-900/30 text-red-500 text-xs font-bold px-3 py-1 rounded border border-red-500/30">Fiziksel API Bekleniyor (Faz 6)</span>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-200 tracking-wide mb-4">Otomasyon Canlı Akışı</h2>

                {loading ? (
                    <div className="p-10 text-center text-gray-400 animate-pulse rounded-xl border border-[rgba(255,255,255,0.05)]">
                        Shopify ve B2B Lojistik Bağlantıları Çözümleniyor...
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {lojistikKayitlari.map((kayit) => (
                            <div key={kayit.id} className="bg-[#121217] p-6 rounded-xl border border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1">{kayit.urun}</h3>
                                    <p className="text-sm text-gray-400 font-mono">Tedarikçi: <span className="text-fuchsia-400">{kayit.kumaş}</span></p>
                                    <p className="text-sm text-gray-400 font-mono mt-1">Vitrin Ceketi: <span className="text-blue-400">{kayit.shopify}</span></p>
                                </div>
                                <div>
                                    {kayit.status === 'BEKLİYOR' ? (
                                        <span className="badge bg-yellow-900/40 text-yellow-300 border border-yellow-500/40 px-3 py-1 text-xs">Yolda (İzleniyor)</span>
                                    ) : (
                                        <span className="badge bg-red-900/40 text-red-300 border border-red-500/40 px-3 py-1 text-xs">Ajan Müdahalesi Şart</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
