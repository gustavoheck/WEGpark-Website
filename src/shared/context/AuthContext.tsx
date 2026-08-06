"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { AUTH_UNAUTHORIZED_EVENT } from "@/shared/constants/authEvents";
import { isSystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";
import { JWTPayload } from "@/shared/types/JWTPayload";

interface AuthUser {
  uuid: string;
  email: string;
  roles: SystemRoleType[];
  name: string;
  currentRole: SystemRoleType;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (token: string, selectedRole: SystemRoleType) => void;
  logout: () => void;
}

interface AuthSession {
  token: string | null;
  user: AuthUser | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseToken(
  jwtToken: string,
  activeRole: SystemRoleType,
): AuthUser | null {
  try {
    const decoded = jwtDecode<JWTPayload>(jwtToken);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    const roles = (decoded.roles ?? []).filter(isSystemRole);

    if (!roles.includes(activeRole)) {
      return null;
    }

    return {
      uuid: decoded.uuid ?? "",
      email: decoded.sub ?? "",
      name: decoded.name ?? "",
      roles,
      currentRole: activeRole,
    };
  } catch {
    return null;
  }
}

export function clearAuthCookies() {
  Cookies.remove("auth_token");
  Cookies.remove("auth_role");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession>({
    token: null,
    user: null,
    isReady: false,
  });

  const logout = useCallback(() => {
    clearAuthCookies();
    setSession({ token: null, user: null, isReady: true });
  }, []);

  useEffect(() => {
    const savedToken = Cookies.get("auth_token");
    const savedRole = Cookies.get("auth_role");
    const parsedUser =
      savedToken && isSystemRole(savedRole)
        ? parseToken(savedToken, savedRole)
        : null;

    if (!parsedUser) {
      clearAuthCookies();
    }

    // Browser-only cookie hydration intentionally happens after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession({
      token: parsedUser ? (savedToken ?? null) : null,
      user: parsedUser,
      isReady: true,
    });
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      logout();
      router.replace("/login");
    }

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);

    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [logout, router]);

  function login(newToken: string, selectedRole: SystemRoleType) {
    const parsedUser = parseToken(newToken, selectedRole);

    if (!parsedUser) {
      return;
    }

    const cookieOptions = {
      expires: 7,
      sameSite: "strict" as const,
      secure: process.env.NODE_ENV === "production",
    };

    Cookies.set("auth_token", newToken, cookieOptions);
    Cookies.set("auth_role", selectedRole, cookieOptions);
    setSession({ token: newToken, user: parsedUser, isReady: true });
  }

  return (
    <AuthContext.Provider
      value={{
        token: session.token,
        user: session.user,
        isAuthenticated: Boolean(session.token),
        isReady: session.isReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
