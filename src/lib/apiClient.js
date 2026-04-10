'use client';
/**
 * ─── API CLIENT ────────────────────────────────────────────────────────────
 * src/lib/apiClient.js
 * Hata Kodu: ERR-SYS-LB-003
 *
 * Merkezi Fetch wrapper — tüm API çağrıları buradan geçer.
 * Sağladığı özellikler:
 *   ✅ Auth token otomatik eklenir (JWT cookie'den)
 *   ✅ Zaman aşımı koruması (varsayılan 10sn)
 *   ✅ Hata yakalama merkezi (401 → login yönlendirme)
 *   ✅ Retry (ağ kesintisinde 1x otomatik tekrar)
 *   ✅ Standart JSON I/O
 *   ✅ ERR-{MODUL}-{KATMAN}-{NUMARA} hata kodu entegrasyonu
 *
 * Kullanım:
 *   import { apiClient } from '@/lib/apiClient';
 *
 *   // GET
 *   const veri = await apiClient.get('/api/uretim-veri');
 *
 *   // POST
 *   const sonuc = await apiClient.post('/api/gorev-ekle', { baslik: 'Yeni görev' });
 */

const TIMEOUT_MS = 10_000; // 10 saniye
const RETRY_SAYISI = 1;      // Hata durumunda bir kez tekrar dene

// ─── Cookie okuyucu ──────────────────────────────────────────────
function cookieOku(ad) {
    if (typeof document === 'undefined') return null;
    const deger = document.cookie
        .split('; ')
        .find(r => r.startsWith(`${ad}=`))
        ?.split('=')[1];
    return deger ? decodeURIComponent(deger) : null;
}

// ─── JWT token al ────────────────────────────────────────────────
function tokenAl() {
    return cookieOku('sb47_jwt_token') || null;
}

// ─── 401 → Login yönlendirme ─────────────────────────────────────
function oturumSonlandir() {
    if (typeof window !== 'undefined') {
        console.error('[ERR-SYS-LB-003] Oturum sona erdi — yeniden giriş gerekli');
        // Tüm auth verilerini temizle
        localStorage.removeItem('sb47_auth');
        sessionStorage.clear();
        // Cookie temizle
        document.cookie = 'sb47_auth_session=; path=/; max-age=0';
        document.cookie = 'sb47_jwt_token=; path=/; max-age=0';
        // Login'e yönlendir
        window.location.href = '/giris?hata=oturum_suresi_doldu';
    }
}

// ─── URL'den hata kodu çıkar ─────────────────────────────────────
function urldenHataKodu(url) {
    // API URL'sinden modül tahmin et
    const parcalar = url.replace('/api/', '').split('/');
    const endpoint = parcalar[0] || 'genel';

    const ENDPOINT_HATA_HARITASI = {
        'kumas-ekle': 'ERR-KMS-RT-001',
        'siparis-ekle': 'ERR-SPR-RT-001',
        'stok-alarm': 'ERR-STK-RT-001',
        'stok-hareket-ekle': 'ERR-STK-RT-002',
        'personel-ekle': 'ERR-PRS-RT-001',
        'musteri-ekle': 'ERR-MST-RT-001',
        'kasa-ozet': 'ERR-KSA-RT-001',
        'gorev-ekle': 'ERR-GRV-RT-001',
        'is-emri-ekle': 'ERR-URT-RT-001',
        'health': 'ERR-API-RT-001',
        'veri-getir': 'ERR-API-RT-002',
        'kur': 'ERR-API-RT-003',
        'kamera-sayac': 'ERR-KMR-RT-001',
        'haberlesme': 'ERR-HBR-RT-001',
        'telegram-bildirim': 'ERR-HBR-RT-003',
        'ajan-calistir': 'ERR-AJN-RT-001',
        'ajan-orkestrator': 'ERR-AJN-RT-002',
        'ajan-tetikle': 'ERR-AJN-RT-003',
    };

    return ENDPOINT_HATA_HARITASI[endpoint] || 'ERR-API-RT-002';
}

// ─── Ana istek fonksiyonu ─────────────────────────────────────────
async function istek(url, secenekler = {}, denemSayisi = 0) {
    const { body, timeout = TIMEOUT_MS, ...digerSecenekler } = secenekler;

    const controller = new AbortController();
    const zamanlayici = setTimeout(() => controller.abort(), timeout);

    // Başlıkları oluştur
    const headers = {
        'Content-Type': 'application/json',
        ...digerSecenekler.headers,
    };

    // JWT varsa Authorization header ekle
    const token = tokenAl();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // CSRF token — Mutasyon isteklerinde otomatik ekle
    const metod = (digerSecenekler.method || 'GET').toUpperCase();
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(metod)) {
        const csrfToken = cookieOku('sb47_csrf_token');
        if (csrfToken) {
            headers['x-csrf-token'] = csrfToken;
        }
    }

    try {
        const yanit = await fetch(url, {
            ...digerSecenekler,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });

        clearTimeout(zamanlayici);

        const hataKodu = urldenHataKodu(url);

        // 401 → Oturum sona erdi
        if (yanit.status === 401) {
            oturumSonlandir();
            throw new Error(`[${hataKodu}] Oturum sona erdi. Lütfen tekrar giriş yapın.`);
        }

        // 429 → Rate limit aşıldı
        if (yanit.status === 429) {
            throw new Error(`[${hataKodu}] Çok fazla istek gönderildi. Lütfen bekleyin.`);
        }

        // 5xx → Sunucu hatası, retry
        if (yanit.status >= 500 && denemSayisi < RETRY_SAYISI) {
            console.warn(`[${hataKodu}] [apiClient] ${yanit.status} hatası, ${denemSayisi + 1}. deneme: ${url}`);
            await new Promise(r => setTimeout(r, 1000)); // 1sn bekle
            return istek(url, secenekler, denemSayisi + 1);
        }

        // Yanıtı parse et
        const contentType = yanit.headers.get('content-type') || '';
        const veri = contentType.includes('application/json')
            ? await yanit.json()
            : await yanit.text();

        // HTTP hata → throw
        if (!yanit.ok) {
            const hataMesaji = typeof veri === 'object' ? (veri.hata || veri.error || 'Bilinmeyen hata') : veri;
            throw new Error(`[${hataKodu}] ${hataMesaji}`);
        }

        return veri;

    } catch (hata) {
        clearTimeout(zamanlayici);

        const hataKodu = urldenHataKodu(url);

        // Timeout hatası
        if (hata.name === 'AbortError') {
            // Retry
            if (denemSayisi < RETRY_SAYISI) {
                console.warn(`[${hataKodu}] [apiClient] Zaman aşımı, yeniden deneniyor: ${url}`);
                return istek(url, secenekler, denemSayisi + 1);
            }
            throw new Error(`[${hataKodu}] İstek zaman aşımına uğradı (${timeout / 1000}sn): ${url}`);
        }

        // Ağ hatası → retry
        if (!navigator.onLine && denemSayisi < RETRY_SAYISI) {
            throw new Error(`[ERR-SYS-LB-003] İnternet bağlantısı yok. Çevrimdışı modda çalışılıyor.`);
        }

        throw hata;
    }
}

// ─── Public API ──────────────────────────────────────────────────
export const apiClient = {
    /**
     * GET isteği
     * @param {string} url
     * @param {object} [secenekler]
     */
    get: (url, secenekler = {}) =>
        istek(url, { method: 'GET', ...secenekler }),

    /**
     * POST isteği
     * @param {string} url
     * @param {object} [veri]
     * @param {object} [secenekler]
     */
    post: (url, veri = {}, secenekler = {}) =>
        istek(url, { method: 'POST', body: veri, ...secenekler }),

    /**
     * PUT isteği
     */
    put: (url, veri = {}, secenekler = {}) =>
        istek(url, { method: 'PUT', body: veri, ...secenekler }),

    /**
     * DELETE isteği
     */
    delete: (url, secenekler = {}) =>
        istek(url, { method: 'DELETE', ...secenekler }),
};

export default apiClient;
