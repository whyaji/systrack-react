import { Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface FileInodeData {
  date: string;
  fileCount: number;
  availableInode: number;
}

interface FileInodeChartProps {
  data: FileInodeData[];
  serviceName: string;
}

const chartConfig = {
  fileCount: {
    label: 'File Count',
    color: '#8b5cf6', // Purple
  },
  availableInode: {
    label: 'Available Inodes',
    color: '#f59e0b', // Orange
  },
};

export function FileInodeChart({ data, serviceName }: FileInodeChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Count & Inode Usage - {serviceName}</CardTitle>
        <CardDescription>File count and available inodes over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} width={400} height={300}>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="fileCount"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 5, fill: '#8b5cf6' }}
              name="File Count"
            />
            <Line
              type="monotone"
              dataKey="availableInode"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 5, fill: '#f59e0b' }}
              name="Available Inodes"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
