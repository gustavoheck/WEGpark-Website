// src/shared/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserRoleType } from '@/shared/enum/UserRole';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JWTPayload } from '../types/JWTPayload';

interface AuthUser {
  uuid: string;
  email: string;
  roles: string[];
  currentRole: UserRoleType;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, selectedRole: UserRoleType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)

  const processToken = (jwtToken: string, activeRole: UserRoleType): AuthUser | null => {
    try {
      const decoded = jwtDecode<JWTPayload>(jwtToken);

      if (decoded.exp * 1000 < Date.now()) {
        return null;
      }

      return {
        uuid: decoded.uuid,
        email: decoded.sub,
        roles: decoded.roles,
        currentRole: activeRole,
      };
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const savedToken = Cookies.get('auth_token');
    const savedRole = Cookies.get('auth_role') as UserRoleType;

    if (savedToken && savedRole) {
      const parsedUser = processToken(savedToken, savedRole);
      if (parsedUser) {
        setToken(savedToken);
        setUser(parsedUser);
      } else {
        logout();
      }
    }
  }, []);

  const login = (newToken: string, selectedRole: UserRoleType) => {
    const parsedUser = processToken(newToken, selectedRole);

    if (parsedUser) {
      setToken(newToken);
      setUser(parsedUser);

      Cookies.set('auth_token', newToken, { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set('auth_role', selectedRole, { expires: 7, secure: true, sameSite: 'strict' });
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('auth_token');
    Cookies.remove('auth_role');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
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