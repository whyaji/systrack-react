import { useQuery } from '@tanstack/react-query';

import { getServices } from '@/lib/api/serviceApi';
import type { PaginationParams } from '@/types/pagination.type';

export const useServicesQuery = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: ['services', params],
    queryFn: () => getServices(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
