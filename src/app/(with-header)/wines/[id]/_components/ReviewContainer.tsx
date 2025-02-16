'use client';
import { useState, useEffect } from 'react';
import { calculateTasteAverage, getTopThreeAromas, calculateRatingCount } from '@/utils/ReviewUtils';
import { ReviewData } from '@/types/review-data';
import { EditReviewData } from '@/types/review-data';
import { AddReviewData } from '@/types/review-data';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';
import ReviewItem from './ReviewItem';
import ReviewRating from './ReviewRating';
import NoReview from './NoReview';

function ReviewList({
  reviews,
  wineName,
  deleteMyReview,
  editMyReview,
}: {
  reviews: ReviewData['reviews'];
  wineName: string;
  deleteMyReview: (id: number) => void;
  editMyReview: (id: number, editReviewData: EditReviewData, updatedAt: string) => void;
}) {
  return (
    <div>
      <div className='mb-[30px] text-xl font-bold'>리뷰 목록</div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} wineName={wineName} reviewInitialData={review} editMyReview={editMyReview} deleteMyReview={deleteMyReview} />
      ))}
    </div>
  );
}

export default function ReviewContainer({ data }: { data: ReviewData }) {
  const { reviews, avgRating } = data;
  const [localReviews, setLocalReviews] = useState(reviews);
  const [averageRating, setAverageRating] = useState(avgRating);

  useEffect(() => {
    setAverageRating(data.avgRating);
  }, [data.avgRating]);

  const recalculateAverageRating = (reviews: ReviewData['reviews']) => {
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const deleteMyReview = (id: number) => {
    setLocalReviews((prevReviews) => {
      const updatedReviews = prevReviews.filter((review) => review.id !== id);
      setAverageRating(recalculateAverageRating(updatedReviews));
      return updatedReviews;
    });
  };

  const editMyReview = (id: number, editReviewData: EditReviewData, updatedAt: string) => {
    setLocalReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) => (review.id === id ? { ...review, ...editReviewData, updatedAt } : review));
      setAverageRating(recalculateAverageRating(updatedReviews));
      return updatedReviews;
    });
  };

  const addReview = (newReview: AddReviewData) => {
    const formattedReview = {
      ...newReview,
      id: newReview.reviewId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wine: { id: data.id, name: data.name, image: '', avgRating: 0 },
      isLiked: false,
    };

    setLocalReviews((prevReviews) => {
      const updatedReviews = [formattedReview, ...prevReviews];
      setAverageRating(recalculateAverageRating(updatedReviews));
      return updatedReviews;
    });
  };

  const averages = calculateTasteAverage(localReviews);
  const topThreeAromas = getTopThreeAromas(localReviews);
  const ratingPercentages = calculateRatingCount(localReviews);

  return (
    <div>
      {localReviews.length > 0 ? (
        <div className='mb-[100px] mt-[60px] w-full'>
          <div className='mx-auto w-full max-w-[1140px] transition-all duration-300 ease-in-out tablet:max-w-[1000px] mobile:max-w-[700px]'>
            <div className='grid grid-cols-2 gap-8 tablet:grid-cols-1 tablet:px-6 mobile:grid-cols-1 mobile:px-6'>
              <ReviewTasteAverage
                count={localReviews.length}
                lightBold={averages.lightBold}
                smoothTannic={averages.smoothTannic}
                drySweet={averages.drySweet}
                softAcidic={averages.softAcidic}
                isDraggable={false}
              />
              <ReviewAroma selectedAroma={topThreeAromas} count={localReviews.length} />
            </div>

            <div className='mt-[60px] flex justify-between gap-[60px] tablet:flex-col-reverse tablet:px-6'>
              <div>
                <ReviewList reviews={localReviews} wineName={data.name} deleteMyReview={deleteMyReview} editMyReview={editMyReview} />
              </div>
              <div className='relative'>
                <div className='sticky top-28'>
                  <ReviewRating avgRating={averageRating} count={localReviews.length} ratingPercentages={ratingPercentages} addReview={addReview} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto mt-[60px] w-full pc:max-w-[1140px] tablet:max-w-[1000px] tablet:px-6 mobile:max-w-[700px]'>
          <div className='mb-[30px] text-xl font-bold'>리뷰 목록</div>
          <NoReview addReview={addReview} />
        </div>
      )}
    </div>
  );
}
