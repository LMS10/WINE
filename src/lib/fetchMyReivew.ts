import { MyReviewResponse } from '@/types/review-data';
import { fetchWithAuth } from './auth';

export async function fetchMyReview(): Promise<MyReviewResponse> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/reviews?limit=30`);

    if (!response?.ok || response === null) {
      throw new Error('리뷰 데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`리뷰 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}

export async function fetchDeleteReview(id: number): Promise<number | undefined> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${id}`, {
      method: 'DELETE',
    });

    if (!response?.ok || response === null) {
      throw new Error('리뷰 삭제에 실패했습니다');
    }

    const body = await response.json();
    return body.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`리뷰 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
