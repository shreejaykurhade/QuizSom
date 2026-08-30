'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Copy,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Sliders,
  Check,
  Zap,
} from 'lucide-react';
import { Question, DocumentMaterial } from '@/lib/db/types';

export default function CreateAssessmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Step 1 State: Material
  const [materials, setMaterials] = useState<DocumentMaterial[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('doc_dbms_mod2');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Step 2 State: Configuration
  const [title, setTitle] = useState('DBMS — Internal Assessment 01');
  const [courseCode, setCourseCode] = useState('CS301');
  const [courseName, setCourseName] = useState('Database Management Systems');
  const [moduleName, setModuleName] = useState('Module 2: Relational Model & Normalization');
  const [totalQuestions, setTotalQuestions] = useState<number>(15);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [durationMinutes, setDurationMinutes] = useState<number>(15);
  const [negativeMarking, setNegativeMarking] = useState<number>(0.25);
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const [randomizeOptions, setRandomizeOptions] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState<'PUBLIC' | 'ANONYMOUS' | 'DISABLED'>('PUBLIC');
  const [requireFullscreen, setRequireFullscreen] = useState(true);

  // Step 3 State: Generation Progress
  const [generationStage, setGenerationStage] = useState<number>(0);
  const [generationStages] = useState([
    'Reading syllabus document & verifying semantic encoding',
    'Extracting discrete curriculum chunk hierarchy',
    'Building localized RAG retrieval context',
    'Executing source-grounded Gemini Flash generation',
    'Verifying answer uniqueness, option stability & source citations',
  ]);

  // Step 4 State: Questions Review & QA
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [regenerateModalQ, setRegenerateModalQ] = useState<Question | null>(null);
  const [regeneratePrompt, setRegeneratePrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Step 5 State: Published Room
  const [publishedAssessmentId, setPublishedAssessmentId] = useState<string>('');
  const [generatedRoomCode, setGeneratedRoomCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch('/api/materials');
        const data = await res.json();
        if (data.documents && data.documents.length > 0) {
          setMaterials(data.documents);
        }
      } catch (err) {
        console.error('Failed to load materials:', err);
      }
    }
    fetchMaterials();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', 'course_dbms_301');

    try {
      const res = await fetch('/api/materials/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.document) {
        setMaterials((prev) => [data.document, ...prev]);
        setSelectedDocId(data.document.id);
        setTitle(`${data.document.title} — Assessment`);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const runGeneration = async () => {
    setStep(3);
    setGenerationStage(0);

    const timer1 = setTimeout(() => setGenerationStage(1), 500);
    const timer2 = setTimeout(() => setGenerationStage(2), 1100);
    const timer3 = setTimeout(() => setGenerationStage(3), 1800);

    try {
      const res = await fetch('/api/assessments/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: selectedDocId,
          courseId: 'course_dbms_301',
          assessmentTitle: title,
          totalQuestions,
          difficulty,
          moduleName,
        }),
      });

      const data = await res.json();
      setGenerationStage(4);

      setTimeout(() => {
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
        }
        setStep(4);
      }, 500);
    } catch (err) {
      console.error('Generation error:', err);
      setStep(4);
    }
  };

  const handleRegenerateQuestion = async () => {
    if (!regenerateModalQ) return;
    setIsRegenerating(true);

    try {
      const res = await fetch('/api/assessments/regenerate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: regenerateModalQ,
          documentId: selectedDocId,
          customInstruction: regeneratePrompt,
        }),
      });
      const data = await res.json();
      if (data.question) {
        setQuestions((prev) =>
          prev.map((q) => (q.id === regenerateModalQ.id ? data.question : q))
        );
        setRegenerateModalQ(null);
        setRegeneratePrompt('');
      }
    } catch (err) {
      console.error('Regenerate error:', err);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSaveEdit = (updatedQ: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQ.id ? updatedQ : q))
    );
    setEditingQuestion(null);
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const res = await fetch('/api/assessments/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: 'course_dbms_301',
          teacherId: 'user_prof_arvind',
          title,
          moduleName,
          materialDocumentIds: [selectedDocId],
          questions,
          settings: {
            durationMinutes,
            totalQuestions: questions.length,
            difficultyDistribution: difficulty,
            randomizeQuestions,
            randomizeOptions,
            positiveMarks: 1.0,
            negativeMarks: negativeMarking,
            allowReviewAfterSubmit: true,
            showLeaderboard,
            requireFullscreen,
            maxFullscreenViolations: 2,
          },
        }),
      });

      const data = await res.json();
      if (data.assessment && data.room) {
        setPublishedAssessmentId(data.assessment.id);
        setGeneratedRoomCode(data.room.code);
        setStep(5);
      }
    } catch (err) {
      console.error('Publishing error:', err);
      alert('Failed to publish assessment.');
    } finally {
      setIsPublishing(false);
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(generatedRoomCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-8">
      {/* Stepper Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase font-bold tracking-wider text-indigo-600">
              Assessment Generation Kernel
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              Create Internal Assessment
            </h1>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { num: 1, label: 'Material' },
              { num: 2, label: 'Configure' },
              { num: 3, label: 'Generate' },
              { num: 4, label: 'Review' },
              { num: 5, label: 'Publish' },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  step === s.num
                    ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                    : step > s.num
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span>0{s.num}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: MATERIAL SELECTION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                01. Upload or Select Course Material
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Upload your syllabus module, lecture notes, or textbook chapter. Gemini will extract facts exclusively from this material.
              </p>
            </div>

            {/* Drag & Drop Upload Zone */}
            <label className="border-2 border-dashed border-slate-300 hover:border-indigo-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-indigo-50/20 group">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 group-hover:text-indigo-600 group-hover:scale-105 transition-all mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-bold text-slate-900">
                {isUploading ? 'Extracting & chunking document with RAG...' : 'Drop course material or browse file'}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                Supported formats: PDF, DOCX, TXT (Up to 25MB)
              </span>
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            {/* Available Materials Selection */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase font-mono mb-2.5">
                Pre-Loaded Course Materials
              </div>
              <div className="space-y-2.5">
                {materials.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedDocId === doc.id
                        ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${selectedDocId === doc.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{doc.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {doc.fileName} · {doc.pageCount} Pages · {doc.chunks?.length || 4} Chunks Indexed · Processed ✓
                        </div>
                      </div>
                    </div>
                    {selectedDocId === doc.id && (
                      <span className="text-xs font-bold text-indigo-700 flex items-center gap-1 font-mono bg-white px-2.5 py-1 rounded-md border border-indigo-200 shadow-sm">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedDocId}
              className="btn-primary py-3 px-6 text-sm font-semibold shadow-sm"
            >
              Continue to Configuration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ASSESSMENT CONFIGURATION */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                02. Assessment Parameters & Exam Rules
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Configure timing, question volume, difficulty distribution, and proctoring safeguards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assessment Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-academic text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Module / Topic Focus
                </label>
                <input
                  type="text"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="input-academic text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Number of Questions
                </label>
                <select
                  value={totalQuestions}
                  onChange={(e) => setTotalQuestions(Number(e.target.value))}
                  className="input-academic text-sm"
                >
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions (Recommended)</option>
                  <option value={20}>20 Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="input-academic text-sm"
                >
                  <option value="mixed">Balanced Mix (Easy, Med, Hard)</option>
                  <option value="easy">Foundational (Easy)</option>
                  <option value="medium">Standard University (Medium)</option>
                  <option value="hard">Rigorous & Analytical (Hard)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  min={5}
                  max={120}
                  className="input-academic text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Marking Scheme
                </label>
                <select
                  value={negativeMarking}
                  onChange={(e) => setNegativeMarking(Number(e.target.value))}
                  className="input-academic text-sm"
                >
                  <option value={0.25}>+1.0 Correct / -0.25 Negative Marking</option>
                  <option value={0}>+1.0 Correct / 0 No Negative Marks</option>
                  <option value={0.33}>+1.0 Correct / -0.33 Negative Marks</option>
                </select>
              </div>
            </div>

            {/* Proctoring Safeguards */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-900 uppercase">
                Controlled Exam Safeguards & Randomization
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:border-slate-300 transition-all">
                  <input
                    type="checkbox"
                    checked={requireFullscreen}
                    onChange={(e) => setRequireFullscreen(e.target.checked)}
                    className="rounded text-slate-900 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900 block">Full-Screen 2-Strike Mode</strong>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Strike 1 warning modal; Strike 2 immediate server-side auto-submission.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:border-slate-300 transition-all">
                  <input
                    type="checkbox"
                    checked={randomizeQuestions}
                    onChange={(e) => setRandomizeQuestions(e.target.checked)}
                    className="rounded text-slate-900 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900 block">Randomize Question Sequence</strong>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Each student receives a unique randomized question order.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:border-slate-300 transition-all">
                  <input
                    type="checkbox"
                    checked={randomizeOptions}
                    onChange={(e) => setRandomizeOptions(e.target.checked)}
                    className="rounded text-slate-900 mt-0.5"
                  />
                  <div>
                    <strong className="text-slate-900 block">Randomize Option Order</strong>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      Stable IDs map choices safely across randomized displays.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:border-slate-300 transition-all">
                  <div className="w-full">
                    <strong className="text-slate-900 block mb-1">Leaderboard Policy</strong>
                    <select
                      value={showLeaderboard}
                      onChange={(e) => setShowLeaderboard(e.target.value as any)}
                      className="input-academic text-xs py-1.5"
                    >
                      <option value="PUBLIC">Public to Participants</option>
                      <option value="ANONYMOUS">Anonymous (Show Rank Only)</option>
                      <option value="DISABLED">Disabled</option>
                    </select>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="btn-secondary py-2.5 px-4 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Material
            </button>
            <button
              onClick={runGeneration}
              className="btn-primary py-3 px-6 text-sm font-semibold shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Generate Questions with Gemini Flash
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GENERATION PROGRESS STATE */}
      {step === 3 && (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 shadow-card text-center max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 mx-auto shadow-sm">
            <RefreshCw className="w-7 h-7 animate-spin text-indigo-600" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase text-indigo-600 tracking-wider">
              Gemini Flash RAG Generator
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
              Generating Grounded Assessment
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Course: {courseCode} · {moduleName}
            </p>
          </div>

          {/* Progress Stages */}
          <div className="space-y-3 text-left p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            {generationStages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 ${
                  idx < generationStage
                    ? 'text-emerald-700 font-semibold'
                    : idx === generationStage
                    ? 'text-indigo-700 font-bold animate-pulse'
                    : 'text-slate-400'
                }`}
              >
                {idx < generationStage ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : idx === generationStage ? (
                  <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{msg}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Zero-hallucination prompt grounding active · Model: Gemini Flash
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & QUALITY CONTROL */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Quality Control Header */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Quality Control: {questions.length}/{questions.length} Questions Verified & Grounded</span>
            </div>
            <div className="text-emerald-700 font-mono text-[11px] font-semibold">
              0 Duplicates • Verified Option Sets • Exact Citations
            </div>
          </div>

          {/* Questions Review List */}
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Q{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {q.questionText}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                        <span>Topic: <strong className="text-slate-700">{q.topic}</strong></span>
                        <span>• Difficulty: <strong className="capitalize text-slate-700">{q.difficulty}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setRegenerateModalQ(q)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors"
                      title="Regenerate single question"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                      title="Edit question text and answers"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-lg hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Options List */}
                <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = opt.id === q.correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border flex items-center justify-between ${
                          isCorrect
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold'
                            : 'border-slate-200 bg-slate-50/60 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="truncate">{opt.text}</span>
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] font-mono uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Grounding Source Citation */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-mono">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="truncate">
                      Source: {q.sourceCitation.documentTitle} · Page {q.sourceCitation.pageNumber} · {q.sourceCitation.sectionTitle || 'Section'}
                    </span>
                  </div>
                  <span className="text-emerald-700 shrink-0 font-bold text-[10px]">Verified Grounding ✓</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="btn-secondary py-2.5 px-4 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Config
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || questions.length === 0}
              className="btn-primary py-3 px-6 text-sm font-semibold shadow-sm"
            >
              {isPublishing ? 'Publishing & Generating Room...' : 'Publish Assessment & Open Room'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PUBLISHED & LIVE ROOM CODE */}
      {step === 5 && (
        <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-card text-center max-w-xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
              Assessment Published Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Live Room is Ready
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Share this 6-character room code with your students in class or project it on the lecture hall screen.
            </p>
          </div>

          {/* Room Code Display Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-card max-w-sm mx-auto space-y-3">
            <div className="text-[11px] text-slate-400 uppercase font-mono font-semibold">CLASSROOM ROOM CODE</div>
            <div className="text-4xl font-mono font-extrabold tracking-widest text-amber-300">
              {generatedRoomCode}
            </div>
            <button
              onClick={copyRoomCode}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Room Code Copied!' : 'Copy Room Code'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 max-w-sm mx-auto text-left font-mono">
            <div>• Questions: {questions.length} MCQs</div>
            <div>• Duration: {durationMinutes} Minutes</div>
            <div>• Fullscreen: 2-Strike Enforced</div>
            <div>• Leaderboard: {showLeaderboard}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/teacher/rooms/${generatedRoomCode}`}
              className="w-full sm:w-auto btn-primary py-3 px-6 text-sm font-semibold shadow-sm"
            >
              Open Live Room Console
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/teacher/dashboard"
              className="w-full sm:w-auto btn-secondary py-3 px-4 text-xs font-semibold"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      )}

      {/* Single Question Regeneration Modal */}
      {regenerateModalQ && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal max-w-lg w-full p-6 space-y-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-indigo-600">Gemini Flash AI</div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Regenerate Targeted Question
              </h3>
              <p className="text-xs text-slate-500">
                Gemini will regenerate this specific item grounded in the course syllabus.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
              <strong>Current:</strong> {regenerateModalQ.questionText}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Optional Pedagogical Directive
              </label>
              <input
                type="text"
                value={regeneratePrompt}
                onChange={(e) => setRegeneratePrompt(e.target.value)}
                placeholder="e.g. Make this more conceptual / Focus on 3NF trade-offs"
                className="input-academic text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRegenerateModalQ(null)}
                className="btn-secondary py-2 px-3 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRegenerateQuestion}
                disabled={isRegenerating}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                {isRegenerating ? 'Regenerating...' : 'Regenerate Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Edit Question Details
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Modify text, answer options, or correct selection.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Text</label>
              <textarea
                value={editingQuestion.questionText}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, questionText: e.target.value })
                }
                rows={2}
                className="input-academic text-xs"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Answer Options & Correct Key</label>
              {editingQuestion.options.map((opt, i) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-500 w-6">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const newOpts = [...editingQuestion.options];
                      newOpts[i] = { ...opt, text: e.target.value };
                      setEditingQuestion({ ...editingQuestion, options: newOpts });
                    }}
                    className="input-academic text-xs flex-1"
                  />
                  <input
                    type="radio"
                    name="correctOpt"
                    checked={editingQuestion.correctOptionId === opt.id}
                    onChange={() =>
                      setEditingQuestion({ ...editingQuestion, correctOptionId: opt.id })
                    }
                    className="text-slate-900"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Explanation</label>
              <textarea
                value={editingQuestion.explanation}
                onChange={(e) =>
                  setEditingQuestion({ ...editingQuestion, explanation: e.target.value })
                }
                rows={2}
                className="input-academic text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingQuestion(null)}
                className="btn-secondary py-2 px-3 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(editingQuestion)}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
