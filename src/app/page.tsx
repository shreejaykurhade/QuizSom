'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FooterCTA from '@/components/FooterCTA';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BentoGridShowcase } from '@/components/ui/bento-product-features';
import AboutBento from '@/components/ui/about-bento';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  Check,
  ChevronRight,
  KeyRound,
  Shuffle,
  Timer,
  BookMarked,
  Play,
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [activePreviewTab, setActivePreviewTab] = useState<'teacher' | 'room' | 'student' | 'grounding'>('teacher');
  const [studentCode, setStudentCode] = useState('');
  const [showCitations, setShowCitations] = useState(true);

  // Smooth interactive 3D tilt physics for Hero Showcase (Fixed size, pure tilt)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 20, stiffness: 120 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 20, stiffness: 120 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleStudentJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const code = studentCode.trim().toUpperCase();
    if (code) {
      router.push(`/exam/${code}`);
    } else {
      router.push('/student');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#000000] text-slate-900 dark:text-white bg-grid-subtle transition-colors duration-200">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-6 sm:pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Headline & Actions */}
          <div className="lg:col-span-6 space-y-5">
            {/* Announcement Chip with subtle blinking green dot */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-zinc-900 border border-blue-200/90 dark:border-zinc-800 text-blue-700 dark:text-zinc-200 text-xs font-bold tracking-tight shadow-xs hover:border-blue-300 transition-all">
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Assessment, built for the <span className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-white bg-clip-text text-transparent underline decoration-blue-400/60 decoration-wavy decoration-1">classroom</span><span className="text-emerald-500">.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed font-normal max-w-2xl">
              Create source-grounded quizzes directly from your course syllabus, run secure live assessments with authoritative 2-strike proctoring, and turn every test into structured learning with <strong className="text-slate-900 dark:text-white font-bold">QuizSom</strong>.
            </p>

            {/* Dual Path Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                href="/auth?role=faculty&next=%2Fteacher%2Fdashboard"
                className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                Faculty Sign in
                <ArrowRight className="w-4 h-4 text-white/80 dark:text-black" />
              </Link>
              <Link
                href="/auth?role=student&next=%2Fstudent"
                className="px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-white font-semibold text-sm border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Student Sign in
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Seamless 4K 3D Hero Showcase Image with Interactive 3D Perspective Tilt */}
          <div
            className="lg:col-span-6 flex items-center justify-center lg:justify-end relative cursor-pointer"
            style={{ perspective: 1200 }}
            onMouseMove={handleHeroMouseMove}
            onMouseLeave={handleHeroMouseLeave}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-xl lg:max-w-2xl select-none"
            >
              <Image
                src="/hero-illustration.png"
                alt="QuizSom Assessment Platform 3D Showcase"
                width={4096}
                height={2728}
                className="w-full h-auto object-contain drop-shadow-xl"
                unoptimized
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subtle Section Divider */}
      <div className="w-full border-t border-slate-200/80 dark:border-zinc-800/80" />

      {/* Features & Arena Bento Showcase */}
      <AboutBento />

      {/* Subtle Section Divider */}
      <div className="w-full border-t border-slate-200/80 dark:border-zinc-800/80" />

      {/* 3D Scroll Perspective Container for Interactive Preview */}
      <section id="preview" className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full scroll-mt-20">
        <ContainerScroll>
          <div id="preview" className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0A0A0A] shadow-2xl overflow-hidden">
            {/* Top Bar with Apple Traffic Light Window Controls */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
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

                <span className="ml-2 font-medium text-slate-700 dark:text-zinc-300">quizsom.internal/preview</span>
              </div>

              {/* Interactive Tab Switcher */}
              <div className="flex items-center gap-1 bg-white dark:bg-black p-1 rounded-lg border border-slate-200 dark:border-zinc-800">
                <button
                  onClick={() => setActivePreviewTab('teacher')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'teacher'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Faculty Analytics
                </button>
                <button
                  onClick={() => setActivePreviewTab('room')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'room'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Live Room
                </button>
                <button
                  onClick={() => setActivePreviewTab('student')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'student'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Student Exam
                </button>
                <button
                  onClick={() => setActivePreviewTab('grounding')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activePreviewTab === 'grounding'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Playground Arena
                </button>
              </div>
            </div>

            {/* Interactive Preview Content */}
            <div className="p-6 sm:p-8 bg-white dark:bg-[#0A0A0A] min-h-[360px]">
              {activePreviewTab === 'teacher' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-zinc-200 border border-blue-200 dark:border-zinc-800">
                          CS302
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          Data Structures & Algorithms — IA 01
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                        Module Evaluation: Trees, Graph Algorithms & Dynamic Programming
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">ROOM CODE</div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">DSA204</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">EXAMINEES</div>
                        <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">46 Submissions</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-zinc-800/90">
                      <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Class Average</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">78%</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">+5% vs Pre-Test</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-zinc-800/90">
                      <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Median Score</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">80%</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">Top: 98% · Min: 42%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-zinc-800/90">
                      <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Turnout</div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">46 / 48</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">96% Completion</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-black border border-slate-100 dark:border-zinc-800/90">
                      <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Integrity Events</div>
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">2 Logged</div>
                      <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">1 Tab Switch Warning</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-black border border-blue-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-4 h-4 relative shrink-0">
                        <Image src="/gemini-star.png" alt="Gemini" width={16} height={16} className="object-contain" unoptimized />
                      </div>
                      <span className="text-slate-700 dark:text-zinc-300">
                        <strong className="text-slate-900 dark:text-white">AI Pedagogical Insights:</strong> 82% of students mastered Binary Search Trees & Heaps; 34% cognitive friction detected on Graph Topological Sort algorithms.
                      </span>
                    </div>
                    <Link href="/auth?role=faculty&next=%2Fteacher%2Fdashboard" className="text-blue-600 dark:text-zinc-200 font-bold hover:underline shrink-0 ml-4">
                      Open Full Dashboard →
                    </Link>
                  </div>
                </div>
              )}

              {activePreviewTab === 'room' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-bold uppercase font-mono text-emerald-700 dark:text-emerald-400">
                        Live Room Telemetry Stream
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
                      Room Code: <strong className="text-slate-900 dark:text-white">DSA204</strong>
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-black flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-800 font-mono text-[10px] font-bold flex items-center justify-center text-slate-900 dark:text-white">AS</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Aarav Sharma</strong>
                          <span className="text-slate-400 dark:text-zinc-500 font-mono ml-2">2024CS1012</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        Submitted · 96% (08:41)
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/80 font-mono text-[10px] font-bold text-blue-800 dark:text-blue-200 flex items-center justify-center">PD</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Priya Deshmukh</strong>
                          <span className="text-slate-400 dark:text-zinc-500 font-mono ml-2">2024CS1045</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-100 dark:bg-blue-900/90 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                        In Progress · Q13/15 (04:18 left)
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/80 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-200 flex items-center justify-center">RP</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Rohan Patil</strong>
                          <span className="text-slate-400 dark:text-zinc-500 font-mono ml-2">2024CS1089</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 dark:bg-amber-900/90 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                        1 Tab Switch Warning Logged
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/80 font-mono text-[10px] font-bold text-rose-800 dark:text-rose-200 flex items-center justify-center">SK</span>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Sneha Kulkarni</strong>
                          <span className="text-slate-400 dark:text-zinc-500 font-mono ml-2">2024CS1064</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-100 dark:bg-rose-900/90 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
                        Auto-Submitted (Strike 2 Exceeded)
                      </span>
                    </div>
                  </div>

                  <div className="text-right pt-2">
                    <Link href="/auth?role=faculty&next=%2Fteacher%2Frooms" className="text-xs font-bold text-slate-900 dark:text-white hover:underline">
                      View Live Room Console →
                    </Link>
                  </div>
                </div>
              )}

              {activePreviewTab === 'student' && (
                <div className="space-y-4 max-w-xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800 text-xs">
                    <span className="font-mono font-bold text-blue-700 dark:text-zinc-200 bg-blue-50 dark:bg-zinc-900 px-2 py-0.5 rounded border border-blue-200 dark:border-zinc-800">
                      QUESTION 7 OF 15
                    </span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 rounded">
                      <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
                      <span>08:41</span>
                    </div>
                  </div>

                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Which data structure provides O(1) average-time complexity for key search and insertion operations?
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">A</span>
                      <span>Binary Search Tree (BST)</span>
                    </div>
                    <div className="p-3 rounded-xl border border-slate-900 bg-slate-900 text-white dark:bg-white dark:text-black dark:border-white font-medium flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-slate-800 text-white dark:bg-zinc-200 dark:text-black">B</span>
                        <span>Hash Table with Chaining</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-black text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">C</span>
                      <span>Balanced AVL Tree</span>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'grounding' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-zinc-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          STUDENT ARENA
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Operating Systems — Concurrency & Deadlocks
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                        Source Notes: <strong className="text-slate-700 dark:text-zinc-300">OS_Unit2_Concurrency.pdf (14 Pages Indexed)</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold">
                        ROOM: PG4812
                      </span>
                    </div>
                  </div>

                  {/* Top 3 Live Rankings Podium */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-500">🥈 #2</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Rohan Patil</div>
                      <div className="text-base font-extrabold font-mono text-slate-800 dark:text-zinc-200">80%</div>
                      <div className="text-[10px] text-slate-400 font-mono">02m 45s</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-zinc-800 dark:to-zinc-900 border border-amber-300 dark:border-amber-700 space-y-1">
                      <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">🥇 #1 LEADER</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Aarav Sharma</div>
                      <div className="text-base font-extrabold font-mono text-amber-600 dark:text-amber-400">100%</div>
                      <div className="text-[10px] text-slate-500 font-mono">02m 14s</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1">
                      <div className="text-xs font-mono font-bold text-slate-500">🥉 #3</div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Ananya Iyer</div>
                      <div className="text-base font-extrabold font-mono text-slate-800 dark:text-zinc-200">80%</div>
                      <div className="text-[10px] text-slate-400 font-mono">03m 10s</div>
                    </div>
                  </div>

                  <div className="text-right pt-2">
                    <Link
                      href="/student/playground"
                      className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center justify-end gap-1"
                    >
                      <span>Explore Student Playground →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Subtle Section Divider */}
      <div className="w-full border-t border-slate-200/80 dark:border-zinc-800/80" />

      {/* Platform Capabilities Section with Real Grounded BentoGridShowcase */}
      <section id="features" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-zinc-400 font-bold mb-1.5">Platform Capabilities</div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything needed for controlled internal assessments.
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1.5">
            Engineered for academic rigor, syllabus grounding, and transparent proctoring.
          </p>
        </div>

        {/* Bento Grid Showcase for Real QuizSom Features */}
        <BentoGridShowcase
          integration={
            <Card className="flex h-full flex-col justify-between p-6 sm:p-7 bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 shadow-xs">
                  <Image
                    src="/gemini-star.png"
                    alt="Google Gemini"
                    width={26}
                    height={26}
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </div>
                <Badge variant="outline" className="mb-2.5 text-blue-600 dark:text-zinc-300 border-blue-200 dark:border-zinc-800 font-mono text-[10px] uppercase">
                  PDF Syllabus Grounding
                </Badge>
                <CardTitle className="text-xl font-bold mb-2">Source-Grounded Questions</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Upload university course syllabus PDFs and reference textbooks. QuizSom indexes every module chunk with Gemini Flash, generating MCQs with exact page citations and verifiable textbook excerpts.
                </CardDescription>
              </div>
              <CardFooter className="p-0 pt-6 mt-auto flex items-center justify-between border-t border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300">Page Citations</span>
                </div>
                <Switch
                  checked={showCitations}
                  onCheckedChange={setShowCitations}
                  aria-label="Toggle page citations"
                />
              </CardFooter>
            </Card>
          }
          trackers={
            <Card className="h-full bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <CardTitle className="text-base font-bold">Live Room Telemetry</CardTitle>
                  <CardDescription className="text-xs">Real-Time Examinee Audit</CardDescription>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-800 font-mono text-[10px] font-bold flex items-center justify-center text-slate-800 dark:text-zinc-200">
                      AI
                    </span>
                    <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 font-mono text-[10px] font-bold flex items-center justify-center text-amber-800 dark:text-amber-200">
                      RP
                    </span>
                    <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 font-mono text-[10px] font-bold flex items-center justify-center text-rose-800 dark:text-rose-200">
                      PS
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">+45</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Active Session</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
          statistic={
            <Card className="relative h-full w-full overflow-hidden bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <div
                className="absolute inset-0 opacity-15 dark:opacity-20"
                style={{
                  backgroundImage: "radial-gradient(#64748B 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <CardContent className="relative z-10 flex flex-col h-full items-center justify-center p-6 text-center">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">2-Strike</span>
                <span className="text-xs font-mono uppercase font-bold text-amber-600 dark:text-amber-400 mt-1">Full-Screen Policy</span>
              </CardContent>
            </Card>
          }
          focus={
            <Card className="h-full bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Server-Side Authority</CardTitle>
                    <CardDescription className="text-xs">Zero Client Answer Exposure</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-blue-300 dark:border-zinc-700 text-blue-600 dark:text-zinc-300 text-[10px] font-mono">
                    Protected
                  </Badge>
                </div>
                <div className="my-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Server Clocks</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                  <span>Tamper-Proof Timer</span>
                  <span>Evaluated at Submit</span>
                </div>
              </CardContent>
            </Card>
          }
          productivity={
            <Card className="h-full bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-zinc-900 text-blue-600 dark:text-zinc-300 flex items-center justify-center mb-2">
                  <Shuffle className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">Anti-Cheat Randomization</CardTitle>
                  <CardDescription className="text-xs">
                    Shuffled question sequences and randomized option IDs per student prevent answer sharing in exam halls.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          }
          shortcuts={
            <Card className="h-full bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800">
              <CardContent className="flex h-full flex-wrap items-center justify-between gap-4 p-6">
                <div className="max-w-md">
                  <CardTitle className="text-base font-bold">Deterministic Leaderboards & Pedagogical Analytics</CardTitle>
                  <CardDescription className="text-xs">
                    Tie-breaking by verified server completion timestamps and instant topic-level accuracy breakdown for faculty.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                    <span className="text-slate-400 dark:text-zinc-500 text-[10px] block">AVG SCORE</span>
                    <strong className="text-slate-900 dark:text-white font-bold">72%</strong>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                    <span className="text-slate-400 dark:text-zinc-500 text-[10px] block">COMPLETION</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">100%</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        />
      </section>

      {/* Unified Seamless Footer & CTA Component */}
      <FooterCTA />
    </div>
  );
}
