import Image from 'next/image';
import emptyReview from '@/assets/icons/empty_review.svg';
import Button from '@/components/Button';

export default function NoReview() {
  return (
    <div className='my-[200px] flex flex-col items-center justify-center'>
      <Image src={emptyReview} alt='리뷰 0개' width={136} height={136} />
      <div className='mt-[24px] text-2lg text-gray-500'>작성된 리뷰가 없어요</div>
      <div className='mt-[48px]'>
        <Button text='리뷰 남기기' onClick={() => {}} className='rounded-xl px-[48px] py-[11px] text-lg font-semibold' />
      </div>
    </div>
  );
}
