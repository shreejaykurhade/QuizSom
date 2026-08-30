'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FooterCTA from '@/components/FooterCTA';
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
            <Card className="flex h-full flex-col justify-between p-6 sm:p-7 bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800 relative overflow-hidden">
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

                {/* 4K Mascot in the Middle Blank Space */}
                <div className="my-6 sm:my-8 flex items-center justify-center relative">
                  <motion.div
                    whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 0.4 }}
                    className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-md cursor-pointer"
                  >
                    <Image
                      src="/gemini-mascot-idea.png"
                      alt="Gemini AI Mascot"
                      fill
                      className="object-contain"
                      unoptimized
                      priority
                    />
                  </motion.div>
                </div>
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
            <Card className="h-full bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-zinc-800 overflow-hidden relative">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base font-bold">Live Room Telemetry</CardTitle>
                    <CardDescription className="text-xs">Real-Time Examinee Audit</CardDescription>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Active Sync</span>
                  </div>
                </div>

                {/* Sleek Overlapping Dynamic Avatar Stack */}
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center -space-x-2.5 hover:space-x-1 transition-all duration-300">
                    {/* Examinee 1 - Aarav */}
                    <div
                      title="Aarav Sharma · Active (Q14/15)"
                      className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 font-mono text-xs font-bold text-white shadow-md ring-2 ring-white dark:ring-[#0A0A0A] transition-all duration-200 hover:scale-120 hover:z-30 hover:-translate-y-1 cursor-pointer"
                    >
                      <span>AS</span>
                    </div>

                    {/* Examinee 2 - Ananya */}
                    <div
                      title="Ananya Iyer · Submitted (96%)"
                      className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 font-mono text-xs font-bold text-white shadow-md ring-2 ring-white dark:ring-[#0A0A0A] transition-all duration-200 hover:scale-120 hover:z-30 hover:-translate-y-1 cursor-pointer"
                    >
                      <span>AI</span>
                    </div>

                    {/* Examinee 3 - Rohan */}
                    <div
                      title="Rohan Patil · 1 Warning Logged"
                      className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 font-mono text-xs font-bold text-white shadow-md ring-2 ring-white dark:ring-[#0A0A0A] transition-all duration-200 hover:scale-120 hover:z-30 hover:-translate-y-1 cursor-pointer"
                    >
                      <span>RP</span>
                    </div>

                    {/* Examinee 4 - Priya */}
                    <div
                      title="Priya Shah · Auto-Submitted (Strike 2)"
                      className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-red-600 font-mono text-xs font-bold text-white shadow-md ring-2 ring-white dark:ring-[#0A0A0A] transition-all duration-200 hover:scale-120 hover:z-30 hover:-translate-y-1 cursor-pointer"
                    >
                      <span>PS</span>
                    </div>

                    {/* Count Pill */}
                    <div className="flex h-9 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-mono text-xs font-extrabold px-3 shadow-md ring-2 ring-white dark:ring-[#0A0A0A] transition-transform duration-200 hover:scale-110 hover:z-30 cursor-pointer">
                      +44
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-zinc-400">
                    48 Enrolled
                  </span>
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
