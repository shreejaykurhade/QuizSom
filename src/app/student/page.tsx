'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import {
  GraduationCap,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  Award,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export default function StudentPortalPage() {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentRollNo, setStudentRollNo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      setError('Please enter a 6-character room code');
      return;
    }
    if (!studentName.trim()) {
      setError('Please enter your full name');
      return;
    }

    const cleanCode = roomCode.trim().toUpperCase();
    localStorage.setItem(
      'assessly_student',
      JSON.stringify({
        name: studentName.trim(),
        rollNo: studentRollNo.trim().toUpperCase() || '2024CS1048',
      })
    );

    router.push(`/exam/${cleanCode}`);
  };

  const handleQuickDemo = () => {
    setRoomCode('DEMO26');
    setStudentName('Aarav Sharma');
    setStudentRollNo('2024CS1048');
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 bg-grid-subtle">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full px-4 py-12 flex-1 space-y-12">
        {/* Join Assessment Card */}
        <div className="max-w-xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-card">
          <div className="text-center mb-8">
            <div className="w-14 h-14 relative mx-auto mb-3">
              <Image
                src="/logo.png"
                alt="QuizSom Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Join Internal Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter the 6-character room code provided by your instructor on <strong className="text-slate-800">QuizSom</strong>.
            </p>
          </div>

          {/* Quick Demo Autofill Button */}
          <div className="mb-6 p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-blue-950 font-bold">Quick Demo: CS301 DBMS Assessment</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-all shadow-sm"
            >
              Auto-Fill DEMO26
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Room Code (6 Characters)
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={8}
                placeholder="e.g. DEMO26 or IA26X7"
                required
                className="input-academic text-center font-mono font-extrabold text-2xl tracking-widest uppercase text-slate-900 py-3"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  required
                  className="input-academic text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student ID / Roll No
                </label>
                <input
                  type="text"
                  value={studentRollNo}
                  onChange={(e) => setStudentRollNo(e.target.value)}
                  placeholder="e.g. 2024CS1048"
                  className="input-academic text-xs font-mono uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3.5 text-sm font-bold mt-4 shadow-sm"
            >
              Continue to Assessment Briefing
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Student Academic History & Recent Results */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">Your Recent Assessment Results</h2>
            <span className="text-[11px] text-slate-500 font-mono">Enrolled: CS Dept (Semester V)</span>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  CS301
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  DBMS — Internal Assessment 01
                </h3>
                <p className="text-xs text-slate-500">
                  Relational Model & Normalization · 15 Questions
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-slate-900">82%</div>
                <div className="text-[11px] font-mono font-bold text-emerald-600">Rank #7 in Class</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500 text-[11px]">
                Strong: 1NF & 2NF • Focus Revision: Lossless Decomposition
              </div>
              <Link
                href="/exam/DEMO26/result"
                className="text-blue-600 font-bold hover:underline text-xs flex items-center gap-1"
              >
                Review Answers & Explanations →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
