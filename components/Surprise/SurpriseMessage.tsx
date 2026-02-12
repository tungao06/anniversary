/**
 * SurpriseMessage Component
 * Displays a surprise message with animations
 */

'use client';

import { useEffect, useState } from 'react';
import type { SurpriseMessageProps } from './types';
import { Animation } from '../Interactive';

export default function SurpriseMessage({
  message,
  title,
  isVisible,
  onClose,
  type = 'love',
  className = '',
}: SurpriseMessageProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  if (!show) return null;

  const typeStyles = {
    success: 'bg-green-100 dark:bg-green-900/20 border-green-500',
    love: 'bg-pink-100 dark:bg-pink-900/20 border-pink-500',
    celebration: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-500',
    custom: 'bg-blue-100 dark:bg-blue-900/20 border-blue-500',
  };

  const emojis = {
    success: '✨',
    love: '💕',
    celebration: '🎉',
    custom: '🎁',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Animation type="zoom" className="w-full max-w-md">
        <div
          className={`rounded-lg border-2 p-6 shadow-2xl ${typeStyles[type]} ${className}`}
        >
          {onClose && (
            <button
              onClick={() => {
                setShow(false);
                onClose?.();
              }}
              className="float-right rounded-full p-1 hover:bg-black/10"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <div className="text-center">
            <div className="mb-4 text-6xl">{emojis[type]}</div>
            {title && (
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {message}
            </p>
          </div>
        </div>
      </Animation>
    </div>
  );
}

