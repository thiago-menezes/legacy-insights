import type { CourseTeacherDTO } from 'types/api/course-details';

export const filterTeachersByModality = (
  teachers: CourseTeacherDTO[] | undefined,
  selectedModalityId: number | null,
): CourseTeacherDTO[] => {
  if (!teachers || teachers.length === 0) {
    return [];
  }

  if (!selectedModalityId) {
    return teachers;
  }

  return teachers.filter((teacher) => {
    if (!teacher.modalities || teacher.modalities.length === 0) {
      return true;
    }

    return teacher.modalities.some((m) => m.id === selectedModalityId);
  });
};

export const canTeacherTeachModality = (
  teacher: CourseTeacherDTO,
  modalityId: number,
): boolean => {
  if (!teacher.modalities || teacher.modalities.length === 0) {
    return true;
  }

  return teacher.modalities.some((m) => m.id === modalityId);
};
