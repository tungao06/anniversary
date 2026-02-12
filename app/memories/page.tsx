/**
 * Memories/Timeline Page
 * Display special memories and timeline
 */

'use client';

import { Container, Header } from '@/components/Layout';
import { Card, Animation } from '@/components';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';

// Example memories data - you can replace this with data from API or CMS
const memories = [
  {
    id: 1,
    date: '2023-01-01',
    title: 'วันแรกที่เจอกัน',
    description: 'วันพิเศษที่เราได้พบกันครั้งแรก 💕',
    emoji: '💕',
  },
  {
    id: 2,
    date: '2023-02-14',
    title: 'วันวาเลนไทน์',
    description: 'วันแห่งความรักครั้งแรกของเรา 🌹',
    emoji: '🌹',
  },
  {
    id: 3,
    date: '2023-06-01',
    title: 'วันครบรอบ 6 เดือน',
    description: 'ครบรอบ 6 เดือนแห่งความรัก ✨',
    emoji: '✨',
  },
];

export default function MemoriesPage() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Container>
        <Header
          title={`💝 ${t.memories.title}`}
          subtitle={t.memories.subtitle}
          className="py-12"
        />

        <div className="space-y-6 pb-12">
          {memories.map((memory, index) => (
            <Animation
              key={memory.id}
              type="slide"
              delay={index * 200}
            >
              <div className="glass-strong group overflow-hidden rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-6xl drop-shadow-lg">
                    {memory.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-elegant text-3xl font-normal text-love-gradient tracking-tight leading-normal pt-1">
                        {memory.title}
                      </h3>
                      <span className="glass rounded-xl px-4 py-1 text-sm font-medium text-gray-600 backdrop-blur-md">
                        {new Date(memory.date).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-600">
                      {memory.description}
                    </p>
                  </div>
                </div>
              </div>
            </Animation>
          ))}
        </div>
      </Container>
    </div>
  );
}

