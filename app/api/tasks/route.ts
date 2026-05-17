import { NextResponse } from 'next/server';
import { z } from 'zod';

const taskSchema = z.object({ projectId: z.string(), title: z.string().min(3), ownerId: z.string().optional(), priority: z.enum(['NORMAL','IMPORTANT','URGENT','EMERGENCY']).default('NORMAL'), dueAt: z.string().datetime().optional(), voiceNoteKey: z.string().optional() });
export async function POST(request: Request) { const task = taskSchema.parse(await request.json()); return NextResponse.json({ id: crypto.randomUUID(), status: 'PENDING', ...task, createdAt: new Date().toISOString() }, { status: 201 }); }
