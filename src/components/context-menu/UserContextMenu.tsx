'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import type { UserType } from '@/types/user.type';

import { UserManagement } from '../UserManagement';

interface UserContextMenuProps {
  data: UserType;
  children: React.ReactNode;
}

export function UserContextMenu({ data: user, children }: UserContextMenuProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit' | 'view' | 'delete';
    user: UserType | null;
  }>({
    isOpen: false,
    mode: 'view',
    user: null,
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id.toString());
  };

  const handleViewUser = () => {
    setModalState({
      isOpen: true,
      mode: 'view',
      user,
    });
  };

  const handleEditUser = () => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      user,
    });
  };

  const handleDeleteUser = () => {
    setModalState({
      isOpen: true,
      mode: 'delete',
      user,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      user: null,
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuLabel>User Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleCopyId}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Copy user ID
          </ContextMenuItem>
          <ContextMenuItem onClick={handleViewUser}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            View user
          </ContextMenuItem>
          <ContextMenuItem onClick={handleEditUser}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Edit user
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleDeleteUser} className="text-red-600 focus:text-red-600">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Delete user
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <UserManagement
        user={modalState.user}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
