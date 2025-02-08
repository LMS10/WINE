'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { ReviewData } from '@/types/review-data';
import WineDetail from './_components/WineDetail';
import ReviewTasteAverage from './_components/ReviewTasteAverage';
import ReviewAroma from './_components/ReviewAroma';

export default function Page() {
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

  const wineId = typeof id === 'string' ? id : '';
  if (!id) {
    return <div>잘못된 요청입니다.</div>;
  }

  const calculateAverage = (reviews: ReviewData['reviews']) => {
    if (!reviews || reviews.length === 0) {
      return { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 };
    }

    const total = reviews.reduce(
      (acc, review) => {
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

    return average;
  };

  const averages = calculateAverage(reviews);

  const getTopThreeAromas = (reviews: ReviewData['reviews']) => {
    const aromaCounts: { [key: string]: number } = {};

    reviews.forEach((review) => {
      review.aroma.forEach((aroma) => {
        if (aromaCounts[aroma]) {
          aromaCounts[aroma]++;
        } else {
          aromaCounts[aroma] = 1;
        }
      });
    });

    const topThreeAromas = Object.entries(aromaCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map((item) => item[0]);

    return topThreeAromas;
  };

  const topThreeAromas = getTopThreeAromas(reviews);

  return (
    <div className='mx-auto mb-[100px] w-full max-w-[1140px] pt-[62px] tablet:mx-auto tablet:max-w-[1050px] mobile:mx-auto mobile:min-w-[343px] mobile:max-w-[752px] mobile:pt-[29px]'>
      <div className='mx-auto h-[260px] w-[1140px] tablet:mx-6 tablet:h-auto tablet:w-auto tablet:min-w-[700px] tablet:max-w-[1000px] mobile:mx-5 mobile:min-w-[343px] mobile:max-w-[700px]'>
        <WineDetail wineId={wineId} />
      </div>
      <div className='mb-[60px] mt-[60px] flex gap-[60px]'>
        <div>
          <ReviewTasteAverage
            count={reviews.length}
            lightBold={averages.lightBold}
            smoothTannic={averages.smoothTannic}
            drySweet={averages.drySweet}
            softAcidic={averages.softAcidic}
            isDraggable={false}
          />
        </div>
        <ReviewAroma count={reviews.length} selectedAroma={topThreeAromas} />
      </div>
    </div>
  );
}
