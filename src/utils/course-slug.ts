import { slugify } from './slugify';

/**
 * Prefixes for degree types that are already in the course name
 * These patterns are used to detect if a course already has a degree type prefix
 */
const DEGREE_PREFIXES = [
  'bacharelado',
  'licenciatura',
  'tecnologia',
  'tecnólogo',
  'tecnologo',
  'gestão',
  'gestao',
  'terapia',
  'comunicação',
  'comunicacao',
] as const;

/**
 * Checks if the course name already contains a degree type prefix
 */
const hasDegreePrefix = (courseName: string): boolean => {
  const lowerName = courseName.toLowerCase().trim();
  return DEGREE_PREFIXES.some((prefix) => lowerName.startsWith(prefix));
};

/**
 * Builds a slug for the course name, adding "bacharelado-em-" prefix
 * if the course name doesn't already contain a degree type prefix
 *
 * @example
 * buildCourseSlug("Administração") => "bacharelado-em-administracao"
 * buildCourseSlug("Bacharelado em Direito") => "bacharelado-em-direito"
 * buildCourseSlug("Tecnologia em Logística") => "tecnologia-em-logistica"
 */
export const buildCourseSlug = (courseName: string): string => {
  if (!courseName) return '';

  const slug = slugify(courseName);

  if (hasDegreePrefix(courseName)) {
    return slug;
  }

  return `bacharelado-em-${slug}`;
};

type BuildCourseUrlParams = {
  courseName: string;
  courseId: string;
  city: string;
  unitName: string;
  unitId?: number;
  modality?: string;
  shift?: string;
  admissionForm?: string;
  slug: string;
};

export const buildCourseUrl = ({
  courseId,
  city,
  unitName,
  unitId,
  modality,
  shift,
  admissionForm,
  slug,
}: BuildCourseUrlParams): string => {
  if (modality?.toLowerCase() === 'digital') {
    const basePath = `/cursos/ead/${slug}/${courseId}`;
    const queryParams = new URLSearchParams();
    if (unitId) queryParams.set('unit', unitId.toString());
    const queryString = queryParams.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  const citySlug = slugify(city);
  const unitSlug = slugify(unitName);

  const basePath = `/cursos/${citySlug}/${unitSlug}/${slug}/${courseId}`;

  const queryParams = new URLSearchParams();
  if (modality) queryParams.set('modality', modality);
  if (shift) queryParams.set('shift', shift);
  if (admissionForm) queryParams.set('admissionForm', admissionForm);
  if (unitId) queryParams.set('unit', unitId.toString());

  const queryString = queryParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
};
