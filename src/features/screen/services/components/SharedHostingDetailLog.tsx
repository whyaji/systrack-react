import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { ServiceLogType, SharedHostingHistoryData } from '@/types/service.type';

interface SharedHostingDetailLogProps {
  isOpen: boolean;
  onClose: () => void;
  logData: ServiceLogType | null;
}

export function SharedHostingDetailLog({ isOpen, onClose, logData }: SharedHostingDetailLogProps) {
  if (!logData) return null;

  const data = logData.data as SharedHostingHistoryData;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1000;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Shared Hosting Log Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Log Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Log Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Log ID</label>
                  <p className="text-sm">{logData.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Record ID</label>
                  <p className="text-sm">{logData.recordId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Recorded At</label>
                  <p className="text-sm">{new Date(logData.recordedAt).toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created At</label>
                  <p className="text-sm">{new Date(logData.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shared Hosting Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shared Hosting Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Base Path */}
              <div>
                <label className="text-sm font-medium text-muted-foreground">Base Path</label>
                <p className="text-sm font-mono bg-muted p-2 rounded">{data.base_path}</p>
              </div>

              <Separator />

              {/* File Statistics */}
              <div>
                <h4 className="text-base font-semibold mb-3">File Statistics</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">File Count</span>
                        <Badge variant="secondary">{formatNumber(data.file_count)}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Available Inodes</span>
                        <Badge variant="secondary">{formatNumber(data.available_inode)}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Usage Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Usage</span>
                      <span>{((data.file_count / data.available_inode) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((data.file_count / data.available_inode) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <Separator />

              {/* Disk Usage */}
              <div>
                <h4 className="text-base font-semibold mb-3">Disk Usage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Disk Usage</span>
                    <Badge variant="outline">{formatBytes(data.disk_usage_mb * 1000 * 1000)}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available Space</span>
                    <Badge variant="outline">
                      {formatBytes(data.available_space_mb * 1000 * 1000)}
                    </Badge>
                  </div>

                  {/* Usage Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>
                        {((data.disk_usage_mb / data.available_space_mb) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((data.disk_usage_mb / data.available_space_mb) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Check Information */}
              <div>
                <h4 className="text-base font-semibold mb-3">Check Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Checked At</label>
                    <p className="text-sm">{new Date(data.checked_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
