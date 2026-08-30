'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { ArrowRight, BookOpen, Lock, Mail, Shield, Sparkles, UserCheck } from 'lucide-react';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('arvind.ramanathan@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/teacher/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000000] flex flex-col justify-between text-slate-900 dark:text-white bg-grid-subtle transition-colors duration-200">
      {/* Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />
        <Link
          href="/student"
          className="text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Student Portal →
        </Link>
      </header>

      {/* Main Split Layout */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 grid md:grid-cols-12 gap-8 items-center">
        {/* Left Side */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider border border-blue-200 dark:border-zinc-800">
            Faculty Access
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Assessments that reflect what you actually teach.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            Upload course materials, generate source-grounded questions with Gemini Flash, and conduct supervised internal assessments with <strong className="text-slate-900 dark:text-white">QuizSom</strong>.
          </p>
          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-2 text-xs text-slate-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Source citation on every generated question</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Controlled 2-strike full-screen enforcement</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-7 bg-white dark:bg-[#0A0A0A] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Instructor Sign In</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
              Enter your institutional university credentials to manage courses.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@university.edu"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300">Password</label>
                <a href="#" className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm mt-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Dr. Arvind Ramanathan</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-black" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 max-w-7xl mx-auto w-full text-center text-xs text-slate-400 dark:text-zinc-600">
        QuizSom Academic Internal Assessment System · University Network
      </footer>
    </div>
  );
}
