export default function MyWineItemSkeleton() {
  return (
    <div>
      <div className='flex h-[228px] gap-[40px] overflow-hidden rounded-[16px] border border-gray-300 py-[30px] pl-[60px] pr-[40px] pc:w-[800px] tablet:w-full mobile:h-[164px] mobile:w-full mobile:gap-[40px] mobile:px-[20px] mobile:pb-[16.5px] mobile:pl-[40px] mobile:pt-[20px]'>
        <div className='relative h-[198px] w-[60px] flex-shrink-0 mobile:h-[144px] mobile:w-[50px]'>
          <div className='h-[210px] w-full rounded-[4px] bg-gray-200 mobile:h-[154px]'></div>
        </div>
        <div className='relative flex flex-grow flex-col justify-between'>
          <div className='flex flex-col gap-[20px] mobile:gap-[15px]'>
            <div className='h-[35.8px] max-w-[600px] font-semibold tablet:max-w-[800px] mobile:h-[23.87px] mobile:max-w-[550px]'>
              <div className='h-full w-full rounded-[4px] bg-gray-200'></div>
            </div>
            <div className='h-[26px] max-w-[600px] tablet:max-w-[800px] mobile:h-[24px] mobile:max-w-[550px]'>
              <div className='h-full w-full rounded-[4px] bg-gray-200'></div>
            </div>
          </div>
          <div className='h-[37px] w-[114px] rounded-[12px] mobile:h-[36px] mobile:w-[86px]'>
            <div className='h-full w-full rounded-[10px] bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
