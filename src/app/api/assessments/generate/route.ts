import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { geminiEngine } from '@/lib/gemini/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      documentId,
      courseId = 'course_dbms_301',
      assessmentTitle = 'Module Internal Assessment',
      totalQuestions = 15,
      difficulty = 'mixed',
      topicFocus,
      moduleName,
    } = body;

    const document = db.getDocumentById(documentId);
    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const questions = await geminiEngine.generateQuestions({
      document,
      courseId,
      assessmentTitle,
      totalQuestions: Number(totalQuestions),
      difficulty,
      topicFocus,
      moduleName,
    });

    return NextResponse.json({
      success: true,
      questions,
      totalGenerated: questions.length,
      isLiveGemini: geminiEngine.isLiveGeminiEnabled(),
    });
  } catch (err: any) {
    console.error('Quiz generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate assessment questions' },
      { status: 500 }
    );
  }
}
