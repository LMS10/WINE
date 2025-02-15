'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchRecommendWine } from '@/lib/fetchRecommendWine';
import { Wine } from '@/types/wine';
import RecommendWine from './RecommendWine';
import RecommendWineListSkeleton from './skeleton/RecommendWineListSkeleton';
import Refresh from '@/components/Refresh';

export default function RecommendWineContainer() {
  const [recommendedList, setRecommendedList] = useState<Wine[]>([]);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  const getRecommendedWines = useCallback(async () => {
    setIsLoading(true);
    try {
      const wines = await fetchRecommendWine();
      setRecommendedList(wines);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error('추천 와인 목록을 가져오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRecommendedWines();
  }, [getRecommendedWines]);

  if (isloading) {
    return <RecommendWineListSkeleton count={8} />;
  }

  if (hasError) {
    return (
      <div className='flex h-[299px] flex-col justify-center rounded-2xl bg-gray-100 mobile:h-[241px]'>
        <Refresh handleLoad={getRecommendedWines} iconSize='w-0 h-0' iconTextGap='gap-[10px]' buttonStyle='px-[20px] py-[8px] mobile:px-[16px] mobile:py-[6px] mobile:text-md' />
      </div>
    );
  }

  return <RecommendWine recommendedList={recommendedList} />;
}
