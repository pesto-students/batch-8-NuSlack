import io from 'socket.io-client';
import {
  messageEvent,
  connectedUserAckEvent,
  connectedUserEvent,
  userOnlineEvent,
  userDisconnect,
} from '../constants/eventNames';
import { sendConnectedEvent, sendMessageEvent } from './emit';

const initSockets = ({
  user,
  newMessage,
  setFirstUserStatus,
  setUserOffline,
  setUserOnline,
}) => {
  const client = io.connect('http://127.0.0.1:8080', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  client.on(connectedUserEvent, () => {
    sendConnectedEvent(client)(user);
  });

  client.on(messageEvent, (message) => {
    newMessage(message);
  });

  client.on(userDisconnect, (user) => {
    setUserOffline(user._id);
  });

  client.on(userOnlineEvent, (user) => {
    setUserOnline(user._id);
  });

  client.on(connectedUserAckEvent, (data) => {
    setFirstUserStatus(data.onlineUsers);
  });

  return {
    sendMessage: sendMessageEvent(client),
  };
};

export default initSockets;
