'use client';

import { authClient } from '@/lib/auth-client';
import { createContext, ReactNode, useContext } from 'react';

const AuthContext = createContext(authClient);

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={authClient}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 