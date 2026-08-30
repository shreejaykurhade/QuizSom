import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { questionId, selectedOptionId } = body;

    if (!questionId) {
      return NextResponse.json({ error: 'questionId is required' }, { status: 400 });
    }

    const attempt = db.getAttemptById(id);
    if (!attempt) {
      return NextResponse.json({ error: 'Attempt not found' }, { status: 404 });
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: 'Cannot modify answers for a submitted or expired attempt' },
        { status: 400 }
      );
    }

    attempt.answers = attempt.answers || {};
    attempt.answers[questionId] = {
      questionId,
      selectedOptionId: selectedOptionId || undefined,
      isAnswered: Boolean(selectedOptionId),
      answeredAt: new Date().toISOString(),
    };

    // Update answered count
    const answeredCount = Object.values(attempt.answers).filter(
      (a) => a.isAnswered && a.selectedOptionId
    ).length;
    attempt.answeredCount = answeredCount;
    attempt.unansweredCount = attempt.totalQuestions - answeredCount;

    db.saveAttempt(attempt);

    return NextResponse.json({
      success: true,
      answeredCount: attempt.answeredCount,
      unansweredCount: attempt.unansweredCount,
    });
  } catch (err: any) {
    console.error('Save answer error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to save answer' },
      { status: 500 }
    );
  }
}
