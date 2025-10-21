import { authManager } from './auth';
import { config } from './config';

const API_BASE_URL = config.apiUrl;

export interface LoginRequest {
  email: string;
  password: string;
  turnstileToken: string;
}

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: string;
    refreshTokenExpiredAt: string;
    user: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    };
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
  userId: number;
}

export interface RefreshTokenResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: string;
    refreshTokenExpiredAt: string;
  };
  message?: string;
}

export interface UserProfileResponse {
  data: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const response = await authManager.makeAuthenticatedRequest(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    return response.json();
  }

  async getUserProfile(): Promise<UserProfileResponse> {
    return this.request<UserProfileResponse>('/auth/profile', {
      method: 'GET',
    });
  }

  async logout(): Promise<LogoutResponse> {
    return this.request<LogoutResponse>('/auth/logout', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();
