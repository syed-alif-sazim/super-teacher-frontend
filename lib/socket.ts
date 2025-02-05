// lib/socket.ts
import { io } from 'socket.io-client';

// lib/socket.ts
const socket = io(
  'ws://localhost:3001',
  {
    path: '/ws',
    transports: ['websocket'],
  }
);

export default socket;