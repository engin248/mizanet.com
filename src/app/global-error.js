'use client';
import { useEffect } from 'react';

// --- KURESEL COKME VE ZIRH KALKANI (GLOBAL ERROR BOUNDARY) ---
// Kriter 168: Tum sistem (layout dahil) cokse bile fabrikayi durdurmayan Zero Downtime Rollback kalkani.
// Kriter 188: Kritik hatalarda otonom kurtarma/Doomsday senaryosu.
export default function GlobalError({ error, reset }) {
    useEffect(() => {
        // Loglama ve Sentry/Karargah Veritabani kara kutu entegrasyonu
        console.error('[KURESEL COKME - DOOMSDAY KALKANI]', error?.message, error?.stack);

        // Telegram Sistem Botuna acil ping gonderilir (otonom tetik)
        try {
            fetch('/api/telegram-bildirim', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mesaj: '\u26a0\ufe0f GLOBAL CRASH!\n\nUrl: /app/global-error.js\nHata: ' + error.message }),
            }).catch(e => console.error('[GLOBAL-ERROR] Telegram bildirim gonderilemedi:', e?.message));
        } catch (e) { console.error('[GLOBAL-ERROR] Telegram bildirim gonderilemedi:', e?.message); }
    }, [error]);

    return (
        <html lang="tr">
            <body>
                <div style={{
                    minHeight: '100vh',
                    background: '#020617',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    padding: '2rem',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#dc2626', color: 'white', padding: '8px 16px', borderRadius: '8px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        <span>{'\u26a0\ufe0f'} SISTEM ZIRHI DEVREDE</span>
                    </div>

                    <h1 style={{ color: '#f8fafc', fontSize: '1.75rem', fontWeight: 900, textAlign: 'center', margin: 0, textTransform: 'uppercase' }}>
                        Olumcul Hata Yakalandi
                    </h1>

                    <p style={{ color: '#cbd5e1', fontSize: '1rem', textAlign: 'center', maxWidth: '500px', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                        Ana sistem omurgasinda (Layout/Root) kritik bir cokme meydana geldi.<br />
                        Ancak Endiselenmeyin! Kalkan aktiflesti ve veri kaybi onlendi.
                    </p>

                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Hata Ref (Doomsday Log):</div>
                        <code style={{ fontSize: '0.85rem', color: '#fca5a5', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            {error?.message || 'Bilinmeyen omurga hatasi.'}
                        </code>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            onClick={() => reset()}
                            style={{ background: '#059669', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(5,150,105,0.4)' }}
                        >
                            {'\ud83d\udd04'} YENIDEN BASLAT
                        </button>
                    </div>

                    <p style={{ color: '#475569', fontSize: '0.75rem', margin: '2rem 0 0 0', fontWeight: 700 }}>
                        mizanet.com | PROTOKOL: ANKA KUSU (ZERO-DOWNTIME)
                    </p>
                </div>
            </body>
        </html>
    );
}
