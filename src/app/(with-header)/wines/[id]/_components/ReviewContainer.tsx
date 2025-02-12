'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import { ReviewData } from '@/types/review-data';
import { calculateTasteAverage, getTopThreeAromas, calculateRatingCount } from '@/utils/ReviewUtils';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';
import ReviewItem from './ReviewItem';
import ReviewRating from './ReviewRating';
import NoReview from './NoReview';

function ReviewList({ reviews }: { reviews: ReviewData['reviews'] }) {
  return (
    <div>
      <div className='mb-[30px] text-xl font-bold'>리뷰 목록</div>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

export default function ReviewContainer() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<ReviewData['reviews']>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
          method: 'GET',
        });

        if (!response) {
          setError('로그인 상태가 아니거나, 토큰 갱신에 실패했습니다.');
          setLoading(false);
          return;
        }

        const data: ReviewData = await response.json();
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`Error fetching reviews: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [id]);

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
                <ReviewList reviews={reviews} />
              </div>
              <div className='relative'>
                <div className='sticky top-28'>
                  <ReviewRating avgRating={avgRating} count={reviews.length} ratingPercentages={ratingPercentages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto mt-[60px] max-w-[1140px]'>
          <div className='mb-[30px] text-xl font-bold'>리뷰 목록</div>
          <NoReview />
        </div>
      )}
    </div>
  );
}
