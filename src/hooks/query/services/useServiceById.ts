import { useQuery } from '@tanstack/react-query';

import { getServiceById } from '@/lib/api/serviceApi';

export function useServiceByIdQuery(serviceId: number) {
  return useQuery({
    queryKey: ['serviceById', serviceId],
    queryFn: () => getServiceById(serviceId),
    enabled: !!serviceId,
  });
}
