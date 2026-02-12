/**
 * Surprise Page
 * Special surprise page with confetti and animations
 */

'use client';

import { useState } from 'react';
import { Container, Header } from '@/components/Layout';
import { Button, Card } from '@/components/UI';
import { SurpriseMessage, Animation } from '@/components';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function SurprisePage() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { language } = useLanguage();
  const t = getTranslations(language);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    if (clickCount >= 4) {
      setShowSurprise(true);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Container>
        <Header
          title={`🎁 ${t.surprise.title}`}
          subtitle={t.surprise.subtitle}
          className="py-12"
        />

        <div className="flex min-h-[60vh] items-center justify-center pb-12">
          <Animation type="bounce" delay={0}>
            <div className="glass-strong w-full max-w-2xl rounded-3xl p-12 text-center backdrop-blur-xl shadow-2xl">
              <div className="mb-8 animate-float-gentle text-7xl drop-shadow-lg">
                🎁
              </div>
              <h2 className="mb-4 font-elegant text-4xl font-normal text-love-gradient tracking-tight leading-normal pt-1">
                {t.surprise.waiting}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {t.surprise.clickToOpen}
                {clickCount > 0 && clickCount < 5 && (
                  <span className="mt-2 block font-semibold text-love-500">
                    {5 - clickCount} {t.surprise.clicksRemaining}
                  </span>
                )}
              </p>
              <button
                onClick={handleClick}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-love-400 to-lavender-400 px-10 py-5 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-love-300/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-love">
                  {t.surprise.openButton} 🎉
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-love-500 to-lavender-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>
          </Animation>
        </div>

        {showSurprise && (
          <SurpriseMessage
            isVisible={showSurprise}
            onClose={() => setShowSurprise(false)}
            title={`🎉 ${t.surprise.messageTitle}`}
            message={`${t.surprise.message} 💕 ✨`}
            type="love"
          />
        )}
      </Container>
    </div>
  );
}

