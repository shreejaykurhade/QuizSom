'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { ArrowRight, BookOpen, Lock, Mail, Shield, Sparkles, Zap } from 'lucide-react';

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
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/teacher/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between text-slate-900 bg-grid-subtle">
      {/* Header */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Logo size="md" />
        <Link
          href="/student"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          Student Portal →
        </Link>
      </header>

      {/* Main Split Layout */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 grid md:grid-cols-12 gap-8 items-center">
        {/* Left Side */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider border border-blue-200">
            Faculty Access
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Assessments that reflect what you actually teach.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Upload course materials, generate source-grounded questions with Gemini Flash, and conduct supervised internal assessments with <strong className="text-slate-900">QuizSom</strong>.
          </p>
          <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
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
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Instructor Sign In</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your institutional university credentials to manage courses.
            </p>
          </div>

          {/* Quick Demo One-Click Access */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-blue-950 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                DEMO EVALUATOR ACCESS
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">1-Click</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Instant login with pre-loaded CS301 Database Systems and 48 demo submissions.
            </p>
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Sign in as Dr. Arvind Ramanathan
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-xs text-slate-400 font-mono font-semibold">OR USE EMAIL</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@university.edu"
                  className="input-academic pl-9 text-sm"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs text-slate-500 hover:text-slate-900">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-academic pl-9 text-sm"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <label htmlFor="remember" className="text-xs text-slate-600">
                Remember this workstation for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-sm font-bold mt-2 shadow-sm"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>

      <footer className="p-6 text-center text-xs text-slate-400 font-mono">
        QuizSom Academic Operating System · Department of Computer Science & Engineering
      </footer>
    </div>
  );
}
