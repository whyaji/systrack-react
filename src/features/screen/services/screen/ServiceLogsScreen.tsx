import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

import { AppContainerPage } from '@/components/AppContainerPage';
import { AppTable } from '@/components/AppTable';
import { Button } from '@/components/ui/button';
import { serviceLogColumns } from '@/features/screen/services/components/serviceLogColumns';
import { ServiceLogContextMenu } from '@/features/screen/services/components/ServiceLogContextMenu';
import { SharedHostingDetailLog } from '@/features/screen/services/components/SharedHostingDetailLog';
import { useServiceByIdQuery } from '@/hooks/query/services/useServiceById';
import { useServiceLogsQuery } from '@/hooks/query/services/useServiceLogsQuery';
import { useSyncServiceLogsMutation } from '@/hooks/query/services/useServiceMutations';
import { usePaginationConfig } from '@/hooks/usePaginationConfig.hook';
import { Route } from '@/routes/_authenticated/services/$serviceId';
import type { PaginatedResponse } from '@/types/pagination.type';
import type { ServiceLogType, ServiceType } from '@/types/service.type';

export function ServiceLogsScreen() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { serviceId } = Route.useParams();

  // Modal state
  const [selectedLog, setSelectedLog] = useState<ServiceLogType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: serviceData } = useServiceByIdQuery(Number(serviceId));

  const service = (serviceData as { data: ServiceType })?.data;

  const { queryParams } = usePaginationConfig({ search, navigate });

  // Use TanStack Query for data fetching
  const { data: queryData, isLoading } = useServiceLogsQuery(Number(serviceId), queryParams);

  // Sync service logs mutation
  const syncServiceLogsMutation = useSyncServiceLogsMutation();

  // Extract service logs data from the API response
  const serviceLogs: ServiceLogType[] =
    (queryData as PaginatedResponse<ServiceLogType>)?.data || [];

  const handleSyncLogs = () => {
    syncServiceLogsMutation.mutate(Number(serviceId));
  };

  const handleViewDetails = (log: ServiceLogType) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedLog(null);
  };

  return (
    <>
      <AppContainerPage
        title={`Service Logs: ${service?.name}`}
        description={`View logs for service: ${service?.name}`}
        size="lg"
        headerActions={
          <Button onClick={handleSyncLogs} disabled={syncServiceLogsMutation.isPending}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            {syncServiceLogsMutation.isPending ? 'Syncing...' : 'Sync'}
          </Button>
        }>
        <AppTable
          columns={serviceLogColumns}
          data={serviceLogs}
          isLoading={isLoading}
          contextMenuComponent={(props) => (
            <ServiceLogContextMenu {...props} onViewDetails={handleViewDetails} />
          )}
        />
      </AppContainerPage>

      {/* Shared Hosting Detail Modal */}
      <SharedHostingDetailLog
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        logData={selectedLog}
      />
    </>
  );
}
