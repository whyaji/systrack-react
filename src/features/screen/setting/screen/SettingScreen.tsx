import { AppContainerPage } from '@/components/AppContainerPage';

export function SettingsPage() {
  return (
    <AppContainerPage title="Settings" description="Manage your account settings and preferences.">
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-sm text-muted-foreground">John Doe</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-sm text-muted-foreground">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Dark Mode</label>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </AppContainerPage>
  );
}
