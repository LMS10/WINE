'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWineDetail } from '@/lib/fetchWineDetail';
import { ReviewData } from '@/types/review-data';
import WineCard from '@/components/WineCard';
import WineContainerSkeleton from './skeleton/WineContainerSkeleton';

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
          if (!wineData) {
            setError('와인 정보를 불러오는 데 실패했습니다.');
          } else {
            setWine(wineData);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(`Error fetching wine data: ${error.message}`);
            setError('데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해 주세요.');
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
        } finally {
          setLoading(false);
        }
      } else {
        setError('유효한 와인 ID가 없습니다.');
        setLoading(false);
      }
    };

    fetchWineData();
  }, [id]);

  if (loading)
    return (
      <div>
        <WineContainerSkeleton />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>{wine ? <WineCard {...wine} size='large' /> : ''}</div>
    </div>
  );
}
