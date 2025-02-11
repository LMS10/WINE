'use client';

import { useState } from 'react';
import MyProfileContainer from './_components/MyProfileContainer';
import MyReviewListContainer from './_components/MyReviewListContainer';
import MyWineListContainer from './_components/MyWineListContainer';
import { getAccessToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [category, setCategory] = useState('내가 쓴 후기');
  const router = useRouter();
  const token = getAccessToken();

  if (!token) {
    router.push('/signin');
    return;
  }

  function listSelection() {
    if (category === '내가 쓴 후기') return <MyReviewListContainer />;
    else if (category === '내가 등록한 와인') return <MyWineListContainer />;
  }

  const selectClassName = 'cursor-pointer text-xl font-bold text-gray-800 transition-all duration-300 hover:text-purple-100';

  const disSelectClassName = 'duration-300cursor-pointer text-xl font-bold text-gray-500 transition-all hover:text-purple-100';

  return (
    <div className='mb-20 pt-[37px] tablet:mx-6 tablet:pt-[17px] mobile:mx-5'>
      <div className='mx-auto flex justify-center gap-[60px] tablet:max-w-[1000px] tablet:flex-col tablet:gap-[40px] mobile:gap-[30px]'>
        <MyProfileContainer />
        <div className='mobile: flex flex-col gap-[22px] pc:w-[800px]'>
          <div className='flex gap-[32px]'>
            <span onClick={() => setCategory('내가 쓴 후기')} className={category === '내가 쓴 후기' ? selectClassName : disSelectClassName}>
              내가 쓴 후기
            </span>
            <span onClick={() => setCategory('내가 등록한 와인')} className={category === '내가 등록한 와인' ? selectClassName : disSelectClassName}>
              내가 등록한 와인
            </span>
          </div>
          {listSelection()}
        </div>
      </div>
    </div>
  );
}
