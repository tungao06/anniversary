/**
 * MediaItem Component
 * Displays a single media item (image or video) with thumbnail
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MediaItemProps } from './types';
import { formatFileSize, formatDuration } from '@/utils/format';

export default function MediaItem({
  item,
  onClick,
  className = '',
  priority = false,
}: MediaItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      {/* Image/Video Thumbnail */}
      <div className="relative aspect-square w-full">
        {item.type === 'image' ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={item.thumbnailUrl}
              alt={item.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
            {/* Video Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="rounded-full bg-white/90 p-3 shadow-lg">
                <svg
                  className="h-8 w-8 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
            {/* Video Duration Badge */}
            {item.duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                {formatDuration(item.duration)}
              </div>
            )}
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700" />
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-sm text-gray-500">Failed to load</span>
          </div>
        )}
      </div>

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="truncate text-sm font-medium">{item.name}</p>
          {item.size && (
            <p className="text-xs text-white/80">{formatFileSize(item.size)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

