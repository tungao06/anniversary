/**
 * MediaViewer Component
 * Full-screen viewer using react-viewer library
 * Opens one image at a time, no navigation
 */

'use client';

import { useEffect, useState, useMemo } from 'react';
import Viewer from 'react-viewer';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslations } from '@/lib/i18n';
import type { MediaViewerProps } from './types';

export default function MediaViewer({
  item,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  allItems = [],
  activeIndex: propActiveIndex,
}: MediaViewerProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const [visible, setVisible] = useState(false);

  // Convert all items to react-viewer format
  const images = useMemo(() => {
    // If we have allItems, use them for navigation
    if (allItems.length > 0) {
      return allItems
        .filter((img) => img.type === 'image')
        .map((img) => ({
          src: img.thumbnailUrl || img.directUrl || img.webViewUrl || '',
          alt: img.name || 'Image',
          downloadUrl: img.directUrl || img.thumbnailUrl || '',
        }))
        .filter((img) => img.src); // Remove items without valid URL
    }
    
    // Fallback: single image mode
    if (!item || item.type !== 'image') return [];
    
    const imageUrl = item.thumbnailUrl || item.directUrl || item.webViewUrl;
    
    if (!imageUrl) {
      return [];
    }
    
    return [
      {
        src: imageUrl,
        alt: item.name || 'Image',
        downloadUrl: item.directUrl || imageUrl,
      },
    ];
  }, [item, allItems]);
  
  // Find current image index
  const activeIndex = useMemo(() => {
    // Use propActiveIndex if provided
    if (propActiveIndex !== undefined && propActiveIndex >= 0) {
      return propActiveIndex;
    }
    
    // Fallback: find by URL
    if (!item || images.length === 0) return 0;
    const currentUrl = item.thumbnailUrl || item.directUrl || item.webViewUrl;
    const index = images.findIndex((img) => img.src === currentUrl);
    return index >= 0 ? index : 0;
  }, [item, images, propActiveIndex]);

  // Sync visible state with isOpen prop
  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!item || item.type !== 'image' || images.length === 0) {
    return null;
  }

  return (
    <>
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
          onClose();
        }}
        images={images}
        activeIndex={activeIndex}
        zIndex={9999}
        // Disable navbar (thumbnail bar at bottom) - always hide
        noNavbar={true}
        noToolbar={false}
        // Use default toolbar (zoom, rotate, reset, close)
        // Zoom and rotate settings
        zoomSpeed={0.1}
        scalable={true}
        rotatable={true}
        // Enable drag to change image (swipe left/right)
        drag={images.length > 1}
        // Enable keyboard navigation (arrow keys)
        keyboard={images.length > 1}
        // Handle image change
        onChange={(img, index) => {
          if (onNext && index > activeIndex) {
            onNext();
          } else if (onPrevious && index < activeIndex) {
            onPrevious();
          }
        }}
      />
      
      {/* Video viewer (not supported by react-viewer) */}
      {item.type === 'video' && isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
            zIndex: 9999,
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/70 backdrop-blur-md p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
            aria-label={t.preview.close}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <video
            src={item.directUrl}
            controls
            autoPlay
            className="max-w-full max-h-full"
            style={{
              maxWidth: '100vw',
              maxHeight: '100vh',
              objectFit: 'contain',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </>
  );
}
