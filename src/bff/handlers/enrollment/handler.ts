'use server';

import { ensureBffInitialized } from '@/bff/services/bff';
import { getCheckoutUrl } from '@/bff/services/checkout';
import { submitHubspotLead } from '@/bff/services/hubspot';
import { BffValidationError } from '@/bff/utils/errors';
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
};

export type EnrollmentSubmitResponse = {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
};

export const handleEnrollmentSubmit = async (
  body: EnrollmentSubmitRequest,
): Promise<EnrollmentSubmitResponse> => {
  ensureBffInitialized();

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
  } = body;

  if (!name || !email || !phone || !productHash || !formaIngresso) {
    throw new BffValidationError('Missing required fields');
  }

  submitHubspotLead(
    { name, email, phone, curso, modalidade, formaIngresso, valorOferta },
    pageUrl,
  ).catch((err) => logger.error('HubSpot background error:', err));

  try {
    const checkoutUrl = await getCheckoutUrl({
      name,
      email,
      phone,
      productHash,
      admissionFormCode: formaIngresso,
    });

    if (!checkoutUrl) {
      throw new Error('Failed to get checkout URL');
    }

    return {
      success: true,
      checkoutUrl,
    };
  } catch (error) {
    logger.error('Enrollment submit error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
