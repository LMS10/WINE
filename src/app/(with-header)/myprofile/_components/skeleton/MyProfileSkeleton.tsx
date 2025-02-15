export default function MyProfileSkeleton() {
  return (
    <div className='flex h-[530px] w-[280px] flex-col items-center justify-between rounded-[16px] border border-gray-300 px-[20px] py-[39px] shadow-drop tablet:h-[247px] tablet:w-full tablet:px-[40px] tablet:py-[23px] mobile:h-[241px] mobile:p-[20px]'>
      <div className='flex w-full animate-pulse flex-col items-center justify-center gap-[32px] tablet:flex-row tablet:justify-start mobile:gap-[16px]'>
        <div className='h-[164px] w-[164px] tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'>
          <div className='h-full w-full rounded-full bg-gray-200'></div>
        </div>
        <div className='flex flex-col gap-[16px] tablet:gap-[8px] mobile:gap-[4px]'>
          <div className='flex h-[32px] w-[164px] justify-center tablet:justify-start'>
            <div className='h-full w-full rounded-[4px] bg-gray-200'></div>
          </div>
        </div>
      </div>
      <div className='flex w-full animate-pulse flex-col justify-center gap-[8px] tablet:flex-row tablet:gap-[24px] mobile:flex-col mobile:gap-[6px]'>
        <div className='flex flex-col gap-[10px] tablet:flex-grow mobile:gap-[8px]'>
          <div className='flex h-[26px] w-full justify-center tablet:justify-start'>
            <div className='h-full w-full rounded-[4px] bg-gray-200'></div>
          </div>
          <div className='flex h-[48px] w-full justify-center tablet:justify-start'>
            <div className='h-full w-full rounded-[12px] bg-gray-200'></div>
          </div>
        </div>
        <div className='flex flex-row-reverse tablet:items-end'>
          <div className='h-[42px] w-[95px] rounded-[12px] tablet:h-[48px] tablet:w-[115px] mobile:h-[42px] mobile:w-[88px]'>
            <div className='h-full w-full rounded-[12px] bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
