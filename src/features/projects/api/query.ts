import { useQuery } from '@tanstack/react-query';
import { projectsService } from '@/libs/api/services/projects';

export const useProjectsQuery = (workspaceId?: string) => {
  return useQuery({
    queryKey: ['projects', 'list', workspaceId],
    queryFn: () => projectsService.list(workspaceId),
  });
};

export const useProjectQuery = (idOrSlug: string) => {
  return useQuery({
    queryKey: ['projects', 'detail', idOrSlug],
    queryFn: () => projectsService.get(idOrSlug),
    enabled: !!idOrSlug,
  });
};

export const useProjectBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ['projects', 'by-slug', slug],
    queryFn: () => projectsService.getBySlug(slug),
    enabled: !!slug,
  });
};
