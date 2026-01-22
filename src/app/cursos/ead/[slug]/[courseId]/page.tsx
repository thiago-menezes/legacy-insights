import type { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';
import { CourseDetailsPage } from '@/features';
import { getCachedCourseDetails } from '@/features/course-details/cached-course-details';
import { CourseDetailsSkeleton } from '@/features/course-details/course-details-skeleton';
import { stripMarkdown } from '@/utils/strip-markdown';

type PageProps = {
  params: Promise<{ slug: string; courseId: string }>;
  searchParams: Promise<{ unit: string }>;
};

const institution = process.env.NEXT_PUBLIC_INSTITUTION || 'Grupo Ser';

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug, courseId } = await params;
  const { unit } = await searchParams;

  const courseDetails = await getCachedCourseDetails({
    courseId,
    slug,
    unitId: unit,
    institution,
  });

  const { seo, name, description, featuredImage } = courseDetails;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: seo?.title || name,
    description: seo?.description || stripMarkdown(description),
    keywords: seo?.keywords,
    robots: {
      index: seo?.robots?.includes('index'),
      follow: seo?.robots?.includes('follow'),
    },
    openGraph: {
      title: seo?.title || name,
      description: seo?.description || stripMarkdown(description),
      images: seo?.image
        ? [seo.image, ...previousImages]
        : featuredImage
          ? [featuredImage, ...previousImages]
          : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.title || name,
      description: seo?.description || stripMarkdown(description),
      images: seo?.image ? [seo.image] : featuredImage ? [featuredImage] : [],
    },
  };
}

async function CourseWithData({ params, searchParams }: PageProps) {
  const { slug, courseId } = await params;
  const { unit } = await searchParams;

  const courseDetails = await getCachedCourseDetails({
    courseId,
    slug,
    unitId: unit,
    institution,
  });

  return <CourseDetailsPage initialData={courseDetails} />;
}

export default function CourseDetailsRoute(props: PageProps) {
  return (
    <Suspense fallback={<CourseDetailsSkeleton />}>
      <CourseWithData {...props} />
    </Suspense>
  );
}
