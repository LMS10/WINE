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
    likes: boolean[];
  }[];
}

export interface MyReviewResponse {
  list: MyReview[];
  totalCount: number;
  nextCursor: string | null;
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
