import { SignJWT, jwtVerify } from 'jose';
import { roles, type Role } from '@/lib/domain';

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'development-change-me');
export type SessionClaims = { sub: string; companyId: string; role: Role; employeeId: string };
export async function signAccessToken(claims: SessionClaims) { return new SignJWT({ ...claims }).setProtectedHeader({ alg: 'HS256' }).setSubject(claims.sub).setIssuedAt().setExpirationTime('15m').sign(secret); }
export async function verifyAccessToken(token: string) { const { payload } = await jwtVerify(token, secret); if (!roles.includes(payload.role as Role)) throw new Error('Invalid role claim'); return payload as unknown as SessionClaims; }
export function can(role: Role, permission: string) { const map: Record<Role, string[]> = { SUPER_ADMIN: ['*'], COMPANY_ADMIN: ['users:manage','projects:manage','branding:manage','analytics:view'], PROJECT_MANAGER: ['channels:manage','reports:approve','tasks:assign','broadcast:create'], SITE_ENGINEER: ['reports:create','issues:track','channels:write'], SUPERVISOR: ['reports:create','equipment:request','attendance:mark'], CRANE_OPERATOR: ['equipment:accept','ptt:receive'], STORE_KEEPER: ['materials:track','requests:update'], SAFETY_OFFICER: ['incidents:create','emergency:broadcast'], WORKER: ['channels:read','emergency:create'] }; return map[role].includes('*') || map[role].includes(permission); }
