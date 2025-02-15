export default function WineCardSkeleton() {
  return (
    <div className='rounded-2xl border border-gray-300 hover:shadow-lg pc:w-[796px]'>
      <div className='flex justify-between gap-[81px] tablet:gap-[47px] mobile:gap-9'>
        <div className='ml-[60px] mt-10 h-[208px] w-[60px] overflow-hidden rounded-t-md bg-gray-100 tablet:ml-10 mobile:ml-5' />
        <div className='mb-[24px] mr-[60px] mt-[36px] flex flex-1 flex-col justify-between gap-4 mobile:mb-[28px] mobile:mr-[30px] mobile:mt-[40px]'>
          <div className='flex justify-between tablet:gap-3 mobile:flex-col mobile:gap-[22px]'>
            <div className='flex h-[162px] flex-col items-start justify-between mobile:h-[100px]'>
              <div className='h-[42px] rounded-md bg-gray-100 pc:w-[350px] tablet:w-[380px] mobile:w-[200px]' />
              <div className='mb-4 mt-5 h-[26px] w-[150px] rounded-md bg-gray-100 mobile:my-2' />
              <div className='h-[42px] w-[124px] rounded-md bg-gray-100 mobile:h-[36px] mobile:w-[90px]' />
            </div>
            <div className='flex h-[162px] flex-col justify-between gap-1 mobile:mr-2 mobile:h-[51px] mobile:flex-row mobile:items-center mobile:gap-0'>
              <div className='mobile:mr-1 mobile:flex mobile:flex-1 mobile:items-center mobile:gap-[15px]'>
                <div className='mb-[10px] h-[48px] w-[80px] rounded-md bg-gray-100 mobile:mb-0 mobile:h-[48px] mobile:w-[60px]' />
                <div className='flex-col mobile:flex'>
                  <div className='h-[26px] w-[120px] rounded-md bg-gray-100 mobile:h-[24px] mobile:w-[110px]' />
                  <div className='mt-[10px] h-[24px] w-[70px] max-w-[120px] rounded-md bg-gray-100 mobile:mt-[4px] mobile:h-[20px]' />
                </div>
              </div>
              <div className='h-9 w-9 rounded-md bg-gray-100 pc:self-end tablet:self-end mobile:h-[32px] mobile:w-[32px] mobile:self-auto' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-[10px] border-t-[1px] border-t-gray-300 mobile:gap-2'>
        <div className='mx-[60px] my-5 h-[62px] rounded-md bg-gray-100 tablet:mx-10 mobile:mx-6 mobile:my-3 mobile:h-[58px]' />
      </div>
    </div>
  );
}
