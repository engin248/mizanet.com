/**
 * core/auth/AuthContext.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Auth Context Tanımı
 *
 * KURAL: Yalnızca Context nesnesi. Provider ve hook ayrı dosyalarda.
 * Bu sayede context import zinciri kırılmaz, circular dep oluşmaz.
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { createContext } from 'react';

/**
 * @typedef {{
 *   grup: string,
 *   label: string,
 *   gosterge: string,
 *   zaman: number
 * }} Kullanici
 *
 * @typedef {{
 *   kullanici: Kullanici|null,
 *   yukleniyor: boolean,
 *   girisYap: (pin: string) => Promise<any>,
 *   cikisYap: () => void,
 *   sayfaErisim: (href: string) => string|null
 * }} AuthCtxType
 */

export const AuthContext = createContext(/** @type {AuthCtxType|null} */(null));
