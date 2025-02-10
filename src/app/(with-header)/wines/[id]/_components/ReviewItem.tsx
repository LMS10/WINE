import likeIcon from '@/assets/icons/like.svg';
import menuIcon from '@/assets/icons/menu.svg';
import starIcon from '@/assets/icons/star_hover.svg';
import lessIcon from '@/assets/icons/less.svg';
import moreIcon from '@/assets/icons/more.svg';
import { ReviewData } from '@/types/review-data';
import ReviewTasteItem from './ReviewTasteItem';
import ProfileImg from '@/components/ProfileImg';
import Image from 'next/image';
import { useState } from 'react';
import elapsedTime from '@/utils/formatDate';
import { aromaTraslations } from '@/constants/aromaTranslation';

type ReviewItemProps = { review: ReviewData['reviews'][0] };

export default function ReviewItem({ review }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='mb-[20px] min-h-[200px] w-[800px] rounded-2xl border-[1px] border-solid border-gray-300 pb-[20px] pl-[40px] pr-[40px] pt-[30px] hover:shadow-lg'>
      <div className='mb-[20px] flex justify-between'>
        <div className='flex gap-[16px]'>
          <ProfileImg src={review.user.image} size='medium' />
          <div>
            <div className='pb-[4px] text-2lg font-semibold text-gray-800'>{review.user.nickname}</div>
            <div className='text-lg font-normal text-gray-500'>{elapsedTime(review.createdAt)}</div>
          </div>
        </div>
        <div className='flex gap-[24px]'>
          <div>
            <Image src={likeIcon} width={38} height={38} alt='좋아요' />
          </div>
          <div>
            <Image src={menuIcon} width={38} height={38} alt='메뉴' />
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          {review.aroma.map((item, index) => (
            <div key={index} className='mr-[10px] inline-block rounded-full border-[1px] border-solid border-gray-300 px-[15px] py-[8px] text-md'>
              {aromaTraslations[item.toUpperCase()] || item}
            </div>
          ))}
        </div>
        <div className='flex items-center gap-[4.5px] rounded-[10px] bg-purple-10 px-[15px] py-[8px]'>
          <div>
            <Image src={starIcon} width={20} height={20} alt='별점' />
          </div>
          <div className='text-lg font-bold text-purple-100'>{review.rating.toFixed(1)}</div>
        </div>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        {isOpen && (
          <div className='mt-[24px]'>
            <div className='mb-[20px] text-lg'>{review.content}</div>
            <ReviewTasteItem isDraggable={false} lightBold={review.lightBold} smoothTannic={review.smoothTannic} drySweet={review.drySweet} softAcidic={review.softAcidic} />

            <button className='mt-[10px] flex w-full items-center justify-center' onClick={() => setIsOpen(!isOpen)}>
              <Image src={isOpen ? lessIcon : moreIcon} width={30} height={30} alt={isOpen ? '접기' : '펼치기'} />
            </button>
          </div>
        )}
      </div>

      {!isOpen && (
        <button className='mt-[10px] flex w-full items-center justify-center' onClick={() => setIsOpen(true)}>
          <Image src={moreIcon} width={30} height={30} alt='펼치기' />
        </button>
      )}
    </div>
  );
}
