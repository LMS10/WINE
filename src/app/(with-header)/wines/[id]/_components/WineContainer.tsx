'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWineDetail } from '@/lib/fetchWineDetail';
import { ReviewData } from '@/types/review-data';
import WineCard from '@/components/WineCard';

export default function WineContainer() {
  const { id } = useParams();
  const [wine, setWine] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWineData = async () => {
      if (id) {
        const wineId = typeof id === 'string' ? Number(id) : NaN;
        if (isNaN(wineId)) {
          setError('유효한 와인 ID가 아닙니다.');
          setLoading(false);
          return;
        }

        try {
          const wineData = await fetchWineDetail(wineId);
          setWine(wineData);
        } catch (error: unknown) {
          if (error instanceof Error) setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchWineData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>{wine ? <WineCard {...wine} size='large' /> : ''}</div>
    </div>
  );
}
