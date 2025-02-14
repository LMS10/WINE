'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWineDetail } from '@/lib/fetchWineDetail';
import { ReviewData } from '@/types/review-data';
import { calculateTasteAverage, getTopThreeAromas, calculateRatingCount } from '@/utils/ReviewUtils';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';
import ReviewItem from './ReviewItem';
import ReviewRating from './ReviewRating';
import NoReview from './NoReview';

export interface AddReviewData {
  reviewId: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  wineId: number;
  wineName: string;
}

export interface EditReviewData {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}

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

export default function ReviewContainer() {
  const { id } = useParams();
  const wineId = typeof id === 'string' ? Number(id) : NaN;
  const [reviews, setReviews] = useState<ReviewData['reviews']>([]);
  const [wineName, setWineName] = useState<string>('');
  const [avgRating, setAvgRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [myReviewData, setMyReviewData] = useState<ReviewData['reviews']>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (isNaN(wineId)) {
        setError('유효한 와인 ID가 아닙니다.');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchWineDetail(wineId);
        setWineName(data.name);
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
        setMyReviewData(data.reviews);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (wineId) {
      fetchReviews();
    }
  }, [wineId]);

  const deleteMyReview = (id: number) => {
    const updatedReviewList = myReviewData.filter((value) => value.id !== id);
    setMyReviewData(updatedReviewList);

    const updatedReviews = reviews.filter((value) => value.id !== id);
    setReviews(updatedReviews);
  };

  const editMyReview = (id: number, editReviewData: EditReviewData, updatedAt: string) => {
    const updatedReviewList = myReviewData.map((value) => {
      if (value.id === id) {
        return { ...value, ...editReviewData, updatedAt: updatedAt };
      }
      return value;
    });
    setMyReviewData(updatedReviewList);

    const updatedReviews = reviews.map((value) => {
      if (value.id === id) {
        return { ...value, ...editReviewData, updatedAt: updatedAt };
      }
      return value;
    });
    setReviews(updatedReviews);
  };

  const addReview = (newReview: AddReviewData) => {
    const formattedReview = {
      ...newReview,
      id: newReview.reviewId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wine: { id: wineId, name: wineName, image: '', avgRating: 0 },
      isLiked: false,
    };

    setReviews((prevReviews) => [formattedReview, ...prevReviews]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const averages = calculateTasteAverage(reviews);
  const topThreeAromas = getTopThreeAromas(reviews);
  const ratingPercentages = calculateRatingCount(reviews);
  return (
    <div>
      {reviews.length > 0 ? (
        <div className='mb-[100px] mt-[60px] w-full'>
          <div className='mx-auto w-full max-w-[1140px] transition-all duration-300 ease-in-out tablet:max-w-[1000px] mobile:max-w-[700px]'>
            <div className='grid grid-cols-2 gap-8 tablet:grid-cols-1 tablet:px-6 mobile:grid-cols-1 mobile:px-6'>
              <ReviewTasteAverage
                count={reviews.length}
                lightBold={averages.lightBold}
                smoothTannic={averages.smoothTannic}
                drySweet={averages.drySweet}
                softAcidic={averages.softAcidic}
                isDraggable={false}
              />
              <ReviewAroma selectedAroma={topThreeAromas} count={reviews.length} />
            </div>

            <div className='mt-[60px] flex justify-between gap-[60px] tablet:flex-col-reverse tablet:px-6'>
              <div>
                <ReviewList reviews={reviews} wineName={wineName} deleteMyReview={deleteMyReview} editMyReview={editMyReview} />
              </div>
              <div className='relative'>
                <div className='sticky top-28'>
                  <ReviewRating avgRating={avgRating} count={reviews.length} ratingPercentages={ratingPercentages} addReview={addReview} />
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
