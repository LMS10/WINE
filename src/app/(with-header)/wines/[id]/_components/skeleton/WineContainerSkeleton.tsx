export default function WineContainerSkeleton() {
  return (
    <div className='mt-[62px] w-full mobile:mt-[29px]'>
      <div className='mx-auto flex h-[260px] w-full max-w-[1140px] animate-pulse gap-[86px] rounded-[16px] border-gray-300 bg-gray-100 pb-[40px] pl-[100px] pr-[40px] pt-[52px] tablet:w-[calc(100%-45px)] tablet:max-w-[1000px] tablet:pl-[60px] mobile:h-[190px] mobile:max-w-[700px] mobile:gap-[60px] mobile:pb-[29.5px] mobile:pl-[40px] mobile:pr-[20px] mobile:pt-[33px]'>
        <div className='h-[208px] w-[60px] rounded-md bg-gray-200 mobile:h-[155px] mobile:w-[50px]'></div>
        <div>
          <div className='mb-[15px] h-[36px] rounded-md bg-gray-200 pc:w-[500px] tablet:w-[450px] mobile:h-[35px] mobile:w-[240px]'></div>
          <div className='mb-[55px] h-[26px] w-[200px] rounded-md bg-gray-200 mobile:mb-[30px] mobile:h-[24px] mobile:w-[100px]'></div>
          <div className='h-[38px] w-[112px] rounded-md bg-gray-200 mobile:h-[24px] mobile:w-[66px]'></div>
        </div>
      </div>
    </div>
  );
}
