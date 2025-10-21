import { AppContainerPage } from '@/components/AppContainerPage';

export function ProfileScreen() {
  return (
    <AppContainerPage
      title="Profile"
      description="Manage your personal information and account settings.">
      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p className="text-sm text-muted-foreground">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <p className="text-sm text-muted-foreground">System Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </AppContainerPage>
  );
}
