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
    'glass-strong rounded-2xl backdrop-blur-xl shadow-lg border border-white/20';

  const hoverStyles = hover
    ? 'transition-all duration-300 cursor-pointer hover:shadow-2xl hover:scale-[1.02] hover:border-love-200/50'
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

