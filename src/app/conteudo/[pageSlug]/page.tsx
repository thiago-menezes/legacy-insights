import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { handlePage } from '@/bff/handlers/pages';
import { ContentPage } from '@/features/content-page';

type PageProps = {
  params: Promise<{ pageSlug: string }>;
};

const institutionSlug = process.env.NEXT_PUBLIC_INSTITUTION || '';

async function getPageData(pageSlug: string) {
  const response = await handlePage({
    pageSlug,
    institutionSlug,
  });

  return response.data;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pageSlug } = await params;
  const page = await getPageData(pageSlug);

  if (!page) {
    return {
      title: 'Página não encontrada',
    };
  }

  return {
    title: page.title,
  };
}

export default async function ConteudoPage({ params }: PageProps) {
  const { pageSlug } = await params;
  const page = await getPageData(pageSlug);

  if (!page) {
    notFound();
  }

  return <ContentPage content={page.content} />;
}
