import type { Role } from '@/lib/domain';

export type DemoUser = {
  id: string;
  employeeId: string;
  password: string;
  name: string;
  initials: string;
  role: Role;
  department: string;
  site: string;
  phone: string;
};

export const demoUsers: DemoUser[] = [
  { id: 'u-admin', employeeId: 'ADMIN001', password: 'Admin@123', name: 'NATIONAL Admin', initials: 'NA', role: 'COMPANY_ADMIN', department: 'Head Office', site: 'All Sites', phone: '+91 90000 10001' },
  { id: 'u-pm', employeeId: 'PM001', password: 'Pm@12345', name: 'Aarav Menon', initials: 'AM', role: 'PROJECT_MANAGER', department: 'Project Controls', site: 'Tower B - East Podium', phone: '+91 90000 45678' },
  { id: 'u-supervisor', employeeId: 'SUP001', password: 'Sup@12345', name: 'Rafiq Shaikh', initials: 'RS', role: 'SUPERVISOR', department: 'Civil Works', site: 'Tower B - East Podium', phone: '+91 90000 22222' },
  { id: 'u-crane', employeeId: 'CRANE001', password: 'Crane@123', name: 'Manoj Crane', initials: 'MC', role: 'CRANE_OPERATOR', department: 'Lifting Team', site: 'Tower B Crane Yard', phone: '+91 90000 33333' },
  { id: 'u-safety', employeeId: 'SAFE001', password: 'Safe@1234', name: 'Nisha Safety', initials: 'NS', role: 'SAFETY_OFFICER', department: 'Safety', site: 'All Active Zones', phone: '+91 90000 44444' },
  { id: 'u-worker', employeeId: 'WRK001', password: 'Work@1234', name: 'Imran Worker', initials: 'IW', role: 'WORKER', department: 'Concrete Team', site: 'Block B', phone: '+91 90000 55555' }
];

export const adminConsoleCredential = {
  employeeId: 'ADMIN001',
  password: 'Admin@123'
};

export function authenticateDemoUser(employeeId: string, password: string) {
  return demoUsers.find((user) => user.employeeId.toLowerCase() === employeeId.trim().toLowerCase() && user.password === password) ?? null;
}

export function canOpenAdminConsole(user: DemoUser | null) {
  return user?.role === 'SUPER_ADMIN' || user?.role === 'COMPANY_ADMIN';
}
