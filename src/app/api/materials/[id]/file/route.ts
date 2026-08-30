import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { db } from '@/lib/db';
import { requireFirebaseUser } from '@/lib/auth/server';
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try { const user = await requireFirebaseUser(req); const document = db.getDocumentById(params.id); if (!document?.storagePath || !fs.existsSync(document.storagePath)) return NextResponse.json({ error: 'Original file unavailable. Re-upload this material to show the page preview.' }, { status: 404 }); const isOwner = document.ownerId === user.uid; const joined = db.getAttemptsByStudent(user.uid).some(attempt => db.getAssessmentById(attempt.assessmentId)?.materialDocumentIds.includes(document.id)); if (!isOwner && !joined) return NextResponse.json({ error: 'This source is not assigned to your account' }, { status: 403 }); return new NextResponse(fs.readFileSync(document.storagePath), { headers: { 'Content-Type': document.mimeType || 'application/pdf', 'Content-Disposition': `inline; filename="${document.fileName}"`, 'Cache-Control': 'private, no-store' } }); } catch (error: any) { return NextResponse.json({ error: error.message === 'AUTH_REQUIRED' ? 'Sign in required' : 'Could not open source' }, { status: error.message === 'AUTH_REQUIRED' ? 401 : 500 }); }
}
