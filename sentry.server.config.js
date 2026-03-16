// ╔══════════════════════════════════════════════════════════════════╗
// ║ [ARŞİV] Bu dosya artık kullanılmıyor.                          ║
// ║ Sentry init → src/instrumentation.js'e taşındı (Next.js 15+)   ║
// ║ Bu dosyayı silmek güvenlidir.                                  ║
// ╚══════════════════════════════════════════════════════════════════╝
import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV || 'production',
});
