'use client';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, HardHat, KeyRound, LockKeyhole, ShieldCheck, Smartphone, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { authenticateDemoUser, canOpenAdminConsole, demoUsers, type DemoUser } from '@/lib/demo-auth';
import { roleLabels } from '@/lib/domain';

const storageKey = 'national-engineers-demo-session';

type AuthGateProps = {
  children: (props: { user: DemoUser; onLogout: () => void; onAdminUnlock: () => void }) => React.ReactNode;
};

function CredentialTable() {
  return <div className="overflow-hidden rounded-2xl border">
    <div className="grid grid-cols-[1fr_1fr] bg-muted px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted-foreground"><span>User ID</span><span>Password</span></div>
    {demoUsers.map((user) => <div key={user.id} className="grid grid-cols-[1fr_1fr] border-t px-3 py-2 text-sm"><span className="font-semibold">{user.employeeId}</span><span className="font-mono text-xs">{user.password}</span></div>)}
  </div>;
}

function LoginForm({ adminMode, onSuccess }: { adminMode: boolean; onSuccess: (user: DemoUser) => void }) {
  const [employeeId, setEmployeeId] = useState(adminMode ? 'ADMIN001' : 'PM001');
  const [password, setPassword] = useState(adminMode ? 'Admin@123' : 'Pm@12345');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setEmployeeId(adminMode ? 'ADMIN001' : 'PM001');
    setPassword(adminMode ? 'Admin@123' : 'Pm@12345');
    setError('');
  }, [adminMode]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = authenticateDemoUser(employeeId, password);
    if (!user) {
      setError('Invalid employee ID or password. Use demo credentials from README.');
      return;
    }
    if (adminMode && !canOpenAdminConsole(user)) {
      setError('Admin console is available only for Company Admin / Super Admin.');
      return;
    }
    setError('');
    onSuccess(user);
  }

  return <form className="space-y-4" onSubmit={submit}>
    <label className="grid gap-2 text-sm font-semibold">Employee ID
      <input className="min-h-12 rounded-2xl border bg-background px-4 outline-none ring-offset-background focus:ring-2 focus:ring-ring" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} placeholder="PM001" />
    </label>
    <label className="grid gap-2 text-sm font-semibold">Password
      <div className="flex min-h-12 items-center rounded-2xl border bg-background px-4 focus-within:ring-2 focus-within:ring-ring">
        <input className="min-w-0 flex-1 bg-transparent outline-none" value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password provided by admin" />
        <button type="button" className="text-muted-foreground" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
      </div>
    </label>
    {error && <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-950/40">{error}</p>}
    <Button className="w-full" size="lg" type="submit"><LockKeyhole className="h-5 w-5" />{adminMode ? 'Open admin console' : 'Login to web app'}</Button>
  </form>;
}

function AdminConsole({ user, onClose }: { user: DemoUser; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm">
    <Card className="mx-auto my-8 max-w-5xl shadow-2xl">
      <CardHeader className="border-b"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><Badge className="mb-2 border-caution/40 bg-caution/10 text-caution">Unlocked by 7 logo taps</Badge><CardTitle>Admin user onboarding</CardTitle><CardDescription>Only admin creates users, roles, IDs and temporary passwords. Public signup remains disabled.</CardDescription></div><Button variant="outline" onClick={onClose}>Close</Button></div></CardHeader>
      <CardContent className="grid gap-4 pt-5 lg:grid-cols-[.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border bg-muted/40 p-4"><div className="mb-3 flex items-center gap-2 font-bold"><ShieldCheck className="h-5 w-5 text-primary" />Logged in admin</div><p className="text-sm text-muted-foreground">{user.name} · {roleLabels[user.role]}</p><p className="text-sm text-muted-foreground">{user.employeeId} · {user.phone}</p></div>
          <div className="rounded-2xl border p-4"><div className="mb-3 flex items-center gap-2 font-bold"><UserPlus className="h-5 w-5 text-primary" />Create field user</div><div className="grid gap-3"><input className="min-h-11 rounded-xl border bg-background px-3" placeholder="Full name" /><input className="min-h-11 rounded-xl border bg-background px-3" placeholder="Employee ID" /><select className="min-h-11 rounded-xl border bg-background px-3"><option>Supervisor</option><option>Crane Operator</option><option>Safety Officer</option><option>Worker</option></select><Button type="button">Generate ID & password</Button></div><p className="mt-3 text-xs text-muted-foreground">Demo form only. Production flow stores password hashes, device policy and audit log through Prisma.</p></div>
        </div>
        <div className="space-y-3"><div className="flex items-center gap-2 font-bold"><Users className="h-5 w-5 text-primary" />Demo users available now</div><CredentialTable /></div>
      </CardContent>
    </Card>
  </div>;
}

export function AuthGate({ children }: AuthGateProps) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminConsoleOpen, setAdminConsoleOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setUser(JSON.parse(saved) as DemoUser);
  }, []);

  const tapHint = useMemo(() => Math.max(0, 7 - tapCount), [tapCount]);

  function completeLogin(nextUser: DemoUser) {
    setUser(nextUser);
    localStorage.setItem(storageKey, JSON.stringify(nextUser));
    if (canOpenAdminConsole(nextUser) && adminLoginOpen) setAdminConsoleOpen(true);
    setAdminLoginOpen(false);
  }

  function logout() {
    localStorage.removeItem(storageKey);
    setUser(null);
    setAdminConsoleOpen(false);
  }

  function unlockAdmin() {
    if (user && canOpenAdminConsole(user)) setAdminConsoleOpen(true);
    else setAdminLoginOpen(true);
  }

  function logoTap() {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    if (nextCount >= 7) {
      setTapCount(0);
      unlockAdmin();
    }
  }

  if (user) {
    return <>{children({ user, onLogout: logout, onAdminUnlock: unlockAdmin })}{adminConsoleOpen && <AdminConsole user={user} onClose={() => setAdminConsoleOpen(false)} />}{adminLoginOpen && <AdminLoginModal onClose={() => setAdminLoginOpen(false)} onSuccess={completeLogin} />}</>;
  }

  return <div className="min-h-dvh bg-background p-4 text-foreground">
    <div className="mx-auto grid min-h-[calc(100dvh-2rem)] max-w-6xl items-center gap-6 lg:grid-cols-[.95fr_1.05fr]">
      <section className="space-y-5"><button className="flex items-center gap-4 text-left" onClick={logoTap} type="button"><div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900 text-caution shadow-industrial"><HardHat className="h-9 w-9" /></div><div><p className="text-xs font-black uppercase tracking-[0.28em] text-muted-foreground">National Engineers</p><h1 className="text-4xl font-black tracking-tight">Site Command</h1></div></button><p className="max-w-xl text-lg text-muted-foreground">Phone-first construction communication with role-wise login, voice notes, PTT, emergency alerts and admin-controlled onboarding.</p><div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border p-4"><Smartphone className="mb-2 h-6 w-6 text-primary" /><p className="font-bold">Mobile web app</p><p className="text-xs text-muted-foreground">Open on every phone browser.</p></div><div className="rounded-2xl border p-4"><KeyRound className="mb-2 h-6 w-6 text-primary" /><p className="font-bold">ID + password</p><p className="text-xs text-muted-foreground">Credentials given by admin.</p></div><div className="rounded-2xl border p-4"><ShieldCheck className="mb-2 h-6 w-6 text-primary" /><p className="font-bold">Hidden admin</p><p className="text-xs text-muted-foreground">Tap logo {tapHint} more times.</p></div></div></section>
      <Card className="shadow-industrial"><CardHeader><Badge className="mb-2 w-fit border-caution/40 bg-caution/10 text-caution">Staff authentication</Badge><CardTitle>{adminLoginOpen ? 'Admin console authentication' : 'Login to your site workspace'}</CardTitle><CardDescription>No public signup. Your Company Admin creates your employee ID and password.</CardDescription></CardHeader><CardContent className="space-y-5"><LoginForm adminMode={adminLoginOpen} onSuccess={completeLogin} /><div className="rounded-2xl border bg-muted/40 p-3 text-xs text-muted-foreground">Demo: use <b>PM001 / Pm@12345</b> for staff. Tap the logo 7 times and use <b>ADMIN001 / Admin@123</b> for admin.</div>{adminLoginOpen && <Button className="w-full" variant="ghost" onClick={() => setAdminLoginOpen(false)}>Back to staff login</Button>}</CardContent></Card>
    </div>
  </div>;
}

function AdminLoginModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (user: DemoUser) => void }) {
  return <div className="fixed inset-0 z-50 bg-slate-950/80 p-4 backdrop-blur-sm"><Card className="mx-auto mt-20 max-w-md"><CardHeader><CardTitle>Admin authentication</CardTitle><CardDescription>Enter admin credentials after the 7-tap logo unlock.</CardDescription></CardHeader><CardContent className="space-y-4"><LoginForm adminMode onSuccess={onSuccess} /><Button className="w-full" variant="ghost" onClick={onClose}>Cancel</Button></CardContent></Card></div>;
}
