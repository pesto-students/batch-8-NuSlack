import { io } from '../setup';

import {
  messageEvent,
  connectedUserEvent,
  userDisconnect,
  // fetchOldChannelMessagesEvent,
} from '../constants/eventNames';

import {
  handleConnectedUser,
  handleMessage,
  handleDisconnectUser,
} from './handlers';

const handleConnection = (socket) => {
  socket.on(connectedUserEvent, handleConnectedUser(socket));
  socket.on(messageEvent, handleMessage(socket));
  socket.on(userDisconnect, handleDisconnectUser(socket))
  // socket.on(fetchOldChannelMessagesEvent, async ({ channelId, username }) => {
  //   const channel = await Channels.findOne({ _id: channelId });
  //   if (channel.users.indexOf(username) < 0) {
  //     return;
  //   }

  //   const messages = await Messages.find({ channelId });
  //   client.emit(fetchOldChannelMessagesEvent, { channelId, messages });
  // });
};

io.on('connection', handleConnection);
