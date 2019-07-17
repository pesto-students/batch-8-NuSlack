import mongoose from 'mongoose';
import Channels from '../../Schemas/channels';
import { addUsersEvent } from '../../constants/eventNames';

const handleAddUser = socket => async ({ channelId, users }) => {
  const arrayOfUserId = users.map(id => mongoose.Types.ObjectId(id));
  await Channels.findOneAndUpdate(
    { _id: channelId },
    { $push: { users: { $each: arrayOfUserId } } },
    { new: true },
  );

  socket.nsp.to(channelId).emit(addUsersEvent, { channelId, users });
};
export default handleAddUser;
