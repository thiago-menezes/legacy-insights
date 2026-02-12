'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, Pagination, Text, View } from 'reshaped';
import { Icon } from '@/components/icon';
import { PageTitle } from '@/components/page-title';
import { StrapiProduct } from '@/libs/api/services/products';
import { useProjects } from '../projects/hooks';
import { useSelectedWorkspace } from '../workspaces/context';
import { useProductsData } from './hooks';
import { Table } from '@/components/table';
import { COLUMN_DEFS } from './constants';

export const Products = () => {
  const { project } = useProjects();
  const {
    selectedOrg,
    currentWorkspaceHasProjects,
    isLoading: isLoadingWorkspace,
  } = useSelectedWorkspace();

  const router = useRouter();

  useEffect(() => {
    if (!isLoadingWorkspace && !currentWorkspaceHasProjects && selectedOrg) {
      router.push(`/workspaces/${selectedOrg.slug}`);
    }
  }, [isLoadingWorkspace, currentWorkspaceHasProjects, selectedOrg, router]);

  const { data, isLoading, handlePageChange } = useProductsData(
    project?.documentId,
  );

  const handleViewDetails = (productId: string) => {
    if (selectedOrg && project) {
      router.push(
        `/workspaces/${selectedOrg.slug}/${project.slug}/products/${productId}`,
      );
    }
  };

  if (isLoading || isLoadingWorkspace) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Loader />
      </View>
    );
  }

  if (!project) {
    return (
      <View align="center" justify="center" paddingTop={10}>
        <Text>Projeto não encontrado</Text>
      </View>
    );
  }

  const products = data?.data || [];
  const pagination = data?.meta?.pagination;

  return (
    <View>
      <PageTitle
        icon={<Icon name="package" size={32} />}
        title={`Produtos - ${project.name}`}
        description="Gerencie seus produtos digitais e acompanhe vendas via webhooks"
      />

      <View paddingTop={4} gap={4}>
        <View direction="row" justify="space-between" align="center">
          <Text variant="featured-2" weight="medium">
            Lista de Produtos
          </Text>
        </View>

        {products.length === 0 ? (
          <View
            align="center"
            justify="center"
            paddingTop={10}
            paddingBottom={10}
          >
            <Text color="neutral-faded">
              Nenhum produto integrado encontrado para este projeto.
            </Text>
          </View>
        ) : (
          <Table<StrapiProduct>
            rowData={products}
            columnDefs={COLUMN_DEFS({
              onViewDetails: handleViewDetails,
            })}
            defaultColDef={{
              resizable: true,
              suppressMovable: true,
            }}
            rowSelection="multiple"
            onSelectionChanged={() => {}}
            domLayout="autoHeight"
            rowHeight={72}
            headerHeight={48}
            pagination={false}
          />
        )}

        {pagination && pagination.pageCount > 1 && (
          <Pagination
            total={pagination.pageCount}
            previousAriaLabel="Previous page"
            nextAriaLabel="Next page"
            onChange={({ page }) => handlePageChange(page)}
            page={pagination.page}
          />
        )}
      </View>
    </View>
  );
};
