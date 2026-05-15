import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signAccessToken } from '@/lib/auth';

const loginSchema = z.object({ identifier: z.string().min(3), password: z.string().min(8), deviceLabel: z.string().optional() });
export async function POST(request: Request) {
  const body = loginSchema.parse(await request.json());
  // Production hook: validate phone or employee ID against Prisma, bcrypt password hash and disabled/session policies.
  const accessToken = await signAccessToken({ sub: 'demo-user', companyId: 'national-engineers', role: 'PROJECT_MANAGER', employeeId: body.identifier });
  const response = NextResponse.json({ accessToken, user: { id: 'demo-user', displayName: 'Aarav Menon', role: 'PROJECT_MANAGER' }, session: { deviceLabel: body.deviceLabel ?? 'Unknown device' } });
  response.cookies.set('ne_access', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 15 });
  return response;
}
