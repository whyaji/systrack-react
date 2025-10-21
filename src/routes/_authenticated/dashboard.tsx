import { createFileRoute } from '@tanstack/react-router';

import { DashboardScreen } from '@/features/screen/dashboard/screen/DashboardScreen';

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardScreen,
});
