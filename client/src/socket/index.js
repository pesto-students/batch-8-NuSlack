import io from 'socket.io-client';
import {
  messageEvent,
  connectedUserAckEvent,
  userOnlineEvent,
  userDisconnect,
  addUserEvent,
  removeUserEvent,
} from '../constants/eventNames';
import {
  sendConnectedEvent,
  sendMessageEvent,
  emitAddUserToChannel,
  emitRemoveUserFromChannel,
} from './emit';
import { serverConfig } from '../config';

const initSockets = ({
  user,
  newMessage,
  setFirstUserStatus,
  setUserOffline,
  setUserOnline,
  removeUserFromChannelListener,
  addUserToChannelListener,
}) => {
  const client = io.connect(serverConfig.SERVER_BASE_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
  });

  client.on('connect', () => {
    sendConnectedEvent(client)(user);
  });

  client.on(messageEvent, (message) => {
    newMessage(message);
  });

  client.on(userDisconnect, (disconnectedUser) => {
    setUserOffline(disconnectedUser._id);
  });

  client.on(userOnlineEvent, (onlineUser) => {
    setUserOnline(onlineUser);
  });

  client.on(connectedUserAckEvent, (data) => {
    setFirstUserStatus(data.onlineUsers);
  });

  client.on(removeUserEvent, (data) => {
    removeUserFromChannelListener(data);
  });
  client.on(addUserEvent, (data) => {
    addUserToChannelListener(data);
  });

  const close = () => {
    client.removeAllListeners();
    client.close();
  };

  return {
    sendMessage: sendMessageEvent(client),
    emitAddUserToChannel: emitAddUserToChannel(client),
    emitRemoveUserFromChannel: emitRemoveUserFromChannel(client),
    close,
  };
};

export default initSockets;
