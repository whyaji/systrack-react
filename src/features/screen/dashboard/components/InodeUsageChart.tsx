import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface InodeUsageData {
  date: string;
  availableInode: number;
}

interface InodeUsageChartProps {
  data: InodeUsageData[];
  serviceName: string;
}

const chartConfig = {
  availableInode: {
    label: 'Available Inodes',
    color: '#f59e0b', // Orange
  },
};

export function InodeUsageChart({ data, serviceName }: InodeUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inode Usage - {serviceName}</CardTitle>
        <CardDescription>Available inodes over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} width={400} height={300}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="availableInode" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
