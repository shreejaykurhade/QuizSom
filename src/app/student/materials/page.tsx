'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Search,
  MessageSquareText,
  Download,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Layers,
  FileCheck2,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { apiFetch } from '@/lib/auth/apiFetch';

interface StudyMaterial {
  id: string;
  title: string;
  fileName: string;
  fileSize?: number;
  mimeType?: string;
  pageCount?: number;
  chunkCount?: number;
  uploadedAt: string;
  courseId?: string;
  courseName?: string;
  isAssigned?: boolean;
}

export default function StudentStudyMaterialsPage() {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'assigned'>('all');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/student/materials');
      const data = await res.json();
      if (res.ok && data.materials) {
        setMaterials(data.materials);
      }
    } catch (e) {
      console.error('Failed to load student study materials:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredMaterials = materials.filter((m) => {
    if (filter === 'assigned' && !m.isAssigned) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchFile = m.fileName?.toLowerCase().includes(q);
      const matchCourse = m.courseName?.toLowerCase().includes(q);
      if (!matchTitle && !matchFile && !matchCourse) return false;
    }
    return true;
  });

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '1.2 MB';
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-7 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              STUDY REPOSITORY
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {materials.length} Document{materials.length === 1 ? '' : 's'} Available
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900">
            Study Materials & Lecture Notes
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Read source course materials uploaded by your faculty or ask questions grounded in your assigned notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => void load()}
            className="btn-secondary py-2 px-3 text-xs font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/student/chat"
            className="btn-primary py-2 px-3.5 text-xs font-bold shadow-sm flex items-center gap-1.5"
          >
            <MessageSquareText className="w-4 h-4" />
            Open Study Chat
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none z-10" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes, textbooks, topics, or PDF names..."
            className="input-academic text-xs w-full"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto font-mono text-xs font-bold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Materials ({materials.length})
          </button>
          <button
            onClick={() => setFilter('assigned')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filter === 'assigned'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Joined Rooms ({materials.filter((m) => m.isAssigned).length})
          </button>
        </div>
      </div>

      {/* Material Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
          <span>Loading course study materials...</span>
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No Study Materials Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {search
                ? 'No documents matched your search query. Try searching with different keywords.'
                : 'Your professors have not uploaded lecture notes yet. Once uploaded, course slides and notes will appear here.'}
            </p>
          </div>
          <Link
            href="/student"
            className="btn-primary py-2 px-4 text-xs font-bold inline-flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Join a Faculty Room
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMaterials.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200/70 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  {doc.isAssigned && (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Room Material ✓
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {doc.courseName || 'Course Notes'}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 flex-wrap pt-1">
                  <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {doc.pageCount || 1} Page{doc.pageCount === 1 ? '' : 's'}
                  </span>
                  <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {formatFileSize(doc.fileSize)}
                  </span>
                  <span className="text-slate-400">
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`/api/materials/${doc.id}/file`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5 hover:text-slate-900"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  View PDF
                </a>
                <Link
                  href="/student/chat"
                  className="btn-primary py-1.5 px-3 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-emerald-300" />
                  Ask in Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
