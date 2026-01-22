import { CourseDetails } from '../types';

export type CourseEnrollmentSidebarProps = {
  course: CourseDetails;
  selectedModalityId: number | null;
  selectedUnitId?: number;
  selectedShiftName?: string | null;
  selectedAdmissionFormCode?: string | null;
};
