import { z } from 'zod';

export const roles = ['SUPER_ADMIN','COMPANY_ADMIN','PROJECT_MANAGER','SITE_ENGINEER','SUPERVISOR','CRANE_OPERATOR','STORE_KEEPER','SAFETY_OFFICER','WORKER'] as const;
export type Role = (typeof roles)[number];
export const roleLabels: Record<Role, string> = {
  SUPER_ADMIN: 'Super Admin', COMPANY_ADMIN: 'Company Admin', PROJECT_MANAGER: 'Project Manager', SITE_ENGINEER: 'Site Engineer', SUPERVISOR: 'Supervisor', CRANE_OPERATOR: 'Crane Operator', STORE_KEEPER: 'Store Keeper', SAFETY_OFFICER: 'Safety Officer', WORKER: 'Worker'
};
export const permissions: Record<Role, string[]> = {
  SUPER_ADMIN: ['*'], COMPANY_ADMIN: ['users:manage','projects:manage','branding:manage','analytics:view'], PROJECT_MANAGER: ['channels:manage','reports:approve','tasks:assign','broadcast:create'], SITE_ENGINEER: ['reports:create','issues:track','channels:write'], SUPERVISOR: ['reports:create','equipment:request','attendance:mark'], CRANE_OPERATOR: ['equipment:accept','ptt:receive'], STORE_KEEPER: ['materials:track','requests:update'], SAFETY_OFFICER: ['incidents:create','emergency:broadcast'], WORKER: ['channels:read','emergency:create']
};
export const taskStatuses = ['PENDING','IN_PROGRESS','DELAYED','COMPLETED','REJECTED'] as const;
export const equipmentStatuses = ['REQUESTED','ACCEPTED','EN_ROUTE','IN_USE','COMPLETED','REJECTED'] as const;
export const messageSchema = z.object({ channelId: z.string(), body: z.string().min(1), mentions: z.array(z.string()).default([]), priority: z.enum(['NORMAL','IMPORTANT','URGENT','EMERGENCY']).default('NORMAL') });
export const pttSignalSchema = z.object({ roomId: z.string(), sdp: z.string().optional(), candidate: z.string().optional(), targetUserId: z.string().optional(), emergency: z.boolean().default(false) });
