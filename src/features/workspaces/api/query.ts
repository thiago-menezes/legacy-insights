import { useQuery } from '@tanstack/react-query';
import { workspacesService } from '@/libs/api/services/workspaces';

export const useWorkspacesQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['workspaces', 'list'],
    queryFn: () => workspacesService.list(),
    enabled,
  });
};
