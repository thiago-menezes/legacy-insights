import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from 'reshaped';
import {
  ProjectCreateInput,
  StrapiProject,
} from '@/libs/api/services/projects';
import { useSelectedWorkspace } from '../workspaces/context';
import { useWorkspaces } from '../workspaces/hooks';
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
} from './api/mutation';
import { useProjectBySlugQuery, useProjectsQuery } from './api/query';
import { useUserRole } from '../workspaces/use-user-role';

export const useProjects = () => {
  const params = useParams<{ workspaceSlug: string; projectSlug: string }>();
  const router = useRouter();
  const toast = useToast();
  const slug = params.workspaceSlug;
  const { workspaces, isLoading: isLoadingWorkspaces } = useWorkspaces();

  const workspace = workspaces?.data.find(
    (w) => w.slug === slug || w.documentId === slug,
  );

  const { canCreateProject, canDeleteWorkspace } = useUserRole();

  const { hasWorkspaces, selectedProject, selectWorkspace, refreshWorkspaces } =
    useSelectedWorkspace();

  const projectsQuery = useProjectsQuery(workspace?.documentId);
  const projectBySlugQuery = useProjectBySlugQuery(params.projectSlug);
  const project = projectBySlugQuery.data || null;

  const createMutation = useCreateProjectMutation(workspace?.documentId);
  const deleteMutation = useDeleteProjectMutation(workspace?.documentId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<
    StrapiProject | undefined
  >(undefined);
  const [isSwitchModalActive, setIsSwitchModalActive] = useState(false);
  const [pendingProject, setPendingProject] = useState<
    StrapiProject | undefined
  >(undefined);

  const handleOpenCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const projects = projectsQuery.data?.data || [];

  useEffect(() => {
    if (!isLoadingWorkspaces && !hasWorkspaces) {
      toast.show({
        title: 'Acesso restrito',
        text: 'Você não consegue visualizar projetos pois não tem nenhum workspace cadastrado.',
        color: 'critical',
      });
      router.push('/workspaces');
    }
  }, [isLoadingWorkspaces, hasWorkspaces, router, toast]);

  const handleProjectClick = (project: StrapiProject) => {
    if (project.documentId !== selectedProject?.documentId) {
      setPendingProject(project);
      setIsSwitchModalActive(true);
    } else {
      router.push(`/workspaces/${workspace?.slug}/${project.slug}`);
    }
  };

  const handleConfirmSwitch = (
    selectWorkspace: (orgId: string, projectId: string) => void,
  ) => {
    if (pendingProject && workspace) {
      selectWorkspace(workspace.documentId, String(pendingProject.id));
      router.push(`/workspaces/${workspace.slug}/${pendingProject.slug}`);
      setIsSwitchModalActive(false);
      setPendingProject(undefined);
    }
  };

  const handleCloseSwitchModal = () => {
    setIsSwitchModalActive(false);
    setPendingProject(undefined);
  };

  const handleOpenDelete = (project: StrapiProject) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(undefined);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      await deleteMutation.mutateAsync(projectToDelete.documentId, {
        onSuccess: () => {
          refreshWorkspaces();
          toast.show({
            title: 'Projeto removido',
            text: 'O projeto foi removido com sucesso.',
            color: 'positive',
          });
          handleCloseDelete();
        },
        onError: () => {
          toast.show({
            title: 'Erro ao remover projeto',
            text: 'Ocorreu um erro ao tentar remover o projeto.',
            color: 'critical',
          });
        },
      });
    }
  };

  const isLoading = projectsQuery.isLoading;

  const handleCreateProject = async (data: ProjectCreateInput) => {
    const result = await createMutation.mutateAsync(data, {
      onError: (error) => {
        const errorMessage = error.response?.data?.error?.message;
        const isUniqueError =
          errorMessage === 'This attribute must be unique' ||
          error.response?.data?.error?.name === 'ValidationError' ||
          error.status === 409 ||
          error.response?.status === 409;

        if (isUniqueError) {
          toast.show({
            title: 'Erro ao criar projeto',
            text: 'Já existe um projeto com este Identificador. Por favor, escolha outro.',
            color: 'critical',
          });
        } else {
          toast.show({
            title: 'Erro ao criar projeto',
            text: 'Ocorreu um erro ao tentar criar o projeto.',
            color: 'critical',
          });
        }
      },
    });
    const newProject = result.data;

    if (projects.length === 0 && workspace && newProject) {
      selectWorkspace(workspace.documentId, String(newProject.id));
    }

    toast.show({
      title: 'Projeto criado',
      text: 'O projeto foi criado com sucesso.',
      color: 'positive',
    });

    refreshWorkspaces();
    handleCloseModal();
  };

  return {
    project,
    projects,
    isLoading,
    handleCreateProject,
    isModalOpen,
    handleOpenCreate,
    handleCloseModal,
    workspace,
    isSwitchModalActive,
    pendingProject,
    handleProjectClick,
    handleConfirmSwitch,
    handleCloseSwitchModal,
    selectedProject,
    isDeleteModalOpen,
    projectToDelete,
    handleOpenDelete,
    handleCloseDelete,
    handleConfirmDelete,
    isDeleting: deleteMutation.isPending,
    canCreateProject,
    canDeleteWorkspace,
  };
};
