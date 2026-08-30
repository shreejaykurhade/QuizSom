import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processDocumentBuffer } from '@/lib/rag/documentProcessor';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const courseId = (formData.get('courseId') as string) || 'course_dbms_301';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const docMaterial = await processDocumentBuffer(
      buffer,
      file.name,
      file.type || 'application/pdf',
      courseId
    );

    db.saveDocument(docMaterial);

    return NextResponse.json({
      success: true,
      document: docMaterial,
    });
  } catch (err: any) {
    console.error('Document upload error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process document' },
      { status: 500 }
    );
  }
}
