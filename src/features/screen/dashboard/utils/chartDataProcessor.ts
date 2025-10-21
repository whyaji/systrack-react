import type { ServiceLogType, SharedHostingHistoryData } from '@/types/service.type';

export interface ProcessedChartData {
  diskUsage: Array<{ date: string; diskUsage: number; availableSpace: number }>;
  fileCount: Array<{ date: string; fileCount: number }>;
  inodeUsage: Array<{ date: string; availableInode: number }>;
  fileInode: Array<{ date: string; fileCount: number; availableInode: number }>;
  percentageUsage: Array<{
    date: string;
    diskUsagePercentage: number;
    fileCountPercentage: number;
  }>;
}

export function processServiceLogsForCharts(logs: ServiceLogType[]): ProcessedChartData {
  const diskUsage: Array<{ date: string; diskUsage: number; availableSpace: number }> = [];
  const fileCount: Array<{ date: string; fileCount: number }> = [];
  const inodeUsage: Array<{ date: string; availableInode: number }> = [];
  const fileInode: Array<{ date: string; fileCount: number; availableInode: number }> = [];
  const percentageUsage: Array<{
    date: string;
    diskUsagePercentage: number;
    fileCountPercentage: number;
  }> = [];

  logs.forEach((log) => {
    const logData = log.data as SharedHostingHistoryData;
    const date = new Date(log.recordedAt).toLocaleDateString('id-ID', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });

    diskUsage.push({
      date,
      diskUsage: logData.disk_usage_mb,
      availableSpace: logData.available_space_mb,
    });

    fileCount.push({
      date,
      fileCount: logData.file_count,
    });

    inodeUsage.push({
      date,
      availableInode: logData.available_inode,
    });

    fileInode.push({
      date,
      fileCount: logData.file_count,
      availableInode: logData.available_inode,
    });

    // Calculate percentages
    const diskUsagePercentage = Math.min(
      (logData.disk_usage_mb / logData.available_space_mb) * 100,
      100
    );
    const fileCountPercentage = Math.min((logData.file_count / logData.available_inode) * 100, 100);

    percentageUsage.push({
      date,
      diskUsagePercentage: Number(diskUsagePercentage.toFixed(1)),
      fileCountPercentage: Number(fileCountPercentage.toFixed(1)),
    });
  });

  // Sort by date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortByDate = (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime();

  return {
    diskUsage: diskUsage.sort(sortByDate),
    fileCount: fileCount.sort(sortByDate),
    inodeUsage: inodeUsage.sort(sortByDate),
    fileInode: fileInode.sort(sortByDate),
    percentageUsage: percentageUsage.sort(sortByDate),
  };
}
