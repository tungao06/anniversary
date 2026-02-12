/**
 * Type definitions for the application
 */

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  videoMediaMetadata?: {
    width?: number;
    height?: number;
    durationMillis?: number;
  };
  imageMediaMetadata?: {
    width?: number;
    height?: number;
  };
}

export interface GoogleDriveResponse {
  files: GoogleDriveFile[];
  nextPageToken?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  thumbnailUrl: string;
  directUrl: string;
  webViewUrl?: string;
  width?: number;
  height?: number;
  duration?: number;
  size?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

