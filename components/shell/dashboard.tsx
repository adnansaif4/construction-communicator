'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertOctagon, CalendarClock, Camera, CheckCircle2, ChevronRight, ClipboardList, Clock, Construction, FileText, MapPin, Mic, Radio, Send, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { channels, projects, tasks, announcements } from '@/lib/mock-data';
import { useOpsStore } from '@/lib/store/ops-store';
import { cn } from '@/lib/utils';

function Stat({ icon: Icon, label, value, detail }: { icon: typeof Activity; label: string; value: string; detail: string }) {
  return <Card><CardContent className="flex items-center gap-4 p-4"><div className="rounded-2xl bg-muted p-3"><Icon className="h-6 w-6 text-primary" /></div><div><p className="text-sm text-muted-foreground">{label}</p><p className="text-2xl font-black">{value}</p><p className="text-xs text-muted-foreground">{detail}</p></div></CardContent></Card>;
}

export function OpsDashboard() {
  const [recording, setRecording] = useState(false);
  const { pttActive, setPttActive } = useOpsStore();
  return <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] xl:grid-cols-[1fr_.72fr]">
    <section className="space-y-4">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-industrial">
        <div className="grid-noise relative p-5 md:p-7"><div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-caution via-slate-700 to-caution" /><Badge className="mb-4 border-caution/40 bg-caution/10 text-caution">Live construction command center</Badge><h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-5xl">Structured field communication for every site, crew and emergency.</h2><p className="mt-3 max-w-2xl text-muted-foreground">A mobile-first PWA replacing unstructured WhatsApp groups with role-aware channels, PTT voice, daily reports, tasks, equipment workflows and audit trails.</p><div className="mt-5 flex flex-wrap gap-3"><Button size="lg" variant="steel"><Radio className="h-5 w-5" />Open walkie talkie</Button><Button size="lg" variant="outline"><FileText className="h-5 w-5" />Daily report</Button></div></div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat icon={Users} label="Staff online" value="184" detail="Across 3 sites" /><Stat icon={ClipboardList} label="Tasks due" value="27" detail="8 high priority" /><Stat icon={Truck} label="Equipment" value="11" detail="4 active requests" /><Stat icon={AlertOctagon} label="Incidents" value="2" detail="0 unresolved SOS" /></div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Project activity</CardTitle><CardDescription>Progress, risk and live workforce presence.</CardDescription></CardHeader><CardContent className="space-y-4">{projects.map((project) => <div key={project.name} className="rounded-2xl border p-4"><div className="flex items-start justify-between"><div><p className="font-bold">{project.name}</p><p className="text-sm text-muted-foreground"><MapPin className="mr-1 inline h-3.5 w-3.5" />{project.site} · {project.online}/{project.staff} online</p></div><Badge className={cn(project.risk === 'High' && 'border-red-200 bg-red-50 text-red-700', project.risk === 'Low' && 'border-emerald-200 bg-emerald-50 text-emerald-700')}>{project.risk} risk</Badge></div><Progress value={project.progress} className="mt-3" /><p className="mt-2 text-xs text-muted-foreground">{project.progress}% planned progress complete</p></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Task board</CardTitle><CardDescription>Voice-ready assignments with escalation tracking.</CardDescription></CardHeader><CardContent className="space-y-3">{tasks.map((task) => <div key={task.title} className="flex gap-3 rounded-2xl border p-3"><CheckCircle2 className="mt-1 h-5 w-5 text-primary" /><div className="min-w-0 flex-1"><p className="font-semibold">{task.title}</p><p className="text-xs text-muted-foreground">{task.owner} · {task.due}</p></div><Badge>{task.status.replace('_', ' ')}</Badge></div>)}</CardContent></Card>
      </div>
    </section>
    <aside className="space-y-4">
      <Card className="overflow-hidden"><CardHeader><CardTitle>Push-to-Talk</CardTitle><CardDescription>WebRTC low-latency group and one-to-one audio.</CardDescription></CardHeader><CardContent className="text-center"><motion.button whileTap={{ scale: .96 }} onPointerDown={() => setPttActive(true)} onPointerUp={() => setPttActive(false)} onPointerLeave={() => setPttActive(false)} className={cn('mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full border-8 border-background bg-slate-900 text-white shadow-industrial transition-all', pttActive && 'bg-caution text-slate-950 ptt-glow')}><Radio className="h-14 w-14" /><span className="mt-2 text-sm font-black uppercase tracking-[0.22em]">{pttActive ? 'Live' : 'Hold'}</span></motion.button><p className="mt-4 text-sm text-muted-foreground">Speaker route, noise suppression, reconnect and emergency override are designed into the client API.</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Channels</CardTitle><CardDescription>Mentions notify only tagged users, roles or departments.</CardDescription></CardHeader><CardContent className="space-y-2">{channels.map((channel) => <div key={channel.name} className="flex items-center gap-3 rounded-2xl border p-3"><div className={cn('h-10 w-1.5 rounded-full bg-slate-300', channel.priority === 'urgent' && 'bg-caution', channel.priority === 'emergency' && 'bg-red-600')} /><div className="min-w-0 flex-1"><p className="font-bold">{channel.name}</p><p className="truncate text-xs text-muted-foreground">{channel.last}</p></div><Badge>{channel.unread}</Badge><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>)}</CardContent></Card>
      <Card><CardHeader><CardTitle>Voice note composer</CardTitle><CardDescription>Background upload, waveform playback and optional transcription.</CardDescription></CardHeader><CardContent><Button className="w-full" size="lg" variant={recording ? 'destructive' : 'default'} onClick={() => setRecording((v) => !v)}><Mic className="h-5 w-5" />{recording ? 'Stop recording' : 'One-tap voice note'}</Button><div className="mt-4 flex h-12 items-end gap-1 rounded-2xl bg-muted p-2">{Array.from({ length: 32 }).map((_, i) => <span key={i} className="w-full rounded bg-primary/70" style={{ height: `${12 + ((i * 17) % 30)}px` }} />)}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Live announcements</CardTitle></CardHeader><CardContent className="space-y-3">{announcements.map((item) => <div key={item.title} className="rounded-2xl border p-3"><p className="font-semibold">{item.title}</p><p className="text-xs text-muted-foreground">{item.type} · {item.by} · {item.time}</p></div>)}<Button className="w-full" variant="outline"><Send className="h-4 w-4" />Broadcast to all staff</Button></CardContent></Card>
      <Card><CardHeader><CardTitle>Field modules</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-2">{[{ icon: CalendarClock, label: 'Attendance' }, { icon: Camera, label: 'Media' }, { icon: Construction, label: 'Equipment' }, { icon: Clock, label: 'Handover' }].map((m) => <Button key={m.label} variant="outline" className="h-16 flex-col"><m.icon className="h-5 w-5" />{m.label}</Button>)}</CardContent></Card>
    </aside>
  </div>;
}
