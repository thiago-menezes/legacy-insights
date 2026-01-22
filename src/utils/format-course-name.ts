import { toProperCase } from './format-name';

const degreePattern =
  /^(BACHARELADO|LICENCIATURA|TECNOLOGIA|TECNÓLOGO|CURSO SUPERIOR DE TECNOLOGIA|CST|GESTÃO DE)\s*(EM|DE)?\s*/i;

export const getDegreeTag = (name: string): string | undefined => {
  const match = name.match(degreePattern);

  if (!match) return;

  const degree = match[1].toUpperCase();

  if (
    ['TECNOLOGIA', 'TECNÓLOGO', 'CURSO SUPERIOR DE TECNOLOGIA', 'CST'].includes(
      degree,
    )
  ) {
    return 'Tecnólogo';
  }

  if (degree === 'GESTÃO DE') {
    return 'Gestão';
  }

  return toProperCase(degree);
};

export const formatCourseName = (name: string) => {
  const commSocialPattern = /^COMUNICAÇÃO SOCIAL\s*-\s*/i;

  const formatted = name
    .replace(degreePattern, '')
    .replace(commSocialPattern, '');

  return toProperCase(formatted);
};
