'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  readOnly = true,
  onChange,
  className,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const containerClasses = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(null);
  };

  const handleClick = (index: number) => {
    if (readOnly) return;
    onChange?.(index);
  };

  return (
    <div 
      className={cn('flex', containerClasses[size], className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverValue !== null ? starValue <= hoverValue : starValue <= value);
        
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              'transition-all duration-200',
              isFilled ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600',
              !readOnly && 'cursor-pointer hover:scale-110'
            )}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
}