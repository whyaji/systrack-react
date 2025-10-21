import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import type { ServiceLogType } from '@/types/service.type';

interface ServiceLogContextMenuProps {
  data: ServiceLogType;
  children: React.ReactNode;
  onViewDetails: (log: ServiceLogType) => void;
}

export function ServiceLogContextMenu({
  data,
  children,
  onViewDetails,
}: ServiceLogContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onViewDetails(data)}>View Details</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
