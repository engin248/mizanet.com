/**
 * core/permissions/useYetki.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Yetki Hook'ları
 *
 * KURAL: Sadece hook'lar. Context ve Provider ayrı dosyalarda.
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { useContext } from 'react';
import { YetkiContext } from './PermissionContext';

/**
 * Belirli bir kaynak için yetki kontrolü.
 * @param {string} kaynak - Yetki kaynağı adı (örn: 'kasa_bakiye')
 */
export function useYetki(kaynak) {
    const { yetkiVar, yukleniyor, yetkiGuncelle, tumYetkiler } = useContext(YetkiContext);
    return {
        yetkiVar: yetkiVar(kaynak),
        yukleniyor,
        yetkiGuncelle,
        tumYetkiler,
    };
}

/**
 * Koordinatör paneli için tüm yetki bağlamı.
 */
export function useYetkiPanel() {
    const { yetkiGuncelle, tumYetkiler, yukleniyor } = useContext(YetkiContext);
    return { yetkiGuncelle, tumYetkiler, yukleniyor };
}
