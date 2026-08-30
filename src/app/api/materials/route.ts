import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId') || undefined;
    const documents = db.getDocuments(courseId);

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (err: any) {
    console.error('Materials list error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}
