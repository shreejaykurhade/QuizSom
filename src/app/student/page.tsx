'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  History,
  MessageSquareText,
  PlusCircle,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/auth/apiFetch';

export default function StudentPortalPage() {
  const [code, setCode] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [materialsCount, setMaterialsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const load = () => {
    setLoading(true);
    apiFetch('/api/student/history')
      .then((r) => (r.ok ? r.json() : { history: [] }))
      .then((data) => setHistory(data.history || []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));

    apiFetch('/api/student/materials')
      .then((r) => (r.ok ? r.json() : { materials: [] }))
      .then((data) => setMaterialsCount(data.materials?.length || 0))
      .catch(() => setMaterialsCount(0));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (/^[A-Z0-9]{6}$/i.test(code)) {
      router.push(`/exam/${code.toUpperCase()}`);
    }
  };

  const completed = history.filter(
    (item) => item.status === 'COMPLETED' || item.status === 'AUTO_SUBMITTED'
  );

  return (
    <main className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-mono font-bold text-emerald-700">STUDENT WORKSPACE</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Your Quizzes & Faculty Study Materials
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Join assessment rooms shared by faculty, read uploaded lecture notes, and study from source-grounded materials.
          </p>
        </div>
        <button
          onClick={load}
          className="btn-secondary py-2 px-3 text-xs font-bold self-start sm:self-auto"
        >
          <RefreshCw className={`mr-1 inline w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Hero: Focused Room Code Access */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-9 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>Instant Exam &amp; Arena Entry</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Enter Room Code
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Enter the 6-character code shared by your professor or peer room creator to jump straight into your proctored assessment or study battle.
          </p>

          {/* Large Hero Room Code Form */}
          <form onSubmit={submit} className="pt-2 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full">
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(event) =>
                    setCode(
                      event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
                    )
                  }
                  autoFocus
                  className="w-full h-14 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-blue-500 text-white px-4 text-center font-mono text-2xl sm:text-3xl font-extrabold tracking-[0.3em] uppercase placeholder:tracking-normal placeholder:text-slate-500 placeholder:text-sm transition-all shadow-inner outline-none"
                  placeholder="e.g. CS301A"
                />
                {code.length > 0 && (
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-400">
                    {code.length}/6
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={!/^[A-Z0-9]{6}$/.test(code)}
                className="w-full sm:w-auto h-14 px-7 rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Join Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Security Indicators */}
            <div className="flex items-center justify-center gap-4 pt-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">🛡️ 2-Strike Proctoring</span>
              <span>·</span>
              <span className="flex items-center gap-1">⏱️ Server Synced</span>
              <span>·</span>
              <span className="flex items-center gap-1">🏆 Instant Results</span>
            </div>
          </form>
        </div>
      </section>

      {/* 3-Column Action Hub */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Student Playground */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <span className="text-base">🏆</span>
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">STUDENT ARENA</p>
                <h3 className="font-bold text-slate-900 text-sm">Playground Battles</h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Upload your own study PDFs, customize rule sets, create peer rooms, and compete on student leaderboards.
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/student/playground"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <span>Explore Playground</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Card 2: Study Materials */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">COURSE NOTES</p>
                <h3 className="font-bold text-slate-900 text-sm">Faculty Study Materials</h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Access lecture slides, textbook modules, and syllabus documents uploaded by your faculty members.
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold">
              {materialsCount} Document{materialsCount === 1 ? '' : 's'} available
            </span>
            <Link
              href="/student/materials"
              className="py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-1 transition-all"
            >
              <span>View Materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Card 3: Study Chatbot */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">MATERIAL HELP</p>
                <h3 className="font-bold text-slate-900 text-sm">Ask Assigned Notes</h3>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Ask questions directly from your assigned syllabus and notes with verified exact textbook citations.
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/student/chat"
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 w-full transition-all"
            >
              <span>Open Study Chat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Past Quizzes Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono text-slate-500 font-bold uppercase">YOUR PROGRESS</p>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900">Completed Assessments</h2>
          </div>
          <Link href="/student/history" className="text-xs font-bold text-blue-600 hover:underline">
            View all history →
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-2 rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-500 items-center">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            Loading your quiz history…
          </div>
        ) : completed.length ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {completed.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/exam/${item.roomCode}/result`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-blue-300 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-mono font-bold text-emerald-700 border border-emerald-200">
                    {item.score}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500 font-mono">
                    {new Date(item.startedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center space-y-2">
            <History className="mx-auto w-6 h-6 text-slate-400" />
            <p className="text-sm font-bold text-slate-900">No completed quizzes yet</p>
            <p className="text-xs text-slate-500">Your completed assessments and grounded scores will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
