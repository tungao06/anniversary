/**
 * Environment variables configuration
 * Centralized place to access and validate environment variables
 */

/**
 * Validates that required environment variables are present
 */
export function validateEnv() {
  const required = ['GOOGLE_DRIVE_API_KEY', 'GOOGLE_DRIVE_FOLDER_ID'];
  const missing: string[] = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Get Google Drive API Key
 */
export function getGoogleDriveApiKey(): string {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key) {
    throw new Error('GOOGLE_DRIVE_API_KEY is not set');
  }
  return key;
}

/**
 * Get Google Drive Folder ID
 */
export function getGoogleDriveFolderId(): string {
  const id = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!id) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set');
  }
  return id;
}

/**
 * Get Service Account Email (optional)
 */
export function getServiceAccountEmail(): string | undefined {
  return process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
}

/**
 * Get Service Account Private Key (optional)
 */
export function getServiceAccountPrivateKey(): string | undefined {
  return process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
}

/**
 * Get Cache TTL in seconds
 */
export function getCacheTTL(): number {
  return parseInt(process.env.CACHE_TTL || '3600', 10);
}

/**
 * Get App URL
 */
export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

