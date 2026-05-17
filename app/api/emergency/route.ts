import { NextResponse } from 'next/server';
import { z } from 'zod';

const emergencySchema = z.object({ projectId: z.string(), type: z.enum(['ACCIDENT','FIRE','CRANE_FAILURE','SAFETY','OTHER']), lat: z.number().optional(), lng: z.number().optional(), audioKey: z.string().optional() });
export async function POST(request: Request) {
  const emergency = emergencySchema.parse(await request.json());
  return NextResponse.json({ id: crypto.randomUUID(), status: 'OPEN', ...emergency, routedTo: ['SAFETY_OFFICER','PROJECT_MANAGER','COMPANY_ADMIN'], pushPriority: 'critical', createdAt: new Date().toISOString() }, { status: 201 });
}
