'use client';

import { Suspense } from 'react';
import { AuthFormContent } from '@/components/AuthModal';
import Link from 'next/link';
import Logo from '@/components/Logo';

function AuthPageInner() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#F8FAFC] dark:bg-black p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="flex justify-center">
          <Logo size="md" />
        </div>

        <div className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 sm:p-8 shadow-card dark:shadow-none">
          <AuthFormContent />
        </div>

        <p className="text-center text-xs text-slate-500 dark:text-zinc-500">
          By continuing, you agree to Somaiya University's Academic Integrity Code & Exam Ethics.
        </p>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8FAFC] dark:bg-black" />}>
      <AuthPageInner />
    </Suspense>
  );
}
