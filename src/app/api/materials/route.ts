import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireFirebaseUser } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req);
    const documents = db.getDocuments().filter(document => document.ownerId === user.uid);

    return NextResponse.json({
      success: true,
      documents,
    });
  } catch (err: any) {
    if (err.message === 'AUTH_REQUIRED') return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    console.error('Materials list error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}
