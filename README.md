# NATIONAL ENGINEERS Site Command

A production-oriented mobile-first PWA scaffold for in-house construction communication and site operations. It combines structured project channels, role-aware mentions, one-tap voice notes, WebRTC push-to-talk signaling, emergency broadcasts, tasks, daily reports, equipment requests, attendance, media management and an enterprise admin foundation.

## Stack
- Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style components and Framer Motion
- Zustand client state, Socket.IO realtime gateway and WebRTC microphone helpers
- Prisma ORM with PostgreSQL schema and Redis-ready realtime architecture
- PWA manifest, service-worker push handling and Docker deployment files

## Development
```bash
npm install
npm run prisma:generate
npm run dev
npm run dev:realtime
```

## Production deployment
1. Provision Ubuntu VPS with Docker, Docker Compose, Nginx and TLS certificates.
2. Copy `.env.example` to `.env` and replace database, JWT and object-storage secrets.
3. Run `docker compose up -d --build`.
4. Place Nginx in front of `web:3000` and `realtime:4000`, enabling WebSocket upgrades for Socket.IO.
5. Run Prisma migrations in CI/CD and configure S3/R2 lifecycle policies for construction media retention.

## Notes on emergency audio
Browser PWAs cannot fully override mobile OS restrictions. Android native wrapper support is recommended for foreground-service PTT, lock-screen audio continuity and aggressive wake behavior. iOS browser-installed PWAs limit background microphone and automatic audio playback.
