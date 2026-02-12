/**
 * MediaGallery Component
 * Displays a grid of media items from Google Drive
 */

'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import MediaItem from './MediaItem';
import MediaViewer from './MediaViewer';
import type { MediaGalleryProps } from './types';
import type { MediaItem as MediaItemType } from '@/types';

// Performance optimization: Virtual scrolling with chunked rendering
const INITIAL_LOAD = 30; // Load first 30 items
const LOAD_MORE_THRESHOLD = 10; // Load more when 10 items from bottom
const CHUNK_SIZE = 20; // Load 20 items at a time

export default function MediaGallery({
  items,
  onItemClick,
  columns = 3,
  gap = 4,
  className = '',
}: MediaGalleryProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: MediaItemType, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsViewerOpen(true);
    onItemClick?.(item);
  };

  const handleClose = () => {
    setIsViewerOpen(false);
    setSelectedItem(null);
    setSelectedIndex(-1);
  };

  // Navigation handlers
  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedIndex(nextIndex);
      setSelectedItem(items[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedIndex(prevIndex);
      setSelectedItem(items[prevIndex]);
    }
  };
  
  // Filter only images for navigation (videos not supported by react-viewer)
  const imageItems = useMemo(() => {
    return items.filter((item) => item.type === 'image');
  }, [items]);
  
  // Find current image index in filtered list
  const currentImageIndex = useMemo(() => {
    if (selectedIndex < 0 || !selectedItem) return 0;
    return imageItems.findIndex((img) => img.id === selectedItem.id);
  }, [selectedItem, selectedIndex, imageItems]);

  // Virtual scrolling: Only render visible items
  const visibleItems = useMemo(() => {
    return items.slice(0, visibleCount);
  }, [items, visibleCount]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < items.length) {
          setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, items.length));
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before reaching the trigger
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [visibleCount, items.length]);

  // Calculate size category for each item based on dimensions
  // This helps organize images into size categories for better layout
  const getItemSize = (item: MediaItemType): 'small' | 'medium' | 'large' => {
    if (!item.width || !item.height) return 'small';
    
    const area = item.width * item.height;
    const aspectRatio = item.height / item.width;
    
    // Large: tall portrait images with large area (like 70x100, 50x70)
    // Area > 2M pixels and portrait orientation
    if (area > 2000000 && aspectRatio > 1.2) return 'large';
    
    // Medium: medium-sized images (like 30x40, A4 portrait)
    // Area > 800K pixels or portrait orientation
    if (area > 800000 || (aspectRatio > 1.1 && area > 500000)) return 'medium';
    
    // Small: everything else (landscape, small images)
    return 'small';
  };

  // Breakpoint columns for masonry - responsive columns
  const breakpointColumnsObj = {
    default: 4,  // Large screens: 4 columns
    1280: 4,     // xl: 4 columns
    1024: 3,     // lg: 3 columns
    768: 2,      // md: 2 columns
    640: 2,      // sm: 2 columns
  };

  return (
    <>
      {/* Masonry Layout - Supports various image sizes with virtual scrolling */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={`masonry-grid ${className}`}
        columnClassName="masonry-grid-column"
      >
        {visibleItems.map((item, itemIndex) => {
          const size = getItemSize(item);
          // Find original index in full items array
          const originalIndex = items.findIndex((i) => i.id === item.id);
          return (
            <div
              key={item.id}
              className={`masonry-item masonry-item-${size} animate-fade-in-up`}
              style={{
                animationDelay: `${itemIndex * 30}ms`,
              }}
            >
              <MediaItem
                item={item}
                onClick={() => handleItemClick(item, originalIndex)}
                priority={itemIndex < 15}
                size={size}
              />
            </div>
          );
        })}
      </Masonry>

      {/* Load More Trigger - Invisible element for intersection observer */}
      {visibleCount < items.length && (
        <div
          ref={loadMoreRef}
          className="flex h-20 items-center justify-center"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-love-300 border-t-transparent" />
        </div>
      )}

      {/* Image viewer with navigation */}
      <MediaViewer
        item={selectedItem}
        isOpen={isViewerOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={selectedIndex < items.length - 1}
        hasPrevious={selectedIndex > 0}
        allItems={imageItems}
        activeIndex={currentImageIndex}
      />
    </>
  );
}

