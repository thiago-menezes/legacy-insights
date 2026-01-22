import { useMutation } from '@tanstack/react-query';
import type { GeocodeRequest, GeocodeResponse } from '@/app/api/geocode/route';
import { mutate } from '@/libs';

export const useMutationGeocode = () => {
  return useMutation({
    mutationFn: (params: GeocodeRequest) =>
      mutate<GeocodeResponse, GeocodeRequest>('/geocode', params, 'post'),
  });
};
