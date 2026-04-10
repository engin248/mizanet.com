/**
 * src/lib/logger.js — Sistem Logger
 * Hata Kodu: ERR-SYS-LB-007
 *
 * Tüm AI kararlarını, API hatalarını ve kritik işlemleri loglar.
 * Supabase b0_sistem_loglari tablosuna yazar (Kriter 55, 80, VV3).
 * ERR-{MODUL}-{KATMAN}-{NUMARA} formatını destekler.
 *
 * Kullanım:
 *   import { logger } from '@/lib/logger';
 *   logger.aiDecision({ input, explanation });
 *   logger.error('ERR-KMS-RT-001', 'Kumaş ekleme başarısız', { url, status });
 */
import { supabase } from './supabase';
import { hataKoduDogrula } from './errorCore';

const IS_DEV = process.env.NODE_ENV === 'development';

// ─── MIMARI DÜZELTME: Kullanıcı bağlamı enjeksiyonu ────────────────
// ESKİ: kullanici_adi = 'SISTEM_LOGGER' (tüm loglar aynı isimle)
// YENİ: Gerçek kullanıcı grubu/zaaman log'a işleniyor
/**
 * @param {string} tip
 * @param {any} veri
 * @param {any} [kullanici]
 * @param {string} [hataKodu] - ERR-{MODUL}-{KATMAN}-{NUMARA}
 */
function supabaseLog(tip, veri, kullanici = null, hataKodu = null) {
    const kayit = {
        tablo_adi: veri?.tablo || 'sistem_geneli',
        islem_tipi: tip.toUpperCase(),
        kullanici_adi: kullanici?.grup || kullanici?.label || 'SISTEM',
        kullanici_zaman: new Date().toISOString(),
        eski_veri: {
            ...(typeof veri === 'object' ? veri : { mesaj: veri }),
            ...(hataKodu ? { hata_kodu: hataKodu } : {}),
        },
    };
    // Fire-and-forget — log hatası sistemi durdurmamalı
    supabase.from('b0_sistem_loglari').insert([kayit]).then();
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const logger = {
    /** 
     * AI kararı logu — HermAI tarafından kullanılır (Kriter VV3, 80)
     * @param {any} veri 
     * @param {any} [kullanici]
     */
    async aiDecision(veri, kullanici = null) {
        if (IS_DEV) console.log('[HermAI Karar]', veri);
        supabaseLog('AI_KARAR', veri, kullanici);
        if (veri?.tip === 'HERM_LOOP' || veri?.tip === 'HERM_REJECTED') {
            try {
                await supabase.from('b0_herm_ai_kararlar').insert([{
                    birim: veri.birim || 'genel',
                    aciklama_tr: veri.yerelAciklama || null,
                    genel_ozet: veri.genelOzet || null,
                    durum: veri.tip === 'HERM_REJECTED' ? 'rejected'
                        : (veri.tutarli ? 'explained' : 'risk'),
                    ana_metrik: veri.anaMetrik || null,
                    gercekcilik: veri.gercekcilikDurumu || 'kontrol_edilmedi',
                    yapan_kullanici: kullanici?.grup || 'sistem',
                }]);
            } catch (e) { console.error('[ERR-SYS-LB-007] [CATCH logger.aiDecision]', e?.message || e); }
        }
    },

    /** 
     * Hata kodu destekli API hata logu
     * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA} formatında hata kodu
     * @param {string} mesaj - İnsan okunabilir hata açıklaması
     * @param {any} veri - Ek veri
     * @param {any} [kullanici]
     */
    error(hataKodu, mesaj, veri = {}, kullanici = null) {
        // Hata kodu format doğrulama
        const dogrulama = hataKoduDogrula(hataKodu);
        if (!dogrulama.gecerli) {
            console.error(`[ERR-SYS-LB-007] GEÇERSİZ HATA KODU: ${dogrulama.hata}`);
        }

        if (IS_DEV) console.error(`[${hataKodu}] [HATA]`, mesaj, veri);
        supabaseLog('HATA', { mesaj, hata_kodu: hataKodu, ...veri }, kullanici, hataKodu);
    },

    /** 
     * Kritik işlem logu (silme, onay, kilit) — kullanıcı zorunlu 
     * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA} formatında hata kodu
     * @param {string} mesaj 
     * @param {any} veri 
     * @param {any} [kullanici]
     */
    kritikIslem(hataKodu, mesaj, veri = {}, kullanici = null) {
        if (IS_DEV) console.warn(`[${hataKodu}] [KRİTİK]`, mesaj, veri, '| Kullanıcı:', kullanici?.grup);
        supabaseLog('KRITIK_ISLEM', {
            mesaj,
            hata_kodu: hataKodu,
            eski_deger: veri?.eski || null,
            yeni_deger: veri?.yeni || null,
            ...veri
        }, kullanici, hataKodu);
    },

    /** 
     * Kullanıcı işlem logu
     * @param {string} islem 
     * @param {any} veri 
     * @param {any} [kullaniciObj]
     */
    kullanici(islem, veri = {}, kullaniciObj = null) {
        if (IS_DEV) console.info('[KULLANICI]', islem, veri);
        supabaseLog('KULLANICI_ISLEM', { islem, ...veri }, kullaniciObj);
    },

    /** Geliştirme ortaı debug logu (production'da sessiz) */
    debug(mesaj, veri = {}) {
        if (IS_DEV) console.debug('[DEBUG]', mesaj, veri);
    },
};


export default logger;
