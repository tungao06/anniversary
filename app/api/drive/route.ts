/**
 * API Route: /api/drive
 * Fetches media files from Google Drive
 */

import { NextRequest, NextResponse } from 'next/server';
import { fetchAllMediaItems } from '@/services/googleDrive';
import { CACHE_HEADERS } from '@/lib/constants';
import type { ApiResponse, MediaItem } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get('folderId') || undefined;

    const mediaItems = await fetchAllMediaItems(folderId);

    const response: ApiResponse<MediaItem[]> = {
      success: true,
      data: mediaItems,
      message: `Found ${mediaItems.length} media items`,
    };

    return NextResponse.json(response, {
      headers: CACHE_HEADERS,
    });
  } catch (error) {
    console.error('Error fetching Drive files:', error);
    
    const response: ApiResponse<never> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

