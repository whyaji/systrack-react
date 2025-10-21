'use client';

import { useState } from 'react';

import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '@/hooks/query/users/useUserMutations';
import type { UserType } from '@/types/user.type';

import { ConfirmationDialog } from './ConfirmationDialog';
import { UserForm } from './UserForm';

interface UserManagementProps {
  user?: UserType | null;
  mode: 'create' | 'edit' | 'view' | 'delete';
  isOpen: boolean;
  onClose: () => void;
}

export function UserManagement({ user, mode, isOpen, onClose }: UserManagementProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const handleFormSubmit = async (data: { name: string; email: string; password?: string }) => {
    try {
      if (mode === 'create') {
        await createUserMutation.mutateAsync(data);
      } else if (mode === 'edit' && user) {
        await updateUserMutation.mutateAsync({
          id: user.id,
          data: data.password ? data : { name: data.name, email: data.email },
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (user) {
      try {
        await deleteUserMutation.mutateAsync(user.id);
        onClose();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleConfirmationConfirm = () => {
    handleDeleteConfirm();
    setShowConfirmation(false);
  };

  if (mode === 'delete') {
    return (
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        description={`Are you sure you want to delete "${user?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    );
  }

  return (
    <>
      <UserForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleFormSubmit}
        user={user}
        mode={mode}
      />

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmationConfirm}
        title="Delete User"
        description={`Are you sure you want to delete "${user?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
