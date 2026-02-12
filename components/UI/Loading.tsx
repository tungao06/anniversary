/**
 * Loading Component
 * Loading spinner with optional text
 */

import type { LoadingProps } from './types';

export default function Loading({
  size = 'md',
  text,
  className = '',
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-pink-500 border-t-transparent`}
      />
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {text}
        </p>
      )}
    </div>
  );
}

