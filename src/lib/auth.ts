import { config } from './config';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: string;
  refreshTokenExpiredAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
}

class AuthManager {
  private static instance: AuthManager;
  private authState: AuthState = {
    user: null,
    tokens: null,
    isAuthenticated: false,
  };

  private constructor() {
    this.loadAuthState();
  }

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  private loadAuthState(): void {
    try {
      const tokens = localStorage.getItem('authTokens');
      const user = localStorage.getItem('user');

      if (tokens && user) {
        this.authState.tokens = JSON.parse(tokens);
        this.authState.user = JSON.parse(user);
        this.authState.isAuthenticated = true;
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      this.clearAuthState();
    }
  }

  private saveAuthState(): void {
    if (this.authState.tokens && this.authState.user) {
      localStorage.setItem('authTokens', JSON.stringify(this.authState.tokens));
      localStorage.setItem('user', JSON.stringify(this.authState.user));
    }
  }

  private clearAuthState(): void {
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');
    this.authState = {
      user: null,
      tokens: null,
      isAuthenticated: false,
    };
  }

  setAuthData(tokens: AuthTokens, user: User): void {
    this.authState.tokens = tokens;
    this.authState.user = user;
    this.authState.isAuthenticated = true;
    this.saveAuthState();
  }

  getAccessToken(): string | null {
    return this.authState.tokens?.accessToken || null;
  }

  getRefreshToken(): string | null {
    return this.authState.tokens?.refreshToken || null;
  }

  getUser(): User | null {
    return this.authState.user;
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  logout(): void {
    this.clearAuthState();
  }

  isTokenExpired(): boolean {
    if (!this.authState.tokens?.accessTokenExpiredAt) {
      return true;
    }

    const expirationTime = new Date(this.authState.tokens.accessTokenExpiredAt).getTime();
    const currentTime = Date.now();

    // Add 5 minute buffer to account for clock skew
    return currentTime >= expirationTime - 5 * 60 * 1000;
  }

  async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    const user = this.getUser();

    if (!refreshToken || !user) {
      this.logout();
      return false;
    }

    try {
      const response = await fetch(`${config.apiUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      const data = await response.json();

      if (data.success && data.data) {
        const newTokens: AuthTokens = {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          accessTokenExpiredAt: data.data.accessTokenExpiredAt,
          refreshTokenExpiredAt: data.data.refreshTokenExpiredAt,
        };

        this.authState.tokens = newTokens;
        this.saveAuthState();
        return true;
      }

      this.logout();
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout();
      return false;
    }
  }

  async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    let accessToken = this.getAccessToken();

    // Check if token is expired and refresh if needed
    if (this.isTokenExpired()) {
      const refreshed = await this.refreshAccessToken();
      if (!refreshed) {
        throw new Error('Authentication failed');
      }
      accessToken = this.getAccessToken();
    }

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (headers as any).Authorization = `Bearer ${accessToken}`;
    }

    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (headers as any)['X-Refresh-Token'] = refreshToken;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  }
}

export const authManager = AuthManager.getInstance();
export type { AuthState, AuthTokens, User };
