'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import WineCard, { WineCardProps } from '@/components/WineCard';

export default function WineContainer() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [wine, setWine] = useState<WineCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWineData = async () => {
      if (!isLoggedIn) {
        setError('로그인 후 이용 가능합니다.');
        setLoading(false);
        return;
      }

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (!token) {
          setError('액세스 토큰이 없습니다.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Wine fetch failed: ${response.statusText}`);
        }

        const data: WineCardProps = await response.json();
        setWine(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`Error fetching wine data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && id) {
      fetchWineData();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{wine ? <WineCard {...wine} size='large' /> : <p>존재하지 않는 와인 데이터</p>}</div>;
}
