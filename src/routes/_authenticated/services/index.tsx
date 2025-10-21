import { createFileRoute } from '@tanstack/react-router';

import { ServicesListScreen } from '@/features/screen/services/screen/ServicesListScreen';
import { defaultPaginationSearchSchema } from '@/types/pagination.type';

export const Route = createFileRoute('/_authenticated/services/')({
  component: ServicesListScreen,
  validateSearch: defaultPaginationSearchSchema,
});
