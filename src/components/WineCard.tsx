import Image from 'next/image';
import KebabDropDown from '@/app/(with-header)/myprofile/_components/KebabDropDown';

export interface WineCardProps {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  isKebab?: boolean;
  size?: 'large' | 'midium';
}

export default function WineCard({ id, name, region, image, price, isKebab = false, size = 'large' }: WineCardProps) {
  const cardWrapperStyle =
    size === 'large'
      ? 'max-w-[1140px] h-[260px] gap-[86px] pt-[52px] pb-[40px] pl-[100px] pr-[40px] tablet:pl-[60px] tablet:gap-[60px] mobile:pl-[40px] mobile:pt-[33px] mobile:pb-[29.5px] mobile:h-[190px]'
      : 'pc:w-[800px] h-[228px] gap-[40px] py-[30px] pl-[60px] pr-[40px] tablet:w-full mobile:w-full mobile:pb-[16.5px] mobile:pt-[20px] mobile:h-[164px] mobile:pl-[40px]';

  const wineImgSize = size === 'large' ? 'h-[208px] mobile:h-[155px] mobile:w-[50px]' : 'h-[198px] mobile:h-[144px] mobile:w-[50px]';

  const wineClamp = size === 'large' ? 'max-w-[850px] mobile:max-w-[550px]' : 'max-w-[600px] tablet:max-w-[800px] mobile:max-w-[550px] pr-[24px]';

  return (
    <div className={`flex overflow-hidden rounded-[16px] border border-gray-300 mobile:gap-[40px] mobile:px-[20px] ${cardWrapperStyle}`}>
      <div className={`relative w-[60px] flex-shrink-0 ${wineImgSize}`}>
        <Image className='h-[210px] object-contain object-bottom mobile:h-[154px]' src={image} alt='와인 이미지' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
      </div>
      <div className='relative flex flex-grow flex-col justify-between'>
        <div className='flex flex-col gap-[20px] mobile:gap-[15px]'>
          <h3 className={`line-clamp-2 text-[30px] font-semibold leading-[35.8px] text-gray-800 mobile:text-xl mobile:leading-[23.87px] ${wineClamp}`}>{name}</h3>
          <p className={`line-clamp-1 text-lg font-normal text-gray-500 mobile:text-md ${wineClamp}`}>{region}</p>
        </div>
        {isKebab && <KebabDropDown id={id} />}
        <span className='w-fit rounded-[12px] bg-purple-10 px-[15px] py-[5.5px] text-[18px] font-bold text-purple-100 mobile:px-[10px] mobile:py-[6px] mobile:text-md'>₩ {price.toLocaleString()}</span>
      </div>
    </div>
  );
}
