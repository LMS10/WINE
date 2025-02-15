'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const fetchGoogleToken = async () => {
      try {
        const idToken = await exchangeCodeForIdToken(code);
        if (!idToken) throw new Error('Google ID 토큰 발급 실패');
        const googleLogin = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/GOOGLE`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: idToken,
            redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
          }),
        });

        const response = await googleLogin.json();
        if (response.accessToken && response.refreshToken) {
          login(response.accessToken, response.refreshToken);
          router.push('/wines');
        } else {
          console.error('🚨 구글 로그인 실패:', response);
          router.push('/signin');
        }
      } catch (error) {
        console.error('🚨 구글 로그인 실패:', error);
        router.push('/signin');
      }
    };

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

  return (
    <section className='flex h-screen items-center justify-center bg-gray-100'>
      <LoadingSpinner></LoadingSpinner>
    </section>
  );
}
