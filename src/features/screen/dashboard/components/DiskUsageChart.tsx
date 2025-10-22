import { Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface DiskUsageData {
  date: string;
  diskUsage: number;
  availableSpace: number;
}

interface DiskUsageChartProps {
  data: DiskUsageData[];
  serviceName: string;
}

const chartConfig = {
  diskUsage: {
    label: 'Disk Usage (MB)',
    color: '#3b82f6', // Blue
  },
  availableSpace: {
    label: 'Available Space (MB)',
    color: '#10b981', // Green
  },
};

export function DiskUsageChart({ data, serviceName }: DiskUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disk Usage - {serviceName}</CardTitle>
        <CardDescription>Disk usage and available space over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} width={400} height={300}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="diskUsage"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: '#3b82f6' }}
              name="Disk Usage"
            />
            <Line
              type="monotone"
              dataKey="availableSpace"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 5, fill: '#10b981' }}
              name="Available Space"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
