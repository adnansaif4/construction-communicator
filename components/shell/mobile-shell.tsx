'use client';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Building2, ClipboardList, HardHat, Home, Mic, Radio, Settings, ShieldCheck, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useOpsStore } from '@/lib/store/ops-store';
import { currentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const nav = [{ icon: Home, label: 'Ops' }, { icon: Radio, label: 'PTT' }, { icon: ClipboardList, label: 'Tasks' }, { icon: Building2, label: 'Admin' }];

export function MobileShell({ children }: { children: React.ReactNode }) {
  const { online, emergencyOpen, setEmergencyOpen } = useOpsStore();
  return <div className="min-h-dvh bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b bg-background/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-caution shadow-industrial dark:bg-caution dark:text-slate-950"><HardHat className="h-6 w-6" /></div>
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">National Engineers</p><h1 className="text-lg font-black tracking-tight">Site Command</h1></div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={cn('hidden gap-1.5 sm:inline-flex', online ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950' : 'border-red-200 bg-red-50 text-red-700')}>{online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}{online ? 'Live' : 'Offline queue'}</Badge>
          <Button variant="destructive" size="sm" onClick={() => setEmergencyOpen(true)}><AlertTriangle className="h-4 w-4" />SOS</Button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-4 pb-28 pt-4 lg:px-8">{children}</main>
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-3 py-2 backdrop-blur-xl safe-bottom lg:hidden">
      <div className="grid grid-cols-4 gap-1">{nav.map((item) => <button key={item.label} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-muted-foreground first:bg-muted first:text-foreground"><item.icon className="h-5 w-5" />{item.label}</button>)}</div>
    </nav>
    {emergencyOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-red-950/80 p-4 backdrop-blur-sm"><div className="mx-auto mt-16 max-w-md rounded-3xl border border-red-300/30 bg-card p-6 shadow-2xl"><div className="mb-4 flex items-center gap-3 text-red-600"><ShieldCheck className="h-8 w-8" /><div><h2 className="text-2xl font-black">Emergency Broadcast</h2><p className="text-sm text-muted-foreground">High-priority audio, GPS and alert routing.</p></div></div><div className="grid gap-3"><Button size="lg" variant="destructive"><Mic className="h-5 w-5" />Hold to broadcast emergency audio</Button><Button size="lg" variant="outline">Share GPS and open emergency channel</Button><Button size="lg" variant="ghost" onClick={() => setEmergencyOpen(false)}>Cancel escalation</Button></div><p className="mt-4 text-xs text-muted-foreground">Mobile note: Android wrapper can provide foreground-service behavior. iOS browsers restrict lock-screen realtime audio and wake behavior.</p></div></motion.div>}
  </div>;
}

export function UserPill() {
  return <div className="flex items-center gap-3 rounded-2xl border bg-card p-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-black text-primary-foreground">{currentUser.initials}</div><div><p className="font-bold">{currentUser.name}</p><p className="text-xs text-muted-foreground">{currentUser.role.replace('_', ' ')} · {currentUser.site}</p></div><Bell className="ml-auto h-5 w-5 text-muted-foreground" /></div>;
}
