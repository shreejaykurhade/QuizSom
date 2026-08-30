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

      {/* 3-Column Action Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: Join Room */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">EXAM ACCESS</p>
                <h2 className="font-bold text-slate-900 text-sm">Join Faculty Room</h2>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Enter the 6-character room code shared by your professor to begin a proctored assessment.
            </p>
          </div>

          <form onSubmit={submit} className="flex gap-2 pt-1">
            <input
              value={code}
              onChange={(event) =>
                setCode(
                  event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
                )
              }
              className="min-w-0 flex-1 rounded-lg border bg-slate-50 px-3 py-2.5 font-mono font-bold tracking-[0.18em] text-xs outline-none focus:border-blue-600 focus:bg-white"
              placeholder="ROOM CODE"
            />
            <button
              disabled={!/^[A-Z0-9]{6}$/.test(code)}
              className="btn-primary px-3 py-2.5 text-xs disabled:opacity-40"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </section>

        {/* Card 2: Study Materials */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">COURSE NOTES</p>
                <h2 className="font-bold text-slate-900 text-sm">Faculty Study Materials</h2>
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
              className="btn-primary py-2 px-3 text-xs font-bold flex items-center gap-1 shadow-2xs"
            >
              View Materials
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Card 3: Study Chatbot */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
                <MessageSquareText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 font-bold uppercase">MATERIAL HELP</p>
                <h2 className="font-bold text-slate-900 text-sm">Ask Assigned Notes</h2>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Ask questions directly from your assigned syllabus and notes. Every answer references exact source pages.
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/student/chat"
              className="btn-secondary py-2 px-3 text-xs font-bold flex items-center justify-center gap-1.5 w-full"
            >
              Open Study Chat
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
