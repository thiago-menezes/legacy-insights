import { logger } from '@/utils/logger';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

export type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

export async function verifyRecaptchaToken(
  token: string,
  expectedAction?: string,
): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    logger.warn('[reCAPTCHA] Secret key not configured, skipping verification');
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Token is required' };
  }

  try {
    const response = await fetch(RECAPTCHA_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    if (!response.ok) {
      logger.error('[reCAPTCHA] API request failed:', response.status);
      return { success: false, error: 'Verification request failed' };
    }

    const data: RecaptchaVerifyResponse = await response.json();

    logger.info('[reCAPTCHA] Verification result:', {
      success: data.success,
      score: data.score,
      action: data.action,
    });

    if (!data.success) {
      return {
        success: false,
        error: data['error-codes']?.join(', ') || 'Verification failed',
      };
    }

    // Verify the action if provided
    if (expectedAction && data.action !== expectedAction) {
      logger.warn('[reCAPTCHA] Action mismatch:', {
        expected: expectedAction,
        received: data.action,
      });
      return { success: false, error: 'Action mismatch' };
    }

    // Check the score (0.0 = bot, 1.0 = human)
    if (data.score !== undefined && data.score < RECAPTCHA_SCORE_THRESHOLD) {
      logger.warn('[reCAPTCHA] Low score detected:', data.score);
      return { success: false, score: data.score, error: 'Low score' };
    }

    return { success: true, score: data.score };
  } catch (error) {
    logger.error('[reCAPTCHA] Verification error:', error);
    return { success: false, error: 'Verification error' };
  }
}
