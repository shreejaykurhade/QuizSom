'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/85 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <Logo size="md" />

          {/* Minimalist Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link
              href="/#preview"
              className="hover:text-slate-900 transition-colors"
            >
              Interactive Preview
            </Link>
            <Link
              href="/#features"
              className="hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#safeguards"
              className="hover:text-slate-900 transition-colors"
            >
              Integrity Safeguards
            </Link>
            <Link
              href="/#grounding"
              className="hover:text-slate-900 transition-colors"
            >
              Grounded AI
            </Link>
          </nav>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/student"
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Student Join
          </Link>
          <Link
            href="/teacher/dashboard"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
          >
            Faculty Portal
            <ArrowRight className="w-3.5 h-3.5 text-white/80" />
          </Link>
        </div>
      </div>
    </header>
  );
}
