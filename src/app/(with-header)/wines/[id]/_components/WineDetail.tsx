import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/authContext';
import { Wine } from '@/types/wine';
import WineCard, { WineCardProps } from '@/components/WineCard';

export default function WineDetail({ wineId }: { wineId: string }) {
  const { isLoggedIn } = useAuth();
  const [wine, setWine] = useState<Wine | null>(null);
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${wineId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Wine fetch failed: ${response.statusText}`);
        }

        const data: Wine = await response.json();
        setWine(data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`Error fetching wine data: ${error.message}`);
        setLoading(false);
      }
    };

    if (isLoggedIn && wineId) {
      fetchWineData();
    } else {
      setLoading(false);
    }
  }, [wineId, isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!wine) {
    return <p>Wine not found</p>;
  }

  const { id, name, region, image, price } = wine;
  const wineWithPrice: WineCardProps = {
    id,
    name,
    region,
    image,
    price: price.toString(),
    size: 'large',
  };

  return (
    <div>
      <WineCard {...wineWithPrice} />
    </div>
  );
}
