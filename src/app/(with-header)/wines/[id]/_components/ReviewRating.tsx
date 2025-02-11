import StaticRating from '@/components/StaticRating';

type ReviewRatingProps = {
  count: number;
  ratingPercentages: number[];
  avgRating: number;
};

export default function ReviewRating({ count, avgRating, ratingPercentages }: ReviewRatingProps) {
  return (
    <div>
      <div className='mb-[20px] flex items-center gap-[20px]'>
        <div className='text-[54px] font-extrabold'>{avgRating.toFixed(1)}</div>
        <div className='flex flex-col gap-[5px]'>
          <StaticRating value={avgRating} />
          <div className='text-md text-gray-500'>{count}개의 후기</div>
        </div>
      </div>
      <div className='space-y-4'>
        {ratingPercentages
          .slice()
          .reverse()
          .map((percentage, index) => {
            const fullBarWidth = 241;
            const fullBarWidthMobile = 303;
            const barWidth = (percentage / 100) * fullBarWidth;
            const barWidthMobile = (percentage / 100) * fullBarWidthMobile;

            return (
              <div key={index} className='flex items-center gap-[15px]'>
                <div className='whitespace-nowrap text-lg font-medium text-gray-500'>{5 - index}점</div>
                <div className='flex w-[241px] flex-col items-start mobile:w-[303px]'>
                  <div className='relative h-[6px] w-full rounded-full bg-gray-100'>
                    <div className='absolute left-0 top-0 h-[6px] rounded-full bg-purple-100' style={{ width: `${barWidth}px`, maxWidth: '100%' }} data-mobile-width={`${barWidthMobile}px`}></div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
