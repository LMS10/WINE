import { Suspense } from 'react';
import KakaoCallback from '@/app/oauth/kakao/_components/KakaoCallback';

export default function KakaoPage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <KakaoCallback />
    </Suspense>
  );
}
