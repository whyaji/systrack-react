import { RefreshCcw, Settings } from 'lucide-react';
import { useState } from 'react';

import { AppContainerPage } from '@/components/AppContainerPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardData } from '@/hooks/query/dashboard/useDashboardData';

import { DashboardSummary } from '../components/DashboardSummary';
import { DiskUsageChart } from '../components/DiskUsageChart';
import { FileInodeChart } from '../components/FileInodeChart';
import { PercentageUsageChart } from '../components/PercentageUsageChart';
import { ServiceHistoryPercentageChart } from '../components/ServiceHistoryPercentageChart';
import { ServiceOverviewCard } from '../components/ServiceOverviewCard';
import { processServiceLogsForCharts } from '../utils/chartDataProcessor';

export function DashboardScreen() {
  const [logLimit, setLogLimit] = useState(30);
  const [showSettings, setShowSettings] = useState(false);

  const {
    data: dashboardData,
    isLoading,
    totalServices,
  } = useDashboardData({
    logLimit,
  });

  if (isLoading) {
    return (
      <AppContainerPage
        title="Dashboard"
        description="Monitor your shared hosting services"
        size="lg">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppContainerPage>
    );
  }

  if (totalServices === 0) {
    return (
      <AppContainerPage
        title="Dashboard"
        description="Monitor your shared hosting services"
        size="lg">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">No Shared Hosting Services</h3>
              <p className="text-muted-foreground">
                You don't have any shared hosting services configured yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </AppContainerPage>
    );
  }

  return (
    <AppContainerPage
      title="Dashboard"
      description={`Monitor ${totalServices} shared hosting service${totalServices > 1 ? 's' : ''}`}
      size="lg"
      headerActions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      }>
      {showSettings && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dashboard Settings</CardTitle>
            <CardDescription>Configure how many log entries to display per service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Label htmlFor="logLimit">Log Limit:</Label>
              <Input
                id="logLimit"
                type="number"
                value={logLimit}
                onChange={(e) => setLogLimit(Number(e.target.value))}
                min="1"
                max="100"
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">entries per service</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8">
        {/* Dashboard Summary */}
        <DashboardSummary data={dashboardData} />

        {/* Percentage Usage Comparison Chart */}
        <PercentageUsageChart
          data={dashboardData.map((serviceData) => {
            const { service, latestLog } = serviceData;
            if (!latestLog) {
              return {
                serviceName: service.name,
                diskUsagePercentage: 0,
                fileCountPercentage: 0,
              };
            }

            const diskUsagePercentage = Math.min(
              (latestLog.disk_usage_mb / latestLog.available_space_mb) * 100,
              100
            );
            const fileCountPercentage = Math.min(
              (latestLog.file_count / latestLog.available_inode) * 100,
              100
            );

            return {
              serviceName: service.name,
              diskUsagePercentage: Number(diskUsagePercentage.toFixed(1)),
              fileCountPercentage: Number(fileCountPercentage.toFixed(1)),
            };
          })}
        />

        {dashboardData.map((serviceData) => {
          const { service, logs, latestLog } = serviceData;
          const chartData = processServiceLogsForCharts(logs);

          return (
            <div key={service.id} className="space-y-6">
              {/* Service Overview */}
              <ServiceOverviewCard service={service} latestLog={latestLog} />

              {/* Charts */}
              {logs.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <DiskUsageChart data={chartData.diskUsage} serviceName={service.name} />
                    <FileInodeChart data={chartData.fileInode} serviceName={service.name} />
                  </div>
                  <ServiceHistoryPercentageChart
                    data={chartData.percentageUsage}
                    serviceName={service.name}
                  />
                </div>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center py-8">
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold">No Data Available</h3>
                      <p className="text-muted-foreground">
                        No log data available for {service.name}. Try syncing the logs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </AppContainerPage>
  );
}
