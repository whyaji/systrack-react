import { Plus } from 'lucide-react';
import { useState } from 'react';

import { AppContainerPage } from '@/components/AppContainerPage';
import { AppTable } from '@/components/AppTable';
import { serviceColumns } from '@/components/columns/serviceColumns';
import { ServiceContextMenu } from '@/components/context-menu/ServiceContextMenu';
import { ServiceManagement } from '@/components/ServiceManagement';
import { Button } from '@/components/ui/button';
import { useServicesQuery } from '@/hooks/query/services/useServicesQuery';
import { usePaginationConfig } from '@/hooks/usePaginationConfig.hook';
import { Route } from '@/routes/_authenticated/services';
import type { PaginatedResponse } from '@/types/pagination.type';
import type { ServiceType } from '@/types/service.type';

export function ServicesListScreen() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { queryParams } = usePaginationConfig({ search, navigate });

  // Use TanStack Query for data fetching
  const { data: queryData, isLoading } = useServicesQuery(queryParams);

  // Extract services data from the API response
  const services: ServiceType[] = (queryData as PaginatedResponse<ServiceType>)?.data || [];

  return (
    <div className="container mx-auto py-10">
      <AppContainerPage
        title="Services"
        description="Manage your services and their monitoring."
        size="lg"
        headerActions={
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Service
          </Button>
        }>
        <AppTable
          columns={serviceColumns}
          data={services}
          isLoading={isLoading}
          contextMenuComponent={ServiceContextMenu}
        />
      </AppContainerPage>

      <ServiceManagement
        service={null}
        mode="create"
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
