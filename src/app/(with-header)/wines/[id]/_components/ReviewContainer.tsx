'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchWithAuth } from '@/lib/auth';
import { ReviewData } from '@/types/review-data';
import { calculateTasteAverage, getTopThreeAromas } from '@/utils/ReviewUtils';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';

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
  if (!reviews.length) return <p>리뷰가 없습니다</p>;

  const averages = calculateTasteAverage(reviews);
  const topThreeAromas = getTopThreeAromas(reviews);

  return (
    <div>
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
    </div>
  );
}
