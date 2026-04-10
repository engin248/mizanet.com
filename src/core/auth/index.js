/**
 * core/auth/index.js
 * ─────────────────────────────────────────────────────────────────
 * core/auth barrel export — tek giriş noktası.
 * Her import @/core/auth'dan yapılır, alt dosyalara girilmez.
 * ─────────────────────────────────────────────────────────────────
 */
export { AuthContext } from './AuthContext';
export { AuthProvider } from './AuthProvider';
export { useAuth } from './useAuth';
export {
    ERISIM_GRUPLARI,
    ERISIM_MATRISI,
    OTURUM_SURESI_MS,
    MAX_YANLIS_GIRIS,
    KILIT_SURESI_MS,
    pindenGrupBul,
} from './authTypes';
