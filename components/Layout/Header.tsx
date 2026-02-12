/**
 * Header Component
 * Page header with title and subtitle
 */

import type { HeaderProps } from './types';

export default function Header({
  title,
  subtitle,
  className = '',
}: HeaderProps) {
  return (
    <header className={`py-8 text-center ${className}`}>
      {title && (
        <h1 className="mb-4 font-elegant text-5xl font-normal leading-normal sm:text-6xl md:text-7xl tracking-tight pt-2">
          <span className="text-love-gradient">{title}</span>
        </h1>
      )}
      {subtitle && (
        <div className="glass mx-auto inline-block rounded-2xl px-6 py-3 backdrop-blur-md">
          <p className="text-lg font-light text-gray-600 sm:text-xl">
            {subtitle}
          </p>
        </div>
      )}
    </header>
  );
}

