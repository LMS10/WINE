'use client';
import { useState, useEffect } from 'react';
import { ReviewData } from '@/types/review-data';
import { useAuth } from '@/app/context/auth-context';
import { useParams } from 'next/navigation';
import ReviewTasteItem from './ReviewTasteItem';

export default function ReviewTaste() {
  const { isLoggedIn } = useAuth();
  const { id } = useParams();
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
        console.log(data.reviews);
        setReviews(data.reviews);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) setError(`Error fetching reviews: ${error.message}`);
        setLoading(false);
      }
    };

    if (isLoggedIn && id) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [id, isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // 평균 계산하기
  const calculateAverage = (reviews: ReviewData['reviews']) => {
    if (!reviews || reviews.length === 0) {
      return { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 }; // 빈 배열일 경우 기본값 반환
    }
    console.log(reviews);

    const total = reviews.reduce(
      (acc, review) => {
        console.log(review);
        acc.lightBold += review.lightBold;
        acc.smoothTannic += review.smoothTannic;
        acc.drySweet += review.drySweet;
        acc.softAcidic += review.softAcidic;
        return acc;
      },
      { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 },
    );

    const count = reviews.length;

    const average = {
      lightBold: total.lightBold / count,
      smoothTannic: total.smoothTannic / count,
      drySweet: total.drySweet / count,
      softAcidic: total.softAcidic / count,
    };
    console.log(average);

    return average;
  };

  const averages = calculateAverage(reviews);

  return (
    <div>
      <div>리뷰 평균</div>
      <div>
        리뷰 총 개수
        {reviews.length}
      </div>
      <ReviewTasteItem lightBold={averages.lightBold} smoothTannic={averages.smoothTannic} drySweet={averages.drySweet} softAcidic={averages.softAcidic} isDraggable={false} />
    </div>
  );
}
