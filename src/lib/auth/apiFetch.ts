'use client';
import { firebaseAuth } from '@/lib/firebase/client';
export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) { const token = await firebaseAuth.currentUser?.getIdToken(); return fetch(input, { ...init, headers: { ...init.headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } }); }
