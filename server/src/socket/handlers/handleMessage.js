import mongoose from 'mongoose';

import Messages from '../../Schemas/messages';
import { messageEvent } from '../../constants/eventNames';

const handleMessage = socket => async ({
  channelId, receiverId, receiverSocketId, message,
}) => {
  const senderId = socket.store.user._id;
  const messageData = {
    message,
    read: false,
    sender: mongoose.Types.ObjectId(senderId),
    timestamp: new Date(),
  };

  if (channelId) {
    messageData.channelId = mongoose.Types.ObjectId(channelId);
  } else {
    messageData.receiver = mongoose.Types.ObjectId(receiverId);
  }

  const savedMessage = await new Messages(messageData).save();
  await savedMessage.populate('sender').execPopulate();

  if (channelId) {
    socket.nsp.to(channelId).emit(messageEvent, savedMessage);
  } else if (receiverId) {
    if (receiverSocketId && socket.nsp.sockets[receiverSocketId]) {
      socket.nsp
        .to(receiverSocketId)
        .emit(messageEvent, { message: savedMessage, receiverId: senderId });
    }
    if (String(senderId) !== String(receiverId)) {
      socket.emit(messageEvent, { message: savedMessage, receiverId });
    }
  }
};

export default handleMessage;
