import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processDocumentBuffer } from '@/lib/rag/documentProcessor';
import { requireFirebaseUser } from '@/lib/auth/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req);
    const formData = await req.formData();
    const courseId = (formData.get('courseId') as string) || `course_${user.uid}`;

    // Retrieve all files from multi-file or folder uploads
    const files = (formData.getAll('files') as File[]).concat(
      formData.getAll('file') as File[]
    ).filter(Boolean);

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const processedDocs = [];

    for (const file of files) {
      if (file && typeof file.arrayBuffer === 'function') {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const docMaterial = await processDocumentBuffer(
          buffer,
          file.name,
          file.type || 'application/pdf',
          courseId
        );
        docMaterial.ownerId = user.uid;
        const uploadDirectory = path.join(process.cwd(), '.data', 'uploads');
        fs.mkdirSync(uploadDirectory, { recursive: true });
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        docMaterial.storagePath = path.join(uploadDirectory, `${docMaterial.id}-${safeName}`);
        fs.writeFileSync(docMaterial.storagePath, buffer);

        db.saveDocument(docMaterial);
        processedDocs.push(docMaterial);
      }
    }

    return NextResponse.json({
      success: true,
      documents: processedDocs,
      document: processedDocs[0] || null,
      totalUploaded: processedDocs.length,
    });
  } catch (err: any) {
    if (err.message === 'AUTH_REQUIRED') return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    console.error('Document upload error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process document(s)' },
      { status: 500 }
    );
  }
}
