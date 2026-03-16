// app/uretim/page.js — /uretim → /imalat kalıcı yönlendirme
// 'use client' OLMADAN — redirect() sadece Server Component'te çalışır
import { redirect } from 'next/navigation';

export default function UretimPage() {
    redirect('/imalat');
}
