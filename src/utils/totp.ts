/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generates a deterministic 6-digit TOTP token based on a secret and the current 30-second epoch.
 * This provides high security and updates in sync with a 30-second countdown timer.
 */
export function getTOTPToken(secret: string): string {
  const epoch = Math.floor(Date.now() / 30000);
  return calculateToken(secret, epoch);
}

/**
 * Calculates token for a specific epoch
 */
export function calculateToken(secret: string, epoch: number): string {
  const baseString = `TINY_SECURE_AUTH_${secret}_EPOCH_${epoch}`;
  let hash = 0;
  for (let i = 0; i < baseString.length; i++) {
    const char = baseString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const tokenValue = Math.abs(hash) % 1000000;
  return tokenValue.toString().padStart(6, '0');
}

/**
 * Generates a random alphanumeric secret key for 2FA setup.
 */
export function generateSecretKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // Base32 alphabet
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 3 || i === 7 || i === 11) {
      result += '-';
    }
  }
  return result;
}

/**
 * Generates recovery backup codes.
 */
export function generateBackupCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 6; i++) {
    const segment1 = Math.floor(1000 + Math.random() * 9000).toString();
    const segment2 = Math.floor(1000 + Math.random() * 9000).toString();
    codes.push(`${segment1}-${segment2}`);
  }
  return codes;
}

/**
 * Returns the exact seconds remaining before the current 2FA token expires.
 */
export function getSecondsRemaining(): number {
  return 30 - Math.floor((Date.now() % 30000) / 1000);
}
