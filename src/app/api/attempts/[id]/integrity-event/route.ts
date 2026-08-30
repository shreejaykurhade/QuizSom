import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { IntegrityEventType } from '@/lib/db/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { eventType, questionIndex, timeRemainingSeconds, metadata } = body;

    if (!eventType) {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    const { attempt, shouldAutoSubmit, violationCount } = db.recordIntegrityEvent(
      id,
      eventType as IntegrityEventType,
      {
        questionIndex,
        timeRemainingSeconds,
        ...metadata,
      }
    );

    // If second fullscreen exit triggered auto-submit, calculate score immediately
    if (shouldAutoSubmit) {
      db.scoreAttempt(id);
    }

    return NextResponse.json({
      success: true,
      attempt,
      shouldAutoSubmit,
      violationCount,
      tabSwitchCount: attempt.tabSwitchCount,
      status: attempt.status,
      autoSubmitReason: attempt.autoSubmitReason,
    });
  } catch (err: any) {
    console.error('Record integrity event error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to record integrity event' },
      { status: 500 }
    );
  }
}
