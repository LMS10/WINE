import { RecentReview } from './review';

export type Wine = {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  avgRating: number;
  reviewCount: number;
  recentReview?: RecentReview;
  userId: number;
};

export type WineListResponse = {
  totalCount: number;
  nextCursor: number | null;
  list: Wine[];
};
