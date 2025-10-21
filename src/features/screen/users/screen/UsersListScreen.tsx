import { Plus } from 'lucide-react';
import { useState } from 'react';

import { AppTable } from '@/components/AppTable';
import { userColumns } from '@/components/columns/userColumns';
import { UserContextMenu } from '@/components/context-menu/UserContextMenu';
import { Button } from '@/components/ui/button';
import { UserManagement } from '@/components/UserManagement';
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
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage your users and their permissions.</p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </div>

      <AppTable
        columns={userColumns}
        data={users}
        isLoading={isLoading}
        contextMenuComponent={UserContextMenu}
      />

      <UserManagement
        user={null}
        mode="create"
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
