'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Wine } from '@/types/wine';
import RecommendWineCard from './RecommendWineCard';
import rightArrowIcon from '@/assets/icons/right_arrow.svg';
import leftArrowIcon from '@/assets/icons/left_arrow.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RecommendWineContainer() {
  const [recommendedList, setRecommendedList] = useState<Wine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function getRecommendWines() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/recommended?limit=8`, {
          next: { revalidate: 1800 },
        });
        const wines: Wine[] = await response.json();
        setRecommendedList(wines);
      } catch (error) {
        console.error('추천 와인 목록을 가져오는 중 오류 발생:', error);
      }
    }
    getRecommendWines();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    variableWidth: true,
    afterChange: (index: number) => setCurrentIndex(index),
    nextArrow: currentIndex < recommendedList.length - 1 ? <NextArrowButton /> : undefined,
    prevArrow: <PrevArrowButton disabled={currentIndex === 0} />,
  };

  return (
    <section>
      <div className=''>
        <div className='flex h-[299px] flex-col gap-[30px] overflow-hidden rounded-2xl bg-gray-100 p-[30px] pr-0 mobile:h-[241px] mobile:gap-5 mobile:p-[20px] mobile:pr-0'>
          <p className='text-[20px] font-bold leading-[23px] text-gray-800 mobile:text-[18px] mobile:leading-[21px]'>이번 달 추천 와인</p>
          <div className='relative'>
            <Slider {...settings}>
              {recommendedList.map((wine, idx) => (
                <div key={idx} className='pr-[15px] mobile:pr-[10px]'>
                  <RecommendWineCard key={wine.id} id={wine.id} image={wine.image} name={wine.name} avgRating={wine.avgRating} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ArrowProps {
  onClick?: () => void;
  disabled?: boolean;
}

function NextArrowButton({ onClick }: ArrowProps) {
  return (
    <button className='absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white' onClick={onClick}>
      <Image src={rightArrowIcon} alt='다음' width={24} height={24} />
    </button>
  );
}

function PrevArrowButton({ onClick, disabled }: ArrowProps) {
  return (
    <button
      className={`absolute left-[-10px] top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white transition-opacity ${
        disabled ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      <Image src={leftArrowIcon} alt='이전' width={24} height={24} />
    </button>
  );
}
