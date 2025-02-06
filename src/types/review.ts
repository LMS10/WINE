export type RecentReview = {
  user: {
    id: number;
    nickname: string;
    image: string;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: string[];
  rating: number;
  id: number;
};
