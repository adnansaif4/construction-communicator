# NATIONAL ENGINEERS Site Command

A production-oriented mobile-first PWA scaffold for in-house construction communication and site operations. It combines role-wise employee login, hidden admin onboarding, structured project channels, voice-note-first communication, WebRTC push-to-talk signaling, emergency broadcasts, tasks, daily reports, equipment requests, attendance, media management and an enterprise admin foundation.

## Stack
- Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style components and Framer Motion
- Zustand client state, Socket.IO realtime gateway and WebRTC microphone helpers
- Prisma ORM with PostgreSQL schema and Redis-ready realtime architecture
- PWA manifest, service-worker push handling and Docker deployment files

## Demo credentials

There is **no public signup**. In production, admins create every employee ID and temporary password. For local demo testing, use these seeded credentials:

| Role | Employee ID | Password |
| --- | --- | --- |
| Company Admin | `ADMIN001` | `Admin@123` |
| Project Manager | `PM001` | `Pm@12345` |
| Supervisor | `SUP001` | `Sup@12345` |
| Crane Operator | `CRANE001` | `Crane@123` |
| Safety Officer | `SAFE001` | `Safe@1234` |
| Worker | `WRK001` | `Work@1234` |

### Hidden admin panel

Open the web app and tap the **NATIONAL ENGINEERS hard-hat logo 7 times**. The admin authentication panel opens. Use:

```text
Employee ID: ADMIN001
Password: Admin@123
```

The admin console demonstrates user onboarding, role assignment and generated employee credentials. The normal staff login remains ID + password only.

## Development

```bash
npm install
npm run prisma:generate
npm run dev
```

Run the realtime gateway in a second terminal:

```bash
npm run dev:realtime
```

Open the web app at:

```text
http://localhost:3000
```

The realtime health check is available at:

```text
http://localhost:4000/healthz
```

## Local database and Redis

```bash
docker compose up postgres redis
cp .env.example .env
```

When running Next.js directly on your laptop and Postgres via Docker, change `.env` to use `localhost` instead of the Docker hostname `postgres`:

```env
DATABASE_URL="postgresql://national:national_dev_password@localhost:5432/national_engineers?schema=public"
```

For quick local schema setup:

```bash
npx prisma db push
npm run prisma:generate
```

## Production deployment
1. Provision Ubuntu VPS with Docker, Docker Compose, Nginx and TLS certificates.
2. Copy `.env.example` to `.env` and replace database, JWT and object-storage secrets.
3. Run `docker compose up -d --build`.
4. Place Nginx in front of `web:3000` and `realtime:4000`, enabling WebSocket upgrades for Socket.IO.
5. Run Prisma migrations in CI/CD and configure S3/R2 lifecycle policies for construction media retention.

## Notes on emergency audio
Browser PWAs cannot fully override mobile OS restrictions. Android native wrapper support is recommended for foreground-service PTT, lock-screen audio continuity and aggressive wake behavior. iOS browser-installed PWAs limit background microphone and automatic audio playback.
