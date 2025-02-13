import { ReviewData } from '@/types/review-data';
import { fetchWithAuth } from './auth';

export const fetchWineDetail = async (id: number): Promise<ReviewData> => {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
      method: 'GET',
    });

    if (!response) {
      throw new Error('로그인 후, 이용해 주세요.');
    }

    if (!response.ok) {
      throw new Error('와인 상세 정보를 불러오는 데 실패했습니다.');
    }

    const data: ReviewData = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`와인 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
