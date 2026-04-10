// 🛡️ BAŞ MÜFETTİŞ API ZIRHI (SPAM VE DDOS KALKANI)
// Dosya: src/lib/ApiZirhi.js
// Hata Kodu: ERR-SYS-LB-011
// Amaç: Dışarıdan gelen API isteklerini sınırlandırmak ve Supabase faturasını korumak.

const islemHafizasi = new Map();

// Parametreler: 10 saniye içinde maksimum 5 istek atılabilir.
const LIMIT_SANIYE = 10;
const MAX_ISTEK = 5;

/**
 * Spam kontrolü — Rate limiting
 * @param {string} ipVeyaId - IP adresi veya kullanıcı ID'si
 * @returns {{ izinVerildi: boolean, kalanSure?: number, hataKodu?: string }}
 */
export function spamKontrol(ipVeyaId = 'anon_ip') {
    const simdi = Date.now();
    const kayit = islemHafizasi.get(ipVeyaId);

    if (!kayit) {
        islemHafizasi.set(ipVeyaId, { sayac: 1, baslangic: simdi });
        return { izinVerildi: true };
    }

    if (simdi - kayit.baslangic > LIMIT_SANIYE * 1000) {
        // Süre dolmuş, sayacı sıfırla
        islemHafizasi.set(ipVeyaId, { sayac: 1, baslangic: simdi });
        return { izinVerildi: true };
    }

    if (kayit.sayac >= MAX_ISTEK) {
        console.warn(`[ERR-SYS-LB-011] Spam tespit edildi. IP/ID: ${ipVeyaId}, İstek: ${kayit.sayac}/${MAX_ISTEK}`);
        return {
            izinVerildi: false,
            kalanSure: LIMIT_SANIYE - Math.floor((simdi - kayit.baslangic) / 1000),
            hataKodu: 'ERR-SYS-LB-011',
        };
    }

    kayit.sayac++;
    return { izinVerildi: true };
}

// 6 Saatte bir hafızayı temizle (Aşırı RAM tüketimini önlemek için Garaj Toplayıcısı)
setInterval(() => {
    islemHafizasi.clear();
    console.log('[ERR-SYS-LB-011] Spam hafızası temizlendi.');
}, 6 * 60 * 60 * 1000);
