/**
 * Secret Component
 * Hidden content that reveals on interaction
 */

'use client';

import { useState, useEffect } from 'react';
import type { SecretProps } from './types';

export default function Secret({
  children,
  trigger = 'click',
  keyCode,
  className = '',
  onReveal,
}: SecretProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onReveal?.();
    }
  };

  useEffect(() => {
    if (trigger === 'keypress' && keyCode) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === keyCode && !isRevealed) {
          handleReveal();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [trigger, keyCode, isRevealed]);

  const getEventHandlers = () => {
    switch (trigger) {
      case 'click':
        return { onClick: handleReveal };
      case 'doubleClick':
        return { onDoubleClick: handleReveal };
      case 'hover':
        return { onMouseEnter: handleReveal };
      default:
        return {};
    }
  };

  return (
    <div className={className} {...getEventHandlers()}>
      {isRevealed ? (
        <div className="animate-fade-in opacity-100 transition-opacity duration-500">
          {children}
        </div>
      ) : (
        <div className="cursor-pointer opacity-30 transition-opacity hover:opacity-50">
          {/* Hidden placeholder - can be customized */}
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      )}
    </div>
  );
}

