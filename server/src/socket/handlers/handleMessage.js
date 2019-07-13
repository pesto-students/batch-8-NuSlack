import mongoose from 'mongoose';
import Messages from '../../models/messages';
import { messageEvent } from '../../constants/eventNames';

const handleMessage = socket => async ({ channelId, message }) => {
//  console.log('new message here ', channelId, message);

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

//  console.log('saved message is ', savedMessage);
  socket.nsp.to(channelId).emit(messageEvent, savedMessage);
};

export default handleMessage;
