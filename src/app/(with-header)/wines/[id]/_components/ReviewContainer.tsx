'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { ReviewData } from '@/types/review-data';
import { calculateTasteAverage, getTopThreeAromas } from '@/utils/ReviewUtils';
import ReviewTasteAverage from './ReviewTasteAverage';
import ReviewAroma from './ReviewAroma';

export default function ReviewContainer() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [reviews, setReviews] = useState<ReviewData['reviews']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!isLoggedIn) {
        setError('로그인 후 이용 가능합니다.');
        setLoading(false);
        return;
      }

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        if (!token) {
          setError('액세스 토큰이 없습니다.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Review fetch failed: ${response.statusText}`);
        }

        const data: ReviewData = await response.json();
        setReviews(data.reviews);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`Error fetching reviews: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && id) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

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
