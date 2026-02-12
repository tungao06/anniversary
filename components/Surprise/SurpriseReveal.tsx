/**
 * SurpriseReveal Component
 * Reveals content when trigger condition is met
 */

'use client';

import { useEffect, useState } from 'react';
import type { SurpriseRevealProps } from './types';
import { Animation } from '../Interactive';

export default function SurpriseReveal({
  trigger,
  children,
  delay = 0,
  animation = 'fade',
}: SurpriseRevealProps) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (trigger() && !isTriggered) {
      setIsTriggered(true);
      setTimeout(() => {
        setShowContent(true);
      }, delay);
    }
  }, [trigger, delay, isTriggered]);

  if (!showContent) return null;

  return <Animation type={animation}>{children}</Animation>;
}

