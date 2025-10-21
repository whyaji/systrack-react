import { Plus } from 'lucide-react';
import { useState } from 'react';

import { AppContainerPage } from '@/components/AppContainerPage';
import { AppTable } from '@/components/AppTable';
import { Button } from '@/components/ui/button';
import { userColumns } from '@/features/screen/users/components/userColumns';
import { UserContextMenu } from '@/features/screen/users/components/UserContextMenu';
import { UserManagement } from '@/features/screen/users/components/UserManagement';
import { useUsersQuery } from '@/hooks/query/users/useUsersQuery';
import { usePaginationConfig } from '@/hooks/usePaginationConfig.hook';
import { Route } from '@/routes/_authenticated/users';
import type { PaginatedResponse } from '@/types/pagination.type';
import type { UserType } from '@/types/user.type';

export function UsersListScreen() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { queryParams } = usePaginationConfig({ search, navigate });

  // Use TanStack Query for data fetching create in frontend/srs/hooks/query/users
  const { data: queryData, isLoading } = useUsersQuery(queryParams);

  // Extract users data from the API response
  const users: UserType[] = (queryData as PaginatedResponse<UserType>)?.data || [];

  return (
    <>
      <AppContainerPage
        title="Users"
        description="Manage your users and their permissions."
        size="lg"
        headerActions={
          <Button onClick={() => setCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create User
          </Button>
        }>
        <AppTable
          columns={userColumns}
          data={users}
          isLoading={isLoading}
          contextMenuComponent={UserContextMenu}
        />
      </AppContainerPage>

      <UserManagement
        user={null}
        mode="create"
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
}
