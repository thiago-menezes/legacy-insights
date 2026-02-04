import { apiClient } from '../../axios';
import {
  IntegrationCreateInput,
  IntegrationResponse,
  SingleIntegrationResponse,
} from './types';

export const list = async (projectId?: string | number) => {
  const { data } = await apiClient.get<IntegrationResponse>(
    `/api/integrations?populate=*${
      projectId ? `&filters[project][documentId][$eq]=${projectId}` : ''
    }`,
  );
  return data;
};

export const get = async (id: string | number) => {
  const { data } = await apiClient.get<SingleIntegrationResponse>(
    `/api/integrations/${id}?populate=*`,
  );
  return data;
};

export const create = async (payload: IntegrationCreateInput) => {
  const { data } = await apiClient.post<SingleIntegrationResponse>(
    '/api/integrations',
    payload,
  );
  return data;
};

export const update = async (
  id: string | number,
  payload: Partial<IntegrationCreateInput>,
) => {
  const { data } = await apiClient.put(`/api/integrations/${id}`, payload);
  return data;
};

export const deleteIntegration = async (id: string | number) => {
  const { data } = await apiClient.delete(`/api/integrations/${id}`);
  return data;
};

export const validate = async (id: string | number) => {
  const { data } = await apiClient.post(`/api/integrations/${id}/validate`);
  return data;
};

export const process = async (id: string | number) => {
  const { data } = await apiClient.post(`/api/integrations/${id}/process`);
  return data;
};
