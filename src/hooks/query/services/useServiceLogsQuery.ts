import { useQuery } from '@tanstack/react-query';

import { getServiceLogs } from '@/lib/api/serviceApi';
import type { PaginationParams } from '@/types/pagination.type';

export function useServiceLogsQuery(serviceId: number, queryParams: PaginationParams) {
  return useQuery({
    queryKey: ['serviceLogs', serviceId, queryParams],
    queryFn: () => getServiceLogs(serviceId, queryParams),
    enabled: !!serviceId,
  });
}
