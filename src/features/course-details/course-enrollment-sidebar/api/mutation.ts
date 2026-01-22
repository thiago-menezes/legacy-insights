import { useMutation } from '@tanstack/react-query';
import { mutate } from '@/libs';
import { EnrollmentSubmitPayload, EnrollmentSubmitResponse } from './types';

export const useMutationEnrollmentSubmit = () => {
  return useMutation({
    mutationFn: (data: EnrollmentSubmitPayload) =>
      mutate<EnrollmentSubmitResponse, EnrollmentSubmitPayload>(
        '/enrollment/submit',
        data,
        'post',
      ),
  });
};
