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
import type { ServiceType } from '@/types/service.type';

import { ServiceManagement } from '../ServiceManagement';

interface ServiceContextMenuProps {
  data: ServiceType;
  children: React.ReactNode;
}

export function ServiceContextMenu({ data: service, children }: ServiceContextMenuProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit' | 'view' | 'delete';
    service: ServiceType | null;
  }>({
    isOpen: false,
    mode: 'view',
    service: null,
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(service.id.toString());
  };

  const handleViewService = () => {
    setModalState({
      isOpen: true,
      mode: 'view',
      service,
    });
  };

  const handleEditService = () => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      service,
    });
  };

  const handleDeleteService = () => {
    setModalState({
      isOpen: true,
      mode: 'delete',
      service,
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      service: null,
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuLabel>Service Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={handleCopyId}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Copy service ID
          </ContextMenuItem>
          <ContextMenuItem onClick={handleViewService}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            View service
          </ContextMenuItem>
          <ContextMenuItem onClick={handleEditService}>
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Edit service
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            onClick={handleDeleteService}
            className="text-red-600 focus:text-red-600">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            Delete service
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ServiceManagement
        service={modalState.service}
        mode={modalState.mode}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
