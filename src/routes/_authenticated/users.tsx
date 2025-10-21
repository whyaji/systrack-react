import { createFileRoute } from '@tanstack/react-router';

import { UsersListScreen } from '@/features/screen/users/screen/UsersListScreen';
import { defaultPaginationSearchSchema } from '@/types/pagination.type';

export const Route = createFileRoute('/_authenticated/users')({
  component: UsersListScreen,
  validateSearch: defaultPaginationSearchSchema,
});
