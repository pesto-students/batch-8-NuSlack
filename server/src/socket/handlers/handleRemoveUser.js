import { Types } from 'mongoose';
import Channels from '../../Schemas/channels';
import Users from '../../Schemas/users';
import Messages from '../../Schemas/messages';
import { removeUserEvent, messageEvent } from '../../constants/eventNames';

const handleRemoveUser = socket => async ({ channelId, userId }) => {
  await Channels.findOneAndUpdate(
    { _id: Types.ObjectId(channelId) },
    { $pull: { users: userId } },
    { new: true },
  );

  const removedUser = await Users.findOne({ _id: Types.ObjectId(userId) });
  const messageString = `${removedUser.username} removed from the Channel`;
  const message = new Messages({
    channelId,
    message: messageString,
    sender: Types.ObjectId(process.env.BOT_ID),
  });
  const savedMessage = await message.save();
  socket.nsp.to(channelId).emit(messageEvent, savedMessage);

  socket.nsp.to(channelId).emit(removeUserEvent, {
    channelId,
    userId,
  });
};
export default handleRemoveUser;
