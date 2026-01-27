import { useQuery } from '@tanstack/react-query';
import { workspacesService } from '@/libs/api/services/workspaces';

export const useWorkspacesQuery = () => {
  return useQuery({
    queryKey: workspacesService.keys('list'),
    queryFn: () => workspacesService.list(),
  });
};
