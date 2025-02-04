'use client';

import Image, { StaticImageData } from 'next/image';

interface ProfileImgProps {
  src: StaticImageData;
  size: 'large' | 'medium' | 'small';
  isLine?: boolean;
  onClick?: () => void;
}

export default function ProfileImg({ src, size, isLine = false, onClick }: ProfileImgProps) {
  const profileSize =
    size === 'large'
      ? 'h-[164px] w-[164px] tablet:h-[80px] tablet:w-[80px] mobile:h-[60px] mobile:w-[60px]'
      : size === 'medium'
        ? 'h-[64px] w-[64px] mobile:h-[42px] mobile:w-[42px]'
        : 'h-[45px] w-[45px] mobile:h-[25px] mobile:w-[25px]';

  const borderRoundWidth = isLine ? `w-[calc(100%-3px)]` : `w-[calc(100%)]`;
  const borderRoundHeight = isLine ? `h-[calc(100%-3px)]` : `h-[calc(100%)]`;
  const cursor = onClick ? 'cursor-pointer' : 'cursor-default';

  const onClickProfileImg = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <div onClick={onClickProfileImg} className={`relative rounded-full ${cursor} ${profileSize}`}>
      <Image fill className='rounded-[100] bg-black object-cover' src={src} alt='프로필 이미지' />
      <div
        className={`absolute ${borderRoundWidth} ${borderRoundHeight} left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[100] border border-solid border-gray-300 mobile:h-[calc(100%)] mobile:w-[calc(100%)]`}
      ></div>
    </div>
  );
}
