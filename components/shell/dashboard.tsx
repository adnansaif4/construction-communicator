'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertOctagon, CalendarClock, Camera, CheckCircle2, ChevronRight, ClipboardList, Clock, Construction, FileText, MapPin, Mic, Play, Radio, Send, Truck, Users, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { channels, projects, tasks, announcements, voiceCommunications, type VoiceCommunication } from '@/lib/mock-data';
import { useOpsStore } from '@/lib/store/ops-store';
import type { DemoUser } from '@/lib/demo-auth';
import { roleLabels } from '@/lib/domain';
import { cn } from '@/lib/utils';

function Stat({ icon: Icon, label, value, detail }: { icon: typeof Activity; label: string; value: string; detail: string }) {
  return <Card><CardContent className="flex items-center gap-4 p-4"><div className="rounded-2xl bg-muted p-3"><Icon className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">{label}</p><p className="text-2xl font-black">{value}</p><p className="text-xs text-muted-foreground">{detail}</p></div></CardContent></Card>;
}

function VoiceCard({ item, highlighted }: { item: VoiceCommunication; highlighted?: boolean }) {
  return <div className={cn('rounded-2xl border p-4 transition-colors', highlighted && 'border-caution/60 bg-caution/10')}>
    <div className="mb-3 flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><p className="font-black">{item.channel}</p><Badge className={cn(item.priority === 'EMERGENCY' && 'border-red-200 bg-red-50 text-red-700', item.priority === 'URGENT' && 'border-amber-200 bg-amber-50 text-amber-700')}>{item.priority}</Badge></div><p className="text-xs text-muted-foreground">{item.from} · {roleLabels[item.fromRole]} · {item.time}</p></div><Button size="icon" variant="steel" aria-label="Play voice note"><Play className="h-4 w-4" /></Button></div>
    <div className="mb-3 flex h-14 items-end gap-1 rounded-2xl bg-muted p-2">{item.waveform.map((height, index) => <span key={`${item.id}-${index}`} className="w-full rounded bg-primary/75" style={{ height }} />)}</div>
    <p className="text-sm leading-6">{item.transcript}</p>
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"><span><Volume2 className="mr-1 inline h-3.5 w-3.5" />Voice note · {item.duration}</span><span>Target: {item.target}</span></div>
  </div>;
}

function CommunicationsPanel({ user }: { user: DemoUser }) {
  const [tab, setTab] = useState<'FOR_ME' | 'FOR_ALL'>('FOR_ME');
  const forMe = useMemo(() => voiceCommunications.filter((item) => item.priority === 'EMERGENCY' || item.taggedRoles?.includes(user.role) || item.taggedUsers?.includes(user.id)), [user.id, user.role]);
  const forAll = useMemo(() => voiceCommunications.filter((item) => item.scope === 'FOR_ALL'), []);
  const list = tab === 'FOR_ME' ? forMe : forAll;

  return <Card className="overflow-hidden">
    <CardHeader><CardTitle>Voice communications</CardTitle><CardDescription><b>For me</b> shows mentions, role tags and direct work instructions. <b>For all</b> shows public site broadcasts.</CardDescription></CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1"><button className={cn('min-h-12 rounded-xl text-sm font-black', tab === 'FOR_ME' && 'bg-card shadow-sm')} onClick={() => setTab('FOR_ME')} type="button">For me <span className="text-muted-foreground">({forMe.length})</span></button><button className={cn('min-h-12 rounded-xl text-sm font-black', tab === 'FOR_ALL' && 'bg-card shadow-sm')} onClick={() => setTab('FOR_ALL')} type="button">For all <span className="text-muted-foreground">({forAll.length})</span></button></div>
      <div className="space-y-3">{list.map((item) => <VoiceCard key={item.id} item={item} highlighted={tab === 'FOR_ME'} />)}</div>
    </CardContent>
  </Card>;
}

export function OpsDashboard({ user }: { user: DemoUser }) {
  const [recording, setRecording] = useState(false);
  const { pttActive, setPttActive } = useOpsStore();
  return <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] xl:grid-cols-[1fr_.72fr]">
    <section className="space-y-4">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-industrial">
        <div className="grid-noise relative p-5 md:p-7"><div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-caution via-slate-700 to-caution" /><Badge className="mb-4 border-caution/40 bg-caution/10 text-caution">Role workspace · {roleLabels[user.role]}</Badge><h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-5xl">Voice-first site communication, filtered for your role.</h2><p className="mt-3 max-w-2xl text-muted-foreground">Logged in as {user.name}. Your right-side feed separates <b>For me</b> tagged communications from <b>For all</b> public site broadcasts.</p><div className="mt-5 flex flex-wrap gap-3"><Button size="lg" variant="steel"><Radio className="h-5 w-5" />Open walkie talkie</Button><Button size="lg" variant={recording ? 'destructive' : 'default'} onClick={() => setRecording((value) => !value)}><Mic className="h-5 w-5" />{recording ? 'Stop voice note' : 'Record voice note'}</Button><Button size="lg" variant="outline"><FileText className="h-5 w-5" />Daily report</Button></div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat icon={Users} label="Staff online" value="184" detail="Across 3 sites" /><Stat icon={ClipboardList} label="For me" value="3" detail="Role/direct tags" /><Stat icon={Truck} label="Equipment" value="11" detail="4 active requests" /><Stat icon={AlertOctagon} label="Incidents" value="2" detail="0 unresolved SOS" /></div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Project activity</CardTitle><CardDescription>Progress, risk and live workforce presence.</CardDescription></CardHeader><CardContent className="space-y-4">{projects.map((project) => <div key={project.name} className="rounded-2xl border p-4"><div className="flex items-start justify-between"><div><p className="font-bold">{project.name}</p><p className="text-sm text-muted-foreground"><MapPin className="mr-1 inline h-3.5 w-3.5" />{project.site} · {project.online}/{project.staff} online</p></div><Badge className={cn(project.risk === 'High' && 'border-red-200 bg-red-50 text-red-700', project.risk === 'Low' && 'border-emerald-200 bg-emerald-50 text-emerald-700')}>{project.risk} risk</Badge></div><Progress value={project.progress} className="mt-3" /><p className="mt-2 text-xs text-muted-foreground">{project.progress}% planned progress complete</p></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Task board</CardTitle><CardDescription>Voice-ready assignments with escalation tracking.</CardDescription></CardHeader><CardContent className="space-y-3">{tasks.map((task) => <div key={task.title} className="flex gap-3 rounded-2xl border p-3"><CheckCircle2 className="mt-1 h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="font-semibold">{task.title}</p><p className="text-xs text-muted-foreground">{task.owner} · {task.due}</p></div><Badge>{task.status.replace('_', ' ')}</Badge></div>)}</CardContent></Card>
      </div>
    </section>
    <aside className="space-y-4">
      <CommunicationsPanel user={user} />
      <Card className="overflow-hidden"><CardHeader><CardTitle>Push-to-Talk</CardTitle><CardDescription>Hold for live WebRTC group and one-to-one audio.</CardDescription></CardHeader><CardContent className="text-center"><motion.button whileTap={{ scale: .96 }} onPointerDown={() => setPttActive(true)} onPointerUp={() => setPttActive(false)} onPointerLeave={() => setPttActive(false)} className={cn('mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full border-8 border-background bg-slate-900 text-white shadow-industrial transition-all', pttActive && 'bg-caution text-slate-950 ptt-glow')}><Radio className="h-14 w-14" /><span className="mt-2 text-sm font-black uppercase tracking-[0.22em]">{pttActive ? 'Live' : 'Hold'}</span></motion.button><p className="mt-4 text-sm text-muted-foreground">Speaker route, noise suppression, reconnect and emergency override are designed into the client API.</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Channels</CardTitle><CardDescription>Mentions notify only tagged users, roles or departments.</CardDescription></CardHeader><CardContent className="space-y-2">{channels.map((channel) => <div key={channel.name} className="flex items-center gap-3 rounded-2xl border p-3"><div className={cn('h-10 w-1.5 rounded-full bg-slate-300', channel.priority === 'urgent' && 'bg-caution', channel.priority === 'emergency' && 'bg-red-600')} /><div className="min-w-0 flex-1"><p className="font-bold">{channel.name}</p><p className="truncate text-xs text-muted-foreground">{channel.last}</p></div><Badge>{channel.unread}</Badge><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>Voice note composer</CardTitle><CardDescription>Background upload, waveform playback and optional transcription.</CardDescription></CardHeader><CardContent><Button className="w-full" size="lg" variant={recording ? 'destructive' : 'default'} onClick={() => setRecording((value) => !value)}><Mic className="h-5 w-5" />{recording ? 'Stop recording' : 'One-tap voice note'}</Button><div className="mt-4 flex h-12 items-end gap-1 rounded-2xl bg-muted p-2">{Array.from({ length: 32 }).map((_, index) => <span key={index} className="w-full rounded bg-primary/70" style={{ height: `${12 + ((index * 17) % 30)}px` }} />)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Live announcements</CardTitle></CardHeader><CardContent className="space-y-3">{announcements.map((item) => <div key={item.title} className="rounded-2xl border p-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-muted-foreground">{item.type} · {item.by} · {item.time}</p></div>)}<Button className="w-full" variant="outline"><Send className="h-4 w-4" />Broadcast to all staff</Button></CardContent></Card>
      <Card><CardHeader><CardTitle>Field modules</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-2">{[{ icon: CalendarClock, label: 'Attendance' }, { icon: Camera, label: 'Media' }, { icon: Construction, label: 'Equipment' }, { icon: Clock, label: 'Handover' }].map((module) => <Button key={module.label} variant="outline" className="h-16 flex-col"><module.icon className="h-5 w-5" />{module.label}</Button>)}</CardContent></Card>
    </aside>
  </div>;
}
