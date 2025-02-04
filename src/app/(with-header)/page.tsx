import Image from 'next/image';
import Button from '@/components/Button';
import bannerDesktop from '@/assets/images/banner_desktop.png';
import bannerTablet from '@/assets/images/banner_tablet.png';
import bannerMobile from '@/assets/images/banner_mobile.png';
import section1Large from '@/assets/images/section1_lg.png';
import section1Small from '@/assets/images/section1_sm.png';
import section2Large from '@/assets/images/section2_lg.png';
import section2Small from '@/assets/images/section2_sm.png';
import section3Large from '@/assets/images/section3_lg.png';
import section3Small from '@/assets/images/section3_sm.png';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WINE - 나만의 와인 창고',
  description: '한 곳에서 관리하는 나만의 와인 창고',
  openGraph: {
    title: 'WINE - 나만의 와인 창고',
    description: '한 곳에서 관리하는 나만의 와인 창고',
    images: ['/thumbnail.png'],
  },
};

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <div className='mx-auto min-h-[100vh] w-full max-w-[1200px] pb-[100px]'>
        <div className='flex justify-center pt-[80px] tablet:pt-[24px]'>
          <Image className='h-auto w-full pc:block tablet:hidden mobile:hidden' src={bannerDesktop} alt='데스크톱 배너 이미지' width={1140} height={535} priority />
          <Image className='w-fullpc:hidden h-auto tablet:block mobile:hidden' src={bannerTablet} alt='데스크톱 배너 이미지' width={704} height={394} priority />
          <Image className='w-fullpc:hidden h-auto tablet:hidden mobile:block' src={bannerMobile} alt='데스크톱 배너 이미지' width={343} height={403} priority />
        </div>
        <div className='mx-auto flex flex-col items-center justify-center gap-[96px] pt-[160px] tablet:pt-[80px] mobile:gap-[48px] mobile:pt-[48px]'>
          <div className='m-0 flex flex-col items-center p-0'>
            <Image className='h-auto w-full pc:block tablet:block mobile:hidden' src={section1Large} width={699} height={320} alt='데스크톱, 태블릿 섹션 이미지1' />
            <Image className='h-auto w-full pc:hidden tablet:hidden mobile:block' src={section1Small} width={343} height={424} alt='모바일 섹션 이미지1' />
          </div>
          <div className='flex flex-col items-center'>
            <Image className='h-auto w-full pc:block tablet:block mobile:hidden' src={section2Large} width={699} height={320} alt='데스크톱, 태블릿 섹션 이미지2' />
            <Image className='h-auto w-full pc:hidden tablet:hidden mobile:block' src={section2Small} width={343} height={424} alt='모바일 섹션 이미지2' />
          </div>
          <div className='flex flex-col items-center'>
            <Image className='h-auto w-full pc:block tablet:block mobile:hidden' src={section3Large} width={699} height={320} alt='데스크톱, 태블릿 섹션 이미지2' />
            <Image className='h-auto w-full pc:hidden tablet:hidden mobile:block' src={section3Small} width={343} height={424} alt='모바일 섹션 이미지3' />
          </div>
        </div>
        <div className='mx-auto flex items-center justify-center pt-[104px] tablet:pt-[80px] mobile:pt-[64px]'>
          <Button text='와인 보러가기' href='/wines' className='rounded-[100px] px-[96px] py-[16px] text-lg' />
        </div>
      </div>
    </div>
  );
}
