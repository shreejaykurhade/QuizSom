import { NextRequest, NextResponse } from 'next/server';
import { requireFirebaseUser } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { processDocumentBuffer } from '@/lib/rag/documentProcessor';
import fs from 'fs';

const ignoredWords = new Set(['about', 'after', 'again', 'also', 'and', 'are', 'can', 'does', 'explain', 'for', 'from', 'give', 'have', 'how', 'into', 'is', 'its', 'of', 'on', 'please', 'tell', 'that', 'the', 'their', 'there', 'these', 'this', 'to', 'use', 'was', 'what', 'when', 'where', 'which', 'with', 'would', 'you', 'your']);
const words = (value: string) => new Set((value.toLowerCase().match(/[a-z][a-z-]{2,}/g) || []).filter(word => !ignoredWords.has(word)));

function relevantSentences(content: string, queryWords: Set<string>) {
  return content
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+|\n+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length >= 25)
    .map(sentence => ({
      sentence,
      score: [...queryWords].reduce((score, word) => score + (sentence.toLowerCase().includes(word) ? 1 : 0), 0),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.sentence.length - b.sentence.length)
    .slice(0, 3)
    .map(item => item.sentence);
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireFirebaseUser(req); const { question } = await req.json();
    if (!question || String(question).trim().length < 3) return NextResponse.json({ error: 'Ask a specific question (at least 3 characters).' }, { status: 400 });
    const attempts = db.getAttemptsByStudent(user.uid);
    const documentIds = new Set(attempts.flatMap(attempt => db.getAssessmentById(attempt.assessmentId)?.materialDocumentIds || []));
    const savedDocs = [...documentIds].map(id => db.getDocumentById(id)).filter(Boolean) as any[];
    const docs = await Promise.all(savedDocs.map(async (doc) => {
      // Update legacy uploads that used one giant, guessed page chunk. The
      // original private file is re-read so chat can cite a real PDF page.
      if (doc.pageCount > 1 && doc.chunks.length <= 1 && doc.storagePath && fs.existsSync(doc.storagePath)) {
        const refreshed = await processDocumentBuffer(fs.readFileSync(doc.storagePath), doc.fileName, doc.mimeType, doc.courseId);
        const indexed = { ...refreshed, id: doc.id, ownerId: doc.ownerId, storagePath: doc.storagePath, uploadedAt: doc.uploadedAt };
        db.saveDocument(indexed);
        return indexed;
      }
      return doc;
    }));
    if (!docs.length) return NextResponse.json({ error: 'Join and complete an assessment before using its course-material chatbot.' }, { status: 403 });
    const queryWords = words(String(question));
    if (!queryWords.size) return NextResponse.json({ answer: 'Please include the specific topic or term from your notes, such as “RIP periodic timer” or “hill climbing local maximum”.', citations: [] });
    const matches = docs.flatMap(doc => doc.chunks.map((chunk: any) => ({ doc, chunk, score: [...queryWords].reduce((score, word) => score + (chunk.content.toLowerCase().includes(word) ? 1 : 0), 0) }))).filter(item => item.score > 0).sort((a,b) => b.score - a.score).slice(0, 3);
    if (!matches.length) return NextResponse.json({ answer: 'I cannot answer that from the notes available to you. Try asking about a concept that appears in the course PDFs or slides.', citations: [] });
    const evidence = matches.map(({ doc, chunk }) => {
      const sentences = relevantSentences(chunk.content, queryWords);
      return {
        doc,
        chunk,
        sentences: sentences.length ? sentences : [chunk.content.replace(/\s+/g, ' ').slice(0, 420)],
      };
    });
    const citations = evidence.map(({ doc, chunk, sentences }) => ({
      documentId: doc.id,
      documentTitle: doc.title,
      pageNumber: chunk.pageNumber,
      sourceLabel: chunk.sourceLabel || `Page ${chunk.pageNumber}`,
      sectionTitle: chunk.sectionTitle,
      excerpt: sentences.join(' '),
    }));
    const answer = evidence.flatMap(({ sentences }) => sentences).slice(0, 5);
    return NextResponse.json({ answer, citations, guardrail: 'Grounded only in documents from rooms joined by this student.' });
  } catch (error: any) { return NextResponse.json({ error: error.message === 'AUTH_REQUIRED' ? 'Sign in required' : 'Could not retrieve grounded material' }, { status: error.message === 'AUTH_REQUIRED' ? 401 : 500 }); }
}
