import { apiClient } from '../../axios';
import {
  SaleResponse,
  SaleFilters,
  SingleSaleResponse,
  SaleAnalyticsResponse,
  SaleAnalyticsFilters,
} from './types';

export const list = async (filters?: SaleFilters) => {
  const params = new URLSearchParams();

  params.append('populate', '*');

  if (filters?.projectId) {
    params.append(
      'filters[project][documentId][$eq]',
      filters.projectId.toString(),
    );
  }

  if (filters?.integrationId) {
    params.append(
      'filters[integration][documentId][$eq]',
      filters.integrationId.toString(),
    );
  }

  if (filters?.productId) {
    params.append(
      'filters[product][documentId][$eq]',
      filters.productId.toString(),
    );
  }

  if (filters?.status) {
    params.append('filters[status][$eq]', filters.status);
  }

  if (filters?.startDate) {
    params.append('filters[saleDate][$gte]', filters.startDate);
  }

  if (filters?.endDate) {
    params.append('filters[saleDate][$lte]', filters.endDate);
  }

  if (filters?.page) {
    params.append('pagination[page]', filters.page.toString());
  }

  if (filters?.pageSize) {
    params.append('pagination[pageSize]', filters.pageSize.toString());
  } else {
    params.append('pagination[pageSize]', '25');
  }

  params.append('sort[0]', 'saleDate:desc');

  const { data } = await apiClient.get<SaleResponse>(
    `/api/sales?${params.toString()}`,
  );
  return data;
};

export const get = async (id: string | number) => {
  const { data } = await apiClient.get<SingleSaleResponse>(
    `/api/sales/${id}?populate=*`,
  );
  return data;
};

export const getAnalytics = async (filters?: SaleAnalyticsFilters) => {
  const params = new URLSearchParams();

  if (filters?.projectId) {
    params.append('projectId', filters.projectId);
  }

  if (filters?.startDate) {
    params.append('startDate', filters.startDate);
  }

  if (filters?.endDate) {
    params.append('endDate', filters.endDate);
  }

  if (filters?.status) {
    params.append('status', filters.status);
  }

  if (filters?.productId) {
    params.append('productId', filters.productId);
  }

  const { data } = await apiClient.get<SaleAnalyticsResponse>(
    `/api/sales/analytics?${params.toString()}`,
  );
  return data;
};
