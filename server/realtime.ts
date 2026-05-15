import http from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import { socketEvents } from '../lib/realtime/events';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.APP_ORIGIN?.split(',') ?? ['http://localhost:3000'], credentials: true } });

app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'national-engineers-realtime' }));
io.use((socket, next) => { socket.data.userId = socket.handshake.auth?.userId ?? `guest-${socket.id}`; socket.data.role = socket.handshake.auth?.role ?? 'WORKER'; next(); });
io.on('connection', (socket) => {
  socket.join(`user:${socket.data.userId}`);
  socket.emit(socketEvents.presenceUpdate, { userId: socket.data.userId, online: true });
  socket.on(socketEvents.channelJoin, ({ channelId }) => socket.join(`channel:${channelId}`));
  socket.on(socketEvents.messageCreate, (payload, ack) => { io.to(`channel:${payload.channelId}`).emit(socketEvents.messageCreate, { ...payload, senderId: socket.data.userId, createdAt: new Date().toISOString() }); payload.mentions?.forEach((target: string) => io.to(target.startsWith('@role:') ? `role:${target.slice(6)}` : `user:${target.replace('@', '')}`).emit(socketEvents.mentionNotify, payload)); ack?.({ ok: true }); });
  socket.on(socketEvents.pttJoin, ({ roomId }) => socket.join(`ptt:${roomId}`));
  socket.on(socketEvents.pttOffer, (payload) => socket.to(`ptt:${payload.roomId}`).emit(socketEvents.pttOffer, { ...payload, from: socket.data.userId }));
  socket.on(socketEvents.pttAnswer, (payload) => socket.to(`ptt:${payload.roomId}`).emit(socketEvents.pttAnswer, { ...payload, from: socket.data.userId }));
  socket.on(socketEvents.pttIce, (payload) => socket.to(`ptt:${payload.roomId}`).emit(socketEvents.pttIce, { ...payload, from: socket.data.userId }));
  socket.on(socketEvents.pttSpeaking, (payload) => socket.to(`ptt:${payload.roomId}`).emit(socketEvents.pttSpeaking, { ...payload, from: socket.data.userId }));
  socket.on(socketEvents.emergencyOpen, (payload) => io.emit(socketEvents.emergencyOpen, { ...payload, from: socket.data.userId, priority: 'critical' }));
  socket.on('disconnect', () => io.emit(socketEvents.presenceUpdate, { userId: socket.data.userId, online: false }));
});

const port = Number(process.env.REALTIME_PORT ?? 4000);
server.listen(port, () => console.log(`Realtime gateway listening on :${port}`));
