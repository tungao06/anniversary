/**
 * MediaGallery Component
 * Displays a grid of media items from Google Drive
 */

'use client';

import { useState, useEffect } from 'react';
import MediaItem from './MediaItem';
import MediaViewer from './MediaViewer';
import type { MediaGalleryProps } from './types';
import type { MediaItem as MediaItemType } from '@/types';

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

  const handleItemClick = (item: MediaItemType, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setIsViewerOpen(true);
    onItemClick?.(item);
  };

  const handleClose = () => {
    setIsViewerOpen(false);
    setSelectedItem(null);
  };

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

  // Grid columns responsive classes
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <>
      <div
        className={`grid ${gridCols[columns as keyof typeof gridCols] || gridCols[3]} ${gapClasses[gap as keyof typeof gapClasses] || gapClasses[4]} ${className}`}
      >
        {items.map((item, index) => (
          <MediaItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item, index)}
            priority={index < 6} // Prioritize first 6 items
          />
        ))}
      </div>

      <MediaViewer
        item={selectedItem}
        isOpen={isViewerOpen}
        onClose={handleClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        hasNext={selectedIndex < items.length - 1}
        hasPrevious={selectedIndex > 0}
      />
    </>
  );
}

