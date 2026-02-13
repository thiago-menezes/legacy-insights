import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { subDays } from 'date-fns';
import { useSalesAnalyticsQuery } from './api/analytics-query';
import { useSalesQuery } from './api/query';
import { DEFAULT_PAGE_SIZE } from './constants';
import { DatePreset, SalesPageFilters } from './types';
import { mapStrapiToSaleRow } from './utils';

const getDefaultDateRange = () => {
  const end = new Date();
  const start = subDays(end, 30);
  return { start, end };
};

export const useSalesData = () => {
  const router = useRouter();
  const defaultRange = getDefaultDateRange();

  const [filters, setFilters] = useState<SalesPageFilters>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    datePreset: '30d',
    startDate: defaultRange.start,
    endDate: defaultRange.end,
  });

  const apiFilters = useMemo(
    () => ({
      status: filters.status,
      productId: filters.productId,
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
      page: filters.page,
      pageSize: filters.pageSize,
    }),
    [filters],
  );

  const analyticsFilters = useMemo(
    () => ({
      status: filters.status,
      productId: filters.productId,
      startDate: filters.startDate?.toISOString(),
      endDate: filters.endDate?.toISOString(),
    }),
    [filters.status, filters.productId, filters.startDate, filters.endDate],
  );

  const { data, isLoading, error } = useSalesQuery(apiFilters);
  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    useSalesAnalyticsQuery(analyticsFilters);

  const rows = useMemo(
    () => (data?.data || []).map(mapStrapiToSaleRow),
    [data],
  );

  const pagination = data?.meta?.pagination;

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleDatePresetChange = useCallback((preset: DatePreset) => {
    setFilters((prev) => ({ ...prev, datePreset: preset, page: 1 }));
  }, []);

  const handleDateRangeChange = useCallback(
    (startDate?: Date, endDate?: Date) => {
      setFilters((prev) => ({ ...prev, startDate, endDate, page: 1 }));
    },
    [],
  );

  const handleProductFilter = useCallback((productId?: string) => {
    setFilters((prev) => ({ ...prev, productId, page: 1 }));
  }, []);

  const handleRowClick = useCallback(
    (documentId: string) => {
      router.push(`/vendas/${documentId}`);
    },
    [router],
  );

  return {
    rows,
    isLoading,
    isAnalyticsLoading,
    error,
    filters,
    analytics: analyticsData?.data,
    pagination: {
      currentPage: pagination?.page || 1,
      totalPages: pagination?.pageCount || 1,
      totalItems: pagination?.total || 0,
    },
    handlePageChange,
    handleDatePresetChange,
    handleDateRangeChange,
    handleProductFilter,
    handleRowClick,
  };
};
