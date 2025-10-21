import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface AppContainerPageProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  showDivider?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  actions?: ReactNode;
  headerActions?: ReactNode;
}

export function AppContainerPage({
  title,
  description,
  className,
  children,
  showDivider = true,
  size = 'md',
  actions,
  headerActions,
}: AppContainerPageProps) {
  const sizeClasses = {
    sm: 'text-xl font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl font-bold tracking-tight',
    xl: 'text-4xl font-bold tracking-tight',
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className={sizeClasses[size]}>{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      </div>

      {showDivider && <div className="border-b" />}

      {actions && (
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}

      {children && <div className="pt-6">{children}</div>}
    </div>
  );
}
