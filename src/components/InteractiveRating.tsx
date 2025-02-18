import { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface InteractiveRatingProps {
  initialValue?: number;
  onChange: (newValue: number) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  resetTrigger?: boolean;
}

export default function InteractiveRating({ initialValue = 0, onChange, size = 'large', className = '', resetTrigger = false }: InteractiveRatingProps) {
  const [value, setValue] = useState<number | null>(initialValue);

  useEffect(() => {
    if (!initialValue) {
      setValue(0);
    }
  }, [resetTrigger, initialValue]);

  useEffect(() => {
    setValue(initialValue);
  }, [resetTrigger, initialValue]);

  return (
    <Rating
      value={value}
      precision={1}
      onChange={(_, newValue) => {
        setValue(newValue);
        if (newValue !== null) {
          onChange(newValue);
        } else if (newValue === null) {
          onChange(0);
        }
      }}
      size={size}
      className={className}
      icon={<StarIcon sx={{ color: '#6A42DB', fontSize: size === 'large' ? '32px' : size === 'medium' ? '24px' : '18px' }} />}
      emptyIcon={<StarIcon sx={{ color: '#CFDBEA', fontSize: size === 'large' ? '32px' : size === 'medium' ? '24px' : '18px' }} />}
    />
  );
}
