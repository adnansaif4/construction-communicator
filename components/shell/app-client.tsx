'use client';
import { AuthGate } from '@/components/shell/auth-gate';
import { MobileShell, UserPill } from '@/components/shell/mobile-shell';
import { OpsDashboard } from '@/components/shell/dashboard';

export function AppClient() {
  return <AuthGate>{({ user, onLogout, onAdminUnlock }) => <MobileShell user={user} onLogout={onLogout} onAdminUnlock={onAdminUnlock}><div className="mb-4"><UserPill user={user} onLogout={onLogout} /></div><OpsDashboard user={user} /></MobileShell>}</AuthGate>;
}
