export type AreaOfInterestCourseDTO = Partial<{
  id: string;
  name: string;
  slug: string;
}>;

export type AreaOfInterestItemDTO = Partial<{
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  imageAlt: string;
  courses: AreaOfInterestCourseDTO[];
}>;

export type AreasOfInterestResponseDTO = Partial<{
  data: AreaOfInterestItemDTO[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}>;
