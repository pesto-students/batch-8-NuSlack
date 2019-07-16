import io from 'socket.io-client';
import {
  messageEvent,
  connectedUserAckEvent,
  connectedUserEvent,
  userOnlineEvent,
  userDisconnect,
} from '../constants/eventNames';
import { sendConnectedEvent, sendMessageEvent } from './emit';
import { serverConfig } from '../config';

const initSockets = ({
  user,
  newMessage,
  setFirstUserStatus,
  setUserOffline,
  setUserOnline,
}) => {
  const client = io.connect(serverConfig.SERVER_BASE_URL, {
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

  client.on(userDisconnect, (disconnectedUser) => {
    setUserOffline(disconnectedUser._id);
  });

  client.on(userOnlineEvent, (onlineUser) => {
    setUserOnline(onlineUser._id);
  });

  client.on(connectedUserAckEvent, (data) => {
    setFirstUserStatus(data.onlineUsers);
  });

  return {
    sendMessage: sendMessageEvent(client),
  };
};

export default initSockets;
