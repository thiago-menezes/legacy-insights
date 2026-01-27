'use client';

import { useParams } from 'next/navigation';
import { View, Text, Loader } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { Integrations } from '@/features/integrations';
import { useProjectBySlug } from '@/features/projects/hooks';
import { useSelectedWorkspace } from '@/features/workspaces/context';

const ProjectDetailPage = () => {
  const params = useParams();
  const slug = params.projectSlug as string;
  const { project, isLoading } = useProjectBySlug(slug);
  const { selectedOrg } = useSelectedWorkspace();

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
    <>
      <PageTitle
        icon={<Icon name="folder" size={32} />}
        title={`Projeto: ${project.name}`}
        description={
          project.description || 'Gerencie as integrações deste projeto'
        }
        breadcrumbs={[
          {
            label: 'Lista de Workspaces',
            href: '/workspaces',
          },
          {
            label: `Workspace: ${selectedOrg?.name}`,
            href: `/workspaces/${selectedOrg?.slug}`,
          },
          {
            label: `Projeto: ${project.name}`,
          },
        ]}
      />

      <Integrations projectId={project.documentId} />
    </>
  );
};

export default ProjectDetailPage;
