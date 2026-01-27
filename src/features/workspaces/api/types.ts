export interface UpdateWorkspaceParams {
  id: string;
  params: Partial<{
    name: string;
    slug: string;
    logo?: File | string | null;
  }>;
}
