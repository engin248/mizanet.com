'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import {
    TrendingUp, AlertTriangle, CheckCircle2, Clock, Zap,
    Target, BarChart3, Search, Brain, ArrowUpRight, Flame,
    ShoppingBag, RefreshCw, ChevronRight, Star
} from 'lucide-react';

// ─── SATAR / SATMAZ Skor Renk ─────────────────────────────────
function skorRenkAl(skor) {
    if (skor >= 75) return { bg: '#064e3b', border: '#10b981', text: '#a7f3d0', badge: '#10b981' };
    if (skor >= 50) return { bg: '#451a03', border: '#f59e0b', text: '#fde68a', badge: '#f59e0b' };
    return { bg: '#450a0a', border: '#ef4444', text: '#fecaca', badge: '#ef4444' };
}

// ─── Karar Etiketi ─────────────────────────────────────────────
function KararEtiketi({ karar }) {
    const config = {
        'ÜRETİM': { bg: '#10b981', label: '🏭 ÜRET', glow: 'rgba(16,185,129,0.4)' },
        'TEST ÜRETİMİ (Numune)': { bg: '#3b82f6', label: '🧪 TEST ÜRETİMİ', glow: 'rgba(59,130,246,0.4)' },
        'İZLEME': { bg: '#f59e0b', label: '👁 BEKLE', glow: 'rgba(245,158,11,0.4)' },
        'REDDET': { bg: '#ef4444', label: '✗ İPTAL', glow: 'rgba(239,68,68,0.4)' },
    };
    const c = config[karar] || config['İZLEME'];
    return (
        <span style={{
            background: c.bg, color: 'white', padding: '3px 10px', borderRadius: '20px',
            fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.05em',
            boxShadow: `0 0 10px ${c.glow}`,
        }}>
            {c.label}
        </span>
    );
}

// ─── Erken Giriş Badge ─────────────────────────────────────────
function ErkenGirBadge() {
    return (
        <span style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: 'white', padding: '2px 8px', borderRadius: '12px',
            fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.05em',
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            boxShadow: '0 0 12px rgba(124,58,237,0.5)',
        }}>
            <Flame size={10} /> ERKEN GİR
        </span>
    );
}

// ─── Ana Panel ─────────────────────────────────────────────────
export default function ArgeIstihbaratPanel() {
    const [strateji, setStrateji] = useState(/** @type {any[]} */([]));   // b1_arge_strategy
    const [trendler, setTrendler] = useState(/** @type {any[]} */([]));   // b1_arge_trendler
    const [ajanLog, setAjanLog] = useState(/** @type {any[]} */([]));     // b1_agent_loglari
    const [loading, setLoading] = useState(true);
    const [serpSorgu, setSerpSorgu] = useState('');
    const [serpYukleniyor, setSerpYukleniyor] = useState(false);
    const [serpSonuc, setSerpSonuc] = useState(/** @type {any} */(null));
    const [deepSorgu, setDeepSorgu] = useState('');
    const [deepYukleniyor, setDeepYukleniyor] = useState(false);
    const [deepSonuc, setDeepSonuc] = useState(/** @type {any} */(null));
    const [aktifTab, setAktifTab] = useState('karar'); // karar | erken | log | google | deepseek

    const verileriCek = useCallback(async () => {
        setLoading(true);
        try {
            const [stratejiRes, trendRes, logRes] = await Promise.allSettled([
                supabase.from('b1_arge_strategy')
                    .select('id, product_name, opportunity_score, nizam_decision, risk_level, supply_risk, estimated_profit, outsource_cost, agent_note, created_at')
                    .order('opportunity_score', { ascending: false })
                    .limit(20),
                supabase.from('b1_arge_trendler')
                    .select('id, baslik, platform, kategori, talep_skoru, zorluk_derecesi, durum, created_at')
                    .order('talep_skoru', { ascending: false })
                    .limit(50),
                supabase.from('b1_agent_loglari')
                    .select('id, ajan_adi, islem_tipi, mesaj, sonuc, created_at')
                    .in('ajan_adi', ['Trend Kâşifi', 'Yargıç (Matematikçi)', 'BATCH_GEMINI', 'Darboğaz Teşhiscisi'])
                    .order('created_at', { ascending: false })
                    .limit(15),
            ]);

            if (stratejiRes.status === 'fulfilled' && stratejiRes.value.data) {
                setStrateji(stratejiRes.value.data);
            }
            if (trendRes.status === 'fulfilled' && trendRes.value.data) {
                setTrendler(trendRes.value.data);
            }
            if (logRes.status === 'fulfilled' && logRes.value.data) {
                setAjanLog(logRes.value.data);
            }
        } catch (e) {
            console.error('[ArgeIstihbarat] Veri çekme hatası:', e.message);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        verileriCek();
        // Realtime dinleme
        const kanal = supabase.channel('arge-istihbarat-panel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'b1_arge_strategy' }, verileriCek)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'b1_arge_trendler' }, verileriCek)
            .subscribe();
        return () => { supabase.removeChannel(kanal); };
    }, [verileriCek]);

    // ─── SerpAPI çağrısı ──────────────────────────────────────
    const serpAra = async () => {
        if (!serpSorgu.trim() || serpYukleniyor) return;
        setSerpYukleniyor(true);
        setSerpSonuc(null);
        try {
            const res = await fetch('/api/serp-trend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sorgu: serpSorgu }),
                signal: AbortSignal.timeout(15000),
            });
            const data = await res.json();
            setSerpSonuc(data);
        } catch (e) {
            setSerpSonuc({ error: e.message });
        }
        setSerpYukleniyor(false);
    };

    // ─── DeepSeek çağrısı ─────────────────────────────────────
    const deepAnaliz = async () => {
        if (!deepSorgu.trim() || deepYukleniyor) return;
        setDeepYukleniyor(true);
        setDeepSonuc(null);
        try {
            const res = await fetch('/api/deepseek-analiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urunAdi: deepSorgu }),
                signal: AbortSignal.timeout(20000),
            });
            const data = await res.json();
            setDeepSonuc(data);
        } catch (e) {
            setDeepSonuc({ error: e.message });
        }
        setDeepYukleniyor(false);
    };

    // ─── Erken Giriş Tespiti ──────────────────────────────────
    // Düşük zorluk + yüksek talep = ERKEN GİR sinyali
    const erkenGirler = trendler.filter(t =>
        t.talep_skoru >= 7 && t.zorluk_derecesi <= 4
    );

    // ─── Toplam Skorlar ───────────────────────────────────────
    const uretimKarari = strateji.filter(s => s.nizam_decision === 'ÜRETİM').length;
    const testKarari = strateji.filter(s => s.nizam_decision === 'TEST ÜRETİMİ (Numune)').length;
    const izleKarari = strateji.filter(s => s.nizam_decision === 'İZLEME').length;
    const redKarari = strateji.filter(s => s.nizam_decision === 'REDDET').length;
    const ortalamaSkor = strateji.length > 0
        ? Math.round(strateji.reduce((a, b) => a + (b.opportunity_score || 0), 0) / strateji.length)
        : 0;

    const tabStyle = (tab) => ({
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: 700,
        fontSize: '0.75rem',
        cursor: 'pointer',
        border: 'none',
        background: aktifTab === tab ? '#047857' : 'rgba(255,255,255,0.05)',
        color: aktifTab === tab ? 'white' : '#94a3b8',
        transition: 'all 0.2s',
    });

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0a0f1e 0%, #061a14 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(52,211,153,0.2)',
            marginBottom: '1.5rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px -15px rgba(0,0,0,0.6)',
            position: 'relative',
        }}>
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: -50, right: -50,
                width: 200, height: 200,
                background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            {/* BAŞLIK + Sayaçlar */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, background: 'linear-gradient(135deg,#047857,#065f46)',
                            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                        }}>
                            <Brain size={20} color="#a7f3d0" />
                        </div>
                        <div>
                            <h2 style={{ color: '#a7f3d0', fontWeight: 900, fontSize: '0.9rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                İstihbarat Komuta Merkezi
                            </h2>
                            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '2px 0 0', fontWeight: 600 }}>
                                veri → analiz → skor → karar
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={verileriCek}
                        disabled={loading}
                        style={{
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                            color: '#34d399', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 700,
                        }}
                    >
                        <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                        Yenile
                    </button>
                </div>

                {/* Kart sayaçları */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: '1rem' }}>
                    {[
                        { label: 'ÜRET', value: uretimKarari, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
                        { label: 'TEST', value: testKarari, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                        { label: 'İZLE', value: izleKarari, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                        { label: 'İPTAL', value: redKarari, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
                        { label: 'ORT SKOR', value: `${ortalamaSkor}`, color: '#a7f3d0', bg: 'rgba(167,243,208,0.05)' },
                    ].map(({ label, value, color, bg }) => (
                        <div key={label} style={{
                            background: bg, border: `1px solid ${color}30`, borderRadius: '10px',
                            padding: '8px', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: 900, color, fontFamily: 'monospace' }}>{value}</div>
                            <div style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEKMELER */}
            <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <button style={tabStyle('karar')} onClick={() => setAktifTab('karar')}>
                    <Target size={12} style={{ marginRight: 4, display: 'inline' }} />
                    Karar Paneli
                </button>
                <button style={tabStyle('erken')} onClick={() => setAktifTab('erken')}>
                    <Flame size={12} style={{ marginRight: 4, display: 'inline' }} />
                    Erken Giriş {erkenGirler.length > 0 && `(${erkenGirler.length})`}
                </button>
                <button style={tabStyle('log')} onClick={() => setAktifTab('log')}>
                    <BarChart3 size={12} style={{ marginRight: 4, display: 'inline' }} />
                    Ajan Log
                </button>
                <button style={tabStyle('google')} onClick={() => setAktifTab('google')}>
                    <Search size={12} style={{ marginRight: 4, display: 'inline' }} />
                    Google Trend
                </button>
                <button style={tabStyle('deepseek')} onClick={() => setAktifTab('deepseek')}>
                    <Brain size={12} style={{ marginRight: 4, display: 'inline' }} />
                    DeepSeek Analiz
                </button>
            </div>

            {/* İÇERİK */}
            <div style={{ padding: '1rem 1.25rem', minHeight: 200 }}>

                {/* ── G BLOĞU: Karar Paneli ─────────────────────────── */}
                {aktifTab === 'karar' && (
                    <div>
                        {loading ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>
                                <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 8px', display: 'block' }} />
                                Strateji verileri yükleniyor...
                            </div>
                        ) : strateji.length === 0 ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                                <Target size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.3 }} />
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>Henüz karar verisi yok.</p>
                                <p style={{ fontSize: '0.7rem', margin: '4px 0 0', opacity: 0.6 }}>
                                    Yargıç Ajanı çalıştırıldığında veriler buraya gelir.
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {strateji.map(s => {
                                    const renkler = skorRenkAl(s.opportunity_score || 0);
                                    return (
                                        <div key={s.id} style={{
                                            background: renkler.bg,
                                            border: `1px solid ${renkler.border}40`,
                                            borderRadius: '12px',
                                            padding: '12px 14px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 12,
                                            flexWrap: 'wrap',
                                        }}>
                                            <div style={{ flex: 1, minWidth: 200 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                                    <KararEtiketi karar={s.nizam_decision} />
                                                    <span style={{ color: renkler.text, fontWeight: 700, fontSize: '0.8rem' }}>
                                                        {s.product_name}
                                                    </span>
                                                </div>
                                                {s.agent_note && (
                                                    <p style={{ color: '#94a3b8', fontSize: '0.7rem', margin: 0 }}>
                                                        {s.agent_note}
                                                    </p>
                                                )}
                                                {s.supply_risk && (
                                                    <p style={{ color: '#ef4444', fontSize: '0.65rem', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                        <AlertTriangle size={10} /> {s.supply_risk}
                                                    </p>
                                                )}
                                            </div>
                                            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
                                                {/* Fırsat skoru */}
                                                <div style={{ textAlign: 'center' }}>
                                                    <div style={{
                                                        fontSize: '1.25rem', fontWeight: 900, fontFamily: 'monospace',
                                                        color: renkler.badge,
                                                        filter: `drop-shadow(0 0 6px ${renkler.badge}60)`,
                                                    }}>
                                                        {Math.round(s.opportunity_score || 0)}
                                                    </div>
                                                    <div style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SKOR</div>
                                                </div>
                                                {/* Kar tahmini */}
                                                {s.estimated_profit > 0 && (
                                                    <div style={{ textAlign: 'center' }}>
                                                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#a7f3d0', fontFamily: 'monospace' }}>
                                                            {(s.estimated_profit / 100).toFixed(0)}₺
                                                        </div>
                                                        <div style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Tahmini Kâr</div>
                                                    </div>
                                                )}
                                                {/* Risk etiketi */}
                                                <div style={{
                                                    padding: '3px 8px', borderRadius: '6px', fontSize: '0.6rem', fontWeight: 800,
                                                    background: s.risk_level === 'Yüksek' ? 'rgba(239,68,68,0.15)' : s.risk_level === 'Orta' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                                                    color: s.risk_level === 'Yüksek' ? '#fca5a5' : s.risk_level === 'Orta' ? '#fde68a' : '#a7f3d0',
                                                }}>
                                                    {s.risk_level || 'Orta'} Risk
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ── E BLOĞU: Erken Giriş ──────────────────────────── */}
                {aktifTab === 'erken' && (
                    <div>
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Flame size={16} color="#7c3aed" />
                            <span style={{ color: '#c4b5fd', fontWeight: 700, fontSize: '0.8rem' }}>
                                Erken Giriş Sinyalleri — Düşük Rekabet + Yüksek Talep
                            </span>
                        </div>
                        {loading ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>Yükleniyor...</div>
                        ) : erkenGirler.length === 0 ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                                <Flame size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.2 }} />
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>Şu an erken giriş sinyali yok.</p>
                                <p style={{ fontSize: '0.7rem', margin: '4px 0 0', opacity: 0.6 }}>
                                    Kriter: Talep skoru ≥ 7, Zorluk ≤ 4
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
                                {erkenGirler.map(t => (
                                    <div key={t.id} style={{
                                        background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.1) 100%)',
                                        border: '1px solid rgba(124,58,237,0.4)',
                                        borderRadius: '12px', padding: '12px',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                                            <span style={{ color: '#c4b5fd', fontWeight: 700, fontSize: '0.8rem', lineHeight: 1.3 }}>
                                                {t.baslik}
                                            </span>
                                            <ErkenGirBadge />
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#10b981', fontWeight: 900, fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                                    {t.talep_skoru}/10
                                                </div>
                                                <div style={{ color: '#64748b', fontSize: '0.55rem', textTransform: 'uppercase' }}>Talep</div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ color: '#a7f3d0', fontWeight: 900, fontSize: '0.9rem', fontFamily: 'monospace' }}>
                                                    {t.zorluk_derecesi}/10
                                                </div>
                                                <div style={{ color: '#64748b', fontSize: '0.55rem', textTransform: 'uppercase' }}>Zorluk</div>
                                            </div>
                                            <div style={{ marginLeft: 'auto' }}>
                                                <span style={{
                                                    background: 'rgba(255,255,255,0.07)', padding: '2px 8px',
                                                    borderRadius: '6px', fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600,
                                                }}>
                                                    {t.platform}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── H BLOĞU: Ajan Log ─────────────────────────────── */}
                {aktifTab === 'log' && (
                    <div>
                        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <BarChart3 size={16} color="#38bdf8" />
                            <span style={{ color: '#7dd3fc', fontWeight: 700, fontSize: '0.8rem' }}>
                                Ajan Günlüğü — Ne yaptı, neden yaptı
                            </span>
                        </div>
                        {loading ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem', fontSize: '0.8rem' }}>Yükleniyor...</div>
                        ) : ajanLog.length === 0 ? (
                            <div style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                                <Clock size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.2 }} />
                                <p style={{ fontSize: '0.8rem', margin: 0 }}>Henüz ajan logu yok.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {ajanLog.map(log => (
                                    <div key={log.id} style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${log.sonuc === 'basarili' ? 'rgba(16,185,129,0.2)' : log.sonuc === 'hata' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)'}`,
                                        borderRadius: '10px', padding: '10px 12px',
                                        display: 'flex', alignItems: 'flex-start', gap: 10,
                                    }}>
                                        <div style={{
                                            width: 8, height: 8, borderRadius: '50%', marginTop: 5, flexShrink: 0,
                                            background: log.sonuc === 'basarili' ? '#10b981' : log.sonuc === 'hata' ? '#ef4444' : '#f59e0b',
                                            boxShadow: `0 0 6px ${log.sonuc === 'basarili' ? 'rgba(16,185,129,0.6)' : log.sonuc === 'hata' ? 'rgba(239,68,68,0.6)' : 'rgba(245,158,11,0.6)'}`,
                                        }} />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                <span style={{ color: '#a7f3d0', fontWeight: 800, fontSize: '0.75rem' }}>
                                                    {log.ajan_adi}
                                                </span>
                                                <span style={{ color: '#64748b', fontSize: '0.65rem' }}>→</span>
                                                <span style={{ color: '#94a3b8', fontSize: '0.65rem', fontWeight: 600 }}>
                                                    {log.islem_tipi}
                                                </span>
                                                <span style={{ color: '#475569', fontSize: '0.6rem', marginLeft: 'auto' }}>
                                                    {new Date(log.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            {log.mesaj && (
                                                <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '4px 0 0', lineHeight: 1.4 }}>
                                                    {log.mesaj}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── Google Trend (SerpAPI) ─────────────────────────── */}
                {aktifTab === 'google' && (
                    <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
                            <input
                                value={serpSorgu}
                                onChange={e => setSerpSorgu(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && serpAra()}
                                placeholder="Ürün veya kategori ara... (ör: Kadın Keten Elbise)"
                                style={{
                                    flex: 1, background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                    padding: '10px 14px', color: 'white', fontSize: '0.8rem',
                                    outline: 'none',
                                }}
                            />
                            <button
                                onClick={serpAra}
                                disabled={serpYukleniyor || !serpSorgu.trim()}
                                style={{
                                    background: serpYukleniyor ? 'rgba(59,130,246,0.3)' : '#2563eb',
                                    color: 'white', border: 'none', padding: '10px 18px',
                                    borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}
                            >
                                {serpYukleniyor
                                    ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                    : <Search size={14} />
                                }
                                Ara
                            </button>
                        </div>

                        {serpSonuc?.error && (
                            <div style={{ color: '#fca5a5', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px', fontSize: '0.8rem' }}>
                                ⚠️ {serpSonuc.error}
                            </div>
                        )}

                        {serpSonuc && !serpSonuc.error && (
                            <div>
                                {/* Skor */}
                                <div style={{
                                    background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(59,130,246,0.3)',
                                    borderRadius: '12px', padding: '12px', marginBottom: '1rem',
                                    display: 'flex', alignItems: 'center', gap: 12,
                                }}>
                                    <div style={{ textAlign: 'center', minWidth: 60 }}>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#60a5fa', fontFamily: 'monospace' }}>
                                            {serpSonuc.googleTrendsSkoru}
                                        </div>
                                        <div style={{ fontSize: '0.55rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Google Skor</div>
                                    </div>
                                    <div>
                                        <p style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.8rem', margin: 0 }}>{serpSonuc.piyasaYorumu}</p>
                                        {serpSonuc.fiyatAraligi && (
                                            <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '4px 0 0' }}>
                                                Fiyat aralığı: {serpSonuc.fiyatAraligi.min}₺ — {serpSonuc.fiyatAraligi.max}₺
                                                (ort: {serpSonuc.fiyatAraligi.ortalama}₺)
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Shopping Sonuçları */}
                                {serpSonuc.alisverisler?.length > 0 && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ color: '#7dd3fc', fontWeight: 700, fontSize: '0.75rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <ShoppingBag size={14} /> Google Shopping Sonuçları
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {serpSonuc.alisverisler.map((a, i) => (
                                                <div key={i} style={{
                                                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                                    borderRadius: '8px', padding: '8px 12px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                }}>
                                                    <div>
                                                        <div style={{ color: '#e2e8f0', fontSize: '0.75rem', fontWeight: 600 }}>{a.baslik}</div>
                                                        <div style={{ color: '#64748b', fontSize: '0.65rem' }}>{a.kaynak}</div>
                                                    </div>
                                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                        <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem' }}>{a.fiyat}</div>
                                                        {a.puan && (
                                                            <div style={{ color: '#fbbf24', fontSize: '0.6rem' }}>
                                                                ★ {a.puan} ({a.yorumSayisi} yorum)
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* İlgili Aramalar */}
                                {serpSonuc.ilgiliAramalar?.length > 0 && (
                                    <div>
                                        <div style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.7rem', marginBottom: 6 }}>İlgili Aramalar</div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {serpSonuc.ilgiliAramalar.map((a, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setSerpSorgu(a); }}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                                        color: '#94a3b8', padding: '4px 10px', borderRadius: '20px',
                                                        fontSize: '0.65rem', cursor: 'pointer', fontWeight: 600,
                                                    }}
                                                >
                                                    {a}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ── DeepSeek Analiz ───────────────────────────────── */}
                {aktifTab === 'deepseek' && (
                    <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
                            <input
                                value={deepSorgu}
                                onChange={e => setDeepSorgu(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && deepAnaliz()}
                                placeholder="Ürün adı girin... (ör: Kadın Denim Ceket)"
                                style={{
                                    flex: 1, background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
                                    padding: '10px 14px', color: 'white', fontSize: '0.8rem', outline: 'none',
                                }}
                            />
                            <button
                                onClick={deepAnaliz}
                                disabled={deepYukleniyor || !deepSorgu.trim()}
                                style={{
                                    background: deepYukleniyor ? 'rgba(124,58,237,0.3)' : '#7c3aed',
                                    color: 'white', border: 'none', padding: '10px 18px',
                                    borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                                    display: 'flex', alignItems: 'center', gap: 6,
                                }}
                            >
                                {deepYukleniyor
                                    ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} />
                                    : <Brain size={14} />
                                }
                                Analiz Et
                            </button>
                        </div>

                        {deepSonuc?.error && (
                            <div style={{ color: '#fca5a5', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '12px', fontSize: '0.8rem' }}>
                                ⚠️ {deepSonuc.error}
                            </div>
                        )}

                        {deepSonuc && !deepSonuc.error && (
                            <div>
                                {/* Karar Başlık */}
                                <div style={{
                                    background: deepSonuc.karar === 'ÜRET' ? 'rgba(16,185,129,0.1)'
                                        : deepSonuc.karar === 'REDDET' ? 'rgba(239,68,68,0.1)'
                                            : 'rgba(245,158,11,0.1)',
                                    border: `1px solid ${deepSonuc.karar === 'ÜRET' ? 'rgba(16,185,129,0.3)' : deepSonuc.karar === 'REDDET' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                                    borderRadius: '12px', padding: '12px', marginBottom: '1rem',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                        <KararEtiketi karar={deepSonuc.karar === 'ÜRET' ? 'ÜRETİM' : deepSonuc.karar === 'TEST_URETIM' ? 'TEST ÜRETİMİ (Numune)' : deepSonuc.karar === 'IZLE' ? 'İZLEME' : 'REDDET'} />
                                        <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.85rem' }}>{deepSonuc.urun}</span>
                                        <span style={{ color: '#a7f3d0', fontWeight: 900, fontSize: '1rem', fontFamily: 'monospace' }}>
                                            {deepSonuc.karar_skoru}/100
                                        </span>
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: '8px 0 0', lineHeight: 1.5 }}>
                                        {deepSonuc.oneri}
                                    </p>
                                </div>

                                {/* Detay Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1rem' }}>
                                    {deepSonuc.tahmini_maliyet_tl && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: 2 }}>Tahmini Maliyet</div>
                                            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem' }}>{deepSonuc.tahmini_maliyet_tl} ₺</div>
                                        </div>
                                    )}
                                    {deepSonuc.tahmini_kar_marji && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: 2 }}>Kâr Marjı</div>
                                            <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem' }}>{deepSonuc.tahmini_kar_marji}</div>
                                        </div>
                                    )}
                                    {deepSonuc.uretim_zorlugu && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: 2 }}>Üretim Zorluk</div>
                                            <div style={{ color: '#c4b5fd', fontWeight: 700, fontSize: '0.85rem' }}>{deepSonuc.uretim_zorlugu}</div>
                                        </div>
                                    )}
                                    {deepSonuc.tahmini_iscilik_gun && (
                                        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '10px' }}>
                                            <div style={{ color: '#64748b', fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: 2 }}>Tahmini İşçilik</div>
                                            <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: '0.85rem' }}>{deepSonuc.tahmini_iscilik_gun} gün</div>
                                        </div>
                                    )}
                                </div>

                                {/* Riskler ve Güçlü Yönler */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                                    {deepSonuc.riskler?.length > 0 && (
                                        <div>
                                            <div style={{ color: '#fca5a5', fontWeight: 700, fontSize: '0.7rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <AlertTriangle size={12} /> Riskler
                                            </div>
                                            {deepSonuc.riskler.map((r, i) => (
                                                <div key={i} style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: 3, display: 'flex', gap: 6 }}>
                                                    <span style={{ color: '#ef4444' }}>•</span> {r}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {deepSonuc.guclu_yonler?.length > 0 && (
                                        <div>
                                            <div style={{ color: '#a7f3d0', fontWeight: 700, fontSize: '0.7rem', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <CheckCircle2 size={12} /> Güçlü Yönler
                                            </div>
                                            {deepSonuc.guclu_yonler.map((g, i) => (
                                                <div key={i} style={{ color: '#94a3b8', fontSize: '0.7rem', marginBottom: 3, display: 'flex', gap: 6 }}>
                                                    <span style={{ color: '#10b981' }}>•</span> {g}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {deepSonuc.pazar_yorumu && (
                                    <p style={{ color: '#64748b', fontSize: '0.7rem', marginTop: 8, padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', lineHeight: 1.5 }}>
                                        {deepSonuc.pazar_yorumu}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}
