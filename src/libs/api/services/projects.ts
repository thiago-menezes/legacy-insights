import { apiClient } from '../axios';
import { createServiceKeys } from '../utils';
import { IntegrationType } from './integrations';

export interface StrapiProject {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  workspace?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
  };
  integrations?: {
    id: number;
    documentId: string;
    name: string;
    type: IntegrationType;
    status: 'connected' | 'disconnected' | 'token_expired';
  }[];
}

export interface ProjectResponse {
  data: StrapiProject[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SingleProjectResponse {
  data: StrapiProject;
}

export interface ProjectCreateInput {
  name: string;
  slug: string;
  description?: string;
  workspace: number | string;
}

const serviceMethods = {
  async list(workspaceId?: string): Promise<ProjectResponse> {
    const filter = workspaceId
      ? `&filters[workspace][documentId][$eq]=${workspaceId}`
      : '';
    const { data } = await apiClient.get<ProjectResponse>(
      `/api/projects?populate=*${filter}`,
    );
    return data;
  },

  async get(idOrSlug: string): Promise<SingleProjectResponse> {
    const { data } = await apiClient.get<SingleProjectResponse>(
      `/api/projects/${idOrSlug}?populate=*`,
    );
    return data;
  },

  async getBySlug(slug: string): Promise<SingleProjectResponse> {
    const { data: listData } = await apiClient.get<ProjectResponse>(
      `/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    );
    if (!listData.data[0]) {
      throw new Error(`Project not found: ${slug}`);
    }
    return { data: listData.data[0] };
  },

  async create(payload: ProjectCreateInput): Promise<SingleProjectResponse> {
    const { data } = await apiClient.post<SingleProjectResponse>(
      '/api/projects',
      { data: payload },
    );
    return data;
  },

  async update(
    id: string,
    payload: Partial<ProjectCreateInput>,
  ): Promise<SingleProjectResponse> {
    const { data } = await apiClient.put<SingleProjectResponse>(
      `/api/projects/${id}`,
      { data: payload },
    );
    return data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/projects/${id}`);
  },
};

export const projectService = {
  ...serviceMethods,
  keys: createServiceKeys<typeof serviceMethods>(serviceMethods),
};
