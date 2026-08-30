import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    const room = db.getRoomByCode(code);

    if (!room) {
      return NextResponse.json({ error: 'Invalid room code' }, { status: 404 });
    }

    const assessment = db.getAssessmentById(room.assessmentId);
    if (!assessment) {
      return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
    }

    const course = db.getCourseById(assessment.courseId);

    // Sanitize question list — STRICTLY STRIP OUT correctOptionId and explanation!
    const questions = db.getQuestions({ assessmentId: assessment.id });
    const sanitizedQuestions = questions.map((q) => ({
      id: q.id,
      topic: q.topic,
      difficulty: q.difficulty,
      questionText: q.questionText,
      options: q.options, // Contains id and text only
    }));

    return NextResponse.json({
      success: true,
      room: {
        id: room.id,
        code: room.code,
        status: room.status,
        startedAt: room.startedAt,
        participantCount: room.participantCount,
      },
      assessment: {
        id: assessment.id,
        title: assessment.title,
        moduleName: assessment.moduleName,
        description: assessment.description,
        settings: assessment.settings,
        totalQuestions: sanitizedQuestions.length,
      },
      course: course ? {
        id: course.id,
        code: course.code,
        name: course.name,
        department: course.department,
      } : null,
      questions: sanitizedQuestions,
    });
  } catch (err: any) {
    console.error('Room lookup error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch room' },
      { status: 500 }
    );
  }
}
