import type { Role } from '@/lib/domain';

export const currentUser = { name: 'Aarav Menon', role: 'PROJECT_MANAGER' as Role, initials: 'AM', phone: '+91 90000 45678', site: 'Tower B - East Podium' };
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
