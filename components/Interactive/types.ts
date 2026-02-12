/**
 * Interactive Components Types
 */

import type { ReactNode } from 'react';

export interface SecretProps {
  children: ReactNode;
  trigger: 'click' | 'hover' | 'doubleClick' | 'keypress';
  keyCode?: string;
  className?: string;
  onReveal?: () => void;
}

export interface EasterEggProps {
  pattern: string[];
  onActivate: () => void;
  children?: ReactNode;
}

export interface AnimationProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'bounce' | 'pulse' | 'heart' | 'float' | 'zoom';
  delay?: number;
  duration?: number;
  className?: string;
}

