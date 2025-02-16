export default function MyReviewItemSkeleton() {
  return (
    <div className='flex w-[800px] animate-pulse rounded-[16px] border border-gray-300 bg-gray-100 px-10 py-7 tablet:w-full mobile:w-full'>
      <div className='flex flex-grow flex-col gap-[20px]'>
        <div className='relative flex gap-[15px]'>
          <div className='flex h-[42px] w-[80px] items-center justify-center gap-[4px] rounded-[12px] tablet:h-[38px] mobile:h-[32px] mobile:w-[60px]'>
            <div className='h-full w-full rounded-[12px] bg-gray-200'></div>
          </div>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <div className='h-[26px] w-full mobile:h-[24px]'>
            <div className='h-full w-full rounded bg-gray-200'></div>
          </div>
          <div className='h-[52px] w-full'>
            <div className='h-full w-full rounded bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
