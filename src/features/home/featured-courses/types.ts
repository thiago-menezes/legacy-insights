import { CourseData } from 'types/api/courses';

export type LocationData = {
  city: string;
  state: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type GeoCoursesData = {
  title: string;
  description: string;
  location: LocationData;
  courses: CourseData[];
};

export type FeaturedCoursesSectionProps = {
  title: string;
  variant?: 'carousel' | 'grid';
};
