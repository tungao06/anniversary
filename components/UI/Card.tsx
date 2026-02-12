/**
 * Card Component
 * Reusable card container
 */

'use client';

import type { CardProps } from './types';

export default function Card({
  children,
  className = '',
  onClick,
  hover = false,
}: CardProps) {
  const baseStyles =
    'rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700';

  const hoverStyles = hover
    ? 'transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02]'
    : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

