/**
 * Navigation Component
 * Main navigation for the anniversary website
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navigation() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = getTranslations(language);

  const navItems = [
    { href: '/', label: t.nav.home, icon: '💕' },
    { href: '/gallery', label: t.nav.gallery, icon: '📸' },
    { href: '/memories', label: t.nav.memories, icon: '💝' },
    { href: '/surprise', label: t.nav.surprise, icon: '🎁' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full glass-strong border-b border-white/20 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2 text-xl font-love font-normal text-love-gradient transition-transform hover:scale-105">
            <span className="text-2xl">💕</span>
            <span className="hidden sm:inline font-love">{t.common.anniversary}</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'glass bg-love-100/50 text-love-600 shadow-md'
                      : 'text-gray-600 glass hover:bg-love-50/50 hover:text-love-500'
                  }`}
                >
                  <span className="hidden sm:inline font-love">{item.label}</span>
                  <span className="sm:hidden text-lg">{item.icon}</span>
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

