import { useQuery } from '@tanstack/react-query';
import { workspacesService } from '@/libs/api/services/workspaces';

export const useWorkspacesQuery = () => {
  return useQuery({
    queryKey: ['workspaces', 'list'],
    queryFn: () => workspacesService.list(),
  });
};
