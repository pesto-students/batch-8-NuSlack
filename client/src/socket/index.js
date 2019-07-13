import io from 'socket.io-client';
import { sendConnectedEvent, sendMessageEvent } from './emit';

const initSockets = ({ user, newMessage, setFirstUserStatus, setUserOffline, setUserOnline }) => {
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

  client.on('message', (message) => {
    newMessage(message);
  });

  client.on('userDisconnected', (user) => {
    setUserOffline(user._id)
  });
  client.on('userOnline', (user) => {
    setUserOnline(user._id);
  });
  client.on('connectedUserAck', (data) => {
    setFirstUserStatus(data.onlineUsers)
  });


  return {
    sendMessage: sendMessageEvent(client),
  };
};

export default initSockets;
