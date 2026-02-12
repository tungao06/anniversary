/**
 * Application constants
 */

export const GOOGLE_DRIVE_API_BASE_URL = 'https://www.googleapis.com/drive/v3';

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
];

export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
];

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

