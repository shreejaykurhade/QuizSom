import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireFirebaseUser } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req);
    await db.ready();

    const allDocuments = db.getDocuments();
    const attempts = db.getAttemptsByStudent(user.uid);
    const assignedDocIds = new Set(
      attempts.flatMap((att) => {
        const asmt = db.getAssessmentById(att.assessmentId);
        return asmt?.materialDocumentIds || [];
      })
    );

    const materials = allDocuments.map((doc) => {
      const course = doc.courseId ? db.getCourseById(doc.courseId) : undefined;
      return {
        id: doc.id,
        title: doc.title,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        mimeType: doc.mimeType,
        pageCount: doc.pageCount,
        chunkCount: doc.chunks?.length || 0,
        uploadedAt: doc.uploadedAt,
        courseId: doc.courseId,
        courseName: course?.name || 'Assigned Course Notes',
        isAssigned: assignedDocIds.has(doc.id),
      };
    });

    return NextResponse.json({
      success: true,
      materials,
      totalCount: materials.length,
    });
  } catch (err: any) {
    if (err.message === 'AUTH_REQUIRED') {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }
    console.error('Student materials list error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch study materials' },
      { status: 500 }
    );
  }
}
