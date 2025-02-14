import { Wine } from '@/types/wine';

export async function fetchRecommendWine(): Promise<Wine[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wines/recommended?limit=8`, {
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error('추천 와인 목록을 가져오는 데 실패했습니다.');
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
