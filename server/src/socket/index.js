import mongoose from 'mongoose';

import Users from '../Schemas/users';
import Messages from '../Schemas/messages';
import Channels from '../Schemas/channels';
import { io } from '../setup';
import {
  newMessageEvent,
  connectedUserAckEvent,
  connectedUserEvent,
  fetchOldChannelMessagesEvent,
} from './eventNames';

const connectedUserData = {};
io.on('connection', async (client) => {
  client.on(connectedUserEvent, async ({ userName }) => {
    const user = await Users.findOne({ username: userName });
    // eslint-disable-next-line no-underscore-dangle
    const userData = { ...user._doc, socketId: client.id };
    connectedUserData[userName] = { ...user, socketId: client.id };
    client.emit(connectedUserAckEvent, userData);
  });

  client.on(newMessageEvent, async ({ channelId, message, username }) => {
    const channel = await Channels.findOne({ _id: channelId });
    const participantsOfConversation = channel.users;

    if (participantsOfConversation.indexOf(username) < 0) {
      return;
    }

    const messageData = {
      message,
      channelId: mongoose.Types.ObjectId(channelId),
      sender: username,
      timestamp: new Date(),
    };

    await new Messages(messageData).save();

    participantsOfConversation.forEach((participant) => {
      if (connectedUserData[participant]) {
        const userSocket = connectedUserData[participant].socketId;
        io.to(userSocket).emit(newMessageEvent, messageData);
      }
    });
  });

  client.on(fetchOldChannelMessagesEvent, async ({ channelId, username }) => {
    const channel = await Channels.findOne({ _id: channelId });
    if (channel.users.indexOf(username) < 0) {
      return;
    }

    const messages = await Messages.find({ channelId });
    client.emit(fetchOldChannelMessagesEvent, { channelId, messages });
  });
});
