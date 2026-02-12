/**
 * SmoothReveal Component
 * Uses Framer Motion for smooth, natural animations
 */

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SmoothRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function SmoothReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true,
}: SmoothRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const variants = {
    up: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

