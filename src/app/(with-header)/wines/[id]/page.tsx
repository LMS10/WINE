// 'use client';
// import { useState, useEffect } from 'react';
// // import ReviewListTasteItem from './_components/ReviewListTasteItem';
// import { ReviewData } from '@/types/review-data';
// import { useAuth } from '@/app/context/auth-context';
// import { useParams } from 'next/navigation';
import Modal from './_components/Modal';
import ReviewList from './_components/ReviewListContainer';
import ReviewTaste from './_components/ReviewTaste';
// import ReviewTaste from './_components/ReviewTaste';

export default function Page() {
  // const { isLoggedIn } = useAuth();
  // const { id } = useParams();
  // const [reviews, setReviews] = useState<ReviewData['reviews']>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     if (!isLoggedIn) {
  //       setError('로그인 후 이용 가능합니다.');
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  //       if (!token) {
  //         setError('액세스 토큰이 없습니다.');
  //         setLoading(false);
  //         return;
  //       }

  //       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error(`Review fetch failed: ${response.statusText}`);
  //       }

  //       const data: ReviewData = await response.json();
  //       setReviews(data.reviews || []);
  //       console.log(data.reviews);
  //       setLoading(false);
  //     } catch (error: unknown) {
  //       if (error instanceof Error) setError(`Error fetching reviews: ${error.message}`);
  //       setLoading(false);
  //     }
  //   };

  //   if (isLoggedIn && id) {
  //     fetchReviews();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [id, isLoggedIn]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <>
      <ReviewList />
      <ReviewTaste />
      <Modal />
    </>
  );
  // <div>{reviews.length === 0 ? <div>리뷰가 없습니다.</div> : reviews.map((review, index) => <ReviewListTasteItem key={index} review={review} />)}</div>;
}
