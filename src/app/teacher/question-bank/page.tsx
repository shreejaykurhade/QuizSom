'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileQuestion,
  Search,
  Filter,
  FileText,
  Check,
  PlusCircle,
  Sparkles,
  Edit2,
  RefreshCw,
} from 'lucide-react';
import { Question } from '@/lib/db/types';

export default function TeacherQuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (topicFilter) queryParams.append('topic', topicFilter);
        if (difficultyFilter) queryParams.append('difficulty', difficultyFilter);

        const res = await fetch(`/api/questions?${queryParams.toString()}`);
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
        }
      } catch (err) {
        console.error('Failed to load question bank:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadQuestions();
  }, [search, topicFilter, difficultyFilter]);

  const topics = ['1NF & 2NF', '3NF & BCNF', 'Functional Dependencies', 'Relational Model', 'Lossless Decomposition'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E5E0]">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#6B6B67]">
            Institutional Item Repository
          </div>
          <h1 className="text-2xl font-semibold text-[#171717] mt-1">
            Question Bank
          </h1>
          <p className="text-xs text-[#6B6B67] mt-0.5">
            Search, filter, and reuse source-grounded academic assessment items across courses.
          </p>
        </div>

        <Link
          href="/teacher/create"
          className="btn-primary py-2 px-4 text-xs font-medium"
        >
          <PlusCircle className="w-4 h-4" />
          Generate New Questions
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-[#E5E5E0] shadow-subtle grid sm:grid-cols-12 gap-3 text-xs">
        <div className="sm:col-span-6 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or keywords..."
            className="input-academic pl-8 text-xs"
          />
          <Search className="w-4 h-4 text-[#8C8C87] absolute left-2.5 top-2.5" />
        </div>

        <div className="sm:col-span-3">
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="input-academic text-xs"
          >
            <option value="">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input-academic text-xs"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="p-5 rounded-xl bg-white border border-[#E5E5E0] shadow-subtle space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#EEF3F8] text-[#17324D] border border-[#C8D8E8]">
                  #{idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[#171717]">{q.questionText}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-[#6B6B67] mt-1">
                    <span>Topic: <strong>{q.topic}</strong></span>
                    <span>• Difficulty: <strong className="capitalize">{q.difficulty}</strong></span>
                    <span>• Course: <strong>CS301 DBMS</strong></span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-[#3F6B5B] bg-[#EEF5F2] px-2 py-0.5 rounded border border-[#C6E0D6] shrink-0">
                Grounded ✓
              </span>
            </div>

            {/* Options display */}
            <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
              {q.options.map((opt, optIdx) => {
                const isCorrect = opt.id === q.correctOptionId;
                return (
                  <div
                    key={opt.id}
                    className={`p-2 rounded-md border flex items-center justify-between ${
                      isCorrect
                        ? 'border-[#C6E0D6] bg-[#EEF5F2] text-[#3F6B5B] font-medium'
                        : 'border-[#E5E5E0] bg-[#FAFAF8] text-[#171717]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="font-mono text-[11px] font-semibold text-[#8C8C87]">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="truncate">{opt.text}</span>
                    </span>
                    {isCorrect && (
                      <span className="text-[9px] font-mono uppercase bg-[#3F6B5B] text-white px-1 py-0.5 rounded ml-2">
                        Answer
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation & Source Citation */}
            <div className="pt-2 border-t border-[#E5E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#6B6B67]">
              <div className="truncate font-mono">
                Source: {q.sourceCitation.documentTitle} · Page {q.sourceCitation.pageNumber} · {q.sourceCitation.sectionTitle || 'Section'}
              </div>
              <div className="text-[#17324D] font-medium shrink-0">
                Used in: DBMS IA 01
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
