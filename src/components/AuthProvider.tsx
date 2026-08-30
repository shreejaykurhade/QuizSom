'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase/client';

type AuthState = { user: User | null; loading: boolean; logout: () => Promise<void> };
const AuthContext = createContext<AuthState>({ user: null, loading: true, logout: async () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(firebaseAuth, currentUser => { setUser(currentUser); setLoading(false); }), []);
  return <AuthContext.Provider value={{ user, loading, logout: () => signOut(firebaseAuth) }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
