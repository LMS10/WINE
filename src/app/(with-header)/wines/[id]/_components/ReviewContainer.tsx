'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import { ReviewData } from '@/types/review-data';
import { calculateTasteAverage, getTopThreeAromas } from '@/utils/ReviewUtils';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';
import ReviewItem from './ReviewItem';

function ReviewList({ reviews }: { reviews: ReviewData['reviews'] }) {
  return (
    <div>
      <div className='mb-[30px] text-xl font-bold'>리뷰 목록</div>
      <div>{reviews.length === 0 ? <p>작성된 리뷰가 없어요</p> : reviews.map((review) => <ReviewItem key={review.id} review={review} />)}</div>
    </div>
  );
}

export default function ReviewContainer() {
  const { id } = useParams();
  const [reviews, setReviews] = useState<ReviewData['reviews']>([]);
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

  return (
    <div>
      {reviews.length > 0 && (
        <div className='flex gap-[60px]'>
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
      )}
      <div className='mt-[60px] flex gap-[60px]'>
        <div>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
