import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { geminiEngine } from '@/lib/gemini/client';
import { DocumentMaterial } from '@/lib/db/types';
import { cleanPdfText } from '@/lib/rag/documentProcessor';
import { requireFirebaseUser } from '@/lib/auth/server';

export async function POST(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req);
    const body = await req.json();
    const {
      documentId,
      documentIds,
      courseId = `course_${user.uid}`,
      assessmentTitle = 'Module Internal Assessment',
      totalQuestions = 15,
      difficulty = 'mixed',
      topicFocus,
      moduleName,
    } = body;

    // Collect all requested document IDs
    const ids: string[] = [];
    if (Array.isArray(documentIds) && documentIds.length > 0) {
      ids.push(...documentIds);
    } else if (documentId) {
      ids.push(documentId);
    }

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No documents specified for generation' }, { status: 400 });
    }

    const documents: DocumentMaterial[] = [];
    for (const id of ids) {
      const doc = db.getDocumentById(id);
      if (doc && doc.ownerId === user.uid) {
        // Re-clean the stored rawText and chunks before sending to Gemini
        const cleanedDoc: DocumentMaterial = {
          ...doc,
          rawText: cleanPdfText(doc.rawText),
          chunks: doc.chunks?.map((c) => ({
            ...c,
            content: cleanPdfText(c.content),
            sectionTitle: c.sectionTitle ? cleanPdfText(c.sectionTitle) : undefined,
          })),
        };
        documents.push(cleanedDoc);
      }
    }

    if (documents.length === 0) {
      return NextResponse.json({ error: 'Selected document(s) not found in materials index' }, { status: 404 });
    }

    const questions = await geminiEngine.generateQuestions({
      documents,
      document: documents[0],
      courseId,
      assessmentTitle,
      totalQuestions: Number(totalQuestions),
      difficulty,
      topicFocus,
      moduleName,
    });
    questions.forEach(question => {
      const source = documents.find(document => document.title === question.sourceCitation.documentTitle) || documents[0];
      question.sourceCitation.documentId = source.id;
    });

    return NextResponse.json({
      success: true,
      questions,
      totalGenerated: questions.length,
      documentsCount: documents.length,
      isLiveGemini: geminiEngine.isLiveGeminiEnabled(),
      generationMode: geminiEngine.isLiveGeminiEnabled() ? 'GEMINI_API' : 'LOCAL_RAG',
    });
  } catch (err: any) {
    console.error('Quiz generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate assessment questions' },
      { status: 500 }
    );
  }
}
