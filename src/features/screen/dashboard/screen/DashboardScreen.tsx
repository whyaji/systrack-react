import { Activity, BarChart3, Bell, Server, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';

import { AppContainerPage } from '@/components/AppContainerPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

export function DashboardScreen() {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContainerPage
      title={`Welcome back, ${user.name}!`}
      description="Here's what's happening with your systems today."
      className="bg-gradient-to-br from-background via-background to-muted min-h-screen">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Systems</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">+0.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+1 new member</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
            <CardDescription>Real-time status of your monitored systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Web Server Cluster</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Database Server</span>
                </div>
                <span className="text-sm text-muted-foreground">Healthy</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">Cache Server</span>
                </div>
                <span className="text-sm text-muted-foreground">Warning</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="font-medium">Load Balancer</span>
                </div>
                <span className="text-sm text-muted-foreground">Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Load Balancer Alert</p>
                  <p className="text-xs text-muted-foreground">High CPU usage detected</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Cache Server Warning</p>
                  <p className="text-xs text-muted-foreground">Memory usage above 80%</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System Update</p>
                  <p className="text-xs text-muted-foreground">
                    Web server cluster updated successfully
                  </p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New Team Member</p>
                  <p className="text-xs text-muted-foreground">John Doe joined the team</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>View Reports</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Settings className="h-6 w-6" />
                <span>Configure Alerts</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Team</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Server className="h-6 w-6" />
                <span>Add System</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppContainerPage>
  );
}
