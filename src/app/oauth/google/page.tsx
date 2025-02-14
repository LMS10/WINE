import { Suspense } from 'react';
import GoogleCallback from '@/app/oauth/google/_components/GoogleCallback';

export default function GooglePage() {
  return (
    <Suspense fallback={<p>로딩 중...</p>}>
      <GoogleCallback />
    </Suspense>
  );
}
