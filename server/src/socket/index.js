import { io } from '../setup';
import {
  messageEvent,
  connectedUserEvent,
  userDisconnectEvent,
  addUsersEvent,
  removeUserEvent,
} from '../constants/eventNames';

import {
  handleConnectedUser,
  handleMessage,
  handleUserDisconnect,
  handleAddUser,
  handleRemoveUser,
  handleTypingEvent,
} from './handlers';

const handleConnection = (socket) => {
  socket.on(connectedUserEvent, handleConnectedUser(socket));
  socket.on(messageEvent, handleMessage(socket));
  socket.on(userDisconnectEvent, handleUserDisconnect(socket));
  socket.on(removeUserEvent, handleRemoveUser(socket));
  socket.on(addUsersEvent, handleAddUser(socket));
  socket.on('typeEvent', handleTypingEvent(socket));
};

io.on('connection', handleConnection);
