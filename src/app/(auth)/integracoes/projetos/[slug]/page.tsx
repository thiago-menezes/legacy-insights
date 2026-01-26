'use client';

import { useParams } from 'next/navigation';
import { View, Text, Loader } from 'reshaped';
import { PageTitle } from '@/components/page-title';
import { Integrations } from '@/features/integrations';
import { useProjectBySlug } from '@/features/projects/hooks';

const ProjectDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { project, isLoading } = useProjectBySlug(slug);

  if (isLoading) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Loader />
      </View>
    );
  }

  if (!project) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Text>Projeto não encontrado</Text>
      </View>
    );
  }

  return (
    <View gap={6}>
      <PageTitle
        title={project.name}
        description={
          project.description || 'Gerencie as integrações deste projeto'
        }
      />

      <Integrations projectId={project.documentId} />
    </View>
  );
};

export default ProjectDetailPage;
