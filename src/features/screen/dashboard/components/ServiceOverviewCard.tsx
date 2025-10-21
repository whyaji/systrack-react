import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { ServiceType } from '@/types/service.type';
import { SERVICE_STATUS_LABELS, SERVICE_TYPE_LABELS } from '@/types/service.type';

interface ServiceOverviewCardProps {
  service: ServiceType;
  latestLog?: {
    disk_usage_mb: number;
    available_space_mb: number;
    file_count: number;
    available_inode: number;
    checked_at: string;
  };
}

export function ServiceOverviewCard({ service, latestLog }: ServiceOverviewCardProps) {
  const statusText = SERVICE_STATUS_LABELS[service.status];
  const typeText = SERVICE_TYPE_LABELS[service.type];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{service.name}</CardTitle>
          <Badge variant={service.status === 1 ? 'default' : 'secondary'}>{statusText}</Badge>
        </div>
        <CardDescription>{service.description}</CardDescription>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{typeText}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {latestLog ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Disk Usage</div>
                <div className="text-2xl font-bold">
                  {latestLog.disk_usage_mb.toLocaleString()} MB
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Available Space</div>
                <div className="text-2xl font-bold">
                  {latestLog.available_space_mb.toLocaleString()} MB
                </div>
              </div>
            </div>
            {/* Progress bar for disk usage and available space */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Disk Usage Usage</span>
                <span>
                  {((latestLog.disk_usage_mb / latestLog.available_space_mb) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={Math.min(
                  (latestLog.disk_usage_mb / latestLog.available_space_mb) * 100,
                  100
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">File Count</div>
                <div className="text-2xl font-bold">{latestLog.file_count.toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Available Inodes</div>
                <div className="text-2xl font-bold">
                  {latestLog.available_inode.toLocaleString()}
                </div>
              </div>
            </div>
            {/* Progress bar for file count and available inodes */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>File Count Usage</span>
                <span>
                  {((latestLog.file_count / latestLog.available_inode) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress
                value={Math.min((latestLog.file_count / latestLog.available_inode) * 100, 100)}
              />
            </div>
            <div className="col-span-2">
              <div className="text-sm font-medium text-muted-foreground">Last Checked</div>
              <div className="text-sm">{new Date(latestLog.checked_at).toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-4">No data available</div>
        )}
      </CardContent>
    </Card>
  );
}
