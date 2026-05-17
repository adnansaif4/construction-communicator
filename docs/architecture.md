# NATIONAL ENGINEERS Site Command Architecture

## Product scope
NATIONAL ENGINEERS Site Command is an internal, admin-provisioned construction operations PWA for replacing WhatsApp-based coordination with auditable project channels, voice notes, WebRTC push-to-talk, emergency broadcasts, daily reporting, attendance, task workflows, equipment requests, announcements and media management.

## System architecture
- **Next.js 15 PWA**: mobile-first React UI, route handlers for business APIs, installable manifest and service-worker push handling.
- **Realtime gateway**: Socket.IO service for presence, channel events, PTT signaling, emergency escalation and live announcements.
- **WebRTC voice layer**: browser/client microphone capture with echo cancellation, noise suppression and Opus-friendly constraints; Socket.IO carries signaling only.
- **PostgreSQL + Prisma**: relational source of truth for users, RBAC, projects, channels, messages, voice notes, tasks, equipment, attendance, notifications, reports and audit logs.
- **Redis**: recommended for Socket.IO adapter, rate limits, OTPs, device/session revocation and offline upload queues.
- **Object storage**: AWS S3 or Cloudflare R2 stores voice notes, photos, videos, PDF reports and recordings through short-lived signed URLs.

## Authentication flow
1. Company Admin creates staff accounts; public signup is disabled.
2. Staff login with phone or employee ID and password; optional OTP can be layered before token issue.
3. API issues short-lived JWT access token and refresh token stored as an HTTP-only secure cookie.
4. Devices and sessions are tracked for force logout, disable account, password reset and audit logging.

## Realtime event map
- `message:create`, `message:receipt`, `message:pinned`, `channel:typing` for structured communication.
- `mention:notify` for `@user`, `@role`, `@department` and `@everyone` routing.
- `voice-note:start`, `voice-note:chunk`, `voice-note:complete` for streaming upload workflows.
- `ptt:join`, `ptt:offer`, `ptt:answer`, `ptt:ice-candidate`, `ptt:speaking`, `ptt:release` for WebRTC walkie-talkie rooms.
- `emergency:open`, `emergency:location`, `emergency:resolve` for critical incidents.
- `equipment:request`, `task:update`, `announcement:create` for field operations.

## PTT and mobile limitations
Android PWA/native wrapper is the recommended path for emergency-grade background behavior because a foreground-service equivalent can keep audio active and visible to the user. iOS Safari and iOS installed web apps restrict background microphone capture, automatic playback, wake behavior and silent-mode override; the product should disclose this and offer a native wrapper for best results.

## Offline-first behavior
The PWA caches static assets and recent API responses, flags offline status in the shell, and should persist outbound messages/uploads in IndexedDB before replaying when connectivity returns. Media uploads should use chunked resumable uploads with server-side virus scanning and signed URL expiry.
