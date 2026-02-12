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
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary:
      'bg-gradient-to-r from-love-400 to-lavender-400 text-white hover:from-love-500 hover:to-lavender-500 focus:ring-love-300 shadow-lg hover:shadow-xl hover:shadow-love-300/50 transition-all duration-300',
    secondary:
      'bg-gradient-to-r from-lavender-400 to-peach-300 text-white hover:from-lavender-500 hover:to-peach-400 focus:ring-lavender-300 shadow-lg hover:shadow-xl transition-all duration-300',
    outline:
      'border-2 border-love-300 bg-white/40 text-love-600 hover:bg-love-50/50 backdrop-blur-md focus:ring-love-300 transition-all duration-300',
    ghost:
      'text-love-500 hover:bg-love-50/50 focus:ring-love-300 transition-all duration-300',
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

