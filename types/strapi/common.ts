export type StrapiMeta = Partial<{
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}>;

export type StrapiMedia = Partial<{
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Record<string, unknown>;
}>;

export type StrapiChild = Partial<{
  type: string;
  text: string;
  bold: boolean;
  italic: boolean;
  children: StrapiBlock[];
  url: string;
  caption: string;
}>;

export type StrapiBlock = Partial<{
  type: string;
  children: StrapiChild[];
  level: number;
  format: 'unordered' | 'ordered';
}>;

export type StrapiCollectionResponse<T> = Partial<{
  data: T[];
  meta: StrapiMeta;
}>;

export type StrapiModality = Partial<{
  id: number;
  documentId: string;
  nome: string;
  slug: string;
}>;

export type StrapiSharedSEO = Partial<{
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: Record<string, unknown>;
  metaViewport: string;
  canonicalURL: string;
  metaImage: StrapiMedia;
  metaSocial: {
    socialNetwork: 'Facebook' | 'Twitter';
    title: string;
    description: string;
    image: StrapiMedia;
  }[];
}>;
