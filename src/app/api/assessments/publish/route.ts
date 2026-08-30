import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Assessment, Question } from '@/lib/db/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      courseId = 'course_dbms_301',
      teacherId = 'user_prof_arvind',
      title,
      moduleName,
      description,
      materialDocumentIds = [],
      questions = [],
      settings,
      customRoomCode,
    } = body;

    if (!title || questions.length === 0) {
      return NextResponse.json(
        { error: 'Title and at least one question are required' },
        { status: 400 }
      );
    }

    const assessmentId = `assess_${Date.now()}`;

    // Format & save questions
    const formattedQuestions: Question[] = questions.map((q: any, idx: number) => ({
      ...q,
      id: q.id || `q_${assessmentId}_${idx + 1}`,
      assessmentId,
      courseId,
    }));

    db.saveQuestionsBatch(formattedQuestions);

    const assessment: Assessment = {
      id: assessmentId,
      courseId,
      teacherId,
      title,
      moduleName: moduleName || 'Course Assessment',
      description: description || '',
      materialDocumentIds,
      questionIds: formattedQuestions.map((q) => q.id),
      settings: {
        durationMinutes: Number(settings?.durationMinutes || 15),
        totalQuestions: formattedQuestions.length,
        difficultyDistribution: settings?.difficultyDistribution || 'mixed',
        randomizeQuestions: settings?.randomizeQuestions !== false,
        randomizeOptions: settings?.randomizeOptions !== false,
        positiveMarks: Number(settings?.positiveMarks || 1.0),
        negativeMarks: Number(settings?.negativeMarks ?? 0.25),
        allowReviewAfterSubmit: settings?.allowReviewAfterSubmit !== false,
        showLeaderboard: settings?.showLeaderboard || 'PUBLIC',
        requireFullscreen: settings?.requireFullscreen !== false,
        maxFullscreenViolations: Number(settings?.maxFullscreenViolations || 2),
      },
      status: 'PUBLISHED',
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.saveAssessment(assessment);

    // Create live room
    const liveRoom = db.createRoomForAssessment(assessment.id, teacherId, customRoomCode);

    return NextResponse.json({
      success: true,
      assessment,
      room: liveRoom,
    });
  } catch (err: any) {
    console.error('Publish assessment error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to publish assessment' },
      { status: 500 }
    );
  }
}
