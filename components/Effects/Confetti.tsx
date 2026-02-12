/**
 * Confetti Effect Component
 * Beautiful confetti animation for special moments
 */

'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface ConfettiProps {
  active?: boolean;
  recycle?: boolean;
  numberOfPieces?: number;
  colors?: string[];
  width?: number;
  height?: number;
}

export default function ConfettiEffect({
  active = false,
  recycle = true,
  numberOfPieces = 200,
  colors = ['#FFB6C1', '#FFA8C5', '#FF91C7', '#E9E4FF', '#D1C4FF', '#FFE8D6', '#FFD1B3', '#C4FFD6'],
  width,
  height,
}: ConfettiProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: width || window.innerWidth,
        height: height || window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [width, height]);

  if (!active || windowSize.width === 0) {
    return null;
  }

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={recycle}
      numberOfPieces={numberOfPieces}
      colors={colors}
      gravity={0.3}
      initialVelocityY={20}
      confettiSource={{
        x: windowSize.width / 2,
        y: windowSize.height / 2,
        w: 0,
        h: 0,
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}

