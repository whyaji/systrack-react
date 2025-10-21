import { zodResolver } from '@hookform/resolvers/zod';
import { Turnstile } from '@marsidev/react-turnstile';
import { Link } from '@tanstack/react-router';
import { AlertCircle, Eye, EyeOff, Monitor } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api';
import { config } from '@/lib/config';
import { type LoginFormData, loginSchema } from '@/lib/validations';
import { useAuthStore } from '@/stores/authStore';

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileError, setTurnstileError] = useState<string>('');

  const { login, setLoading, setError: setAuthError } = useAuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      turnstileToken: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    setTurnstileError('');
    setLoading(true);

    try {
      // Check if we have a valid turnstile token
      if (!turnstileToken && config.isProduction) {
        setTurnstileError('Please complete the security verification');
        setIsLoading(false);
        setLoading(false);
        return;
      }

      const loginData = {
        ...data,
        turnstileToken: turnstileToken || 'development-token',
      };

      const response = await apiClient.login(loginData);

      if (response.data) {
        login(response.data, response.data.user);
        // Redirect to dashboard will be handled by router
        window.location.href = '/dashboard';
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Monitor className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">SysTrack</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}>
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Cloudflare Turnstile */}
                {!config.isDevelopment && (
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <Turnstile
                        siteKey={config.turnstileSiteKey || '1x00000000000000000000AA'} // Default test key for development
                        onSuccess={(token) => {
                          setTurnstileToken(token);
                          setTurnstileError('');
                        }}
                        onError={() => {
                          setTurnstileToken('');
                          setTurnstileError('Security verification failed. Please try again.');
                        }}
                        onExpire={() => {
                          setTurnstileToken('');
                          setTurnstileError('Security verification expired. Please try again.');
                        }}
                        options={{
                          theme: 'light',
                          size: 'normal',
                        }}
                      />
                    </div>
                    {turnstileError && (
                      <p className="text-sm text-destructive text-center">{turnstileError}</p>
                    )}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <a href="#" className="text-primary hover:underline">
                  Contact administrator
                </a>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-muted-foreground hover:underline">
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Development Note */}
        <div className="mt-6 p-3 rounded-md bg-muted/50 border border-muted">
          <p className="text-xs text-muted-foreground text-center">
            {config.isDevelopment
              ? 'Development mode: Using test Turnstile key'
              : 'Protected by Cloudflare Turnstile'}
          </p>
        </div>
      </div>
    </div>
  );
}
