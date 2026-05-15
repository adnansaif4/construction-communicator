export const audioConstraints: MediaStreamConstraints = { audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 }, video: false };

export async function createPttPeerConnection(stream: MediaStream, onTrack: (stream: MediaStream) => void) {
  const pc = new RTCPeerConnection({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });
  stream.getAudioTracks().forEach((track) => pc.addTrack(track, stream));
  pc.ontrack = (event) => onTrack(event.streams[0]);
  return pc;
}

export async function startMicrophoneCapture() {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('Microphone capture is not available in this browser.');
  return navigator.mediaDevices.getUserMedia(audioConstraints);
}
