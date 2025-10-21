import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/lib/api/userApi';
import type { PaginationParams } from '@/types/pagination.type';

export const useUsersQuery = (params: PaginationParams = {}) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
