import wineImg from '@/assets/images/wineImg.png';
import kebab from '@/assets/icons/menu.svg';
import Image from 'next/image';

export default function WineCard() {
  return (
    <div className='flex h-[228px] max-w-[800px] gap-[40px] rounded-[16px] border border-gray-300 px-[40px] py-[30px] mobile:h-[164px] mobile:px-[20px] mobile:pb-[16.5px] mobile:pt-[20px]'>
      <div className='relative h-[198px] w-[60px] overflow-hidden mobile:h-[144px] mobile:w-[40px]'>
        <Image className='absolute top-[0px] h-[210px] w-full object-cover mobile:h-[154px]' src={wineImg} alt='와인 이미지' />
      </div>
      <div className='relative flex flex-grow flex-col justify-between'>
        <div className='flex flex-col gap-[20px] mobile:gap-[15px]'>
          <h3 className='line-clamp-2 w-[300px] text-[30px] font-semibold leading-[35px] text-gray-800 mobile:w-[187px] mobile:text-[20px] mobile:leading-[23px]'>Sentinel Carbernet Sauvignon 2016</h3>
          <p className='line-clamp-1 w-[300px] text-[16px] font-normal text-gray-500 mobile:w-[187px] mobile:text-[14px]'>Western Cape, South Africa</p>
        </div>
        <Image className='absolute right-0 cursor-pointer' src={kebab} alt='케밥 아이콘' />
        <span className='w-fit rounded-[12px] bg-purple-10 px-[15px] py-[5.5px] text-[18px] font-bold text-purple-100 mobile:px-[10px] mobile:py-[6px] mobile:text-[14px]'>₩ 64,090</span>
      </div>
    </div>
  );
}
