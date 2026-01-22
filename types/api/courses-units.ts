export type CourseUnitDTO = Partial<{
  id: number;
  name: string;
  state: string;
  city: string;
}>;

export type CoursesUnitsResponseDTO = Partial<{
  data: CourseUnitDTO[];
  meta: {
    total: number;
    institution: string;
    state: string;
    city: string;
    courseId: string;
  };
}>;
