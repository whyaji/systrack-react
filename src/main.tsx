import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import { useAuthStore } from './stores/auth';

const queryClient = new QueryClient();

// Initialize auth store (this restores state from localStorage)
useAuthStore.getState().initialize();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: {
      isAuthenticated: () => useAuthStore.getState().isAuthenticated,
    },
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
