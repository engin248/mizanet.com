// ============================================================
// AJAN SİSTEMİ — MERKEZİ INDEX (RE-EXPORT)
// Dosya: src/lib/agents/v2/index.js
//
// Tüm ajanlar buradan dışa aktarılır.
// Eski import yolları (ajanlar-v2.js) bu index üzerinden çalışır.
// ============================================================

// Paylaşılan config
export { AJAN_ISIMLERI } from './_ortak';

// 7 Ajan — her biri kendi dosyasında
export { sabahSubayi } from './sabahSubayi';
export { aksamci } from './aksamci';
export { nabiz } from './nabiz';
export { zincirci } from './zincirci';
export { finansKalkani } from './finansKalkani';
export { trendKasifi } from './trendKasifi';
export { muhasebeYazici } from './muhasebeYazici';

// Toplu çalıştırıcı
export async function tumAjanlariCalistir() {
    const { sabahSubayi: sabah } = await import('./sabahSubayi');
    const { nabiz: nabizFn } = await import('./nabiz');
    const { zincirci: zincirFn } = await import('./zincirci');
    const { finansKalkani: finansFn } = await import('./finansKalkani');

    const [sabahSonuc, nabizSonuc, zincirSonuc, finansSonuc] = await Promise.allSettled([
        sabah(),
        nabizFn(),
        zincirFn(),
        finansFn(),
    ]);
    return { sabah: sabahSonuc, nabizSonuc, zincir: zincirSonuc, finans: finansSonuc };
}
