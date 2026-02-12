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
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          {subtitle}
        </p>
      )}
    </header>
  );
}

