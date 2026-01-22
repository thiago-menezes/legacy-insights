import { NextRequest, NextResponse } from 'next/server';
import { getCheckoutUrl } from '@/bff/services/checkout';
import { submitHubspotLead } from '@/bff/services/hubspot';
import { logger } from '@/utils/logger';

export type EnrollmentSubmitRequest = {
  name: string;
  email: string;
  phone: string;
  curso: string;
  modalidade: string;
  formaIngresso: string;
  valorOferta: string;
  productHash: string;
  pageUrl?: string;
  recaptchaToken?: string;
};

export type EnrollmentSubmitResponse = {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const body: EnrollmentSubmitRequest = await request.json();

    const {
      name,
      email,
      phone,
      curso,
      modalidade,
      formaIngresso,
      valorOferta,
      productHash,
      pageUrl,
      recaptchaToken,
    } = body;

    if (!name || !email || !phone || !productHash || !formaIngresso) {
      return NextResponse.json<EnrollmentSubmitResponse>(
        { success: false, error: 'Missing required fields' },
        { status: 400 },
      );
    }

    logger.info('[Enrollment] recaptchaToken:', recaptchaToken);

    // // Verify reCAPTCHA token
    // if (recaptchaToken) {
    //   const recaptchaResult = await verifyRecaptchaToken(
    //     recaptchaToken,
    //     'enrollment_form',
    //   );

    //   if (!recaptchaResult.success) {
    //     logger.warn('[Enrollment] reCAPTCHA verification failed:', {
    //       error: recaptchaResult.error,
    //       score: recaptchaResult.score,
    //     });
    //     return NextResponse.json<EnrollmentSubmitResponse>(
    //       { success: false, error: 'reCAPTCHA verification failed' },
    //       { status: 403 },
    //     );
    //   }

    //   logger.info(
    //     '[Enrollment] reCAPTCHA verified, score:',
    //     recaptchaResult.score,
    //   );
    // }

    submitHubspotLead(
      { name, email, phone, curso, modalidade, formaIngresso, valorOferta },
      pageUrl,
    ).catch((err) => logger.error('HubSpot background error:', err));

    // Log enrollment request parameters
    logger.info('[Enrollment] Requesting checkout URL:', {
      name,
      email: email.replace(/(.{3}).*(@.*)/, '$1***$2'),
      phone: phone.substring(0, 4) + '***',
      productHash,
      admissionFormCode: formaIngresso,
    });

    const checkoutUrl = await getCheckoutUrl({
      name,
      email,
      phone,
      productHash,
      admissionFormCode: formaIngresso,
    });

    if (!checkoutUrl) {
      return NextResponse.json<EnrollmentSubmitResponse>(
        { success: false, error: 'Failed to get checkout URL' },
        { status: 500 },
      );
    }

    return NextResponse.json<EnrollmentSubmitResponse>({
      success: true,
      checkoutUrl,
    });
  } catch (error) {
    logger.error('Enrollment submit error:', error);
    return NextResponse.json<EnrollmentSubmitResponse>(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
};
