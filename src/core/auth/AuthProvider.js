/**
 * core/auth/AuthProvider.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Auth Provider Bileşeni
 *
 * KURAL: State yönetimi + PIN doğrulama mantığı burada.
 * Context tanımı AuthContext.js'de, hook useAuth.js'de.
 *
 * Akış:
 *   1. Mount → localStorage'dan oturum oku
 *   2. girisYap() → /api/pin-dogrula → JWT cookie
 *   3. cikisYap() → tüm token'ları temizle
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { handleError, logCatch } from '@/lib/errorCore';
import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import {
    ERISIM_GRUPLARI,
    ERISIM_MATRISI,
    OTURUM_SURESI_MS,
    MAX_YANLIS_GIRIS,
    KILIT_SURESI_MS,
    pindenGrupBul,
} from './authTypes';

export function AuthProvider({ children }) {
    const [kullanici, setKullanici] = useState(null);
    const [yukleniyor, setYukleniyor] = useState(true);

    // ── Oturum geri yükle ──────────────────────────────────────────
    useEffect(() => {
        try {
            const kayit = localStorage.getItem('sb47_auth');
            if (kayit) {
                const parsed = JSON.parse(kayit);
                if (parsed.zaman && Date.now() - parsed.zaman < OTURUM_SURESI_MS) {
                    setKullanici(parsed);
                    _sessionTokenYaz(parsed.grup);
                } else {
                    localStorage.removeItem('sb47_auth');
                }
            }
        } catch (hata) {
            handleError('ERR-AUTH-CR-101', 'src/core/auth/AuthProvider.js', hata, 'orta');
            localStorage.removeItem('sb47_auth');
        }
        setYukleniyor(false);
    }, []);

    // ── Giriş ─────────────────────────────────────────────────────
    const girisYap = async (pin) => {
        // Brute-force kontrolü
        const kilit = JSON.parse(localStorage.getItem('sb47_kilit') || 'null');
        if (kilit && Date.now() < kilit.kilitBitisTarihi) {
            const kalanSn = Math.ceil((kilit.kilitBitisTarihi - Date.now()) / 1000);
            return { basarili: false, mesaj: `${kalanSn} saniye bekleyin. (Çok fazla hatalı giriş)` };
        }

        // Server-side PIN doğrulama
        let grup = null;
        let veri = null;
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const res = await fetch('/api/pin-dogrula', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: pin.trim() }),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            if (res.ok) {
                veri = await res.json();
                grup = veri.grup || null;
            }
        } catch (agHata) {
            handleError('ERR-AUTH-CR-101', 'src/core/auth/AuthProvider.js', agHata, 'orta');
            grup = pindenGrupBul(pin); // null döner — server-side only
        }

        if (!grup) {
            return _yanlisPinKaydet();
        }

        // Başarılı giriş
        localStorage.removeItem('sb47_yanlis_pin');
        localStorage.removeItem('sb47_kilit');

        const bilgi = ERISIM_GRUPLARI[grup];
        const kayit = { grup, label: bilgi.label, gosterge: bilgi.gosterge, zaman: Date.now() };
        setKullanici(kayit);
        localStorage.setItem('sb47_auth', JSON.stringify(kayit));

        // Cookie — middleware katmanı için
        const cookieValue = encodeURIComponent(JSON.stringify(kayit));
        document.cookie = `sb47_auth_session=${cookieValue}; path=/; max-age=${OTURUM_SURESI_MS / 1000}; SameSite=Strict`;

        // Grup bazlı ek cookie'ler (middleware uyumlu)
        if (grup === 'uretim') {
            document.cookie = `sb47_uretim_pin=1; path=/; max-age=${OTURUM_SURESI_MS / 1000}; SameSite=Strict`;
        } else if (grup === 'genel') {
            document.cookie = `sb47_genel_pin=1; path=/; max-age=${OTURUM_SURESI_MS / 1000}; SameSite=Strict`;
        }

        _sessionTokenYaz(grup);
        _girisLogYaz(grup, 'giris');
        return true;
    };

    // ── Çıkış ─────────────────────────────────────────────────────
    const cikisYap = () => {
        if (kullanici) _girisLogYaz(kullanici.grup, 'cikis');
        setKullanici(null);
        localStorage.removeItem('sb47_auth');
        document.cookie = 'sb47_auth_session=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'sb47_uretim_pin=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'sb47_genel_pin=; path=/; max-age=0; SameSite=Strict';
        document.cookie = 'sb47_jwt_token=; path=/; max-age=0; SameSite=Strict';
    };

    // ── Sayfa erişim kontrolü ──────────────────────────────────────
    const sayfaErisim = (href) => {
        if (!kullanici) return null;
        const matris = ERISIM_MATRISI[href];
        if (!matris) return 'read';
        return matris[kullanici.grup] || null;
    };

    return (
        <AuthContext.Provider value={{ kullanici, yukleniyor, girisYap, cikisYap, sayfaErisim }}>
            {children}
        </AuthContext.Provider>
    );
}

// ── Özel yardımcılar (dosya içi) ──────────────────────────────────
function _sessionTokenYaz(grup) {
    if (typeof window === 'undefined') return;
    if (grup === 'tam') {
        sessionStorage.setItem('sb47_uretim_token', 'true');
        sessionStorage.setItem('sb47_genel_token', 'true');
    } else if (grup === 'uretim') {
        sessionStorage.setItem('sb47_uretim_token', 'true');
    } else if (grup === 'genel') {
        sessionStorage.setItem('sb47_genel_token', 'true');
    }
}

function _yanlisPinKaydet() {
    const deneme = JSON.parse(localStorage.getItem('sb47_yanlis_pin') || '{"sayi":0}');
    const yeniSayi = deneme.sayi + 1;
    if (yeniSayi >= MAX_YANLIS_GIRIS) {
        localStorage.setItem('sb47_kilit', JSON.stringify({ kilitBitisTarihi: Date.now() + KILIT_SURESI_MS }));
        localStorage.setItem('sb47_yanlis_pin', JSON.stringify({ sayi: 0 }));
        return { basarili: false, mesaj: `Çok fazla hatalı deneme! ${KILIT_SURESI_MS / 1000} saniye kilitlendikten sonra tekrar deneyin.` };
    }
    localStorage.setItem('sb47_yanlis_pin', JSON.stringify({ sayi: yeniSayi }));
    return false;
}

function _girisLogYaz(grup, islem) {
    const loglar = JSON.parse(localStorage.getItem('sb47_giris_log') || '[]');
    loglar.unshift({ grup, saat: new Date().toISOString(), islem });
    localStorage.setItem('sb47_giris_log', JSON.stringify(loglar.slice(0, 50)));
}
