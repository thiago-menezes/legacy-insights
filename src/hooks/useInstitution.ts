'use client';

export const useCurrentInstitution = () => {
  const institutionId = process.env.NEXT_PUBLIC_INSTITUTION || '';
  const institutionName = institutionId?.toUpperCase() || '';
  const institutionSlug = institutionId || '';

  return {
    institutionName,
    institutionId,
    institutionSlug,
  };
};
