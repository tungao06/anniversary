/**
 * FloatingHearts Component
 * Animated floating hearts for romantic effect
 */

'use client';

import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function FloatingHearts({ count = 10 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 text-love-300 opacity-40"
          style={{
            left: `${heart.left}%`,
            animation: `floatUp ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <svg
            className="h-6 w-6 drop-shadow-sm"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

