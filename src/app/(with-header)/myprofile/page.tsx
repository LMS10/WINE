'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import MyProfileContainer from './_components/MyProfileContainer';
import MyReviewListContainer from './_components/MyReviewListContainer';
import MyWineListContainer from './_components/MyWineListContainer';

export default function Page() {
  const [category, setCategory] = useState('내가 쓴 후기');
  const [dataCount, setDataCount] = useState(0);
  const router = useRouter();

  function listSelection() {
    if (category === '내가 쓴 후기') return <MyReviewListContainer setDataCount={setDataCount} />;
    else if (category === '내가 등록한 와인') return <MyWineListContainer setDataCount={setDataCount} />;
  }

  const selectClassName = 'cursor-pointer text-xl font-bold text-gray-800 transition-all duration-300 hover:text-purple-100';

  const unSelectClassName = 'duration-300 cursor-pointer text-xl font-bold text-gray-500 transition-all hover:text-purple-100';

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className='mb-20 pt-[37px] tablet:mx-6 tablet:pt-[17px] mobile:mx-5'>
      <div className='mx-auto flex justify-center gap-[60px] tablet:max-w-[1000px] tablet:flex-col tablet:gap-[40px] mobile:gap-[30px]'>
        <MyProfileContainer />
        <div className='mobile: flex flex-col gap-[22px] pc:w-[800px]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-[32px]'>
              <span onClick={() => setCategory('내가 쓴 후기')} className={category === '내가 쓴 후기' ? selectClassName : unSelectClassName}>
                내가 쓴 후기
              </span>
              <span onClick={() => setCategory('내가 등록한 와인')} className={category === '내가 등록한 와인' ? selectClassName : unSelectClassName}>
                내가 등록한 와인
              </span>
            </div>
            <p className='flex items-center text-md font-normal text-purple-100'>총 {dataCount}개</p>
          </div>
          {listSelection()}
        </div>
      </div>
    </div>
  );
}
