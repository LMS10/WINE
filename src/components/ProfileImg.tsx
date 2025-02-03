'use client';

import Image, { StaticImageData } from 'next/image';
import profileDefault from '@/assets/images/banner_mobile.png';

interface ProfileImgProps {
  src: StaticImageData;
  width: number;
  height: number;
  isLine?: boolean;
  onClick?: () => void;
}

export default function ProfileImg({ src = profileDefault, width = 100, height = 100, isLine: isLine = false, onClick }: ProfileImgProps) {
  const borderRoundWidth = isLine ? width - 5 : width;
  const borderRoundheight = isLine ? height - 5 : height;
  const cursor = onClick ? 'pointer' : 'default';

  const onClickProfileImg = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <div onClick={onClickProfileImg} className='relative rounded-[100]' style={{ width: `${width}px`, height: `${height}px`, cursor: cursor }}>
      <Image fill className='rounded-[100] bg-black object-cover' src={src} alt='프로필 이미지' />
      <div
        className='border-soild absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[100] border border-gray-300'
        style={{ width: `${borderRoundWidth}px`, height: `${borderRoundheight}px` }}
      ></div>
    </div>
  );
}
