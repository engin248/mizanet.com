'use client';
/**
 * app/kumas/page.js — GİRİŞ NOKTASI
 * Tüm UI   → features/kumas/components/KumasMainContainer.js
 * Tasarım Standartları Uygulandı: Zümrüt Yeşil (#046A38), Altın (#C8A951), Açık Gri (#F4F6F7)
 */
import { KumasMainContainer } from '@/features/kumas';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function KumasPage() {
    return (
        <ErrorBoundary fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#F4F6F7]">
                <p className="p-8 text-[#E74C3C] font-bold text-center border-2 border-[#E74C3C] bg-white rounded-xl shadow-xl">
                    ⚠️ Kumaş ve Malzeme modülü yüklenirken bir sistem hatası oluştu. <br />
                    Lütfen sistem yöneticisine başvurun.
                </p>
            </div>
        }>
            <div className="min-h-screen font-sans bg-[#F4F6F7] text-[#2D3436] overflow-hidden">
                <KumasMainContainer />
            </div>
        </ErrorBoundary>
    );
}
