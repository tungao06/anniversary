/**
 * Button Component
 * Reusable button with multiple variants
 */

'use client';

import type { ButtonProps } from './types';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-500 shadow-md hover:shadow-lg',
    secondary:
      'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500 shadow-md hover:shadow-lg',
    outline:
      'border-2 border-pink-500 text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 focus:ring-pink-500',
    ghost:
      'text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 focus:ring-pink-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

