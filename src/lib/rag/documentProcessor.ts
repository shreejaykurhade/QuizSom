import { DocumentChunk, DocumentMaterial } from '../db/types';

export interface ProcessedDocumentResult {
  title: string;
  rawText: string;
  pageCount: number;
  chunks: DocumentChunk[];
  topics: string[];
}

export async function processDocumentBuffer(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
  courseId: string
): Promise<DocumentMaterial> {
  let rawText = '';
  let pageCount = 1;

  if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
    try {
      // Dynamic import of pdf-parse
      const pdfParse = require('pdf-parse');
      const pdfData = await pdfParse(buffer);
      rawText = pdfData.text || '';
      pageCount = pdfData.numpages || 1;
    } catch (err) {
      console.warn('PDF parse fallback to text decoding:', err);
      rawText = buffer.toString('utf-8');
    }
  } else {
    rawText = buffer.toString('utf-8');
    // Estimate pages based on word count (~400 words per page)
    const words = rawText.split(/\s+/).length;
    pageCount = Math.max(1, Math.ceil(words / 400));
  }

  // Clean raw text
  rawText = rawText.replace(/\r\n/g, '\n').trim();

  // Create clean chunks
  const chunks = chunkDocumentText(rawText, pageCount);
  const topics = extractKeyTopics(rawText);

  const cleanTitle = fileName
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]/g, ' ')
    .trim();

  const docMaterial: DocumentMaterial = {
    id: `doc_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    courseId,
    title: cleanTitle.length > 3 ? cleanTitle : 'Course Syllabus Material',
    fileName,
    fileSize: buffer.length,
    mimeType,
    pageCount,
    rawText,
    chunks,
    topics,
    status: 'INDEXED',
    uploadedAt: new Date().toISOString(),
  };

  return docMaterial;
}

export function chunkDocumentText(text: string, totalPages: number): DocumentChunk[] {
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 20);
  const chunks: DocumentChunk[] = [];
  const chunkSize = 400; // ~400 words per chunk

  let currentChunkText = '';
  let chunkIndex = 0;
  const paragraphsPerPage = Math.max(1, Math.ceil(paragraphs.length / totalPages));

  paragraphs.forEach((para, pIdx) => {
    currentChunkText += para.trim() + '\n\n';
    const wordCount = currentChunkText.split(/\s+/).length;

    if (wordCount >= chunkSize || pIdx === paragraphs.length - 1) {
      const pageNumber = Math.min(totalPages, Math.max(1, Math.floor(pIdx / paragraphsPerPage) + 1));
      
      // Attempt section detection
      const firstLine = para.trim().split('\n')[0].replace(/[#*_-]/g, '').trim();
      const sectionTitle = firstLine.length > 5 && firstLine.length < 60 ? firstLine : undefined;

      chunks.push({
        id: `chunk_${Date.now()}_${chunkIndex}`,
        documentId: '',
        chunkIndex,
        pageNumber,
        sectionTitle,
        content: currentChunkText.trim(),
        tokenEstimate: Math.round(wordCount * 1.3),
      });

      chunkIndex += 1;
      currentChunkText = '';
    }
  });

  if (chunks.length === 0 && text.trim().length > 0) {
    chunks.push({
      id: `chunk_${Date.now()}_0`,
      documentId: '',
      chunkIndex: 0,
      pageNumber: 1,
      content: text.slice(0, 2000),
      tokenEstimate: Math.round(text.slice(0, 2000).split(/\s+/).length * 1.3),
    });
  }

  return chunks;
}

export function extractKeyTopics(text: string): string[] {
  const commonKeywords = [
    'Relational Model',
    'Functional Dependencies',
    'Normalization',
    '1NF & 2NF',
    '3NF & BCNF',
    'Lossless Decomposition',
    'Entity Integrity',
    'Referential Integrity',
    'Transaction Management',
    'ACID Properties',
    'Concurrency Control',
    'Indexing & B-Trees',
    'SQL Query Optimization',
    'Database Security',
  ];

  const foundTopics: string[] = [];
  commonKeywords.forEach((kw) => {
    if (new RegExp(`\\b${kw}\\b`, 'i').test(text)) {
      foundTopics.push(kw);
    }
  });

  if (foundTopics.length === 0) {
    return ['Foundational Concepts', 'Core Principles', 'Applied Theory'];
  }

  return foundTopics.slice(0, 6);
}
