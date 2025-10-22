// Configuration constants
export const config = {
  baseUrl: window.location.origin,
  apiUrl: window.location.origin + '/api/v1',
  nodeEnv: import.meta.env.VITE_ENV || 'development',
  turnstileSiteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA', // Cloudflare test key
  isDevelopment: (import.meta.env.VITE_ENV || 'development') === 'development',
  isProduction: (import.meta.env.VITE_ENV || 'development') === 'production',
} as const;

// Legacy exports for backward compatibility
export const isDevelopment = config.isDevelopment;
export const isProduction = config.isProduction;
