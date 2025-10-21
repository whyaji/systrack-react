import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface AppContainerPageProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  showDivider?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AppContainerPage({
  title,
  description,
  className,
  children,
  showDivider = true,
  size = 'md',
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
        <h1 className={sizeClasses[size]}>{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {showDivider && <div className="border-b" />}

      {children && <div className="pt-6">{children}</div>}
    </div>
  );
}
