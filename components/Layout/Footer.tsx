/**
 * Footer Component
 * Page footer
 */

'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import type { FooterProps } from './types';

export default function Footer({ className = '', children }: FooterProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <footer
      className={`mt-auto border-t border-white/20 py-6 ${className}`}
    >
      {children || (
        <div className="text-center text-sm text-gray-500">
          <p className="font-love">
            {t.common.madeWith} ❤️ {t.common.madeWith === 'Made with' ? 'for a special anniversary' : 'สำหรับวันครบรอบพิเศษ'}
          </p>
        </div>
      )}
    </footer>
  );
}

