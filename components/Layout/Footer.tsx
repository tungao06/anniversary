/**
 * Footer Component
 * Page footer
 */

import type { FooterProps } from './types';

export default function Footer({ className = '', children }: FooterProps) {
  return (
    <footer
      className={`mt-auto border-t border-gray-200 dark:border-gray-700 py-6 ${className}`}
    >
      {children || (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Made with ❤️ for a special anniversary</p>
        </div>
      )}
    </footer>
  );
}

