/**
 * src/lib/yetki.js
 * ─────────────────────────────────────────────────────────────────
 * CANLI KAYNAK: src/core/permissions/
 *
 * Bu dosya artık yalnızca core/permissions katmanına yönlendirir.
 * Yeni kodda @/core/permissions kullanın.
 * ─────────────────────────────────────────────────────────────────
 */
export {
    YetkiContext,
    YetkiProvider,
    useYetki,
    useYetkiPanel,
    GizliVeri,
    VARSAYILAN_YETKILER,
    YETKI_KAYNAKLARI,
} from '@/core/permissions';
