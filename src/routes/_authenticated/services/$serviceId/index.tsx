import { createFileRoute } from '@tanstack/react-router';

import { ServiceLogsScreen } from '@/features/screen/services/screen/ServiceLogsScreen';
import { defaultPaginationSearchSchema } from '@/types/pagination.type';

export const Route = createFileRoute('/_authenticated/services/$serviceId/')({
  component: ServiceLogsScreen,
  validateSearch: defaultPaginationSearchSchema,
});
