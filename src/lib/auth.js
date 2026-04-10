/**
 * src/lib/auth.js
 * ─────────────────────────────────────────────────────────────────
 * CANLI KAYNAK: src/core/auth/
 *
 * Bu dosya artık yalnızca core/auth katmanına yönlendirir.
 * Yeni kodda @/core/auth kullanın.
 * ─────────────────────────────────────────────────────────────────
 */
export {
    AuthContext,
    AuthProvider,
    useAuth,
    ERISIM_GRUPLARI,
    ERISIM_MATRISI,
    OTURUM_SURESI_MS,
    MAX_YANLIS_GIRIS,
    KILIT_SURESI_MS,
    pindenGrupBul,
} from '@/core/auth';
