"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isSignedIn: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (userData: User, token?: string) => void;
  logout: () => void;
}

/**
 * Global authentication store for custom Laravel authentication.
 * Stores user info and JWT/Sanctum bearer token in localStorage.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isSignedIn: false,
      isLoading: false,
      setUser: (user) => set({ user, isSignedIn: !!user }),
      setToken: (token) => set({ token }),
      login: (userData, token) =>
        set({
          user: userData,
          token: token ?? null,
          isSignedIn: true,
        }),
      logout: () => {
        // Clear stored token and user state
        set({
          user: null,
          token: null,
          isSignedIn: false,
        });
      },
    }),
    {
      name: "shop-auth-storage",
    }
  )
);

export default useAuth;
