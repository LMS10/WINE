'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import WineCard from '@/components/WineCard';
import WineContainerSkeleton from './skeleton/WineContainerSkeleton';
import Refresh from '@/components/Refresh';
import NotFound from '@/app/not-found';
import { useWineDetail } from '@/lib/useWineDetail';

export default function WineContainer() {
  const { id } = useParams();
  const wineId = typeof id === 'string' ? Number(id) : NaN;
  const { wine, loading, error, notFound, fetchWineData } = useWineDetail();

  useEffect(() => {
    fetchWineData(wineId);
  }, [wineId, fetchWineData]);

  if (loading) return <WineContainerSkeleton />;
  if (notFound) return <NotFound />;
  if (error)
    return (
      <div className='mt-[62px] w-full mobile:mt-[29px]'>
        <div className='mx-auto flex h-[260px] w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>
          <Refresh
            handleLoad={() => fetchWineData(wineId)}
            boxStyle='mx-auto h-[228px] rounded-[16px] tablet:w-full mobile:w-full gap-[10px]'
            buttonStyle='px-[20px] py-[8px]'
            iconSize='w-[100px] h-[100px] mobile:w-[60px] mobile:h-[60px]'
            iconTextGap='gap-[10px]'
          />
        </div>
      </div>
    );

  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto w-full max-w-[1140px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] mobile:max-w-[700px]'>{wine ? <WineCard {...wine} size='large' /> : ''}</div>
    </div>
  );
}
