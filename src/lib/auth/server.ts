import { NextRequest } from 'next/server';

export type FirebaseIdentity = { uid: string; email: string; name: string };
export async function requireFirebaseUser(req: NextRequest): Promise<FirebaseIdentity> {
  const idToken = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!idToken) throw new Error('AUTH_REQUIRED');
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken }), cache: 'no-store' });
  if (!response.ok) throw new Error('AUTH_REQUIRED');
  const account = (await response.json()).users?.[0];
  if (!account?.localId) throw new Error('AUTH_REQUIRED');
  return { uid: account.localId, email: account.email || '', name: account.displayName || account.email?.split('@')[0] || 'QuizSom user' };
}
