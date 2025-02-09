import { ReviewData } from '@/types/review-data';

export const calculateTasteAverage = (reviews: ReviewData['reviews']) => {
  if (!reviews || reviews.length === 0) {
    return { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 };
  }

  const total = reviews.reduce(
    (acc, review) => {
      acc.lightBold += review.lightBold;
      acc.smoothTannic += review.smoothTannic;
      acc.drySweet += review.drySweet;
      acc.softAcidic += review.softAcidic;
      return acc;
    },
    { lightBold: 0, smoothTannic: 0, drySweet: 0, softAcidic: 0 },
  );

  const count = reviews.length;

  const average = {
    lightBold: total.lightBold / count,
    smoothTannic: total.smoothTannic / count,
    drySweet: total.drySweet / count,
    softAcidic: total.softAcidic / count,
  };

  return average;
};

export const getTopThreeAromas = (reviews: ReviewData['reviews']) => {
  const aromaCounts: { [key: string]: number } = {};

  reviews.forEach((review) => {
    review.aroma.forEach((aroma) => {
      if (aromaCounts[aroma]) {
        aromaCounts[aroma]++;
      } else {
        aromaCounts[aroma] = 1;
      }
    });
  });

  const topThreeAromas = Object.entries(aromaCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((item) => item[0]);

  return topThreeAromas;
};

export const calculateRatingCount = (reviews: ReviewData['reviews']) => {
  const ratingCount = [0, 0, 0, 0, 0];

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCount[review.rating - 1]++;
    }
  });

  const totalReviews = reviews.length;
  const ratingPercentages = ratingCount.map((count) => (count / totalReviews) * 100);
  return ratingPercentages;
};
