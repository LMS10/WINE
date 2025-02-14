import Image from 'next/image';
import { useEffect, useState } from 'react';
import profileDefault from '@/assets/icons/profile_default.svg';
import likeIcon from '@/assets/icons/like.svg';
import likeFilledIcon from '@/assets/icons/like_filled.svg';
import starIcon from '@/assets/icons/star_hover.svg';
import lessIcon from '@/assets/icons/less.svg';
import moreIcon from '@/assets/icons/more.svg';
import { fetchWithAuth } from '@/lib/auth';
import { MyReview, ReviewData } from '@/types/review-data';
import { aromaTraslations } from '@/constants/aromaTranslation';
import elapsedTime from '@/utils/formatDate';
import ProfileImg from '@/components/ProfileImg';
import ReviewTasteItem from './ReviewTasteItem';
import ReviewDropdown from './ReviewDropdown';
import { EditReviewData } from './ReviewContainer';

type ReviewItemProps = {
  review: ReviewData['reviews'][0];
  wineName: string;
  reviewInitialData: MyReview;
  editMyReview: (id: number, editReviewData: EditReviewData, updatedAt: string) => void;
  deleteMyReview: (id: number) => void;
};

export default function ReviewItem({ review, wineName, reviewInitialData, editMyReview, deleteMyReview }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [liked, setLiked] = useState(review.isLiked || false);
  const [loading, setLoading] = useState(false);
  const [isMyReview, setIsMyReview] = useState(false);
  const [reviewData, setReviewData] = useState(review);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`);

        if (userResponse && userResponse.ok) {
          const userData = await userResponse.json();
          setIsMyReview(userData.id === review.user.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsMyReview(false);
      }
    };
    fetchUserData();
  }, [review.user.id]);

  const handleLikeToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${review.id}/like`, {
        method: liked ? 'DELETE' : 'POST',
      });

      if (response?.ok) {
        setLiked((prevLiked) => !prevLiked);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number, editReviewData: EditReviewData, updatedAt: string) => {
    editMyReview(review.id, editReviewData, updatedAt);

    setReviewData((prev) => ({
      ...prev,
      ...editReviewData,
      updatedAt,
    }));
  };

  const handleDelete = () => {
    deleteMyReview(reviewData.id);
  };

  return (
    <div className='mb-[20px] min-h-[200px] rounded-2xl border-[1px] border-solid border-gray-300 pb-[20px] pl-[40px] pr-[40px] pt-[30px] hover:shadow-lg pc:w-[800px] tablet:max-w-[1100px] mobile:mb-[16px] mobile:px-[30px] mobile:py-[30px]'>
      <div className='mb-[20px] flex justify-between'>
        <div className='flex gap-[16px]'>
          <ProfileImg src={review.user.image || profileDefault} size='medium' />
          <div>
            <div className='pb-[4px] text-2lg font-semibold text-gray-800 mobile:text-lg mobile:leading-5'>{review.user.nickname}</div>
            <div className='text-lg font-normal text-gray-500 mobile:text-md mobile:leading-none'>{elapsedTime(review.updatedAt || review.createdAt)}</div>
          </div>
        </div>
        <div className='flex'>
          <div>
            {!isMyReview && (
              <button className='transform transition-transform duration-200 hover:scale-110' onClick={handleLikeToggle}>
                <Image src={liked ? likeFilledIcon : likeIcon} width={38} height={38} alt={liked ? '좋아요 취소' : '좋아요'} className='mobile:h-[32px] mobile:w-[32px]' />
              </button>
            )}
          </div>
          <div className='cursor-pointer'>
            {isMyReview && <ReviewDropdown wineName={wineName} id={review.id} reviewInitialData={reviewInitialData} editMyReview={handleEdit} deleteMyReview={handleDelete} />}
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-wrap'>
          {review.aroma.map((item, index) => (
            <div
              key={index}
              className='mb-[7px] mr-[10px] inline-block rounded-full border-[1px] border-solid border-gray-300 px-[15px] py-[8px] text-lg mobile:px-[10px] mobile:py-[6px] mobile:text-md'
            >
              {aromaTraslations[item.toUpperCase()] || item}
            </div>
          ))}
        </div>
        <div className='flex h-[42px] items-center gap-[4.5px] rounded-[10px] bg-purple-10 px-[15px] py-[8px] mobile:h-[36px] mobile:w-[auto] mobile:flex-shrink-0 mobile:flex-grow-0 mobile:flex-row mobile:p-[10px]'>
          <div>
            <Image src={starIcon} className='mobile:h-[16px] mobile:w-[16px]' width={20} height={20} style={{ width: 'auto', height: 'auto' }} alt='별점' />
          </div>
          <div className='text-2lg font-bold text-purple-100 mobile:text-md mobile:leading-none'>{review.rating.toFixed(1)}</div>
        </div>
      </div>
      <div className={`overflow-hidden transition-[max-height] duration-300 ${isOpen ? 'max-h-[1000px]' : 'max-h-0'} w-full`}>
        {isOpen && (
          <div className='mt-[24px] mobile:mt-[16px]'>
            <div className='mb-[20px] text-lg tablet:mb-[24px] mobile:mb-[16px] mobile:text-md'>{review.content}</div>
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
