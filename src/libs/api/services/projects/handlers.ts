import { apiClient } from '../../axios';
import { ServiceConfig } from '../types';
import {
  ProjectCreateInput,
  ProjectResponse,
  SingleProjectResponse,
  StrapiProject,
} from './types';

export const list = async (
  workspaceId?: string,
): ServiceConfig<ProjectResponse> => {
  const filter = workspaceId
    ? `&filters[workspace][documentId][$eq]=${workspaceId}`
    : '';
  const { data } = await apiClient.get<ProjectResponse>(
    `/api/projects?populate=*${filter}`,
  );
  return { ...data, keys: ['projects', workspaceId] };
};

export const get = async (idOrSlug: string): Promise<SingleProjectResponse> => {
  const { data } = await apiClient.get<SingleProjectResponse>(
    `/api/projects/${idOrSlug}?populate=*`,
  );
  return data;
};

export const getBySlug = async (slug: string): Promise<StrapiProject> => {
  const { data } = await apiClient.get<{ data: StrapiProject[] }>(
    `/api/projects?filters[slug][$eq]=${slug}&populate=*`,
  );

  return data.data[0];
};

export const create = async (
  payload: ProjectCreateInput,
): Promise<SingleProjectResponse> => {
  const { data } = await apiClient.post<SingleProjectResponse>(
    '/api/projects',
    { data: payload },
  );
  return data;
};

export const update = async (
  id: string,
  payload: Partial<ProjectCreateInput>,
): Promise<SingleProjectResponse> => {
  const { data } = await apiClient.put<SingleProjectResponse>(
    `/api/projects/${id}`,
    { data: payload },
  );
  return data;
};

export const deleteProject = async (id: string) =>
  apiClient.delete(`/api/projects/${id}`);
