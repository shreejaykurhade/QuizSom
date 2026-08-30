'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  Radio,
  FileText,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BarChart2,
  ExternalLink,
  Shield,
  Layers,
  Clock,
} from 'lucide-react';

export default function TeacherDashboardPage() {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/assessments');
        const data = await res.json();
        if (data.assessments) {
          setAssessments(data.assessments);
        }
      } catch (err) {
        console.error('Failed to load assessments:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            Semester V · Computer Science & Engineering
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Good morning, Professor.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/teacher/create"
            className="btn-primary py-2.5 px-4 text-xs font-semibold shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Create Assessment
          </Link>
        </div>
      </div>

      {/* Active Live Room Glowing Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />

        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 backdrop-blur-sm">
            <Radio className="w-6 h-6 animate-pulse text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-wider text-indigo-200 uppercase">ACTIVE PROCTORED ROOM</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                48 Examinees Live
              </span>
            </div>
            <div className="text-base font-bold text-white mt-1">
              CS301 — DBMS Internal Assessment 01 (Room: <span className="font-mono font-extrabold text-amber-300">DEMO26</span>)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            href="/teacher/rooms/DEMO26"
            className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1.5 shadow-sm"
          >
            Live Monitor
            <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
          </Link>
          <Link
            href="/teacher/results/assess_dbms_ia01"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-sm"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Analytics
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-xs text-slate-500 font-medium">Active Assessment Rooms</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">2</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-semibold flex items-center gap-1">
            <span>DEMO26 & IA26X7</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-xs text-slate-500 font-medium">Enrolled Students</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">186</div>
          <div className="text-[11px] text-slate-500 mt-1">Across 3 CSE Sections</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-xs text-slate-500 font-medium">Assessments Conducted</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">14</div>
          <div className="text-[11px] text-slate-500 mt-1">This Semester</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="text-xs text-slate-500 font-medium">Average Class Score</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">72%</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-semibold">+3.4% vs Dept Baseline</div>
        </div>
      </div>

      {/* Recent Assessments Dense Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Internal Assessments</h2>
            <p className="text-xs text-slate-500 mt-0.5">Manage published assessments, room access, and performance summaries.</p>
          </div>
          <Link
            href="/teacher/create"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
          >
            + New Assessment
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Assessment</th>
                <th className="py-3 px-6">Course</th>
                <th className="py-3 px-6">Questions</th>
                <th className="py-3 px-6">Duration</th>
                <th className="py-3 px-6">Participants</th>
                <th className="py-3 px-6">Class Avg</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-900">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-medium">
                    <div className="text-sm font-bold text-slate-900">{a.title}</div>
                    <div className="text-[11px] text-slate-500">{a.moduleName}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                      {a.courseCode}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-0.5">{a.courseName}</div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs font-semibold">{a.totalQuestions} MCQs</td>
                  <td className="py-4 px-6 font-mono text-xs">{a.durationMinutes} min</td>
                  <td className="py-4 px-6 font-mono text-xs font-semibold">{a.participants || 48}</td>
                  <td className="py-4 px-6">
                    <span className="font-extrabold text-xs text-slate-900">{a.averageScore || 72}%</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {a.roomCode && (
                        <Link
                          href={`/teacher/rooms/${a.roomCode}`}
                          className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px] hover:bg-indigo-100 transition-all border border-indigo-200/60"
                        >
                          Room {a.roomCode}
                        </Link>
                      )}
                      <Link
                        href={`/teacher/results/${a.id}`}
                        className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px] hover:bg-slate-50 transition-all shadow-sm"
                      >
                        Analytics
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-4 px-6 font-medium">
                  <div className="text-sm font-bold text-slate-900">Operating Systems — IA 02</div>
                  <div className="text-[11px] text-slate-500">Module 3: Virtual Memory & Page Replacement</div>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                    CS302
                  </span>
                  <div className="text-[11px] text-slate-500 mt-0.5">Operating Systems</div>
                </td>
                <td className="py-4 px-6 font-mono text-xs font-semibold">15 MCQs</td>
                <td className="py-4 px-6 font-mono text-xs">20 min</td>
                <td className="py-4 px-6 font-mono text-xs font-semibold">52</td>
                <td className="py-4 px-6">
                  <span className="font-extrabold text-xs text-slate-900">68%</span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                    Archived
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <Link
                    href="/teacher/results/assess_dbms_ia01"
                    className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[11px] hover:bg-slate-50 transition-all shadow-sm"
                  >
                    View Report
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
