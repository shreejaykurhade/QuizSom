'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import {
  LayoutDashboard,
  FileQuestion,
  BookOpen,
  PlusCircle,
  BarChart2,
  Settings,
  LogOut,
  Radio,
  ExternalLink,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/teacher/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/teacher/dashboard', icon: LayoutDashboard },
    { label: 'Create Assessment', href: '/teacher/create', icon: PlusCircle, isHighlight: true },
    { label: 'Question Bank', href: '/teacher/question-bank', icon: FileQuestion },
    { label: 'Materials Library', href: '/teacher/materials', icon: BookOpen },
    { label: 'Live Rooms', href: '/teacher/rooms/DEMO26', icon: Radio, badge: 'Live' },
    { label: 'Results & Analytics', href: '/teacher/results/assess_dbms_ia01', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between">
            <Logo size="sm" showBadge={false} />
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              FACULTY
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : item.isHighlight
                      ? 'text-blue-600 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isHighlight ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-emerald-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-sm mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center font-mono font-bold text-xs text-blue-700">
                AR
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-slate-900 truncate">
                  Dr. Arvind Ramanathan
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  CSE Department
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-xs text-slate-500">
            <Link
              href="/student"
              className="hover:text-slate-900 flex items-center gap-1 transition-colors text-[11px] font-medium"
              target="_blank"
            >
              <span>Student View</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>
            <Link
              href="/"
              className="hover:text-rose-600 flex items-center gap-1 transition-colors text-[11px] font-medium"
            >
              <span>Sign Out</span>
              <LogOut className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
