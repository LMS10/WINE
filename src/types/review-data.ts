import { Wine } from './wine';

export interface ReviewData {
  avgRating: number;
  reviews: {
    id: number;
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    isLiked: boolean;
  }[];
}

export interface MyReviewResponse {
  list: MyReview[];
  totalCount: number;
  nextCursor: number | null;
}

export interface MyReview {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  wine: Wine;
}
