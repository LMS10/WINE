import RecommendWineCardSkeleton from './RecommendWineCardSkeleton';

export default function RecommendWineListSkeleton({ count }: { count: number }) {
  return (
    <div className='flex h-[299px] flex-col gap-[30px] overflow-hidden rounded-2xl bg-gray-100 p-[30px] pr-0 mobile:h-[241px] mobile:gap-5 mobile:p-[20px] mobile:pr-0'>
      <p className='text-[20px] font-bold leading-[23px] text-gray-800 mobile:text-[18px] mobile:leading-[21px]'>이번 달 추천 와인</p>
      <div className='relative'>
        <div className='flex animate-pulse gap-[15px] overflow-hidden rounded-2xl bg-gray-100 mobile:gap-[10px]'>
          {new Array(count).fill(0).map((_, idx) => (
            <RecommendWineCardSkeleton key={`wine-item-skeleton-${idx}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
