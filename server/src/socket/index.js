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
} from './handlers';

const handleConnection = socketIO => (socket) => {
  socket.on(connectedUserEvent, handleConnectedUser(socket));
  socket.on(messageEvent, handleMessage(socket));
  socket.on(userDisconnectEvent, handleUserDisconnect(socket));
  socket.on(removeUserEvent, handleRemoveUser(socket));
  socket.on(addUsersEvent, handleAddUser(socket, socketIO));
};

io.on('connection', handleConnection(io));
