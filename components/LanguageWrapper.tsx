/**
 * LanguageWrapper Component
 * Wraps content with language-specific styling
 */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ReactNode } from 'react';

export default function LanguageWrapper({ children }: { children: ReactNode }) {
  const { language } = useLanguage();

  return <div lang={language}>{children}</div>;
}

