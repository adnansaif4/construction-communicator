import { NextResponse } from 'next/server';
import { messageSchema } from '@/lib/domain';

export async function POST(request: Request) {
  const message = messageSchema.parse(await request.json());
  const mentionTargets = message.mentions.map((mention) => mention.startsWith('@role:') ? { type: 'role', value: mention.slice(6) } : mention.startsWith('@department:') ? { type: 'department', value: mention.slice(12) } : mention === '@everyone' ? { type: 'everyone', value: '*' } : { type: 'user', value: mention.replace('@', '') });
  return NextResponse.json({ id: crypto.randomUUID(), ...message, mentionTargets, queuedNotifications: mentionTargets.length, createdAt: new Date().toISOString() }, { status: 201 });
}
