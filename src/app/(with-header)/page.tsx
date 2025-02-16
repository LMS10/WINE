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

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <div className='mx-auto flex min-h-[100vh] w-full max-w-[1200px] flex-col pb-[100px] pt-[94px] mobile:pt-[74px]'>
        <div className='flex justify-center pt-[80px] tablet:pt-[24px]'>
          <div className='relative h-[535px] w-[1140px] pc:block tablet:hidden mobile:hidden'>
            <Image src={bannerDesktop} alt='데스크톱 배너 이미지' style={{ objectFit: 'cover' }} priority />
          </div>
          <div className='relative mx-6 h-auto w-auto min-w-[704px] pc:hidden tablet:block tablet:max-w-[1000px] mobile:hidden'>
            <Image src={bannerTablet} alt='태블릿 배너 이미지' style={{ objectFit: 'cover' }} />
          </div>
          <div className='relative mx-5 h-auto w-auto min-w-[343px] max-w-[700px] pc:hidden tablet:hidden mobile:block'>
            <Image src={bannerMobile} alt='모바일 배너 이미지' style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className='flex flex-col items-center gap-[96px] pt-[160px] tablet:pt-[80px] mobile:gap-[48px] mobile:pt-[48px]'>
          <div className='flex max-w-[699px] flex-col items-center pl-[25px] tablet:max-w-[800px] tablet:pl-[32px] mobile:pl-[0]'>
            <div className='relative h-[320px] w-[699px] pc:block tablet:block mobile:hidden'>
              <Image src={section1Large} alt='데스크톱, 태블릿 섹션 이미지1' style={{ objectFit: 'cover' }} />
            </div>
            <div className='relative h-auto w-auto pc:hidden tablet:hidden mobile:block mobile:min-w-[343px] mobile:max-w-[550px]'>
              <Image src={section1Small} alt='모바일 섹션 이미지1' style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className='flex max-w-[665px] flex-col items-center'>
            <div className='relative h-[320px] w-[665px] pc:block tablet:block mobile:hidden'>
              <Image src={section2Large} alt='데스크톱, 태블릿 섹션 이미지2' style={{ objectFit: 'cover' }} />
            </div>
            <div className='relative h-auto w-auto pc:hidden tablet:hidden mobile:block mobile:min-w-[343px] mobile:max-w-[550px]'>
              <Image src={section2Small} alt='모바일 섹션 이미지2' style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className='flex max-w-[665px] flex-col items-center'>
            <div className='relative h-[320px] w-[665px] pc:block tablet:block mobile:hidden'>
              <Image src={section3Large} alt='데스크톱, 태블릿 섹션 이미지3' style={{ objectFit: 'cover' }} />
            </div>
            <div className='relative h-auto w-auto pc:hidden tablet:hidden mobile:block mobile:min-w-[343px] mobile:max-w-[550px]'>
              <Image src={section3Small} alt='모바일 섹션 이미지3' style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
        <div className='mx-auto flex items-center justify-center pt-[104px] tablet:pt-[80px] mobile:pt-[64px]'>
          <Button text='와인 보러가기' href='/wines' className='rounded-[100px] px-[96px] py-[16px] text-lg' />
        </div>
      </div>
    </div>
  );
}
