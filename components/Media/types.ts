/**
 * Media Components Types
 */

import type { MediaItem } from '@/types';

export interface MediaGalleryProps {
  items: MediaItem[];
  onItemClick?: (item: MediaItem) => void;
  columns?: number;
  gap?: number;
  className?: string;
}

export interface MediaItemProps {
  item: MediaItem;
  onClick?: () => void;
  className?: string;
  priority?: boolean;
}

export interface MediaViewerProps {
  item: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface MediaGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem, index: number) => void;
  loading?: boolean;
}

