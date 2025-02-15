'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const fetchGoogleToken = async () => {
      try {
        // 1️⃣ code → ID 토큰 교환
        const idToken = await exchangeCodeForIdToken(code);
        if (!idToken) throw new Error('Google ID 토큰 발급 실패');

        // 2️⃣ 서버로 ID 토큰 전송
        const googleLogin = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: idToken, // 🔑 Google은 ID 토큰을 전달해야 함
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          }),
        });

        const response = await googleLogin.json();
        if (response.accessToken && response.refreshToken) {
          login(response.accessToken, response.refreshToken);
          router.push('/');
        } else {
          console.error('🚨 구글 로그인 실패:', response);
          router.push('/signin');
        }
      } catch (error) {
        console.error('🚨 구글 로그인 실패:', error);
        router.push('/signin');
      }
    };

    // ID 토큰 발급 함수
    const exchangeCodeForIdToken = async (code: string) => {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code,
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
          client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
          redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ?? '',
          grant_type: 'authorization_code',
        }),
      });
      const data = await tokenResponse.json();
      return data.id_token;
    };

    fetchGoogleToken();
  }, [searchParams, router, login]);

  return <p>🔄 구글 로그인 처리 중...</p>;
}
