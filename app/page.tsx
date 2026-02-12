/**
 * Landing Page - Apple Style
 * Modern scroll-based animations with sticky sections
 */

'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import FloatingHearts from '@/components/Effects/FloatingHearts';
import Sparkles from '@/components/Effects/Sparkles';
import AnimatedBackground from '@/components/Effects/AnimatedBackground';
import ScrollSection from '@/components/ScrollSection';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    setMounted(true);

    let rafId: number | undefined;
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Calculate days together
  const anniversaryDate = new Date('2023-01-01');
  const today = new Date();
  const daysTogether = Math.floor(
    (today.getTime() - anniversaryDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (!mounted) {
    return null;
  }

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.8, 1 - scrollY / 2000);

  return (
    <main className="relative">
      {/* Hero Section - Sticky */}
      <ScrollSection sticky className="z-[10] min-h-screen">
        <div className="relative flex min-h-screen items-center justify-center">
          {/* Animated Background - Layer 1 */}
          <div className="fixed inset-0 z-[1] bg-soft-gradient" />
          
          {/* Animated Background - Layer 2 */}
          <div className="fixed inset-0 z-[2]">
            <AnimatedBackground />
          </div>

          {/* Gradient Overlay - Layer 3 */}
          <div
            className="fixed inset-0 z-[3] bg-gradient-to-b from-transparent via-white/20 to-white/40 transition-opacity duration-700 ease-out"
            style={{ opacity: Math.min(1, scrollY / 400) }}
          />

          {/* Animated Background Elements - Layer 4 */}
          <div className="fixed inset-0 z-[4]">
            <FloatingHearts count={12} />
            <Sparkles count={20} />
          </div>

          {/* Mouse Follow Glow Effect - Layer 5 */}
          <div
            className="pointer-events-none fixed z-[5] h-96 w-96 rounded-full bg-love-300 opacity-20 blur-3xl transition-all duration-700 ease-out"
            style={{
              left: `${mousePosition.x - 192}px`,
              top: `${mousePosition.y - 192}px`,
            }}
          />

          {/* Hero Content */}
          <div
            className="relative z-[15] flex flex-col items-center justify-center px-4 text-center transition-all duration-700 ease-out will-change-transform"
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale}) translateY(${scrollY * 0.2}px)`,
            }}
          >
            {/* Heart Icon */}
            <ScrollReveal direction="fade" delay={0}>
              <div className="mb-8 flex justify-center">
                <div className="group relative">
                  <div className="absolute inset-0 animate-pulse-heart rounded-full bg-love-300 opacity-30 blur-xl" />
                  <div className="relative animate-float-gentle will-change-transform">
                    <svg
                      className="h-24 w-24 text-love-500 drop-shadow-lg transition-transform group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal direction="up" delay={200}>
              <h1 className="mb-6 font-elegant text-6xl font-normal leading-normal sm:text-7xl md:text-8xl tracking-tight pt-2">
                <span className="text-love-gradient">{t.home.title}</span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal direction="up" delay={400}>
              <div className="glass-strong mx-auto mb-6 inline-block rounded-2xl px-8 py-4 backdrop-blur-xl">
                <p className="mb-2 text-xl font-light text-gray-700 sm:text-2xl">
                  💕 {t.home.subtitle}
                </p>
                <p className="text-4xl font-semibold text-love-600 sm:text-5xl">
                  {daysTogether.toLocaleString()} {t.home.daysTogether}
                </p>
              </div>
            </ScrollReveal>

            {/* Welcome Message */}
            <ScrollReveal direction="up" delay={600}>
              <div className="glass mx-auto mb-12 max-w-2xl rounded-3xl px-8 py-6 backdrop-blur-md">
                <p className="text-lg leading-relaxed text-gray-600 sm:text-xl">
                  {t.home.welcomeMessage} 💝
                </p>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal direction="up" delay={800}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/gallery">
                  <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-love-400 to-lavender-400 px-10 py-5 text-lg font-medium text-white shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-love-300/50 active:scale-95">
                    <span className="relative z-10 flex items-center gap-3">
                      <span className="font-love">{t.home.startButton}</span>
                      <svg
                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-love-500 to-lavender-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </Link>

                <Link href="/memories">
                  <button className="group rounded-2xl border-2 border-love-300 bg-white/40 px-10 py-5 text-lg font-medium text-love-600 backdrop-blur-md transition-all duration-500 ease-out hover:scale-105 hover:bg-white/60 hover:border-love-400 hover:shadow-lg active:scale-95">
                    <span className="font-love">{t.home.memoriesButton}</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>

            {/* Scroll Indicator */}
            <ScrollReveal direction="fade" delay={1000}>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-light text-gray-500">
                    {t.home.scrollDown}
                  </span>
                  <div className="animate-bounce">
                    <svg
                      className="h-6 w-6 text-love-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollSection>

      {/* Spacer for smooth scroll transition */}
      <div className="relative z-[15] h-screen" />

      {/* Section 2: Our Story */}
      <ScrollSection className="relative z-[20] min-h-screen bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-20">
          <ScrollReveal direction="up" className="max-w-4xl text-center">
            <h2 className="mb-6 font-elegant text-5xl font-normal text-love-gradient sm:text-6xl tracking-tight leading-normal pt-2">
              {t.home.ourStoryTitle}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 sm:text-xl">
              {t.home.ourStoryDescription}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <ScrollReveal direction="up" delay={200}>
                <div className="glass rounded-2xl p-6 backdrop-blur-md">
                  <div className="mb-4 text-4xl">💕</div>
                  <h3 className="mb-2 font-elegant text-2xl font-medium text-love-600 tracking-tight leading-normal pt-1">
                    {t.home.loveTitle}
                  </h3>
                  <p className="text-gray-600">
                    {t.home.loveDescription}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={400}>
                <div className="glass rounded-2xl p-6 backdrop-blur-md">
                  <div className="mb-4 text-4xl">✨</div>
                  <h3 className="mb-2 font-elegant text-2xl font-medium text-love-600 tracking-tight leading-normal pt-1">
                    {t.home.memoriesTitle}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t.home.memoriesDescription}
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={600}>
                <div className="glass rounded-2xl p-6 backdrop-blur-md">
                  <div className="mb-4 text-4xl">🌸</div>
                  <h3 className="mb-2 font-elegant text-2xl font-medium text-love-600 tracking-tight leading-normal pt-1">
                    {t.home.futureTitle}
                  </h3>
                  <p className="text-gray-600">
                    {t.home.futureDescription}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Spacer for smooth scroll transition */}
      <div className="relative z-[25] h-screen" />

      {/* Section 3: Gallery Preview */}
      <ScrollSection className="relative z-[30] min-h-screen bg-soft-gradient">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-20">
          <ScrollReveal direction="up" className="w-full max-w-6xl text-center">
            <h2 className="mb-6 font-elegant text-5xl font-normal text-love-gradient sm:text-6xl tracking-tight leading-normal pt-2">
              {t.home.ourMemoriesTitle}
            </h2>
            <p className="mb-12 text-lg text-gray-600 sm:text-xl">
              {t.home.ourMemoriesDescription}
            </p>
            <ScrollReveal direction="up" delay={300}>
              <Link href="/gallery">
                <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-love-400 to-lavender-400 px-12 py-6 text-xl font-medium text-white shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-love-300/50 active:scale-95">
                  <span className="relative z-10 flex items-center gap-3">
                  <span className="font-love">
                    {t.home.viewGalleryButton}
                  </span>
                    <svg
                      className="h-6 w-6 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-love-500 to-lavender-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </Link>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </ScrollSection>

      {/* Spacer for smooth scroll transition */}
      <div className="relative z-[35] h-screen" />

      {/* Section 4: Final CTA */}
      <ScrollSection className="relative z-[40] min-h-screen bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-20">
          <ScrollReveal direction="up" className="max-w-4xl text-center">
            <h2 className="mb-6 font-elegant text-5xl font-normal text-love-gradient sm:text-6xl tracking-tight leading-normal pt-2">
              {t.home.startJourneyTitle}
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-gray-600 sm:text-xl">
              {t.home.startJourneyDescription}
            </p>
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/gallery">
                  <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-love-400 to-lavender-400 px-10 py-5 text-lg font-medium text-white shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-love-300/50 active:scale-95">
                    <span className="relative z-10 font-love">
                      {t.home.startButton}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-love-500 to-lavender-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </button>
                </Link>
                <Link href="/memories">
                  <button className="group rounded-2xl border-2 border-love-300 bg-white/40 px-10 py-5 text-lg font-medium text-love-600 backdrop-blur-md transition-all duration-500 ease-out hover:scale-105 hover:bg-white/60 hover:border-love-400 hover:shadow-lg active:scale-95">
                    <span className="font-love">{t.home.memoriesButton}</span>
                  </button>
                </Link>
              </div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </ScrollSection>
    </main>
  );
}
