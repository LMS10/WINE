import Image from 'next/image';
import emptyReview from '@/assets/icons/empty_review.svg';
import PostReviewModal from '@/components/modal/PostReviewModal';
import { AddReviewData } from './ReviewContainer';

export default function NoReview({ addReview }: { addReview: (newReview: AddReviewData) => void }) {
  return (
    <div>
      <div className='my-[200px] flex flex-col items-center justify-center mobile:my-[100px]'>
        <Image src={emptyReview} alt='리뷰 0개' width={136} height={136} />
        <div className='mt-[24px] text-2lg text-gray-500'>작성된 리뷰가 없어요</div>
        <div className='mt-[48px]'>
          <PostReviewModal addReview={addReview} />
        </div>
      </div>
    </div>
  );
}
