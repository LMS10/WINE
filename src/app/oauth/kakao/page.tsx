'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

function KakaoAuthHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const code = useMemo(() => searchParams.get('code'), [searchParams]);

  useEffect(() => {
    if (!code) return;

    const fetchKakaoToken = async () => {
      try {
        const kakaoLogin = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signIn/KAKAO`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: code, redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI }),
        });

        const response = await kakaoLogin.json();
        login(response.accessToken, response.refreshToken);

        router.push('/');
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
        router.push('/signin');
      }
    };

    fetchKakaoToken();
  }, [code, router, login]);

  return <p>카카오 로그인 처리 중...</p>;
}

export default function KakaoCallback() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <KakaoAuthHandler />
    </Suspense>
  );
}
