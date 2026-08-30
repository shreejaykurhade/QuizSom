'use client';

import { firebaseAuth } from '@/lib/firebase/client';

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  let token: string | undefined;
  try {
    if (firebaseAuth && firebaseAuth.currentUser) {
      token = await firebaseAuth.currentUser.getIdToken();
    }
  } catch (err) {
    // Token extraction silent fallback
  }

  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
