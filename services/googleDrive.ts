/**
 * Google Drive API Service
 * Handles all interactions with Google Drive API
 */

import { getGoogleDriveApiKey, getGoogleDriveFolderId } from '@/lib/env';
import { GOOGLE_DRIVE_API_BASE_URL } from '@/lib/constants';
import type {
  GoogleDriveFile,
  GoogleDriveResponse,
  MediaItem,
} from '@/types';

/**
 * Fetches files from Google Drive folder
 */
export async function fetchDriveFiles(
  folderId?: string,
  pageToken?: string
): Promise<GoogleDriveResponse> {
  const apiKey = getGoogleDriveApiKey();
  const targetFolderId = folderId || getGoogleDriveFolderId();

  const params = new URLSearchParams({
    q: `'${targetFolderId}' in parents and trashed=false`,
    fields: 'nextPageToken, files(id, name, mimeType, thumbnailLink, webViewLink, webContentLink, size, createdTime, modifiedTime, videoMediaMetadata, imageMediaMetadata)',
    orderBy: 'createdTime desc',
    pageSize: '50',
    key: apiKey,
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const response = await fetch(
    `${GOOGLE_DRIVE_API_BASE_URL}/files?${params.toString()}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Google Drive API error: ${response.status} - ${error.error?.message || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Converts Google Drive file to MediaItem format
 */
export function convertToMediaItem(file: GoogleDriveFile): MediaItem | null {
  const isImage = file.mimeType?.startsWith('image/') || false;
  const isVideo = file.mimeType?.startsWith('video/') || false;

  if (!isImage && !isVideo) {
    return null;
  }

  // Generate direct URL for image/video
  const directUrl = file.webContentLink || 
    `https://drive.google.com/uc?export=view&id=${file.id}`;

  // For videos, use thumbnail or generate one
  const thumbnailUrl = file.thumbnailLink || 
    (isImage ? directUrl : `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`);

  return {
    id: file.id,
    name: file.name || 'Untitled',
    type: isImage ? 'image' : 'video',
    thumbnailUrl,
    directUrl,
    webViewUrl: file.webViewLink,
    width: file.videoMediaMetadata?.width || file.imageMediaMetadata?.width,
    height: file.videoMediaMetadata?.height || file.imageMediaMetadata?.height,
    duration: file.videoMediaMetadata?.durationMillis
      ? Math.round(file.videoMediaMetadata.durationMillis / 1000)
      : undefined,
    size: file.size,
  };
}

/**
 * Fetches all media items from Google Drive folder
 */
export async function fetchAllMediaItems(
  folderId?: string
): Promise<MediaItem[]> {
  const mediaItems: MediaItem[] = [];
  let nextPageToken: string | undefined;

  do {
    const response = await fetchDriveFiles(folderId, nextPageToken);
    
    response.files?.forEach((file) => {
      const mediaItem = convertToMediaItem(file);
      if (mediaItem) {
        mediaItems.push(mediaItem);
      }
    });

    nextPageToken = response.nextPageToken;
  } while (nextPageToken);

  return mediaItems;
}

/**
 * Fetches a single file by ID
 */
export async function fetchFileById(fileId: string): Promise<GoogleDriveFile> {
  const apiKey = getGoogleDriveApiKey();

  const params = new URLSearchParams({
    fields: 'id, name, mimeType, thumbnailLink, webViewLink, webContentLink, size, createdTime, modifiedTime, videoMediaMetadata, imageMediaMetadata',
    key: apiKey,
  });

  const response = await fetch(
    `${GOOGLE_DRIVE_API_BASE_URL}/files/${fileId}?${params.toString()}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `Google Drive API error: ${response.status} - ${error.error?.message || response.statusText}`
    );
  }

  return response.json();
}

