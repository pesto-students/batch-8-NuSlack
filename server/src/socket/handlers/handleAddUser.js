import mongoose from 'mongoose';
import Channels from '../../Schemas/channels';
import Users from '../../Schemas/users';
import Messages from '../../Schemas/messages';
import { addUsersEvent, messageEvent } from '../../constants/eventNames';

const handleAddUser = socket => async ({ channelId, users }) => {
  const arrayOfUserId = users.map(id => mongoose.Types.ObjectId(id));
  const channel = await Channels.findOneAndUpdate(
    { _id: channelId },
    { $push: { users: { $each: arrayOfUserId } } },
    { new: true },
  );
  const addedUsers = await Users.find({ _id: { $in: arrayOfUserId } });
  const messageString = `${addedUsers
    .map(addedUser => addedUser.username)
    .join(', ')} added to the Channel`;
  const message = new Messages({
    channelId,
    message: messageString,
    sender: mongoose.Types.ObjectId(process.env.BOT_ID),
    timestamp: new Date(),
  });
  const savedMessage = await message.save();
  await savedMessage.populate('sender').execPopulate();
  socket.nsp.to(channelId).emit(messageEvent, savedMessage);
  socket.nsp.to(channelId).emit(addUsersEvent, { channelId, users, channel });
};
export default handleAddUser;
