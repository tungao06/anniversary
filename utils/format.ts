/**
 * Formatting utilities
 */

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes?: string): string {
  if (!bytes) return 'Unknown size';
  
  const size = parseInt(bytes, 10);
  if (isNaN(size)) return 'Unknown size';

  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let fileSize = size;

  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }

  return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format duration in seconds to MM:SS format
 */
export function formatDuration(seconds?: number): string {
  if (!seconds) return '00:00';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format date to readable format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'Unknown date';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'Unknown date';
  }
}

