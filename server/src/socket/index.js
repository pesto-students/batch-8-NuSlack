import { io } from '../setup';
import {
  messageEvent,
  connectedUserEvent,
  userDisconnectEvent,
} from '../constants/eventNames';

import {
  handleConnectedUser,
  handleMessage,
  handleUserDisconnect,
} from './handlers';

const handleConnection = (socket) => {
  socket.on(connectedUserEvent, handleConnectedUser(socket));
  socket.on(messageEvent, handleMessage(socket));
  socket.on(userDisconnectEvent, handleUserDisconnect(socket));
};

io.on('connection', handleConnection);
