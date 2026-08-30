import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const scoredAttempt = db.scoreAttempt(id);

    return NextResponse.json({
      success: true,
      attempt: scoredAttempt,
    });
  } catch (err: any) {
    console.error('Submit attempt error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit assessment attempt' },
      { status: 500 }
    );
  }
}
