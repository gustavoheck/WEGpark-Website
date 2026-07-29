 // src/shared/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import User from '@/shared/types/User';
import { UserRole } from '@/shared/enum/UserRole';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Exemplo de usuário mockado inicial
  const [user, setUser] = useState<User | null>({
    uuid: "1",
    name: 'João Silva',
    role: UserRole.HR,
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};