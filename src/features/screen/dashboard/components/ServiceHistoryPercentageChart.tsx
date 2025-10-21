import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface ServiceHistoryPercentageData {
  date: string;
  diskUsagePercentage: number;
  fileCountPercentage: number;
}

interface ServiceHistoryPercentageChartProps {
  data: ServiceHistoryPercentageData[];
  serviceName: string;
}

const chartConfig = {
  diskUsagePercentage: {
    label: 'Disk Usage %',
    color: '#ef4444', // Red
  },
  fileCountPercentage: {
    label: 'File Count Usage %',
    color: '#3b82f6', // Blue
  },
};

export function ServiceHistoryPercentageChart({
  data,
  serviceName,
}: ServiceHistoryPercentageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage History - {serviceName}</CardTitle>
        <CardDescription>
          Historical disk usage and file count usage percentages over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={data} width={600} height={250}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Bar
              dataKey="diskUsagePercentage"
              fill="#ef4444"
              name="Disk Usage %"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="fileCountPercentage"
              fill="#3b82f6"
              name="File Count Usage %"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
