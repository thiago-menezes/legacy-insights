import { useState } from 'react';
import {
  ProjectCreateInput,
  StrapiProject,
} from '@/libs/api/services/projects';
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from './api/mutation';
import {
  useProjectsQuery,
  useProjectQuery,
  useProjectBySlugQuery,
} from './api/query';

interface UseProjectParams {
  workspaceId?: string;
  id?: string;
  slug?: string;
}

export const useProject = (params: UseProjectParams = {}) => {
  const { workspaceId, id, slug } = params;

  const projectsQuery = useProjectsQuery(workspaceId);
  const projectQuery = useProjectQuery(id || '');
  const projectBySlugQuery = useProjectBySlugQuery(slug || '');

  const createMutation = useCreateProjectMutation(workspaceId);
  const updateMutation = useUpdateProjectMutation(workspaceId);
  const deleteMutation = useDeleteProjectMutation(workspaceId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StrapiProject | null>(
    null,
  );

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: StrapiProject) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const projects = projectsQuery.data?.data || [];
  const project = id
    ? projectQuery.data?.data
    : slug
      ? projectBySlugQuery.data
      : null;

  return {
    projects,
    project,
    isLoading:
      projectsQuery.isLoading ||
      projectQuery.isLoading ||
      projectBySlugQuery.isLoading ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
    error:
      (projectsQuery.error as Error)?.message ||
      (projectQuery.error as Error)?.message ||
      (projectBySlugQuery.error as Error)?.message ||
      createMutation.error?.message ||
      updateMutation.error?.message ||
      deleteMutation.error?.message ||
      null,
    refresh: projectsQuery.refetch,
    createProject: (data: ProjectCreateInput) =>
      createMutation.mutateAsync(data),
    updateProject: (id: string, data: Partial<ProjectCreateInput>) =>
      updateMutation.mutateAsync({ id, params: data }),
    deleteProject: (id: string) => deleteMutation.mutateAsync(id),

    // Modal state
    isModalOpen,
    editingProject,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
  };
};

/**
 * @deprecated Use useProject instead. This is kept for backward compatibility during refactoring.
 */
export const useProjects = (workspaceId?: string) =>
  useProject({ workspaceId });
