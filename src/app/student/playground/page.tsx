'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trophy,
  Gamepad2,
  Sparkles,
  PlusCircle,
  Users,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Clock,
  BookOpen,
  Share2,
  Award,
} from 'lucide-react';
import { apiFetch } from '@/lib/auth/apiFetch';
import { LiveRoom, Assessment, ExamAttempt } from '@/lib/db/types';

interface PlaygroundRoomItem {
  room: LiveRoom;
  assessment?: Assessment;
  isCreator: boolean;
  myAttempt?: ExamAttempt;
  totalAttempts: number;
}

export default function StudentPlaygroundHubPage() {
  const [rooms, setRooms] = useState<PlaygroundRoomItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState('');
  const [filter, setFilter] = useState<'all' | 'created' | 'joined'>('all');
  const router = useRouter();

  const loadRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/student/playground/rooms');
      const data = await res.json();
      if (res.ok && data.rooms) {
        setRooms(data.rooms);
      }
    } catch (e) {
      console.error('Failed to load playground rooms:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRooms();
  }, [loadRooms]);

  const handleCopyLink = (code: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `⚔️ Hey! Join my QuizSom peer challenge room: ${code}\nLink: ${origin}/exam/${code}`;
    navigator.clipboard.writeText(shareText);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    const clean = joinCode.toUpperCase().trim();
    if (/^[A-Z0-9]{6}$/.test(clean)) {
      router.push(`/exam/${clean}`);
    }
  };

  const filteredRooms = rooms.filter((item) => {
    if (filter === 'created') return item.isCreator;
    if (filter === 'joined') return !item.isCreator;
    return true;
  });

  const totalCreated = rooms.filter((r) => r.isCreator).length;
  const totalJoined = rooms.filter((r) => Boolean(r.myAttempt)).length;
  const completedAttempts = rooms.map((r) => r.myAttempt).filter((a): a is ExamAttempt => Boolean(a && a.status === 'COMPLETED'));
  const avgScore = completedAttempts.length
    ? Math.round(completedAttempts.reduce((acc, a) => acc + (a.percentageScore ?? 0), 0) / completedAttempts.length)
    : 0;

  return (
    <div className="space-y-7 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              STUDENT ARENA & PEER CHALLENGES
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Quiz Playground
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Create rapid peer challenge quizzes from your uploaded course notes or custom academic topics. Share an instant room code with friends and compete on the live student leaderboard!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => void loadRooms()}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link
              href="/student/playground/create"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Create Peer Quiz</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Quizzes Created</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{totalCreated}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Battles Joined</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{totalJoined}</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Average Score</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-0.5">{avgScore}%</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Challenges</div>
            <div className="text-xl font-extrabold text-purple-300 mt-0.5">{rooms.length}</div>
          </div>
        </div>
      </div>

      {/* Quick Join Box & Filter Strip */}
      <div className="grid md:grid-cols-12 gap-4">
        {/* Join by Code widget */}
        <div className="md:col-span-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Have a Friend&apos;s Room Code?</div>
              <div className="text-[11px] text-slate-500">Enter code to join their challenge</div>
            </div>
          </div>

          <form onSubmit={handleJoin} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
              placeholder="CODE (e.g. PG4812)"
              className="w-full sm:w-36 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs font-bold tracking-widest text-slate-900 outline-none focus:border-purple-600 focus:bg-white text-center"
            />
            <button
              type="submit"
              disabled={!/^[A-Z0-9]{6}$/.test(joinCode)}
              className="btn-primary py-2 px-3 text-xs font-bold shrink-0 disabled:opacity-40"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Filter Pills */}
        <div className="md:col-span-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between sm:justify-end gap-2 text-xs font-mono font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Challenges ({rooms.length})
          </button>
          <button
            onClick={() => setFilter('created')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'created'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Created by Me ({totalCreated})
          </button>
          <button
            onClick={() => setFilter('joined')}
            className={`px-3 py-2 rounded-xl transition-all cursor-pointer ${
              filter === 'joined'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Joined ({rooms.length - totalCreated})
          </button>
        </div>
      </div>

      {/* Challenge Rooms Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Loading playground rooms and active challenges...</span>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <Gamepad2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Playground Quizzes Yet</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Create your first peer challenge from your syllabus notes or custom topics, and share the room code with your friends.
            </p>
          </div>
          <Link
            href="/student/playground/create"
            className="btn-primary py-2.5 px-4 text-xs font-bold inline-flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Create First Peer Challenge
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRooms.map((item) => {
            const hasAttempted = Boolean(item.myAttempt);
            const score = item.myAttempt?.percentageScore ?? null;
            const code = item.room.code;
            const title = item.assessment?.title || 'Student Peer Challenge';
            const topic = item.assessment?.moduleName || 'Peer Battle';
            const qCount = item.assessment?.settings?.totalQuestions || item.assessment?.questionIds?.length || 5;
            const duration = item.assessment?.settings?.durationMinutes || 10;

            return (
              <div
                key={item.room.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Room Code badge & Creator pill */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-extrabold bg-slate-900 text-white px-2.5 py-1 rounded-xl shadow-2xs">
                      <span>{code}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(code)}
                        title="Copy Room Link & Code"
                        className="p-1 rounded hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        {copiedCode === code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {item.isCreator ? (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Created by You ★
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        Peer Room
                      </span>
                    )}
                  </div>

                  {/* Title & Topic */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      Topic: <strong>{topic}</strong>
                    </p>
                  </div>

                  {/* Badges Info */}
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 flex-wrap pt-1">
                    <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {qCount} Questions
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {duration} Mins
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {item.totalAttempts} Submissions
                    </span>
                  </div>

                  {/* Student Result Pill */}
                  {hasAttempted && (
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between font-mono">
                      <span className="text-emerald-800 font-bold">Your Score</span>
                      <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {score}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/student/playground/rooms/${code}`}
                    className="btn-secondary py-1.5 px-3 text-xs font-bold flex items-center gap-1.5 text-purple-700 hover:bg-purple-50"
                  >
                    <Trophy className="w-3.5 h-3.5 text-purple-600" />
                    Leaderboard
                  </Link>

                  <Link
                    href={`/exam/${code}`}
                    className="btn-primary py-1.5 px-3 text-xs font-bold flex items-center gap-1 shadow-2xs"
                  >
                    <span>{hasAttempted ? 'Retake Quiz' : 'Take Battle'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
