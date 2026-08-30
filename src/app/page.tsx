'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import {
  FileText,
  Shield,
  BarChart3,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Lock,
  Layers,
  Award,
  AlertTriangle,
  RotateCcw,
  GraduationCap,
  Maximize2,
  Radio,
  ExternalLink,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const [activePreviewTab, setActivePreviewTab] = useState<'teacher' | 'room' | 'student' | 'grounding'>('teacher');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 bg-grid-subtle">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center mb-14">
          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Announcement Chip with subtle blinking green dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/90 text-blue-700 text-xs font-bold tracking-tight shadow-xs hover:border-blue-300 transition-all">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Powered by Gemini Flash</span>
              <div className="w-4 h-4 relative shrink-0 flex items-center justify-center">
                <Image
                  src="/gemini-star.png"
                  alt="Google Gemini"
                  width={16}
                  height={16}
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Assessment, built for the <span className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 bg-clip-text text-transparent underline decoration-blue-400/60 decoration-wavy decoration-1">classroom</span>.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Create source-grounded quizzes directly from your course syllabus, run secure live assessments with authoritative 2-strike proctoring, and turn every test into structured learning with <strong className="text-slate-900 font-bold">QuizSom</strong>.
            </p>

            {/* Dual Path Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/teacher/dashboard"
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                Faculty Portal
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>
              <Link
                href="/student"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-900 font-semibold text-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Student Access (Room Code)
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-1">
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                <span className="text-slate-400">Pre-seeded Room:</span>
                <strong className="text-slate-900 font-bold">DEMO26</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                <span className="text-slate-400">Course:</span>
                <strong className="text-slate-900">CS301 DBMS</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Clean Seamless 4K 3D Hero Showcase Image */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end relative">
            <div className="relative w-full max-w-xl lg:max-w-2xl">
              <Image
                src="/hero-illustration.png"
                alt="QuizSom Assessment Platform 3D Showcase"
                width={4096}
                height={2728}
                className="w-full h-auto object-contain select-none"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>

        {/* Interactive Preview Sandbox */}
        <div id="preview" className="mt-8 w-full rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
          {/* Top Bar with Apple Traffic Light Window Controls */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-mono group/traffic">
              {/* Apple Red - Close / Cross */}
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[#4C0000] shadow-xs cursor-pointer">
                <svg className="w-1.5 h-1.5 opacity-70 group-hover/traffic:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M1 1L5 5M5 1L1 5" />
                </svg>
              </div>

              {/* Apple Yellow - Minimize / Minus */}
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[#5A3F00] shadow-xs cursor-pointer">
                <svg className="w-1.5 h-1.5 opacity-70 group-hover/traffic:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M1 3H5" />
                </svg>
              </div>

              {/* Apple Green - Fullscreen / Expand */}
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[#004D0D] shadow-xs cursor-pointer">
                <svg className="w-1.5 h-1.5 opacity-70 group-hover/traffic:opacity-100 transition-opacity" viewBox="0 0 6 6" fill="currentColor">
                  <path d="M1 1.5L3 1.5L1 3.5V1.5ZM5 4.5L3 4.5L5 2.5V4.5Z" />
                </svg>
              </div>

              <span className="ml-2 font-medium text-slate-700">quizsom.internal/preview</span>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setActivePreviewTab('teacher')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activePreviewTab === 'teacher'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Faculty View
              </button>
              <button
                onClick={() => setActivePreviewTab('room')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activePreviewTab === 'room'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Room
              </button>
              <button
                onClick={() => setActivePreviewTab('student')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activePreviewTab === 'student'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Exam Screen
              </button>
              <button
                onClick={() => setActivePreviewTab('grounding')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  activePreviewTab === 'grounding'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grounding
              </button>
            </div>
          </div>

          {/* Interactive Preview Content */}
          <div className="p-6 sm:p-8 bg-white min-h-[360px]">
            {activePreviewTab === 'teacher' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        CS301
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">Database Management Systems — IA 01</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Module 2: Relational Model & Schema Normalization</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <div className="text-[10px] text-slate-400">ROOM CODE</div>
                      <div className="text-base font-bold text-slate-900">DEMO26</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">STUDENTS</div>
                      <div className="text-base font-bold text-emerald-600">48 Enrolled</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100"><div className="text-xs text-slate-500 font-medium">Class Average</div><div className="text-2xl font-bold text-slate-900 mt-1">72%</div><div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+4% vs Pre-Test</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100"><div className="text-xs text-slate-500 font-medium">Median Score</div><div className="text-2xl font-bold text-slate-900 mt-1">74%</div><div className="text-[11px] text-slate-500 mt-0.5">Highest: 96% · Lowest: 38%</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100"><div className="text-xs text-slate-500 font-medium">Turnout</div><div className="text-2xl font-bold text-slate-900 mt-1">48 / 48</div><div className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% Completion</div></div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100"><div className="text-xs text-slate-500 font-medium">Integrity Events</div><div className="text-2xl font-bold text-amber-600 mt-1">3 Logged</div><div className="text-[11px] text-slate-500 mt-0.5">1 Auto-submit (Strike 2)</div></div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 relative shrink-0">
                      <Image src="/gemini-star.png" alt="Gemini" width={16} height={16} className="object-contain" unoptimized />
                    </div>
                    <span className="text-slate-700">
                      <strong>AI Pedagogical Insight:</strong> Students showed 88% retention on 1NF/2NF definitions, but 61% accuracy on 3NF vs BCNF dependency preservation trade-offs.
                    </span>
                  </div>
                  <Link href="/teacher/dashboard" className="text-blue-600 font-bold hover:underline shrink-0 ml-4">
                    Open Full Dashboard →
                  </Link>
                </div>
              </div>
            )}

            {activePreviewTab === 'room' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase font-mono text-emerald-700">Live Room Telemetry Stream</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Room Code: DEMO26</span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center">AI</span>
                      <div>
                        <strong className="text-slate-900">Ananya Iyer</strong>
                        <span className="text-slate-400 font-mono ml-2">2024CS1012</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Submitted · 96% (08:41)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 font-mono text-[10px] font-bold text-amber-800 flex items-center justify-center">RP</span>
                      <div>
                        <strong className="text-slate-900">Rohan Patil</strong>
                        <span className="text-slate-400 font-mono ml-2">2024CS1089</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      1 Full-screen Exit (Warned)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-rose-100 font-mono text-[10px] font-bold text-rose-800 flex items-center justify-center">PS</span>
                      <div>
                        <strong className="text-slate-900">Priya Shah</strong>
                        <span className="text-slate-400 font-mono ml-2">2024CS1064</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                      Auto-Submitted (Strike 2 Exceeded)
                    </span>
                  </div>
                </div>

                <div className="text-right pt-2">
                  <Link href="/teacher/rooms/DEMO26" className="text-xs font-bold text-slate-900 hover:underline">
                    View Live Room Console →
                  </Link>
                </div>
              </div>
            )}

            {activePreviewTab === 'student' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
                  <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    QUESTION 7 OF 15
                  </span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>08:41</span>
                  </div>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  Which normal form specifically requires eliminating partial functional dependencies?
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-white border border-slate-200">A</span>
                    <span>First Normal Form (1NF)</span>
                  </div>
                  <div className="p-3 rounded-xl border border-slate-900 bg-slate-900 text-white font-medium flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-slate-800 text-white">B</span>
                      <span>Second Normal Form (2NF)</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-white border border-slate-200">C</span>
                    <span>Third Normal Form (3NF)</span>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'grounding' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-700">RAG CONTEXT CITATION</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Verified Grounding</span>
                  </div>
                  <div className="text-slate-900 font-semibold">
                    Document: DBMS Module 2: Relational Model & Normalization (PDF)
                  </div>
                  <div className="text-slate-600 font-mono text-[11px] bg-white p-3 rounded-lg border border-slate-200">
                    &quot;Section 3: Second Normal Form (2NF). A relation schema R is in 2NF if it is in 1NF and every non-prime attribute is fully functionally dependent on every candidate key, strictly eliminating partial dependencies.&quot;
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    Page 3 · Section 3 · Chunks indexed: 4
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dual Login Paths Bento */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Select your academic portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Purpose-built interfaces for university instructors and examinees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Teacher Panel */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-5">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">Faculty & Evaluators</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Teacher Portal</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Upload syllabus PDFs, generate source-grounded questions with Gemini Flash, review QA drafts, launch live rooms, and inspect class integrity reports.
                </p>
              </div>
              <div>
                <Link
                  href="/teacher/dashboard"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Enter Faculty Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                  Includes 1-Click Demo Teacher Access
                </div>
              </div>
            </div>

            {/* Student Panel */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1 font-semibold">Students & Examinees</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Student Access</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Enter your 6-character room code to join live timed internal assessments, take tests under controlled proctored conditions, and review explanations.
                </p>
              </div>
              <div>
                <Link
                  href="/student"
                  className="w-full py-3 px-4 rounded-xl bg-white text-slate-900 border border-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Join with Room Code
                  <ArrowRight className="w-4 h-4 text-slate-500" />
                </Link>
                <div className="text-[11px] text-center text-slate-400 mt-2 font-mono">
                  Room code: <strong>DEMO26</strong> ready for instant test
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-2">Platform Capabilities</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything needed for controlled internal assessments.
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Engineered for academic rigor, zero hallucination, and student feedback.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Source-Grounded Questions</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Every question links directly back to exact page numbers and textbook excerpts.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Full-Screen 2-Strike Mode</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Strike 1 issues an in-browser warning; Strike 2 triggers an authoritative server auto-submit.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Randomized Questions & Options</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Stable option IDs prevent answer leaks while delivering unique layouts per examinee.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Authoritative Server Clocks</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Exam clocks synchronize directly with server timestamps to prevent client clock tampering.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Deterministic Leaderboards</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Ranked primarily by score, tie-broken by verified server duration and submission timestamp.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-1.5">Topic-Level Mastery Insights</h4>
            <p className="text-xs text-slate-600 leading-relaxed">Instant class accuracy breakdown per syllabus topic with Gemini pedagogical feedback.</p>
          </div>
        </div>
      </section>

      {/* Safeguards Section */}
      <section id="safeguards" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase mb-4 border border-amber-500/30">
              <Shield className="w-3.5 h-3.5" />
              Proctoring Safeguards
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Designed for controlled assessments.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Multiple safeguards help reduce common forms of academic misconduct without making unrealistic claims of absolute browser unbreakability.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Enforced Full-Screen Mode:</strong>
                  <span className="text-slate-400">Exiting full-screen logs an integrity event. First exit warns; second auto-submits.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Tab & Window Visibility:</strong>
                  <span className="text-slate-400">Window blur and visibility change events are timestamped and logged to the teacher audit.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Server-Side Authority:</strong>
                  <span className="text-slate-400">Correct answers are never sent to the browser before submission. All scores are server-evaluated.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">Single Attempt Lock:</strong>
                  <span className="text-slate-400">Unique attempt IDs prevent concurrent attempts or browser refresh resets.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Academic Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <Logo size="sm" />

          <div className="flex items-center gap-6 font-medium">
            <Link href="/teacher/dashboard" className="hover:text-slate-900 transition-colors">
              Teachers
            </Link>
            <Link href="/student" className="hover:text-slate-900 transition-colors">
              Students
            </Link>
            <Link href="/#safeguards" className="hover:text-slate-900 transition-colors">
              Security
            </Link>
            <span className="font-mono text-slate-400">Version 1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
