'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAccessToken, saveTokens, removeTokens, fetchWithAuth } from '@/lib/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  profileImage: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const checkLoginStatus = useCallback(async () => {
    const token = getAccessToken();
    if (!token) return;

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);
    if (!response || response.status !== 200) {
      logout();
      return;
    }

    const data = await response.json();
    setIsLoggedIn(true);
    setProfileImage(data.image);
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const login = useCallback(
    (accessToken: string, refreshToken: string) => {
      saveTokens(accessToken, refreshToken);
      setIsLoggedIn(true);
      checkLoginStatus();
    },
    [checkLoginStatus],
  );

  const logout = () => {
    removeTokens();
    setIsLoggedIn(false);
    setProfileImage(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, profileImage, setProfileImage, login, logout }}>{children}</AuthContext.Provider>;
}
