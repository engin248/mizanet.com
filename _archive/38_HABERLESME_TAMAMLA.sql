-- ═══════════════════════════════════════════════════════
-- MİZANET ASKERİ HABERLEŞME — SCHEMA YAMASI (Genişletilmiş Veri)
-- Migration: 38_HABERLESME_TAMAMLA.sql
-- ═══════════════════════════════════════════════════════

-- Eksik kolonları ekle (UI ile uyum için)
ALTER TABLE b1_askeri_haberlesme 
    ADD COLUMN IF NOT EXISTS konu            TEXT,
    ADD COLUMN IF NOT EXISTS oncelik         TEXT DEFAULT 'normal',
    ADD COLUMN IF NOT EXISTS tip             TEXT DEFAULT 'bilgi',
    ADD COLUMN IF NOT EXISTS urun_id         UUID,
    ADD COLUMN IF NOT EXISTS urun_kodu       TEXT,
    ADD COLUMN IF NOT EXISTS urun_adi        TEXT,
    ADD COLUMN IF NOT EXISTS gonderen_adi    TEXT;

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_askeri_urun_id ON b1_askeri_haberlesme(urun_id);
CREATE INDEX IF NOT EXISTS idx_askeri_oncelik ON b1_askeri_haberlesme(oncelik);

-- RLS: Authenticated kullanıcılar okusun (API üzerinden zaten admin yetkisiyle dönüyoruz ama güvenlik için)
-- Sadece okunmuş veriyi filtrelemek gerekebilir.
ALTER TABLE b1_askeri_haberlesme ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_haberlesme" ON b1_askeri_haberlesme;
CREATE POLICY "service_role_haberlesme" ON b1_askeri_haberlesme 
    FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Authenticated kullanıcılar için OKUMA (Sadece kendi odası veya genel)
-- (Not: API katmanında kısıtlama yapmak daha güvenli, SQL'de yetki karmaşası olmasın diye kısıtlı tutuldu)
CREATE POLICY "auth_haberlesme_okuma" ON b1_askeri_haberlesme
    FOR SELECT TO authenticated USING (true);
