/**
 * Language Switcher Component
 * Toggle between Thai and English
 */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="group glass rounded-xl px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-md transition-all hover:bg-love-50/50 hover:text-love-600"
      aria-label="Switch language"
    >
      <span className="flex items-center gap-2">
        <span className="text-lg">{language === 'th' ? '🇹🇭' : '🇬🇧'}</span>
        <span className="font-love text-base">{language === 'th' ? 'TH' : 'EN'}</span>
      </span>
    </button>
  );
}

