import { Skeleton } from 'basic-loading';

export default function MyReviewItemSkeleton() {
  return (
    <div className='flex w-[800px] cursor-pointer rounded-[16px] border border-gray-300 px-10 py-7 hover:shadow-lg tablet:w-full mobile:w-full'>
      <div className='flex flex-grow flex-col gap-[20px]'>
        <div className='relative flex gap-[15px]'>
          <div className='flex h-[42px] w-[80px] items-center justify-center gap-[4px] rounded-[12px] tablet:h-[38px] mobile:h-[32px] mobile:w-[60px]'>
            <Skeleton
              option={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-[10px]'>
          <div className='h-[26px] w-full mobile:h-[24px]'>
            <Skeleton
              option={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
              }}
            />
          </div>
          <div className='h-[52px] w-full'>
            <Skeleton
              option={{
                width: '100%',
                height: '100%',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
