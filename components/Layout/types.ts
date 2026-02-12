/**
 * Layout Components Types
 */

import type { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export interface FooterProps {
  className?: string;
  children?: ReactNode;
}

