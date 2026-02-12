/**
 * EasterEgg Component
 * Activates when user performs a specific pattern (e.g., Konami code)
 */

'use client';

import { useEffect, useState } from 'react';
import type { EasterEggProps } from './types';

export default function EasterEgg({
  pattern,
  onActivate,
  children,
}: EasterEggProps) {
  const [inputSequence, setInputSequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const newSequence = [...prev, e.key].slice(-pattern.length);
        
        // Check if sequence matches pattern
        if (newSequence.length === pattern.length) {
          const matches = newSequence.every(
            (key, index) => key.toLowerCase() === pattern[index].toLowerCase()
          );
          
          if (matches) {
            onActivate();
            return []; // Reset sequence
          }
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pattern, onActivate]);

  return <>{children}</>;
}

