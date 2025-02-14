import { WineListResponse } from '@/types/wine';

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
    throw new Error('Failed to fetch wines');
  }

  return res.json();
}
