'use client';
import StaticRating from '@/components/StaticRating';
import PostReviewModal from '@/components/modal/PostReviewModal';

type ReviewRatingProps = {
  count: number;
  ratingPercentages: number[];
  avgRating: number;
};

export default function Temp({ count, avgRating, ratingPercentages }: ReviewRatingProps) {
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 pc:grid-cols-1 tablet:grid-cols-2 tablet:grid-rows-1 tablet:gap-0 mobile:grid-cols-2'>
        <div className='flex flex-col self-start'>
          <div className='flex items-center gap-[20px] tablet:mt-[15px] tablet:h-[81px] tablet:flex-none tablet:justify-center mobile:justify-start mobile:gap-[15px]'>
            <div className='text-[54px] font-extrabold mobile:text-[36px]'>{avgRating.toFixed(1)}</div>
            <div className='flex flex-col gap-[5px] mobile:gap-0'>
              <StaticRating value={avgRating} />
              <div className='text-md text-gray-500'>{count}개의 후기</div>
            </div>
          </div>
          <div className='pc:hidden tablet:mx-auto tablet:mt-2 tablet:flex mobile:hidden'>
            <PostReviewModal />
          </div>
        </div>
        <div className='tablet:col-start-2 mobile:col-span-2 mobile:col-start-1 mobile:row-start-2 mobile:items-center mobile:justify-center'>
          <div className='space-y-4 tablet:space-y-2'>
            {ratingPercentages
              .slice()
              .reverse()
              .map((percentage, index) => {
                return (
                  <div key={index} className='flex items-center gap-[15px] mobile:min-w-[303px] mobile:max-w-[652px]'>
                    <div className='whitespace-nowrap text-lg font-medium text-gray-500'>{5 - index}점</div>
                    <div className='flex w-full min-w-[241px] flex-col items-start tablet:max-w-[340px] mobile:max-w-[652px]'>
                      <div className='relative h-[6px] w-full rounded-full bg-gray-100 mobile:max-w-[652px]'>
                        <div className='absolute left-0 top-0 h-[6px] rounded-full bg-purple-100' style={{ width: `${percentage}%`, maxWidth: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className='mobile:col-start-2 mobile:mx-auto mobile:my-auto mobile:mr-0'>
          <div className='mt-[30px] tablet:hidden mobile:mt-0 mobile:block mobile:items-center mobile:justify-center'>
            <PostReviewModal />
          </div>
        </div>
      </div>
    </div>
  );
}
