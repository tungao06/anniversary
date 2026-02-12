/**
 * Cache utilities for performance optimization
 */

import { getCacheTTL } from '@/lib/env';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl * 1000) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set cache data
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const defaultTTL = getCacheTTL();
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || defaultTTL,
    });
  }

  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Delete specific cache entry
   */
  delete(key: string): void {
    this.cache.delete(key);
  }
}

export const memoryCache = new MemoryCache();

/**
 * Generate cache key
 */
export function generateCacheKey(prefix: string, ...args: (string | number)[]): string {
  return `${prefix}:${args.join(':')}`;
}

