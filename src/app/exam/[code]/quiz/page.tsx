'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { apiFetch } from '@/lib/auth/apiFetch';
import {
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Radio,
  Wifi,
  WifiOff,
  Send,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

export default function StudentQuizInterfacePage() {
  const params = useParams();
  const router = useRouter();
  const code = (params.code as string)?.toUpperCase();

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(900);
  const [serverExpiresAt, setServerExpiresAt] = useState<string | null>(null);

  const [fullscreenStrikes, setFullscreenStrikes] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showAutoSubmitModal, setShowAutoSubmitModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [tabWarningToast, setTabWarningToast] = useState(false);

  const isExamActive = useRef(true);

  useEffect(() => {
    async function initExam() {
      try {
        const studentData = localStorage.getItem('assessly_student');
        const parsedStudent = studentData
          ? JSON.parse(studentData)
          : { name: 'Aarav Sharma', rollNo: '2024CS1048' };

        const roomRes = await apiFetch(`/api/rooms/${code}`);
        const roomJson = await roomRes.json();

        if (!roomJson.room) {
          alert('Room not found');
          router.push('/student');
          return;
        }

        setAssessment(roomJson.assessment);
        setQuestions(roomJson.questions || []);

        const joinRes = await apiFetch(`/api/rooms/${code}/join`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: parsedStudent.name,
            studentRollNo: parsedStudent.rollNo,
          }),
        });
        const joinJson = await joinRes.json();

        if (joinJson.attempt) {
          const att = joinJson.attempt;
          setAttemptId(att.id);
          setFullscreenStrikes(att.fullscreenViolationCount || 0);

          if (att.status === 'COMPLETED' || att.status === 'AUTO_SUBMITTED') {
            router.push(`/exam/${code}/result`);
            return;
          }

          if (att.answers) {
            const restored: Record<string, string> = {};
            Object.entries(att.answers).forEach(([qId, ans]: [string, any]) => {
              if (ans.selectedOptionId) {
                restored[qId] = ans.selectedOptionId;
              }
            });
            setSelectedAnswers(restored);
          }

          if (att.expiresAt) {
            setServerExpiresAt(att.expiresAt);
            const remaining = Math.max(
              0,
              Math.floor((new Date(att.expiresAt).getTime() - Date.now()) / 1000)
            );
            setTimeLeftSeconds(remaining);
          }
        }
      } catch (err) {
        console.error('Quiz init error:', err);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    }

    initExam();
  }, [code, router]);

  useEffect(() => {
    if (!serverExpiresAt || !isExamActive.current) return;

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(serverExpiresAt).getTime() - Date.now()) / 1000)
      );
      setTimeLeftSeconds(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleAutoSubmitOnExpiry();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [serverExpiresAt]);

  const handleSelectOption = async (questionId: string, optionId: string) => {
    if (!isExamActive.current) return;

    const updated = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(updated);

    if (attemptId) {
      try {
        await apiFetch(`/api/attempts/${attemptId}/answer`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId,
            selectedOptionId: optionId,
          }),
        });
        setIsConnected(true);
      } catch (err) {
        console.warn('Answer save retry queued:', err);
        setIsConnected(false);
      }
    }
  };

  const handleFinalSubmit = async () => {
    if (!attemptId || isSubmitting) return;
    setIsSubmitting(true);
    isExamActive.current = false;

    try {
      await apiFetch(`/api/attempts/${attemptId}/submit`, {
        method: 'POST',
      });
      router.push(`/exam/${code}/result`);
    } catch (err) {
      console.error('Submit error:', err);
      router.push(`/exam/${code}/result`);
    }
  };

  const handleAutoSubmitOnExpiry = useCallback(async () => {
    if (!attemptId || !isExamActive.current) return;
    isExamActive.current = false;
    try {
      await apiFetch(`/api/attempts/${attemptId}/submit`, { method: 'POST' });
    } finally {
      router.push(`/exam/${code}/result`);
    }
  }, [attemptId, code, router]);

  const logIntegrityEvent = useCallback(
    async (eventType: string, metadata?: Record<string, any>) => {
      if (!attemptId || !isExamActive.current) return;

      try {
        const res = await apiFetch(`/api/attempts/${attemptId}/integrity-event`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType,
            questionIndex: currentIndex + 1,
            timeRemainingSeconds: timeLeftSeconds,
            metadata,
          }),
        });

        const data = await res.json();

        if (data.shouldAutoSubmit) {
          isExamActive.current = false;
          setShowAutoSubmitModal(true);
          setShowWarningModal(false);
          setTimeout(() => {
            router.push(`/exam/${code}/result`);
          }, 3500);
        } else if (data.violationCount === 1) {
          setFullscreenStrikes(1);
          setShowWarningModal(true);
        }
      } catch (err) {
        console.error('Integrity log error:', err);
      }
    },
    [attemptId, currentIndex, timeLeftSeconds, code, router]
  );

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!isExamActive.current) return;
      const isFullscreen = Boolean(document.fullscreenElement);

      if (!isFullscreen && !showAutoSubmitModal) {
        logIntegrityEvent('FULLSCREEN_EXIT', { action: 'exited_fullscreen' });
      }
    };

    const handleVisibilityChange = () => {
      if (!isExamActive.current) return;
      if (document.hidden) {
        logIntegrityEvent('TAB_SWITCH', { action: 'document_hidden' });
        setTabWarningToast(true);
        setTimeout(() => setTabWarningToast(false), 4000);
      }
    };

    const handleWindowBlur = () => {
      if (!isExamActive.current) return;
      logIntegrityEvent('WINDOW_BLUR', { action: 'window_blur' });
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [logIntegrityEvent, showAutoSubmitModal]);

  const resumeFullscreen = async () => {
    setShowWarningModal(false);
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {}
  };

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-xs text-slate-500 gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
        <span>Initializing proctored exam console...</span>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  const mins = Math.floor(timeLeftSeconds / 60);
  const secs = timeLeftSeconds % 60;
  const formattedTimer = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isTimeCritical = timeLeftSeconds < 120;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between text-slate-900 select-none">
      {/* Top Proctored Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <Logo size="sm" showBadge={false} />

          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          <div>
            <div className="text-xs font-bold text-slate-900 truncate max-w-[180px] sm:max-w-md">
              {assessment?.title || 'Course Assessment'}
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Question {currentIndex + 1} of {questions.length} · Room: {code}
            </div>
          </div>
        </div>

        {/* Timer & Connection Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            {isConnected ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
            <span>{isConnected ? 'Sync Active' : 'Reconnecting...'}</span>
          </div>

          <div
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 font-mono font-bold text-sm shadow-xs ${
              isTimeCritical
                ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse ring-2 ring-rose-200'
                : 'bg-slate-900 text-white border-slate-900'
            }`}
          >
            <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-rose-600' : 'text-slate-300'}`} />
            <span>{formattedTimer}</span>
          </div>
        </div>
      </header>

      {/* Tab Switch Toast */}
      {tabWarningToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-modal flex items-center gap-2 border border-slate-700 animate-in fade-in">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Please remain on the assessment screen. All window blur events are logged.</span>
        </div>
      )}

      {/* Main Question Focus Body */}
      <main className="max-w-3xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-card space-y-6">
          {/* Question Eyebrow */}
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              QUESTION {currentIndex + 1} OF {questions.length}
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Topic: <strong className="text-slate-700">{currentQ?.topic}</strong>
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
            {currentQ?.questionText}
          </h2>

          {/* Vertically Stacked Options */}
          <div className="space-y-3 pt-2">
            {currentQ?.options?.map((opt: any, optIdx: number) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center border ${
                        isSelected
                          ? 'bg-slate-800 text-white border-slate-700'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-white bg-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Navigation & Question Palette */}
      <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Question Palette Grid */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(selectedAnswers[q.id]);
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                    isCurrent
                      ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-1'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-extrabold'
                      : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn-secondary py-2 px-4 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="btn-primary py-2 px-5 text-xs font-bold"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirmModal(true)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                Submit Assessment
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* STRIKE 1 FULLSCREEN EXIT WARNING MODAL */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-amber-200 shadow-modal max-w-md w-full p-6 sm:p-8 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto shadow-sm">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                Integrity Warning · Strike 1 of 2
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Full-screen mode exited.
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                This is your only warning. Exiting full-screen mode one more time will cause your assessment attempt to be automatically submitted by the server kernel.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={resumeFullscreen}
                className="w-full btn-primary py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <Maximize2 className="w-4 h-4" />
                Return to Full-Screen & Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STRIKE 2 HARD AUTO-SUBMIT MODAL */}
      {showAutoSubmitModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-rose-200 shadow-modal max-w-md w-full p-6 sm:p-8 text-center space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto shadow-sm">
              <Shield className="w-7 h-7" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold">
                Proctoring Rule Enforced
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Assessment Auto-Submitted.
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Full-screen mode was exited again, exceeding the proctoring violation threshold. Your attempt has been automatically locked and submitted.
              </p>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1.5 pt-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Generating score & grounded explanations...</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-modal max-w-md w-full p-6 sm:p-8 text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Submit internal assessment?
              </h2>
              <p className="text-xs text-slate-600 mt-1.5">
                You have answered <strong>{answeredCount} of {questions.length}</strong> questions.
                {unansweredCount > 0 && (
                  <span className="text-amber-700 block mt-1 font-bold">
                    {unansweredCount} question{unansweredCount > 1 ? 's remain' : ' remains'} unanswered.
                  </span>
                )}
              </p>
              <div className="text-[11px] text-slate-400 mt-2">
                Once submitted, responses cannot be modified.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirmModal(false)}
                className="btn-secondary py-2.5 text-xs font-semibold"
              >
                Review Answers
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="btn-primary py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? 'Evaluating...' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
