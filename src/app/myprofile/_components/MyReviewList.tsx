import Image from 'next/image';
import elapsedTime from '@/utils/formatDate';
import like from '@/assets/icons/star_hover.svg';
import kebab from '@/assets/icons/dot.svg';
import myReviewMockData from '@/app/myprofile/_components/myReviewMockData.json';

interface MyReviewProps {
  rating: number;
  createdAt: string;
  wineName: string;
  content: string;
}

export function MyReviewItem({ rating, createdAt, wineName, content }: MyReviewProps) {
  const reviewElapsedTime = elapsedTime(createdAt);

  return (
    <div className='flex max-w-[800px] rounded-[16px] border border-gray-300 px-10 py-7'>
      <div className='flex flex-grow flex-col gap-[20px]'>
        <div className='relative flex gap-[15px]'>
          <div className='flex h-[42px] w-[80px] items-center justify-center gap-[4px] rounded-[12px] bg-purple-10 tablet:h-[38px] mobile:h-[32px] mobile:w-[60px]'>
            <Image className='w-[20px] mobile:w-[16px]' src={like} alt='별점 아이콘' />
            <span className='text-[18px] font-bold text-purple-100 mobile:text-[14px]'>{rating}</span>
          </div>
          <Image className='absolute right-0 w-[26px] cursor-pointer mobile:w-[24px]' src={kebab} alt='케밥 아이콘' />
          <span className='flex items-center justify-center text-[16px] text-gray-500 mobile:text-[14px]'>{reviewElapsedTime}</span>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <h3 className='text-[16px] font-medium text-gray-500 mobile:text-[14px]'>{wineName}</h3>
          <p className='text-[16px] font-normal text-gray-800 mobile:text-[14px]'>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default function MyReviewList() {
  return (
    <div className='flex flex-col gap-[8px] tablet:gap-[16px] mobile:gap-[16px]'>
      {myReviewMockData.list.map((value) => (
        <MyReviewItem key={value.id} rating={value.rating} createdAt={value.createdAt} wineName={value.wine.name} content={value.content} />
      ))}
    </div>
  );
}
