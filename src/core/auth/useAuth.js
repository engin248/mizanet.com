/**
 * core/auth/useAuth.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Auth Hook
 *
 * KURAL: Yalnızca hook. Context veya Provider içermez.
 * Bu sayede her bileşen sadece ihtiyacı olan parçayı import eder.
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/**
 * Auth state'e erişim hook'u.
 * AuthProvider dışında kullanılırsa açık hata fırlatır.
 *
 * @returns {{ kullanici: import('./AuthContext').Kullanici|null, yukleniyor: boolean, girisYap: function, cikisYap: function, sayfaErisim: function }}
 */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('[MİZANET] useAuth() → AuthProvider dışında çağrıldı. Layout kontrolünü yapın.');
    }
    return ctx;
}
