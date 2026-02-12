/**
 * Surprise Components Types
 */

import type { ReactNode } from 'react';
import type { MediaItem } from '@/types';

export interface SurpriseMessageProps {
  message: string;
  title?: string;
  isVisible: boolean;
  onClose?: () => void;
  type?: 'success' | 'love' | 'celebration' | 'custom';
  className?: string;
}

export interface SurpriseRevealProps {
  trigger: () => boolean;
  children: ReactNode;
  delay?: number;
  animation?: 'fade' | 'slide' | 'zoom' | 'confetti';
}

export interface SurpriseMediaProps {
  media: MediaItem;
  message?: string;
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}

