/**
 * SurpriseMedia Component
 * Displays a surprise media item (image/video) with message
 */

'use client';

import Image from 'next/image';
import type { SurpriseMediaProps } from './types';
import { Animation } from '../Interactive';

export default function SurpriseMedia({
  media,
  message,
  isVisible,
  onClose,
  className = '',
}: SurpriseMediaProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Animation type="zoom" className="relative max-w-4xl">
        <div className={`relative rounded-lg overflow-hidden ${className}`}>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
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

          {media.type === 'image' ? (
            <Image
              src={media.directUrl}
              alt={media.name}
              width={media.width || 1920}
              height={media.height || 1080}
              className="w-full h-auto"
              unoptimized
            />
          ) : (
            <video
              src={media.directUrl}
              controls
              autoPlay
              className="w-full h-auto"
            >
              Your browser does not support the video tag.
            </video>
          )}

          {message && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-center text-xl font-medium text-white">
                {message}
              </p>
            </div>
          )}
        </div>
      </Animation>
    </div>
  );
}

