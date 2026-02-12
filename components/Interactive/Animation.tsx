/**
 * Animation Component
 * Wrapper component with various animation effects
 */

'use client';

import { useEffect, useState } from 'react';
import type { AnimationProps } from './types';

export default function Animation({
  children,
  type = 'fade',
  delay = 0,
  duration = 500,
  className = '',
}: AnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    fade: isVisible ? 'opacity-100' : 'opacity-0',
    slide: isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-4 opacity-0',
    bounce: isVisible ? 'animate-bounce' : 'opacity-0',
    pulse: isVisible ? 'animate-pulse' : 'opacity-0',
    heart: isVisible ? 'animate-pulse scale-100' : 'opacity-0 scale-95',
  };

  const transitionStyle = {
    transition: `all ${duration}ms ease-in-out`,
  };

  return (
    <div
      className={`${animationClasses[type]} ${className}`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
}

