'use client';

import Image, { StaticImageData } from 'next/image';

interface ProfileImgProps {
  src: StaticImageData;
  width: number;
  height: number;
  isLine?: boolean;
  onClick?: () => void;
}

export default function ProfileImg({ src, width, height, isLine = false, onClick }: ProfileImgProps) {
  const borderRoundWidth = isLine ? width - 5 : width;
  const borderRoundHeight = isLine ? height - 5 : height;
  const cursor = onClick ? 'cursor-pointer' : 'cursor-default';

  const onClickProfileImg = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <div onClick={onClickProfileImg} className={`relative rounded-full ${cursor} h-[${width}px] w-[${height}px]`}>
      <Image fill className='rounded-[100] bg-black object-cover' src={src} alt='프로필 이미지' />
      <div
        className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[100] border border-solid border-gray-300 h-[${borderRoundWidth}px] w-[${borderRoundHeight}px]`}
      ></div>
      {}
    </div>
  );
}
