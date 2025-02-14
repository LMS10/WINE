'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchWithAuth } from '@/lib/auth';
import { MyWineListResponse, WineDetails } from '@/types/wine';
import emptyData from '@/assets/icons/empty_review.svg';
import WineCard from '@/components/WineCard';
import { WineDataProps } from './MyWIneKebabDropDown ';
import LoadingSpinner from '@/components/LoadingSpinner';
import Refresh from '@/components/Refresh';

export default function MyWineListContainer({ setDataCount }: { setDataCount: (value: number) => void }) {
  const [myWineData, setMyWineData] = useState<WineDetails[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState('');

  const getMyWine = useCallback(async () => {
    setError('');
    try {
      setIsloading(true);
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/wines?limit=30`);

      if (!response?.ok || response === null) {
        setError('와인 데이터를 불러오는데 실패했습니다.');
        return;
      }

      const data: MyWineListResponse = await response.json();
      setMyWineData(data.list);
      setDataCount(data.totalCount);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsloading(false);
    }
  }, [setDataCount]);

  const deleteMyWine = (id: number) => {
    const updatedWineList = myWineData.filter((value) => value.id !== id);
    setMyWineData(updatedWineList);
  };

  const editMyWine = (id: number, editWineData: WineDataProps) => {
    const updatedWineList = myWineData.map((value) => {
      if (value.id === id) {
        return { ...value, ...editWineData };
      }
      return value;
    });
    setMyWineData(updatedWineList);
  };

  useEffect(() => {
    getMyWine();
  }, [getMyWine]);

  if (isLoading) return <LoadingSpinner className='flex h-[228px] w-[800px] rounded-[16px] border border-gray-300 tablet:w-full mobile:w-full' />;

  if (error)
    return (
      <Refresh
        handleLoad={getMyWine}
        boxStyle='flex h-[228px] w-[800px] rounded-[16px] border border-gray-300 tablet:w-full mobile:w-full gap-[10px]'
        buttonStyle='px-[20px] py-[8px]'
        iconSize='w-[50px] h-[50px] mobile:w-[40px] mobile:h-[40px]'
        iconTextGap='gap-[10px]'
      />
    );

  if (myWineData.length === 0)
    return (
      <div className='flex h-[80vh] w-full flex-col items-center justify-center gap-[24px] pc:w-[800px] mobile:h-[40vh] mobile:gap-[12px]'>
        <Image className='h-[120px] w-[120px] mobile:h-[50px] mobile:w-[50px]' alt='데이터 없음' src={emptyData} priority />
        <p className='text-lg font-normal text-gray-500 mobile:text-md'>내가 등록한 와인이 없어요</p>
      </div>
    );

  return (
    <div className='flex flex-col gap-[8px] tablet:gap-[16px] mobile:gap-[16px]'>
      {myWineData.map((value) => (
        <WineCard
          key={value.id}
          id={value.id}
          name={value.name}
          region={value.region}
          image={value.image}
          price={value.price}
          size='midium'
          isKebab
          onClick
          type={value.type}
          editMyWine={editMyWine}
          deleteMyWine={deleteMyWine}
        />
      ))}
    </div>
  );
}
