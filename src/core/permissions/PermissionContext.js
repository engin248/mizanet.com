/**
 * core/permissions/PermissionContext.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Yetki Context Tanımı (sadece context)
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { createContext } from 'react';
import { VARSAYILAN_YETKILER } from './permissionTypes';

export const YetkiContext = createContext({
    yetkiMap: {},
    yetkiVar: (_k) => true,
    yukleniyor: false,
    yetkiGuncelle: async () => { },
    tumYetkiler: VARSAYILAN_YETKILER,
});
