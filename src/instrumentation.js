// ─── NEXT.JS INSTRUMENTATION HOOK ─────────────────────────────
// Sentry server-side SDK'yı register() içinden başlatır.
// Bu dosya Next.js 15+ tarafından otomatik olarak tanınır.
// ESKİ: sentry.server.config.js (deprecated format)
// YENİ: Bu dosya — Next.js instrumentation API uyumlu

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
        const Sentry = await import('@sentry/nextjs');
        Sentry.init({
            dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
            tracesSampleRate: 0.1,
            environment: process.env.NODE_ENV || 'production',
        });
    }
}
