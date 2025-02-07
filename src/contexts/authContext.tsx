'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, saveTokens, removeTokens, fetchWithAuth } from '@/lib/auth';

interface AuthContextType {
  isLoggedIn: boolean;
  profileImage: string | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
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

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = getAccessToken();
    if (!token) return;

    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);
    if (!response || response.status !== 200) {
      logout(); // 토큰 만료 시 로그아웃 처리
      return;
    }

    const data = await response.json();
    setIsLoggedIn(true);
    setProfileImage(data.image);
  };

  const login = (accessToken: string, refreshToken: string) => {
    saveTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
    checkLoginStatus(); // 로그인 후 유저 정보 가져오기
  };

  const logout = () => {
    removeTokens();
    setIsLoggedIn(false);
    setProfileImage(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, profileImage, login, logout }}>{children}</AuthContext.Provider>;
}
