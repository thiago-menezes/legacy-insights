'use cache';

import { cacheLife, cacheTag } from 'next/cache';
import {
  handleCourseDetails,
  type CourseDetailsParams,
} from '@/bff/handlers/courses/handler-course';

export async function getCachedCourseDetails(params: CourseDetailsParams) {
  cacheLife('minutes');
  cacheTag('course-details', params.courseId, params.slug);

  return handleCourseDetails(params);
}
