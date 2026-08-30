'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  FileUp,
  CheckCircle2,
} from 'lucide-react';

export function AboutBento() {
  return (
    <section id="features" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-[11px] font-mono font-bold uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            CORE CAPABILITIES & ARENA
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Mastery. Designed for Battles.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 max-w-xl mx-auto font-normal">
            From automated syllabus question synthesis for faculty to student-driven peer challenge arenas with live leaderboards.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Main Featured Card: Student Playground (2x2) */}
          <Card className="md:col-span-2 md:row-span-2 bg-white dark:bg-[#0A0A0A] rounded-3xl p-7 sm:p-9 flex flex-col justify-between border border-slate-200/90 dark:border-zinc-800 relative overflow-hidden group shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all">
            {/* Subtle Minimalist Background Grid / Shape */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-50/60 dark:bg-emerald-950/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-extrabold uppercase tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Featured: Student Playground
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Study Drills.
                <br />
                <span className="text-slate-500 dark:text-zinc-400">Peer Battles.</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md font-normal">
                Upload your own PDF lecture notes or enter any academic topic to generate AI peer challenge quizzes. Share instant 6-character room codes with classmates and compete on the live student leaderboard.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-600 dark:text-zinc-400 font-semibold">
                <FileUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Upload PDFs · Instant Codes · Live Podiums</span>
              </div>
              <Link
                href="/student/playground"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs hover:shadow shrink-0"
              >
                <span>Launch Playground</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 2: 100% Source Grounding (Top Right 1) */}
          <Card className="bg-white dark:bg-[#0A0A0A] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 dark:border-zinc-800 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Source Grounding
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                100%
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 pt-0.5 leading-snug font-normal">
                Every quiz question maps to exact page citations and syllabus proofs.
              </p>
            </div>
          </Card>

          {/* Card 3: Deterministic Proctoring (Top Right 2) */}
          <Card className="bg-white dark:bg-[#0A0A0A] rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 dark:border-zinc-800 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Exam Integrity
              </span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Deterministic Proctoring
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-snug">
                Full-screen lock with 2-strike tab switch policy for faculty assessments.
              </p>
            </div>
          </Card>

          {/* Card 4: Interactive Classrooms & Battles (Bottom Right 2x1) */}
          <Card className="md:col-span-2 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs hover:shadow-md hover:border-slate-300 dark:hover:border-zinc-700 transition-all">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Interactive Learning
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Compete with Classmates in Real Time
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md">
                Climb the peer leaderboard, review detailed answer explanations, and master exam topics collaboratively.
              </p>
            </div>

            <Link
              href="/student/playground"
              className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-900 flex items-center justify-center shrink-0 transition-transform hover:scale-105 shadow-2xs"
              title="Open Playground"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutBento;
