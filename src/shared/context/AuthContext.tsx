"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../types/JWTPayload";

interface AuthUser {
  uuid: string;
  email: string;
  roles: string[];
  currentRole: SystemRoleType;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (token: string, selectedRole: SystemRoleType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    Cookies.remove("auth_token");
    Cookies.remove("auth_role");
  }, []);

  const processToken = (jwtToken: string, activeRole: SystemRoleType): AuthUser | null => {
    try {
      const decoded = jwtDecode<JWTPayload>(jwtToken);

      console.log("Token decodificado:", decoded);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.warn("Token JWT expirado");
        return null;
      }

      if (!decoded.roles?.includes(activeRole)) {
        console.warn("A role selecionada não pertence ao token JWT");
        return null;
      }

      return {
        uuid: decoded.uuid || "",
        email: decoded.sub || "",
        roles: decoded.roles || [],
        currentRole: activeRole,
      };
    } catch (error) {
      console.error("Erro ao decodificar o token JWT:", error);
      return null;
    }
  };

  useEffect(() => {
    const savedToken = Cookies.get("auth_token");
    const savedRole = Cookies.get("auth_role") as SystemRoleType;

    if (savedToken && savedRole) {
      const parsedUser = processToken(savedToken, savedRole);
      if (parsedUser) {
        setToken(savedToken);
        setUser(parsedUser);
      } else {
        logout();
      }
    }
  }, [logout]);

  const login = (newToken: string, selectedRole: SystemRoleType) => {
    if (!newToken) {
      console.error("Tentativa de login sem token válido.");
      return;
    }

    const parsedUser = processToken(newToken, selectedRole);

    if (parsedUser) {
      setToken(newToken);
      setUser(parsedUser);

      const cookieOptions = {
        expires: 7,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
      };

      Cookies.set("auth_token", newToken, cookieOptions);
      Cookies.set("auth_role", selectedRole, cookieOptions);

      console.log("Cookies salvos com sucesso!");
    } else {
      console.error("Falha ao processar o usuário do token. Os cookies não foram gravados.");
    }
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
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
