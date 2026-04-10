/**
 * core/permissions/index.js
 * ─────────────────────────────────────────────────────────────────
 * core/permissions barrel export — tek giriş noktası.
 * ─────────────────────────────────────────────────────────────────
 */
export { YetkiContext } from './PermissionContext';
export { YetkiProvider } from './PermissionProvider';
export { useYetki, useYetkiPanel } from './useYetki';
export { GizliVeri } from './GizliVeri';
export { VARSAYILAN_YETKILER, YETKI_KAYNAKLARI } from './permissionTypes';
