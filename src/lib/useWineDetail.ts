import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWineDetail } from '@/lib/fetchWineDetail';
import { ReviewData } from '@/types/review-data';

export function useWineDetail() {
  const [wine, setWine] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  const fetchWineData = useCallback(
    async (id: number) => {
      if (isNaN(id)) {
        setError(true);
      }
      setLoading(true);
      setNotFound(false);

      try {
        const data = await fetchWineDetail(id);
        setWine(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'UNAUTHORIZED') {
            alert('로그인 후, 이용해 주세요.');
            router.push('/signin');
            return;
          }
          if (error.message === 'NOT_FOUND') {
            setNotFound(true);
          } else {
            setError(true);
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  return { wine, loading, error, notFound, fetchWineData };
}
