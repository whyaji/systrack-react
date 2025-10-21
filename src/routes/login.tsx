import { createFileRoute, redirect } from '@tanstack/react-router';

import { LoginScreen } from '@/features/screen/login/screen/LoginScreen';
import { useAuthStore } from '@/stores/authStore';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    // check local storegate if user is authenticated
    if (useAuthStore.getState().isAuthenticated) {
      return redirect({ to: '/dashboard' });
    }
  },
  component: LoginScreen,
});
