import mongoose from 'mongoose';
import Channels from '../Schemas/channels';

const getChannel = id => Channels.findById(id);

const getChannelsListFor = userId => Channels.find({
  users: mongoose.Types.ObjectId(userId),
}).select({ name: 1 });

export { getChannel, getChannelsListFor };
