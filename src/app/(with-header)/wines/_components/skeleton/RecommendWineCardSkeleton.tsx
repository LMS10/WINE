export default function RecommendWineCardSkeleton() {
  return (
    <div className='flex h-[185px] w-[232px] animate-pulse justify-between gap-[28px] rounded-xl bg-white px-[30px] pt-6 mobile:h-[160px] mobile:w-[193px] mobile:gap-[25px] mobile:px-[25px]'>
      <div className='h-[161px] w-[44px] flex-shrink-0 rounded-t-md bg-gray-200 mobile:h-[136px] mobile:w-[38px]'></div>
      <div className='flex w-full flex-col gap-[10px] mobile:h-[136px] mobile:w-[80px] mobile:gap-3'>
        <div className='h-[40px] w-[60px] rounded-md bg-gray-200 mobile:h-[30px] mobile:w-[50px]'></div>
        <div className='h-[24px] w-[100px] rounded-md bg-gray-200 mobile:h-[18px] mobile:w-[80px]'></div>
        <div className='h-[18px] w-[100px] rounded-md bg-gray-200 mobile:h-[18px] mobile:w-[80px]'></div>
      </div>
    </div>
  );
}
