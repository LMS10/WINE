import { WineListResponse } from '@/types/wine';
import { fetchWithAuth } from './auth';

export async function fetchMyWine(limit: number, cursor?: number): Promise<WineListResponse> {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  if (cursor) params.append('cursor', cursor.toString());
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/wines?${params.toString()}`);

    if (!response?.ok || response === null) {
      throw new Error('와인 데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`와인 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
