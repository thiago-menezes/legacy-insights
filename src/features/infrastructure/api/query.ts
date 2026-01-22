'use client';

import { useQuery } from '@tanstack/react-query';
import { handleClientUnits } from '@/bff/handlers/units/client-handler';
import { handleUnitById } from '@/bff/handlers/units/handler';
import { useCurrentInstitution } from '@/hooks';

export const useQueryUnitById = (
  unitId: number | undefined,
  enabled = true,
  institutionSlugOverride?: string,
) => {
  const { institutionSlug: contextSlug } = useCurrentInstitution();
  const institutionSlug = institutionSlugOverride || contextSlug;

  return useQuery({
    queryKey: ['strapi', 'unit', institutionSlug, unitId],
    queryFn: () =>
      handleUnitById({
        institutionSlug: institutionSlug || '',
        unitId: unitId!,
      }),
    enabled: enabled && !!institutionSlug && !!unitId,
  });
};

export const useQueryClientUnits = (
  institution: string | undefined,
  state: string | undefined,
  city: string | undefined,
  courseId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ['client-api', 'units', institution, state, city, courseId],
    queryFn: () =>
      handleClientUnits({
        institution: institution!,
        state: state!,
        city: city!,
        courseId,
      }),
    enabled: enabled && !!institution && !!state && !!city,
  });
};
