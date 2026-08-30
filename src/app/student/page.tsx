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
  Lock,
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
      setError('Please enter a valid room code');
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#000000] flex flex-col text-slate-900 dark:text-white bg-grid-subtle transition-colors">
      <Navbar />

      <main className="max-w-4xl mx-auto w-full px-4 py-12 flex-1 space-y-12">
        {/* Join Assessment Card */}
        <div className="max-w-xl mx-auto bg-white dark:bg-[#0A0A0A] p-8 sm:p-10 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 relative mx-auto mb-4">
              <Image
                src="/logo-icon.png"
                alt="QuizSom Logo"
                width={512}
                height={512}
                className="w-full h-full object-contain select-none drop-shadow-md"
                unoptimized
                priority
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Join Internal Assessment
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-1">
              Enter the room code provided by your instructor on <strong className="text-slate-800 dark:text-zinc-200">QuizSom</strong>.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={8}
                placeholder="ENTER ROOM CODE"
                required
                className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-center font-mono font-extrabold text-2xl tracking-widest uppercase text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  required
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                  Student ID / Roll No
                </label>
                <input
                  type="text"
                  value={studentRollNo}
                  onChange={(e) => setStudentRollNo(e.target.value)}
                  placeholder="e.g. 2024CS1048"
                  className="w-full bg-slate-50 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-slate-900 dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm mt-4"
            >
              <span>Continue to Assessment Briefing</span>
              <ArrowRight className="w-4 h-4 text-white dark:text-black" />
            </button>
          </form>
        </div>

        {/* Student Academic History & Recent Results */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-zinc-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Assessment Results</h2>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">Enrolled: CS Dept (Semester V)</span>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-zinc-700 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-zinc-300 border border-blue-200 dark:border-zinc-800">
                  CS301
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  DBMS — Internal Assessment 01
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Relational Model & Normalization · 15 Questions
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">82%</div>
                <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">Rank #7 in Class</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div className="text-slate-500 dark:text-zinc-400 text-[11px]">
                Strong: 1NF & 2NF • Focus Revision: Lossless Decomposition
              </div>
              <Link
                href="/exam/CS301A/result"
                className="text-blue-600 dark:text-zinc-300 font-bold hover:underline text-xs flex items-center gap-1"
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
