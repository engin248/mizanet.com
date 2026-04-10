// ============================================================
// MİZANET — MERKEZİ HATA YÖNETİM ÇEKİRDEĞİ
// Dosya: src/lib/errorCore.js
// Hata Kodu: ERR-SYS-LB-005
//
// AMAÇ: Tüm catch bloklarından çağrılır.
// Hiçbir hata sessizce yutulmaz.
// ERR-{MODUL}-{KATMAN}-{NUMARA} formatını doğrular ve loglar.
// ============================================================

// ─── HATA KODU FORMAT DOĞRULAYICI ────────────────────────────────
const HATA_KODU_REGEX = /^ERR-[A-Z]{2,4}-[A-Z]{2}-\d{3}$/;

const GECERLI_MODULLER = [
    'KRG', 'KMS', 'AKS', 'MDL', 'MLY', 'URT', 'KSM', 'SPR',
    'STK', 'KSA', 'MHS', 'PRS', 'MST', 'RPR', 'AJN', 'ARG',
    'KMR', 'GVN', 'HBR', 'GRV', 'DNT', 'AYR', 'TSR', 'KTL',
    'SYS', 'AUTH', 'API'
];

const GECERLI_KATMANLAR = ['PG', 'RT', 'SV', 'HK', 'CM', 'LB', 'CR'];

/**
 * Hata kodunun ERR-{MODUL}-{KATMAN}-{NUMARA} formatına uygun olup olmadığını doğrular.
 * @param {string} kod - Doğrulanacak hata kodu
 * @returns {{ gecerli: boolean, hata?: string }}
 */
export function hataKoduDogrula(kod) {
    if (!kod || typeof kod !== 'string') {
        return { gecerli: false, hata: 'Hata kodu boş veya string değil' };
    }

    if (!HATA_KODU_REGEX.test(kod)) {
        return { gecerli: false, hata: `Format hatası: "${kod}" — Beklenen: ERR-{MODUL}-{KATMAN}-{NUMARA}` };
    }

    const parcalar = kod.split('-');
    const modul = parcalar[1];
    const katman = parcalar[2];

    if (!GECERLI_MODULLER.includes(modul)) {
        return { gecerli: false, hata: `Geçersiz modül: "${modul}" — Geçerli: ${GECERLI_MODULLER.join(', ')}` };
    }

    if (!GECERLI_KATMANLAR.includes(katman)) {
        return { gecerli: false, hata: `Geçersiz katman: "${katman}" — Geçerli: ${GECERLI_KATMANLAR.join(', ')}` };
    }

    return { gecerli: true };
}

/**
 * Hata kodu parçalayıcı — koddan modül, katman ve numara çıkarır.
 * @param {string} kod
 * @returns {{ modul: string, katman: string, numara: string } | null}
 */
export function hataKoduParcala(kod) {
    const dogrulama = hataKoduDogrula(kod);
    if (!dogrulama.gecerli) return null;

    const parcalar = kod.split('-');
    return {
        modul: parcalar[1],
        katman: parcalar[2],
        numara: parcalar[3],
    };
}

/**
 * Merkezi hata yakalayıcı.
 * Her catch bloğunda çağrılmalı. Hata bilgisini:
 * - console.error ile yazar (her zaman)
 * - Sentry'ye gönderir (production'da)
 * - Supabase log tablosuna yazar (opsiyonel)
 *
 * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA} formatında hata kodu
 * @param {string} kaynak - Hatanın oluştuğu dosya/fonksiyon adı (ör: 'KarargahMainContainer.veriCek')
 * @param {any} hata - Yakalanan hata objesi
 * @param {'dusuk'|'orta'|'yuksek'|'kritik'} seviye - Hata seviyesi
 * @param {object} [ekVeri] - Ek bağlam bilgisi
 * @returns {{ hataKodu: string, mesaj: string, zaman: string, seviye: string }}
 */
export function handleError(hataKodu, kaynak, hata, seviye = 'orta', ekVeri = null) {
    const zaman = new Date().toISOString();
    const mesaj = hata?.message || (typeof hata === 'string' ? hata : 'Bilinmeyen hata');
    const stack = hata?.stack || null;

    // ─── HATA KODU DOĞRULAMA ─────────────────────────────────
    const dogrulama = hataKoduDogrula(hataKodu);
    if (!dogrulama.gecerli) {
        console.error(
            `🔴 [ERR-SYS-LB-005] HATA KODU FORMAT HATASI: ${dogrulama.hata}`,
            `\n  Kaynak: ${kaynak}`,
            `\n  Orijinal hata: ${mesaj}`
        );
    }

    // ─── KONSOL ÇIKTISI (HER ZAMAN) ─────────────────────────
    const etiket = seviyeEtiketi(seviye);
    console.error(
        `${etiket} [${hataKodu}] [${kaynak}] ${mesaj}`,
        ...(ekVeri ? ['\n  Ek veri:', ekVeri] : []),
        ...(stack ? ['\n  Stack:', stack] : [])
    );

    // ─── SENTRY ENTEGRASYONU ────────────────────────────────
    try {
        if (typeof window !== 'undefined') {
            // Client-side
            import('@sentry/nextjs').then(Sentry => {
                Sentry.captureException(hata instanceof Error ? hata : new Error(mesaj), {
                    tags: { hataKodu, kaynak, seviye },
                    extra: { ekVeri, zaman },
                });
            }).catch(() => { /* Sentry yüklenemezse sessiz — bu tek istisna */ });
        }
    } catch {
        // Sentry modülü yoksa devam et — ama konsol çıktısı yukarıda zaten verildi
    }

    // ─── YAPILAN İŞLEMİN ÖZET DÖNÜŞÜ ────────────────────────
    return {
        hataKodu,
        mesaj,
        zaman,
        seviye,
    };
}

/**
 * Sessiz catch bloklarında kullanılacak kısa versiyon.
 * Örnek: } catch (e) { logCatch('ERR-SYS-LB-001', 'dosya.js', e); }
 */
export function logCatch(hataKodu, kaynak, hata) {
    return handleError(hataKodu, kaynak, hata, 'dusuk');
}

/**
 * Kritik hatalar için.
 * Örnek: } catch (e) { kritikHata('ERR-SYS-PG-004', 'middleware.jwt', e); }
 */
export function kritikHata(hataKodu, kaynak, hata, ekVeri = null) {
    return handleError(hataKodu, kaynak, hata, 'kritik', ekVeri);
}

/**
 * Standart MizanetError sınıfı — hata kodunu taşır.
 */
export class MizanetError extends Error {
    /**
     * @param {string} hataKodu - ERR-{MODUL}-{KATMAN}-{NUMARA}
     * @param {string} mesaj - İnsan okunabilir hata açıklaması
     * @param {'dusuk'|'orta'|'yuksek'|'kritik'} seviye
     * @param {object} [ekVeri]
     */
    constructor(hataKodu, mesaj, seviye = 'orta', ekVeri = null) {
        super(`[${hataKodu}] ${mesaj}`);
        this.name = 'MizanetError';
        this.hataKodu = hataKodu;
        this.seviye = seviye;
        this.ekVeri = ekVeri;
        this.zaman = new Date().toISOString();
    }
}

// ─── MODÜL VE KATMAN LİSTELERİ (export) ─────────────────────────
export { GECERLI_MODULLER, GECERLI_KATMANLAR, HATA_KODU_REGEX };

// ─── SEVİYE ETİKETİ ─────────────────────────────────────────
function seviyeEtiketi(seviye) {
    switch (seviye) {
        case 'kritik': return '🔴 [KRİTİK]';
        case 'yuksek': return '🟠 [YÜKSEK]';
        case 'orta':   return '🟡 [ORTA]';
        case 'dusuk':  return '🔵 [DÜŞÜK]';
        default:       return '⚪ [BİLİNMEYEN]';
    }
}
