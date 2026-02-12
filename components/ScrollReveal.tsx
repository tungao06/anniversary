/**
 * ScrollReveal Component
 * Reveals content on scroll with smooth animations
 */

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // Keep observing for smooth re-animation if needed
        }
      },
      { 
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before entering viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  const directionClasses = {
    up: isVisible 
      ? 'animate-fade-in-up opacity-100' 
      : 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
    down: isVisible 
      ? 'animate-fade-in-down opacity-100' 
      : 'opacity-0 -translate-y-8 transition-all duration-700 ease-out',
    left: isVisible 
      ? 'animate-slide-in-right opacity-100' 
      : 'opacity-0 -translate-x-8 transition-all duration-700 ease-out',
    right: isVisible 
      ? 'animate-slide-in-left opacity-100' 
      : 'opacity-0 translate-x-8 transition-all duration-700 ease-out',
    fade: isVisible 
      ? 'animate-fade-in opacity-100' 
      : 'opacity-0 transition-opacity duration-700 ease-out',
  };

  return (
    <div
      ref={ref}
      className={`will-change-transform overflow-visible ${directionClasses[direction]} ${className}`}
      style={{
        transform: 'translateZ(0)', // Force GPU acceleration
        transition: isVisible ? 'none' : 'opacity 0.3s ease-out, transform 0.3s ease-out',
        overflow: 'visible', // Ensure text is not clipped
      }}
    >
      {children}
    </div>
  );
}

