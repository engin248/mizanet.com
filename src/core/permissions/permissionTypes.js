/**
 * core/permissions/permissionTypes.js
 * ─────────────────────────────────────────────────────────────────
 * MİZANET — Yetki Sabitleri
 *
 * KURAL: Pure data. Sıfır React, sıfır Supabase, sıfır side-effect.
 * Her ortamda (test, SSR, browser) güvenle import edilebilir.
 * ─────────────────────────────────────────────────────────────────
 */

/** Supabase b0_yetki_ayarlari tablosundaki kaynak isimleri */
export const YETKI_KAYNAKLARI = [
    'maliyet_tutar',
    'kasa_bakiye',
    'maas_detay',
    'urun_maliyet',
    'musteri_iletisim',
    'rapor_tam',
    'muhasebe_detay',
    'ajan_komuta',
    'siparis_fiyat',
];

/**
 * Varsayılan yetkiler — Supabase'e erişilemeyen durumlarda kullanılır.
 * tam grubu bu tabloyu kullanmaz (her şeyi görebilir).
 */
export const VARSAYILAN_YETKILER = {
    uretim: {
        maliyet_tutar: false,
        kasa_bakiye: false,
        maas_detay: false,
        urun_maliyet: true,
        musteri_iletisim: true,
        rapor_tam: false,
        muhasebe_detay: false,
        ajan_komuta: false,
        siparis_fiyat: true,
    },
    genel: {
        maliyet_tutar: false,
        kasa_bakiye: false,
        maas_detay: false,
        urun_maliyet: false,
        musteri_iletisim: false,
        rapor_tam: false,
        muhasebe_detay: false,
        ajan_komuta: false,
        siparis_fiyat: false,
    },
};
