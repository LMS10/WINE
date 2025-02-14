import Header from '@/components/Header';
import Button from '@/components/Button';
import emptyData from '@/assets/icons/empty_review.svg';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className='flex h-screen flex-col items-center justify-center gap-[30px]'>
        <div className='flex flex-col items-center justify-center gap-[20px] mobile:gap-[10px]'>
          <Image className='h-[136px] w-[136px] mobile:h-[70px] mobile:w-[70px]' alt='데이터 없음' src={emptyData} priority />
          <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-3xl font-bold text-gray-500 mobile:text-2xl'>404</h1>
            <p className='text-lg text-gray-500 mobile:text-md'>잘못된 주소 또는 없는 페이지입니다.</p>
          </div>
        </div>
        <Button href='/wines' text='홈으로 돌아가기' className='rounded-[100px] px-[30px] py-[10px] text-lg mobile:text-md' />
      </div>
    </div>
  );
}
