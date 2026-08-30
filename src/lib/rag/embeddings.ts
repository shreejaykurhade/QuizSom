import { DocumentChunk, DocumentMaterial } from '@/lib/db/types';

const EMBEDDING_MODEL = 'gemini-embedding-2';

function documentInput(document: DocumentMaterial, chunk: DocumentChunk) {
  return `title: ${document.title} | page: ${chunk.pageNumber} | section: ${chunk.sectionTitle || 'Course material'} | text: ${chunk.content}`;
}

function queryInput(query: string) {
  return `task: question answering | query: ${query}`;
}

async function embed(text: string): Promise<number[] | null> {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${key}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: `models/${EMBEDDING_MODEL}`, content: { parts: [{ text }] } }), cache: 'no-store',
  });
  if (!response.ok) return null;
  const data = await response.json();
  const values = data.embedding?.values || data.embeddings?.[0]?.values;
  return Array.isArray(values) && values.length ? values : null;
}

export async function embedQuestion(query: string) { return embed(queryInput(query)); }

export async function indexDocumentChunks(document: DocumentMaterial): Promise<DocumentMaterial> {
  const chunks = await Promise.all(document.chunks.map(async (chunk) => {
    if (chunk.embedding?.length) return chunk;
    const embedding = await embed(documentInput(document, chunk));
    return embedding ? { ...chunk, embedding, embeddingModel: EMBEDDING_MODEL, indexedAt: new Date().toISOString() } : chunk;
  }));
  return { ...document, chunks };
}

export function cosineSimilarity(a?: number[], b?: number[]) {
  if (!a?.length || !b?.length || a.length !== b.length) return 0;
  let dot = 0; let aNorm = 0; let bNorm = 0;
  for (let index = 0; index < a.length; index += 1) { dot += a[index] * b[index]; aNorm += a[index] * a[index]; bNorm += b[index] * b[index]; }
  return aNorm && bNorm ? dot / (Math.sqrt(aNorm) * Math.sqrt(bNorm)) : 0;
}
