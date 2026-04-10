/**
 * core/permissions/GizliVeri.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Gizli Veri Bileşeni
 *
 * Yetki yoksa içeriği gizler, 🔒 gösterir.
 * Yalnızca UI sorumluluğu vardır. İş mantığı içermez.
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { useYetki } from './useYetki';

const GIZLI_STIL = {
    background: '#e2e8f0',
    color: '#94a3b8',
    borderRadius: 4,
    padding: '2px 8px',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
};

/**
 * @param {{ kaynak: string, children: React.ReactNode, yedek?: string }} props
 */
export function GizliVeri({ kaynak, children, yedek = '—' }) {
    const { yetkiVar } = useYetki(kaynak);
    if (!yetkiVar) {
        return (
            <span style={GIZLI_STIL}>
                {yedek === '—' ? '🔒 Gizli' : yedek}
            </span>
        );
    }
    return children;
}
