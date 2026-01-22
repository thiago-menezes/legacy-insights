import { CourseShift } from './types';

export const MODALITY_LABELS: Record<string, string> = {
  presencial: 'Presencial',
  semipresencial: 'Semipresencial',
  digital: 'EAD',
};

export const SHIFT_LABELS: Record<CourseShift, string> = {
  matutino: 'Manhã',
  vespertino: 'Tarde',
  noturno: 'Noite',
};

export const DURATION_OPTIONS = [
  { label: '6 meses', value: [6] },
  { label: '1 ano', value: [12, 18] },
  { label: '2 anos', value: [24, 30] },
  { label: '3 anos', value: [36, 42] },
  { label: '4 anos', value: [48, 54] },
  { label: '+ que 4 anos', value: [60, 66, 72, 78] },
] as const;

export type DurationLabel = (typeof DURATION_OPTIONS)[number]['label'];

export const getDurationValuesFromLabels = (labels: string[]): number[] => {
  const allValues: number[] = [];
  labels.forEach((label) => {
    const option = DURATION_OPTIONS.find((opt) => opt.label === label);
    if (option) {
      allValues.push(...option.value);
    }
  });
  return allValues;
};

export const COURSE_LEVEL_LABELS: Record<string, string> = {
  graduation: 'Graduação',
  postgraduate: 'Pós-graduação',
};
