/**
 * LazyLoad Component
 * Lazy loads content when it enters viewport
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import type { LazyLoadProps } from './types';

export default function LazyLoad({
  children,
  threshold = 0.1,
  className = '',
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {isVisible && children}
    </div>
  );
}

