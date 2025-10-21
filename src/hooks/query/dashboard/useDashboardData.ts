import { useQuery } from '@tanstack/react-query';

import { useServicesQuery } from '@/hooks/query/services/useServicesQuery';
import { getServiceLogs } from '@/lib/api/serviceApi';
import type { PaginatedResponse } from '@/types/pagination.type';
import type { ServiceLogType, ServiceType, SharedHostingHistoryData } from '@/types/service.type';
import { SERVICE_TYPE } from '@/types/service.type';

export interface DashboardServiceData {
  service: ServiceType;
  logs: ServiceLogType[];
  latestLog?: SharedHostingHistoryData;
}

interface UseDashboardDataOptions {
  logLimit?: number;
}

export function useDashboardData(options: UseDashboardDataOptions = {}) {
  const { logLimit = 30 } = options;

  // Fetch all services
  const { data: servicesData, isLoading: servicesLoading } = useServicesQuery({
    page: 1,
    limit: 100,
  });

  const services: ServiceType[] = (servicesData as PaginatedResponse<ServiceType>)?.data || [];

  // Filter only shared hosting services
  const sharedHostingServices = services.filter(
    (service) => service.type === SERVICE_TYPE.SHARED_HOSTING
  );

  // Use a single query to fetch all service logs
  const { data: allLogsData, isLoading: logsLoading } = useQuery({
    queryKey: [
      'dashboard-logs',
      sharedHostingServices.map((s) => s.id),
      logLimit,
      sharedHostingServices.length,
    ],
    queryFn: async () => {
      if (sharedHostingServices.length === 0) return [];

      const logPromises = sharedHostingServices.map((service) =>
        getServiceLogs(service.id, { page: 1, limit: logLimit })
      );

      return Promise.all(logPromises);
    },
    enabled: sharedHostingServices.length > 0,
  });

  const isLoading = servicesLoading || logsLoading;

  // Process data
  const dashboardData: DashboardServiceData[] = sharedHostingServices.map((service, index) => {
    const serviceLogsData = allLogsData?.[index];
    const logs: ServiceLogType[] =
      (serviceLogsData as PaginatedResponse<ServiceLogType>)?.data || [];

    // Get the latest log data
    const latestLog = logs.length > 0 ? (logs[0].data as SharedHostingHistoryData) : undefined;

    return {
      service,
      logs,
      latestLog,
    };
  });

  return {
    data: dashboardData,
    isLoading,
    totalServices: sharedHostingServices.length,
  };
}
