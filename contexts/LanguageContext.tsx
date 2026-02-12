/**
 * Language Context
 * Provides language state and switching functionality
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with default language, will update from localStorage after mount
  const [language, setLanguageState] = useState<Language>('th');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'th' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'th' ? 'en' : 'th';
    setLanguage(newLang);
  };

  // Always provide context, even before mount
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

