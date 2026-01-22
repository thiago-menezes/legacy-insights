import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { CourseSearchPage } from '@/features/course-search';
import { getQueryClient } from '@/libs/api/queryClient';

export const metadata: Metadata = {
  title: 'Cursos - Encontre o curso ideal para você',
  description:
    'Explore nossa lista de cursos e encontre a melhor opção para sua carreira.',
};

export default async function CursosPage() {
  const queryClient = getQueryClient();

  // Note: Initial prefetch without filters since city/state are user-dependent
  // The useQuery in CourseGrid will handle client-side fetching with user's location
  // This HydrationBoundary ensures proper hydration for any queries that might be cached

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CourseSearchPage />
    </HydrationBoundary>
  );
}
