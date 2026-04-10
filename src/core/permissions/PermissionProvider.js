/**
 * core/permissions/PermissionProvider.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Yetki Provider Bileşeni
 *
 * Supabase'den b0_yetki_ayarlari tablosunu okur,
 * giriş yapan kullanıcının yetkilerini sağlar.
 * ─────────────────────────────────────────────────────────────────
 */
'use client';
import { handleError, logCatch } from '@/lib/errorCore';
import { useState, useEffect, useCallback } from 'react';
import { YetkiContext } from './PermissionContext';
import { VARSAYILAN_YETKILER } from './permissionTypes';
import { useAuth } from '@/core/auth/useAuth';
import { supabase } from '@/core/db/supabaseClient';

export function YetkiProvider({ children }) {
    const { kullanici } = useAuth();
    const [yetkiMap, setYetkiMap] = useState({});
    const [yukleniyor, setYukleniyor] = useState(false);
    const [tumYetkiler, setTumYetkiler] = useState(VARSAYILAN_YETKILER);

    const yukle = useCallback(async () => {
        setYukleniyor(true);
        try {
            const { data, error } = await supabase
                .from('b0_yetki_ayarlari')
                .select('grup, kaynak, izin_var');

            if (error || !data?.length) {
                setTumYetkiler(VARSAYILAN_YETKILER);
                const grup = kullanici?.grup;
                if (grup && grup !== 'tam') {
                    setYetkiMap(VARSAYILAN_YETKILER[grup] || {});
                } else {
                    setYetkiMap({});
                }
                return;
            }

            const yeni = { uretim: {}, genel: {} };
            for (const row of data) {
                if (yeni[row.grup]) yeni[row.grup][row.kaynak] = row.izin_var;
            }
            setTumYetkiler(yeni);

            const grup = kullanici?.grup;
            if (grup && grup !== 'tam') {
                setYetkiMap(yeni[grup] || VARSAYILAN_YETKILER[grup] || {});
            } else {
                setYetkiMap({});
            }
        } catch (hata) {
            handleError('ERR-GVN-CR-101', 'src/core/permissions/PermissionProvider.js', hata, 'orta');
            setTumYetkiler(VARSAYILAN_YETKILER);
        } finally {
            setYukleniyor(false);
        }
    }, [kullanici?.grup]);

    useEffect(() => { yukle(); }, [yukle]);

    const yetkiVar = useCallback((kaynak) => {
        if (!kullanici) return false;
        if (kullanici.grup === 'tam') return true;
        if (kaynak in yetkiMap) return yetkiMap[kaynak];
        return false;
    }, [kullanici, yetkiMap]);

    const yetkiGuncelle = useCallback(async (grup, kaynak, izinVar) => {
        const { error } = await supabase
            .from('b0_yetki_ayarlari')
            .upsert(
                { grup, kaynak, izin_var: izinVar, guncellendi_at: new Date().toISOString() },
                { onConflict: 'grup,kaynak' }
            );
        if (error) throw error;
        await yukle();
    }, [yukle]);

    return (
        <YetkiContext.Provider value={{ yetkiMap, yetkiVar, yukleniyor, yetkiGuncelle, tumYetkiler }}>
            {children}
        </YetkiContext.Provider>
    );
}
