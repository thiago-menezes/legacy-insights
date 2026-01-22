export type InstitutionDTO = Partial<{
  id: number;
  documentId: string;
  name: string;
  slug: string;
  code?: string;
  defaultCity?: string;
  defaultState?: string;
}>;
