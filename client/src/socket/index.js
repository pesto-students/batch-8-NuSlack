import io from 'socket.io-client';
import { sendConnectedEvent, sendMessageEvent } from './emit';

const initSockets = ({ user }) => {
  const client = io.connect('http://127.0.0.1:8080', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  client.on('connect', () => {
    sendConnectedEvent(client)(user);
  });

  return {
    sendMessage: sendMessageEvent(client),
  };
};

export default initSockets;
