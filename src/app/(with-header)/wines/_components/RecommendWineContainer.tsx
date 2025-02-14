'use client';

import { useEffect, useState } from 'react';
import { fetchRecommendWine } from '@/lib/fetchRecommendWine';
import RecommendWine from './RecommendWine';
import RecommendWineListSkeleton from './skeleton/RecommendWineListSkeleton';
import { Wine } from '@/types/wine';

export default function RecommendWineContainer() {
  const [recommendedList, setRecommendedList] = useState<Wine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRecommendedWines = async () => {
      setLoading(true);
      try {
        const wines = await fetchRecommendWine();
        setRecommendedList(wines);
      } catch (error) {
        console.error('추천 와인 목록을 가져오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    getRecommendedWines();
  }, []);

  if (loading) {
    return <RecommendWineListSkeleton count={8} />;
  }

  return <RecommendWine recommendedList={recommendedList} />;
}
