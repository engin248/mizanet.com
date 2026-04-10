/**
 * core/auth/authTypes.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Erişim Sabitleri ve Tip Tanımlamaları
 *
 * KURAL: Bu dosya PURE DATA — hiçbir React/hook/state içermez.
 * İçe aktarılan her yerde tree-shakeable, test edilebilir.
 * ─────────────────────────────────────────────────────────────────
 */

/** Sistem erişim grupları */
export const ERISIM_GRUPLARI = {
    tam: {
        label: 'Sistem',
        gosterge: '🔑',
    },
    uretim: {
        label: 'Üretim',
        gosterge: '⚙️',
    },
    genel: {
        label: 'Genel',
        gosterge: '👤',
    },
};

/**
 * Sayfa erişim matrisi.
 * Her rota → her grup için izin seviyesi: 'full' | 'read' | null
 */
export const ERISIM_MATRISI = {
    '/': { tam: 'full', uretim: 'read', genel: 'read' },
    '/ajanlar': { tam: 'full', uretim: null, genel: null },
    '/arge': { tam: 'full', uretim: 'full', genel: 'read' },
    '/kumas': { tam: 'full', uretim: 'full', genel: 'read' },
    '/kalip': { tam: 'full', uretim: 'full', genel: 'read' },
    '/modelhane': { tam: 'full', uretim: 'full', genel: 'read' },
    '/kesim': { tam: 'full', uretim: 'full', genel: 'read' },
    '/uretim': { tam: 'full', uretim: 'full', genel: 'read' },
    '/imalat': { tam: 'full', uretim: 'full', genel: 'read' },
    '/maliyet': { tam: 'full', uretim: 'read', genel: 'read' },
    '/muhasebe': { tam: 'full', uretim: 'read', genel: 'read' },
    '/katalog': { tam: 'full', uretim: 'full', genel: 'read' },
    '/siparisler': { tam: 'full', uretim: 'full', genel: 'read' },
    '/stok': { tam: 'full', uretim: 'full', genel: 'read' },
    '/kasa': { tam: 'full', uretim: null, genel: null },
    '/musteriler': { tam: 'full', uretim: 'full', genel: 'read' },
    '/personel': { tam: 'full', uretim: 'read', genel: 'read' },
    '/guvenlik': { tam: 'full', uretim: null, genel: null },
    '/raporlar': { tam: 'full', uretim: 'read', genel: 'read' },
    '/denetmen': { tam: 'full', uretim: null, genel: null },
    '/ayarlar': { tam: 'full', uretim: null, genel: null },
    '/gorevler': { tam: 'full', uretim: 'full', genel: 'read' },
    '/kameralar': { tam: 'full', uretim: 'full', genel: 'read' },
    '/tasarim': { tam: 'full', uretim: null, genel: null },
    '/haberlesme': { tam: 'full', uretim: 'full', genel: 'read' },
};

/**
 * Oturum süresi — JWT ve client session senkronize.
 * Tek kaynak, iki yerde bakım yapılmaz.
 */
export const OTURUM_SURESI_MS = 8 * 60 * 60 * 1000; // 8 saat

/** Brute-force koruma eşiği */
export const MAX_YANLIS_GIRIS = 5;
export const KILIT_SURESI_MS = 30 * 1000; // 30 saniye

/**
 * PIN doğrulama artık tamamen server-side.
 * Client-side bu işlemi yapamaz — null döner.
 * @returns {null} her zaman null
 */
export function pindenGrupBul(_pin) {
    return null;
}
