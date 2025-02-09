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
