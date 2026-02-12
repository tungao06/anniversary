/**
 * Gallery Page
 * Display images and videos from Google Drive
 */

'use client';

import { useState, useEffect } from 'react';
import { MediaGallery, Loading } from '@/components';
import { Container, Header } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import type { MediaItem } from '@/types';

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/drive');
      const data = await response.json();

      if (data.success && data.data) {
        setMediaItems(data.data);
      } else {
        setError(data.error || 'Failed to load media');
      }
    } catch (err) {
      setError('Failed to fetch media items');
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient">
      <Container>
        <Header
          title={`📸 ${t.gallery.title}`}
          subtitle={t.gallery.subtitle}
          className="py-12"
        />

        {loading ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="glass-strong rounded-3xl p-8 backdrop-blur-xl">
              <Loading size="lg" text={t.gallery.loading} />
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="glass-strong rounded-3xl p-8 text-center backdrop-blur-xl">
              <p className="mb-4 text-lg text-red-400">{error || t.gallery.error}</p>
              <button
                onClick={fetchMediaItems}
                className="rounded-xl bg-gradient-to-r from-love-400 to-lavender-400 px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                {t.gallery.retry}
              </button>
            </div>
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="glass rounded-2xl p-8 text-center backdrop-blur-md">
              <p className="text-lg text-gray-600">
                {t.gallery.noMedia}
              </p>
            </div>
          </div>
        ) : (
          <MediaGallery items={mediaItems} columns={3} gap={4} />
        )}
      </Container>
    </div>
  );
}

