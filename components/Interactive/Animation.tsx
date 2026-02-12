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
    fade: isVisible ? 'animate-fade-in opacity-100' : 'opacity-0',
    slide: isVisible
      ? 'animate-fade-in-up opacity-100'
      : 'opacity-0 translate-y-4',
    bounce: isVisible ? 'animate-bounce opacity-100' : 'opacity-0',
    pulse: isVisible ? 'animate-pulse opacity-100' : 'opacity-0',
    heart: isVisible ? 'animate-pulse-heart scale-100 opacity-100' : 'opacity-0 scale-95',
    float: isVisible ? 'animate-float opacity-100' : 'opacity-0',
    zoom: isVisible ? 'animate-zoom-in opacity-100' : 'opacity-0 scale-90',
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

