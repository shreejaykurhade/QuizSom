'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, History, LayoutDashboard, LogOut, MessageSquareText, UserRound } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/components/AuthProvider';

const links = [
  { label: 'Overview', href: '/student', icon: LayoutDashboard },
  { label: 'Study chat', href: '/student/chat', icon: MessageSquareText },
  { label: 'Past quizzes', href: '/student/history', icon: History },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); const { user } = useAuth();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Student';
  return <div className="min-h-screen bg-[#F8FAFC] text-slate-900 md:flex"><aside className="flex w-full shrink-0 flex-col justify-between border-b border-slate-200 bg-white shadow-sm md:min-h-screen md:w-64 md:border-b-0 md:border-r"><div><div className="flex h-16 items-center justify-between border-b border-slate-100 px-4"><Logo size="sm" showBadge={false} /><span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-emerald-700">Student</span></div><nav className="space-y-1 p-3">{links.map(link => { const Icon = link.icon; const active = pathname === link.href; return <Link key={link.href} href={link.href} className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${active ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-500'}`} />{link.label}</Link>; })}</nav></div><div className="border-t border-slate-100 bg-slate-50/50 p-3"><div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700"><UserRound className="w-4" /></div><div className="min-w-0"><p className="truncate text-xs font-bold">{displayName}</p><p className="truncate text-[11px] text-slate-500">{user?.email || 'Signed-in student'}</p></div></div><Link href="/" className="mt-2 flex items-center gap-1 px-1 text-[11px] font-medium text-slate-500 hover:text-rose-600"><LogOut className="w-3" />Sign out</Link></div></aside><div className="min-w-0 flex-1"><main className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">{children}</main></div></div>;
}
