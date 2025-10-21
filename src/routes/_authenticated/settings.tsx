import { createFileRoute } from '@tanstack/react-router';

import { SettingsPage } from '@/features/screen/setting/screen/SettingScreen';

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
});
