import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signAccessToken } from '@/lib/auth';
import { authenticateDemoUser } from '@/lib/demo-auth';

const loginSchema = z.object({ identifier: z.string().min(3), password: z.string().min(8), deviceLabel: z.string().optional() });
export async function POST(request: Request) {
  const body = loginSchema.parse(await request.json());
  const demoUser = authenticateDemoUser(body.identifier, body.password);
  if (!demoUser) return NextResponse.json({ error: 'Invalid employee ID or password' }, { status: 401 });
  // Production hook: validate phone or employee ID against Prisma, bcrypt password hash and disabled/session policies.
  const accessToken = await signAccessToken({ sub: demoUser.id, companyId: 'national-engineers', role: demoUser.role, employeeId: demoUser.employeeId });
  const response = NextResponse.json({ accessToken, user: { id: demoUser.id, displayName: demoUser.name, role: demoUser.role }, session: { deviceLabel: body.deviceLabel ?? 'Unknown device' } });
  response.cookies.set('ne_access', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 15 });
  return response;
}
