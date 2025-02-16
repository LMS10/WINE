import { WineListResponse } from '@/types/wine';
import { fetchWithAuth } from './auth';

interface FetchWinesParams {
  limit: number;
  cursor?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

export async function fetchWines({ limit, cursor, type, minPrice, maxPrice, rating, name }: FetchWinesParams): Promise<WineListResponse> {
  const params = new URLSearchParams();
  params.append('limit', limit.toString());
  if (cursor) params.append('cursor', cursor.toString());
  if (type) params.append('type', type.toUpperCase());
  if (minPrice) params.append('minPrice', minPrice.toString());
  if (maxPrice) params.append('maxPrice', maxPrice.toString());
  if (rating) params.append('rating', rating.toString());
  if (name) params.append('name', name);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines?${params.toString()}`);

  if (!res.ok) {
    throw new Error('와인 목록을 가져오는 데 실패했습니다.');
  }

  return res.json();
}

export async function fetchDeleteWine(id: number): Promise<number | undefined> {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
      method: 'DELETE',
    });

    if (!response?.ok || response === null) {
      throw new Error('와인 삭제에 실패했습니다');
    }

    const body = await response.json();
    return body.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 데이터 로드 실패: ${error.message}`);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
