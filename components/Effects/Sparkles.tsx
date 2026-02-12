/**
 * Sparkles Component
 * Animated sparkles for magical effect
 */

'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export default function Sparkles({ count = 20 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 1 + Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute text-love-200 opacity-60"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            animation: `sparkle ${sparkle.duration}s ease-in-out infinite`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

