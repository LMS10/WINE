import { ReviewData } from '@/types/review-data';
import { fetchWithAuth } from './auth';

export const fetchWineDetail = async (id: number): Promise<ReviewData> => {
  try {
    const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/${id}`, {
      method: 'GET',
    });

    if (!response) {
      throw new Error('UNAUTHORIZED');
    }

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('NOT_FOUND');
      }
      throw new Error('FETCH_ERROR');
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('UNKNOWON_ERROR');
  }
};
