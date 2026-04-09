import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "counselor" | "admissions";

interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
}

const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "student@demo.com": {
    password: "demo123",
    user: { id: "d1a1f1a1-1111-4111-a111-111111111111", email: "student@demo.com", fullName: "Alex Chen", role: "student" },
  },
  "counselor@demo.com": {
    password: "demo123",
    user: { id: "d2b2f2b2-2222-4222-b222-222222222222", email: "counselor@demo.com", fullName: "Dr. Sarah Miller", role: "counselor" },
  },
  "admin@demo.com": {
    password: "demo123",
    user: { id: "d3c3f3c3-3333-4333-c333-333333333333", email: "admin@demo.com", fullName: "James Wilson", role: "admissions" },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("uniapply_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    const demo = DEMO_ACCOUNTS[email.toLowerCase()];
    if (demo) {
      if (demo.password !== password) {
        throw new Error("Invalid password");
      }
      setUser(demo.user);
      localStorage.setItem("uniapply_user", JSON.stringify(demo.user));
      return;
    }
    // Fallback mock login for any credentials
    const mockUser: User = { id: crypto.randomUUID(), email, fullName: email.split("@")[0], role };
    setUser(mockUser);
    localStorage.setItem("uniapply_user", JSON.stringify(mockUser));
  };

  const register = async (email: string, _password: string, fullName: string, role: UserRole) => {
    const mockUser: User = { id: crypto.randomUUID(), email, fullName, role };
    setUser(mockUser);
    localStorage.setItem("uniapply_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uniapply_user");
  };

  const forgotPassword = async (_email: string) => {};
  const resetPassword = async (_newPassword: string) => {};

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
