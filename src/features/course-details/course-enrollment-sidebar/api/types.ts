export type EnrollmentSubmitPayload = {
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
