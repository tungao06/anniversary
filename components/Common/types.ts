/**
 * Common/Shared Components Types
 */

import type { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  className?: string;
}

