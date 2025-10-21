'use client';

import { useState } from 'react';

import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} from '@/hooks/query/services/useServiceMutations';
import type { ServiceType } from '@/types/service.type';

import { ConfirmationDialog } from '../../../../components/ConfirmationDialog.js';
import { ServiceForm } from './ServiceForm.js';

interface ServiceManagementProps {
  service?: ServiceType | null;
  mode: 'create' | 'edit' | 'view' | 'delete';
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceManagement({ service, mode, isOpen, onClose }: ServiceManagementProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const createServiceMutation = useCreateServiceMutation();
  const updateServiceMutation = useUpdateServiceMutation();
  const deleteServiceMutation = useDeleteServiceMutation();

  const handleFormSubmit = async (data: {
    name: string;
    description: string;
    type: number;
    status: number;
    resStatusApiUrl: string;
    resStatusApiKey: string;
  }) => {
    try {
      if (mode === 'create') {
        await createServiceMutation.mutateAsync(data);
      } else if (mode === 'edit' && service) {
        await updateServiceMutation.mutateAsync({
          id: service.id,
          data,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (service) {
      try {
        await deleteServiceMutation.mutateAsync(service.id);
        onClose();
      } catch (error) {
        console.error('Error deleting service:', error);
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
        title="Delete Service"
        description={`Are you sure you want to delete "${service?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    );
  }

  return (
    <>
      <ServiceForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleFormSubmit}
        service={service}
        mode={mode}
      />

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmationConfirm}
        title="Delete Service"
        description={`Are you sure you want to delete "${service?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
}
