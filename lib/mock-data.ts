import type { Role } from '@/lib/domain';

export const projects = [
  { name: 'NATIONAL HQ Expansion', site: 'Site A', progress: 68, risk: 'Medium', staff: 146, online: 91 },
  { name: 'Metro Depot Works', site: 'Site B', progress: 43, risk: 'High', staff: 88, online: 54 },
  { name: 'Riverside Utilities', site: 'Site C', progress: 81, risk: 'Low', staff: 62, online: 39 }
];
export const channels = [
  { name: 'General Site Updates', unread: 12, priority: 'normal', last: 'Pouring crew moving to Grid C4 after inspection.' },
  { name: 'Crane Coordination', unread: 4, priority: 'urgent', last: '@CraneOperator Tower crane required near Block B.' },
  { name: 'Safety Alerts', unread: 1, priority: 'emergency', last: 'Harness check mandatory before level 12 access.' },
  { name: 'Material Requests', unread: 7, priority: 'important', last: 'Store issued 120 bags cement for podium slab.' }
];
export const tasks = [
  { title: 'Rebar inspection L12 west core', owner: 'Site Engineer', due: 'Today 14:30', status: 'IN_PROGRESS', priority: 'High' },
  { title: 'Concrete pump setup at Gate 3', owner: 'Supervisor', due: 'Today 16:00', status: 'PENDING', priority: 'Urgent' },
  { title: 'Close toolbox talk attendance', owner: 'Safety Officer', due: 'Tomorrow 09:00', status: 'DELAYED', priority: 'Medium' }
];
export const announcements = [
  { title: 'Quick meeting near Tower 2', by: 'Project Manager', time: '8 min ago', type: 'Voice broadcast' },
  { title: 'Lightning alert: suspend crane lifts', by: 'Safety Officer', time: '24 min ago', type: 'Emergency' }
];

export type VoiceCommunication = {
  id: string;
  scope: 'FOR_ME' | 'FOR_ALL';
  channel: string;
  from: string;
  fromRole: Role;
  target: string;
  transcript: string;
  duration: string;
  time: string;
  priority: 'NORMAL' | 'IMPORTANT' | 'URGENT' | 'EMERGENCY';
  waveform: number[];
  taggedUsers?: string[];
  taggedRoles?: Role[];
};

export const voiceCommunications: VoiceCommunication[] = [
  {
    id: 'vc-1', scope: 'FOR_ME', channel: 'Crane Coordination', from: 'Rafiq Shaikh', fromRole: 'SUPERVISOR', target: '@CRANE_OPERATOR',
    transcript: 'Tower crane required near Block B for shuttering material. Please confirm ETA.', duration: '0:24', time: '2 min ago', priority: 'URGENT', taggedRoles: ['CRANE_OPERATOR'], waveform: [18, 28, 42, 30, 52, 44, 24, 38, 58, 32, 20, 45, 54, 27, 36, 48]
  },
  {
    id: 'vc-2', scope: 'FOR_ME', channel: 'Safety Alerts', from: 'Nisha Safety', fromRole: 'SAFETY_OFFICER', target: '@everyone on Tower B',
    transcript: 'Stop work at level 12 west edge until guardrail inspection is closed.', duration: '0:31', time: '7 min ago', priority: 'EMERGENCY', taggedRoles: ['WORKER', 'SUPERVISOR', 'SITE_ENGINEER'], waveform: [42, 54, 34, 22, 50, 58, 44, 24, 39, 56, 36, 20, 45, 51, 28, 40]
  },
  {
    id: 'vc-3', scope: 'FOR_ALL', channel: 'General Site Updates', from: 'Aarav Menon', fromRole: 'PROJECT_MANAGER', target: 'All project staff',
    transcript: 'Morning coordination complete. Concrete team moves to Grid C4 after QA clearance.', duration: '0:46', time: '15 min ago', priority: 'IMPORTANT', waveform: [16, 22, 30, 36, 28, 42, 48, 32, 25, 39, 44, 35, 29, 41, 26, 20]
  },
  {
    id: 'vc-4', scope: 'FOR_ALL', channel: 'Material Requests', from: 'Store Desk', fromRole: 'STORE_KEEPER', target: 'All supervisors',
    transcript: 'Cement and binding wire issued for podium slab. Return unused material before shift close.', duration: '0:19', time: '28 min ago', priority: 'NORMAL', taggedRoles: ['SUPERVISOR'], waveform: [14, 18, 24, 20, 28, 34, 22, 26, 32, 18, 24, 36, 30, 19, 22, 16]
  }
];
