'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchWithAuth } from '@/lib/auth';
import { MyWineListResponse, WineDetails } from '@/types/wine';
import emptyData from '@/assets/icons/empty_review.svg';
import WineCard from '@/components/WineCard';

export default function MyWineListContainer() {
  const [myWineData, setMyWineData] = useState<WineDetails[]>([]);
  const [isLoading, setIsloading] = useState(true);

  const getMyWine = async () => {
    try {
      setIsloading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/wines?limit=5`);

      if (!response?.ok || response === null) {
        return;
      }

      const data: MyWineListResponse = await response.json();
      setMyWineData(data.list);
    } catch (error) {
      console.error('데이터를 불러오는데 오류가 발생했습니다:', error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    getMyWine();
  }, []);

  if (isLoading) return <div>로딩중...</div>;

  if (myWineData.length === 0)
    return (
      <div className='flex h-[80vh] max-w-[800px] flex-col items-center justify-center gap-[24px] mobile:h-[40vh] mobile:gap-[12px]'>
        <Image className='h-[120px] w-[120px] mobile:h-[50px] mobile:w-[50px]' alt='데이터 없음' src={emptyData} priority />
        <p className='text-lg font-normal text-gray-500 mobile:text-md'>내가 등록한 와인이 없어요</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-[62px] mobile:gap-[37px]'>
      {myWineData.map((value) => (
        <WineCard key={value.id} id={value.id} name={value.name} region={value.region} image={value.image} price={value.price} size='midium' isKebab />
      ))}
    </div>
  );
}
