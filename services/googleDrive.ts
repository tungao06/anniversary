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
    // เพิ่ม parameters เหล่านี้สำหรับ shared/public folders
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
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
    console.error('Google Drive API Error:', {
      status: response.status,
      statusText: response.statusText,
      error: error.error || error,
    });
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

  // สำหรับ public files ใช้ format นี้
  // Images: ใช้ export=view สำหรับ preview
  // Videos: ใช้ export=download หรือ stream
  const directUrl = isImage
    ? `https://drive.google.com/uc?export=view&id=${file.id}`
    : file.webContentLink || `https://drive.google.com/uc?export=download&id=${file.id}`;

  // สำหรับ thumbnail - ใช้ thumbnailLink ถ้ามี หรือ generate
  const thumbnailUrl = file.thumbnailLink || 
    `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;

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

  try {
    do {
      const response = await fetchDriveFiles(folderId, nextPageToken);
      
      console.log(`Fetched ${response.files?.length || 0} files from Drive`);
      
      response.files?.forEach((file) => {
        const mediaItem = convertToMediaItem(file);
        if (mediaItem) {
          mediaItems.push(mediaItem);
        } else {
          console.log(`Skipped file: ${file.name} (type: ${file.mimeType})`);
        }
      });

      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    console.log(`Total media items found: ${mediaItems.length}`);
  } catch (error) {
    console.error('Error in fetchAllMediaItems:', error);
    throw error;
  }

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
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true',
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

