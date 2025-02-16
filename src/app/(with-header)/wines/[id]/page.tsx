'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchWineDetail } from '@/lib/fetchWineDetail';
import { ReviewData } from '@/types/review-data';
import WineContainer from './_components/WineContainer';
import ReviewContainer from './_components/ReviewContainer';
import WineDetailSkeleton from './_components/skeleton/WineDetailSkeleton';
import NotFound from '@/app/not-found';
import Refresh from '@/components/Refresh';

export default function Page() {
  const { id } = useParams();
  const wineId = typeof id === 'string' ? Number(id) : NaN;
  const [data, setData] = useState<ReviewData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  const fetchWineData = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(false);
      setNotFound(false);

      try {
        const data = await fetchWineDetail(id);
        setData(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'NOT_FOUND') {
            setNotFound(true);
          } else if (err.message === 'UNAUTHORIZED') {
            alert('로그인 후 이용 가능합니다.');
            router.push('/signin');
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  useEffect(() => {
    if (isNaN(wineId)) {
      setNotFound(true);
      setLoading(false);
    } else {
      fetchWineData(wineId);
    }
  }, [wineId, fetchWineData]);

  if (loading) return <WineDetailSkeleton />;
  if (notFound || isNaN(wineId)) return <NotFound />;
  if (error) {
    return (
      <div className='mt-[62px] w-full mobile:mt-[29px]'>
        <div className='mx-auto flex h-[260px] w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>
          <Refresh
            handleLoad={() => fetchWineDetail(wineId)}
            boxStyle='mx-auto h-[228px] rounded-[16px] tablet:w-full mobile:w-full gap-[10px]'
            buttonStyle='px-[20px] py-[8px]'
            iconSize='w-[100px] h-[100px] mobile:w-[60px] mobile:h-[60px]'
            iconTextGap='gap-[10px]'
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {data && <WineContainer wine={data} />}
      {data && <ReviewContainer data={data} />}
    </>
  );
}
