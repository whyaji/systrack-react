import { createFileRoute } from '@tanstack/react-router';

import { ProfileScreen } from '@/features/screen/profile/screen/ProfileScreen';

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfileScreen,
});
