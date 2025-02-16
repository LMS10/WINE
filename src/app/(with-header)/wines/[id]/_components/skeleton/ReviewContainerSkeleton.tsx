export default function ReviewContainerSkeleton() {
  return (
    <div className='mb-[100px] mt-[60px] w-full animate-pulse'>
      <div className='mx-auto w-full max-w-[1140px] transition-all duration-300 ease-in-out tablet:max-w-[1000px] mobile:max-w-[700px]'>
        <div className='grid grid-cols-2 gap-8 tablet:grid-cols-1 tablet:px-6 mobile:grid-cols-1 mobile:px-6'>
          <div>
            <div className='mb-[32px] h-[32px] rounded-md bg-gray-200 pc:w-[141px] tablet:w-[150px]'></div>
            <div className='h-[172px] rounded-md bg-gray-100 pc:w-[540px] tablet:max-w-full mobile:h-[144px]'></div>
          </div>
          <div>
            <div className='mb-[32px] h-[32px] rounded-md bg-gray-200 pc:w-[141px] tablet:w-[150px]'></div>
            <div className='h-[172px] rounded-md bg-gray-100 pc:w-[540px] tablet:max-w-full mobile:h-[144px]'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
