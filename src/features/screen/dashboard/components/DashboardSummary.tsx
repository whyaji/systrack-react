import { Activity, FileText, FolderOpen, HardDrive } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardServiceData } from '@/hooks/query/dashboard/useDashboardData';

interface DashboardSummaryProps {
  data: DashboardServiceData[];
}

export function DashboardSummary({ data }: DashboardSummaryProps) {
  // Calculate totals
  const totalServices = data.length;
  const activeServices = data.filter((item) => item.service.status === 1).length;
  const totalDiskUsage = data.reduce((sum, item) => {
    return sum + (item.latestLog?.disk_usage_mb || 0);
  }, 0);
  const totalFileCount = data.reduce((sum, item) => {
    return sum + (item.latestLog?.file_count || 0);
  }, 0);
  const totalAvailableSpace = data.reduce((sum, item) => {
    return sum + (item.latestLog?.available_space_mb || 0);
  }, 0);
  const totalAvailableInodes = data.reduce((sum, item) => {
    return sum + (item.latestLog?.available_inode || 0);
  }, 0);

  const stats = [
    {
      title: 'Total Services',
      value: totalServices,
      description: `${activeServices} active`,
      icon: Activity,
      color: 'text-blue-600',
    },
    {
      title: 'Total Disk Usage',
      value: `${(totalDiskUsage / 1000).toFixed(1)} GB`,
      description: `${(totalAvailableSpace / 1000).toFixed(1)} GB available`,
      icon: HardDrive,
      color: 'text-green-600',
    },
    {
      title: 'Total Files',
      value: totalFileCount.toLocaleString(),
      description: 'Across all services',
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      title: 'Available Inodes',
      value: totalAvailableInodes.toLocaleString(),
      description: 'Total available',
      icon: FolderOpen,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
