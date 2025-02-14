import { RecentReview } from './review';

export const RED = 'RED';
export const WHITE = 'WHITE';
export const SPARKLING = 'SPARKLING';

export type WineType = typeof RED | typeof WHITE | typeof SPARKLING;

export interface WineDetails {
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
}

export interface Wine {
  id: number;
  name: string;
  image: string;
  avgRating: number;
}

export interface RecommendWineListResponse {
  totalCount: number;
  nextCursor: number | null;
  list: Wine[];
}

export interface WineListResponse {
  totalCount: number;
  nextCursor: number | null;
  list: WineDetails[];
}
