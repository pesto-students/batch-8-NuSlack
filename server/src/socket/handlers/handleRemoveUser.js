import { Types } from 'mongoose';
import Channels from '../../Schemas/channels';
import { removeUserEvent } from '../../constants/eventNames';

const handleRemoveUser = socket => async ({ channelId, userId }) => {
  await Channels.findOneAndUpdate(
    { _id: Types.ObjectId(channelId) },
    { $pull: { users: userId } },
    { new: true },
  );
  socket.nsp.to(channelId).emit(removeUserEvent, {
    channelId,
    userId,
  });
};
export default handleRemoveUser;
