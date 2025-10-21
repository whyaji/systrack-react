import { createFileRoute } from '@tanstack/react-router';

import { LandingPageScreen } from '@/features/screen/landing-page/screen/LandingPageScreen';

export const Route = createFileRoute('/')({
  component: LandingPageScreen,
});
