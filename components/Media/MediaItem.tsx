/**
 * MediaItem Component
 * Displays a single media item (image or video) with thumbnail
 */

'use client';

import Image from 'next/image';
import { useState, useMemo, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import type { MediaItemProps } from './types';
import { formatFileSize, formatDuration } from '@/utils/format';

// Memoize component to prevent unnecessary re-renders
const MediaItem = memo(function MediaItem({
  item,
  onClick,
  className = '',
  priority = false,
  size = 'small',
}: MediaItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Lazy load: only load image when it enters viewport
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true, // Only trigger once when first entering viewport
    rootMargin: '50px', // Start loading 50px before entering viewport
  });

  // Calculate aspect ratio from item dimensions - use actual ratio for masonry
  // This preserves the original image proportions
  const aspectRatio = item.width && item.height 
    ? item.height / item.width
    : size === 'large' ? 1.43 : size === 'medium' ? 1.4 : 1.33; // Default ratios based on size

  // Random rotation for organic, playful feel (between -2.5 and 2.5 degrees)
  // Use useMemo to ensure rotation is consistent per item
  const rotation = useMemo(() => {
    // Use item.id as seed for consistent rotation per image
    const seed = item.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (seed % 5) - 2.5; // -2.5 to 2.5 degrees
  }, [item.id]);

  return (
    <div
      ref={ref}
      className={`group relative cursor-pointer overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-love-300/20 hover:rotate-0 ${className}`}
      onClick={onClick}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
      }}
    >
      {/* Image/Video Thumbnail */}
      <div 
        className="relative w-full"
        style={{
          aspectRatio: aspectRatio.toString(),
        }}
      >
        {/* Loading Skeleton - Show while not in view or loading */}
        {(!inView || isLoading) && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-love-50 via-lavender-50 to-peach-50 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-12 w-12 text-love-300 opacity-30">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="animate-pulse"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Only render image when in viewport */}
        {inView && (
          <>
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
                loading={priority ? 'eager' : 'lazy'}
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
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={priority ? 'eager' : 'lazy'}
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
          </>
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
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white">
          <p className="truncate text-xs sm:text-sm font-medium">{item.name}</p>
          {item.size && (
            <p className="text-[10px] sm:text-xs text-white/70 mt-0.5">{formatFileSize(item.size)}</p>
          )}
        </div>
      </div>
    </div>
  );
});

// Export with display name for debugging
MediaItem.displayName = 'MediaItem';

export default MediaItem;

