export const socketEvents = {
  auth: 'auth:session', presenceJoin: 'presence:join', presenceUpdate: 'presence:update',
  channelJoin: 'channel:join', channelTyping: 'channel:typing', messageCreate: 'message:create', messageReceipt: 'message:receipt', messagePinned: 'message:pinned',
  mentionNotify: 'mention:notify', voiceNoteStart: 'voice-note:start', voiceNoteChunk: 'voice-note:chunk', voiceNoteComplete: 'voice-note:complete',
  pttJoin: 'ptt:join', pttOffer: 'ptt:offer', pttAnswer: 'ptt:answer', pttIce: 'ptt:ice-candidate', pttSpeaking: 'ptt:speaking', pttRelease: 'ptt:release',
  emergencyOpen: 'emergency:open', emergencyLocation: 'emergency:location', emergencyResolve: 'emergency:resolve',
  taskUpdate: 'task:update', equipmentRequest: 'equipment:request', announcementCreate: 'announcement:create'
} as const;
export type SocketEvent = (typeof socketEvents)[keyof typeof socketEvents];
