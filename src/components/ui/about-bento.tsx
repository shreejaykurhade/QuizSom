'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users,
  FileUp,
} from 'lucide-react';

export function AboutBento() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            CORE CAPABILITIES & ARENA
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Mastery. Designed for Battles.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-zinc-400 max-w-2xl mx-auto">
            From automated syllabus question synthesis for professors to student-driven peer challenge arenas with real-time leaderboards.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Main Highlight Card: Student Playground (2x2) */}
          <Card className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between border border-slate-800 relative overflow-hidden group shadow-xl">
            {/* Ambient Background Graphic */}
            <svg
              width="377"
              height="368"
              className="w-96 fill-white/[0.03] absolute -bottom-16 -right-16 group-hover:rotate-45 duration-1000 ease-out pointer-events-none transition-transform"
              viewBox="0 0 377 368"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M179.692 5.79814C182.635 -1.93287 193.572 -1.93285 196.515 5.79816L229.505 92.466C231.206 96.9342 236.103 99.2928 240.657 97.8366L328.986 69.5929C336.865 67.0735 343.684 75.6242 339.474 82.7452L292.284 162.574C289.851 166.69 291.061 171.99 295.038 174.642L372.192 226.091C379.075 230.68 376.641 241.343 368.449 242.491L276.613 255.369C271.878 256.033 268.489 260.283 268.895 265.047L276.776 357.445C277.479 365.688 267.625 370.433 261.619 364.744L194.293 300.973C190.821 297.686 185.386 297.686 181.914 300.973L114.588 364.744C108.582 370.433 98.7281 365.688 99.4311 357.445L107.312 265.047C107.718 260.283 104.329 256.033 99.5941 255.369L7.7582 242.491C-0.433812 241.343 -2.86746 230.68 4.01488 226.091L81.1687 174.642C85.1465 171.99 86.3561 166.69 83.9231 162.574L36.7325 82.7452C32.523 75.6242 39.342 67.0735 47.2212 69.5929L135.55 97.8366C140.104 99.2928 145.001 96.9342 146.702 92.4659L179.692 5.79814Z" />
            </svg>

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-extrabold uppercase tracking-widest">
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                Featured: Student Playground
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                STUDY DRILLS.
                <br />
                PEER BATTLES.
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Upload your own PDF lecture notes or pick any topic to launch instant 6-character room codes. Share with friends and battle on the live participant leaderboard.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                <FileUp className="w-4 h-4" />
                <span>Upload PDFs · Instant Code · Live Podium</span>
              </div>
              <Link
                href="/student/playground"
                className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
              >
                <span>Launch Playground</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>

          {/* Card 2: 100% Source Grounding (Top Right 1) */}
          <Card className="bg-emerald-600 dark:bg-emerald-600 rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between border-none shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-90">
                Source Grounding
              </span>
              <BookOpen className="w-4 h-4 text-emerald-200" />
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight">
                100%
              </span>
              <div className="h-1.5 w-full bg-white/20 rounded-full mt-2">
                <div className="h-full w-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </div>
              <p className="text-xs text-emerald-100 pt-1 leading-snug font-normal">
                Every quiz question maps to exact page citations and syllabus proofs.
              </p>
            </div>
          </Card>

          {/* Card 3: Proctoring & Integrity (Top Right 2) */}
          <Card className="bg-slate-900 dark:bg-[#0A0A0A] rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between border border-slate-800 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold leading-tight text-white">
                Deterministic Proctoring
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Full-screen lock with 2-strike tab switch enforcement for faculty exams.
              </p>
            </div>
            <div className="text-[10px] font-mono text-indigo-300 font-semibold uppercase">
              Zero Cheating Tolerance
            </div>
          </Card>

          {/* Card 4: Join the Live Classrooms (Bottom Right 2x1) */}
          <Card className="md:col-span-2 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  Interactive Learning
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Compete with Classmates in Real Time
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md">
                Climb the peer leaderboard, review detailed answer explanations, and master exam topics collaboratively.
              </p>
            </div>

            <Link
              href="/auth?role=student&next=%2Fstudent%2Fplayground"
              className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-sm"
              title="Start Playground Challenge"
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutBento;
