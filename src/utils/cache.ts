/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Compresses an image file client-side using HTML5 Canvas.
 * Converts to WebP or JPEG based on support, reducing size significantly.
 */
export function compressImage(
  file: File,
  maxWidth = 1000,
  quality = 0.75
): Promise<{ base64: string; originalSize: string; compressedSize: string; ratio: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Calculate custom dimensions
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        // Create Canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context not available'));
          return;
        }

        // Draw image beautifully with high settings
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP (best compression) with JPEG fallback
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (dataUrl.length > event.target?.result?.toString().length!) {
          // If webp did not save space or is unsupported, fallback to original or jpeg
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        const originalKB = (file.size / 1024).toFixed(1);
        const compressedKB = ((dataUrl.length * 0.75) / 1024).toFixed(1); // Approximate base64 factor
        const ratio = ((1 - (parseFloat(compressedKB) / parseFloat(originalKB))) * 100).toFixed(0);

        resolve({
          base64: dataUrl,
          originalSize: `${originalKB} KB`,
          compressedSize: `${compressedKB} KB`,
          ratio: `${ratio}%`,
        });
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Simple TTL cache implementation over LocalStorage for super-charged asset loading.
 */
export interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export function setCache<T>(key: string, value: T, ttlSeconds: number): void {
  const expiry = Date.now() + ttlSeconds * 1000;
  const entry: CacheEntry<T> = { value, expiry };
  try {
    localStorage.setItem(`tiny_cache_${key}`, JSON.stringify(entry));
  } catch (e) {
    console.warn('Caching failed due to storage limits', e);
  }
}

export function getCache<T>(key: string): T | null {
  const data = localStorage.getItem(`tiny_cache_${key}`);
  if (!data) return null;

  try {
    const entry: CacheEntry<T> = JSON.parse(data);
    if (Date.now() > entry.expiry) {
      localStorage.removeItem(`tiny_cache_${key}`);
      return null;
    }
    return entry.value;
  } catch (e) {
    return null;
  }
}

/**
 * Standard simulated caching delay helper. Allows showing a visible "Cached Speed" loading state.
 */
export function simulateNetworkFetch<T>(key: string, fetcher: () => T, ttl = 60): Promise<{ data: T; fromCache: boolean }> {
  return new Promise((resolve) => {
    const cached = getCache<T>(key);
    if (cached !== null) {
      // Return instantly from cache!
      setTimeout(() => {
        resolve({ data: cached, fromCache: true });
      }, 80); // Very fast instant lookup
    } else {
      // Simulate real slightly longer loading when cold
      const freshData = fetcher();
      setCache(key, freshData, ttl);
      setTimeout(() => {
        resolve({ data: freshData, fromCache: false });
      }, 550); // Slow network look index
    }
  });
}
