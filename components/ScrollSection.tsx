/**
 * ScrollSection Component
 * Apple-style scroll-triggered section with animations
 */

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  sticky?: boolean;
  onScroll?: (progress: number) => void;
}

export default function ScrollSection({
  children,
  className = '',
  sticky = false,
  onScroll,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }

          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          const sectionBottom = rect.bottom;

          // For sticky sections: fade out as you scroll past
          if (sticky) {
            const progress = Math.max(
              0,
              Math.min(
                1,
                (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5)
              )
            );
            setScrollProgress(progress);
            onScroll?.(progress);
          } else {
            // For non-sticky sections: Apple-style smooth fade in/out
            const isInViewport = sectionTop < windowHeight && sectionBottom > 0;
            const viewportCenter = windowHeight / 2;
            const sectionCenter = sectionTop + sectionHeight / 2;
            
            if (isInViewport) {
              // Calculate distance from viewport center
              const distanceFromCenter = Math.abs(viewportCenter - sectionCenter);
              const maxDistance = windowHeight * 0.8;
              
              // Fade in when entering, stay visible when centered
              let fadeProgress = 1;
              
              // Fade in from bottom
              if (sectionTop > 0 && sectionTop < windowHeight) {
                fadeProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.5)));
              }
              
              // Fade out when leaving from top
              if (sectionBottom < windowHeight && sectionBottom > 0) {
                const exitProgress = Math.max(0, Math.min(1, sectionBottom / (windowHeight * 0.3)));
                fadeProgress = Math.min(fadeProgress, exitProgress);
              }
              
              // Ensure minimum visibility when in viewport
              fadeProgress = Math.max(0.3, fadeProgress);
              
              setScrollProgress(fadeProgress);
              setIsVisible(true);
              onScroll?.(fadeProgress);
            } else {
              // Section is out of viewport - but keep it visible if it was recently visible
              if (sectionBottom < 0) {
                // Section has scrolled past top
                setScrollProgress(0);
                setIsVisible(false);
              } else if (sectionTop > windowHeight) {
                // Section hasn't entered yet
                setScrollProgress(0);
                setIsVisible(false);
              }
              onScroll?.(0);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use Intersection Observer for non-sticky sections to track visibility
    let observer: IntersectionObserver | null = null;
    
    if (!sticky) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // Set visible if section is intersecting or has any intersection ratio
          const shouldBeVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          setIsVisible(shouldBeVisible);
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.7, 1],
          rootMargin: '0px 0px -50px 0px',
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (observer && sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [onScroll, sticky]);

  // Calculate opacity and transform for both sticky and non-sticky sections
  let opacity = 1;
  let transform = 'none';

  if (sticky) {
    // Sticky sections fade out as you scroll (like Hero section)
    opacity = Math.max(0, 1 - scrollProgress * 0.6);
    transform = `translate3d(0, ${scrollProgress * 30}px, 0) scale(${Math.max(0.85, 1 - scrollProgress * 0.15)})`;
  } else {
    // Non-sticky sections: Apple-style smooth fade in/out
    if (isVisible) {
      // Smooth fade in/out based on scroll position
      // Ensure sections are always visible when in viewport
      if (scrollProgress > 0) {
        opacity = Math.max(0.5, Math.min(1, scrollProgress));
        const translateY = (1 - scrollProgress) * 20;
        const scale = Math.max(0.98, Math.min(1, scrollProgress * 0.3 + 0.7));
        transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      } else {
        // Section is visible but scrollProgress is 0 (initial state or just entered)
        opacity = 0.6;
        transform = 'translate3d(0, 20px, 0) scale(0.98)';
      }
    } else {
      // Hidden state - but use smooth transition
      opacity = 0;
      transform = 'translate3d(0, 40px, 0) scale(0.96)';
    }
  }

  return (
    <div
      ref={sectionRef}
      className={`${sticky ? 'sticky top-0' : ''} ${className} will-change-transform`}
      style={{
        opacity,
        transform,
        transition: sticky ? 'none' : 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
}

