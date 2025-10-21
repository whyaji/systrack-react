import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { apiClient } from '@/lib/api';
import { authManager, type AuthTokens, type User } from '@/lib/auth';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (tokens: AuthTokens, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  initialize: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: (tokens: AuthTokens, user: User) => {
        authManager.setAuthData(tokens, user);
        set({
          user,
          tokens,
          isAuthenticated: true,
          error: null,
        });
      },

      logout: () => {
        authManager.logout();
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      initialize: () => {
        // Get current state from Zustand store (which is persisted)
        console.log('initialize');
        const currentState = get();

        // If we already have data in Zustand, sync it with AuthManager
        if (currentState.user && currentState.tokens) {
          authManager.setAuthData(currentState.tokens, currentState.user);
        } else {
          // If no data in Zustand, try to load from AuthManager
          const user = authManager.getUser();
          const tokens = authManager.isAuthenticated()
            ? {
                accessToken: authManager.getAccessToken()!,
                refreshToken: authManager.getRefreshToken()!,
                accessTokenExpiredAt: '',
                refreshTokenExpiredAt: '',
              }
            : null;

          if (user && tokens) {
            set({
              user,
              tokens,
              isAuthenticated: true,
            });
          }
        }

        // Only fetch user profile if we have authentication data
        if (authManager.isAuthenticated()) {
          apiClient
            .getUserProfile()
            .then((response) => {
              set({
                user: response.data,
              });
            })
            .catch((error) => {
              console.error('Failed to fetch user profile:', error);
            });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
