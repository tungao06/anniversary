/**
 * Internationalization (i18n) Configuration
 * Support for Thai and English languages
 * Translations are loaded from JSON files in the locales directory
 */

import thTranslations from '@/locales/th.json';
import enTranslations from '@/locales/en.json';

export type Language = 'th' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    gallery: string;
    memories: string;
    surprise: string;
  };
  
  // Home Page
  home: {
    title: string;
    subtitle: string;
    daysTogether: string;
    welcomeMessage: string;
    startButton: string;
    memoriesButton: string;
    scrollDown: string;
    ourStoryTitle?: string;
    ourStoryDescription?: string;
    loveTitle?: string;
    loveDescription?: string;
    memoriesTitle?: string;
    memoriesDescription?: string;
    futureTitle?: string;
    futureDescription?: string;
    ourMemoriesTitle?: string;
    ourMemoriesDescription?: string;
    viewGalleryButton?: string;
    startJourneyTitle?: string;
    startJourneyDescription?: string;
  };
  
  // Gallery Page
  gallery: {
    title: string;
    subtitle: string;
    loading: string;
    error: string;
    retry: string;
    noMedia: string;
  };
  
  // Memories Page
  memories: {
    title: string;
    subtitle: string;
  };
  
  // Surprise Page
  surprise: {
    title: string;
    subtitle: string;
    waiting: string;
    clickToOpen: string;
    clicksRemaining: string;
    openButton: string;
    messageTitle: string;
    message: string;
  };
  
  // Common
  common: {
    anniversary: string;
    madeWith: string;
  };
  
  // Preview/Viewer
  preview: {
    close: string;
    zoomIn: string;
    zoomOut: string;
    rotate: string;
    reset: string;
    zoom: string;
    dragToPan: string;
    closeTooltip: string;
    zoomInTooltip: string;
    zoomOutTooltip: string;
    rotateTooltip: string;
    resetTooltip: string;
    previous: string;
    next: string;
    loadingError: string;
    loadingErrorRetry: string;
  };
}

const translations: Record<Language, Translations> = {
  th: thTranslations as Translations,
  en: enTranslations as Translations,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export function getText(key: keyof Translations, subKey: string, lang: Language): string {
  const translation = translations[lang][key];
  if (typeof translation === 'object') {
    return (translation as any)[subKey] || '';
  }
  return '';
}

