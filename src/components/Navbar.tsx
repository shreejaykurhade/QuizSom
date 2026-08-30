'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { SlideTabs } from './ui/slide-tabs';
import { AnimatedThemeToggle } from './ui/animated-theme-toggle';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navTabs = [
    { label: 'Portals', href: '/#portals' },
    { label: 'Live Sandbox', href: '/#preview' },
    { label: 'Capabilities', href: '/#features' },
    { label: 'Course Materials', href: '/teacher/materials' },
  ];

  return (
    <header className="w-full bg-white/85 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center z-10">
          <Logo size="md" />
        </div>

        {/* Center: SlideTabs Navigation Pill in Middle */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
          <SlideTabs tabs={navTabs} />
        </nav>

        {/* Right: Action CTAs & Animated Theme Toggle */}
        <div className="flex items-center gap-2.5 z-10">
          <Link
            href="/auth?role=student&next=%2Fstudent"
            className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Student Sign in
          </Link>
          <Link
            href="/auth?role=faculty&next=%2Fteacher%2Fdashboard"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:!text-black dark:hover:bg-zinc-100 transition-all flex items-center gap-1.5 shadow-sm hover:shadow"
          >
            <span>Faculty Sign in</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80 dark:!text-black" />
          </Link>
          
          {/* Top Right Corner Animated Theme Toggle */}
          <AnimatedThemeToggle />
        </div>
      </div>
    </header>
  );
}
