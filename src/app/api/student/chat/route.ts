import { NextRequest, NextResponse } from 'next/server';
import { requireFirebaseUser } from '@/lib/auth/server';
import { db } from '@/lib/db';

const words = (value: string) => new Set(value.toLowerCase().match(/[a-z][a-z-]{2,}/g) || []);
export async function POST(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req); const { question } = await req.json();
    if (!question || String(question).trim().length < 3) return NextResponse.json({ error: 'Ask a specific question (at least 3 characters).' }, { status: 400 });
    const attempts = db.getAttemptsByStudent(user.uid);
    const documentIds = new Set(attempts.flatMap(attempt => db.getAssessmentById(attempt.assessmentId)?.materialDocumentIds || []));
    const docs = [...documentIds].map(id => db.getDocumentById(id)).filter(Boolean) as any[];
    if (!docs.length) return NextResponse.json({ error: 'Join and complete an assessment before using its course-material chatbot.' }, { status: 403 });
    const queryWords = words(String(question));
    const matches = docs.flatMap(doc => doc.chunks.map((chunk: any) => ({ doc, chunk, score: [...queryWords].reduce((score, word) => score + (chunk.content.toLowerCase().includes(word) ? 1 : 0), 0) }))).filter(item => item.score > 0).sort((a,b) => b.score - a.score).slice(0, 3);
    if (!matches.length) return NextResponse.json({ answer: 'I cannot answer that from the notes available to you. Try asking about a concept that appears in the course PDFs or slides.', citations: [] });
    const citations = matches.map(({ doc, chunk }) => ({ documentId: doc.id, documentTitle: doc.title, pageNumber: chunk.pageNumber, sourceLabel: chunk.sourceLabel || `Page ${chunk.pageNumber}`, sectionTitle: chunk.sectionTitle, excerpt: chunk.content.slice(0, 420) }));
    const answer = `Based only on your assigned course material: ${matches.map(({ chunk }) => chunk.content.slice(0, 650)).join('\n\n')}`;
    return NextResponse.json({ answer, citations, guardrail: 'Grounded only in documents from rooms joined by this student.' });
  } catch (error: any) { return NextResponse.json({ error: error.message === 'AUTH_REQUIRED' ? 'Sign in required' : 'Could not retrieve grounded material' }, { status: error.message === 'AUTH_REQUIRED' ? 401 : 500 }); }
}
