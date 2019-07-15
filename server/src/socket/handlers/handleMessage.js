import mongoose from 'mongoose';

import Messages from '../../Schemas/messages';
import { messageEvent } from '../../constants/eventNames';

const handleMessage = socket => async ({ channelId, message }) => {
  const senderId = socket.store.user._id;
  const messageData = {
    message,
    read: false,
    channelId: mongoose.Types.ObjectId(channelId),
    sender: mongoose.Types.ObjectId(senderId),
    timestamp: new Date(),
  };

  const savedMessage = await new Messages(messageData).save();
  await savedMessage.populate('sender').execPopulate();

  socket.nsp.to(channelId).emit(messageEvent, savedMessage);
};

export default handleMessage;
