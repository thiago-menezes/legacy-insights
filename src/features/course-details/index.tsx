'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Container, View } from 'reshaped';
import type { CourseDetailsDTO } from 'types/api/course-details';
import { toProperCase } from '@/utils';
import { useQueryCourseDetails } from './api/query';
import { CourseDetailsContent } from './course-details-content';
import { CourseDetailsSkeleton } from './course-details-skeleton';
import styles from './styles.module.scss';

type CourseDetailsPageProps = {
  initialData?: CourseDetailsDTO;
};

const institution = process.env.NEXT_PUBLIC_INSTITUTION || 'Grupo Ser';

export const CourseDetailsPage = ({ initialData }: CourseDetailsPageProps) => {
  const { courseId, slug } = useParams<{ courseId: string; slug?: string }>();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  const {
    data: course,
    isLoading,
    error,
  } = useQueryCourseDetails({
    courseId: courseId || '',
    slug: slug || '',
    unitId: unit || '',
    initialData,
  });

  useEffect(() => {
    if (course?.name) {
      const title = `${toProperCase(course.name)} - ${institution.toUpperCase()}`;
      document.title = title;

      const description =
        course.description?.replace(/[#*`_~]/g, '') ||
        `Faça parte e inclua o curso de ${toProperCase(course.name)} no seu currículo.`;
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [course?.name, course?.description]);

  if (isLoading && !initialData) {
    return (
      <View className={styles.page}>
        <Container>
          <CourseDetailsSkeleton />
        </Container>
      </View>
    );
  }

  if (error || !course || !courseId) {
    return (
      <View className={styles.page}>
        <Container>
          <View className={styles.error}>
            <h1>
              {!courseId
                ? 'Parâmetro Course ID não encontrado'
                : 'Curso não encontrado'}
            </h1>
            <p>
              {!courseId
                ? 'O parâmetro Course ID é obrigatório para visualizar os detalhes do curso.'
                : 'O curso que você está procurando não foi encontrado.'}
            </p>
          </View>
        </Container>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <Container className={styles.topSection}>
        <CourseDetailsContent course={course} />
      </Container>
    </View>
  );
};
