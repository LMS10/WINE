import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface StaticRatingProps {
  value: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function StaticRating({ value, size = 'large', className }: StaticRatingProps) {
  return (
    <Rating
      value={Math.round(value * 10) / 10}
      precision={0.1}
      readOnly
      size={size}
      className={className}
      icon={<StarIcon sx={{ color: '#6A42DB', fontSize: size === 'large' ? '24px' : size === 'medium' ? '18px' : '14px' }} />}
      emptyIcon={<StarIcon sx={{ color: '#CFDBEA', fontSize: size === 'large' ? '24px' : size === 'medium' ? '18px' : '14px' }} />}
    />
  );
}
