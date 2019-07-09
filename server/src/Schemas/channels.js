import mongoose from 'mongoose';
import { channelsTableName } from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ChannelSchema = new Schema({
  admins: [String],
  channelId: ObjectId,
  isPrivate: Boolean,
  team: [ObjectId],
  users: [String],
  autoJoin: Boolean,
});

const ChannelModel = mongoose.model(channelsTableName, ChannelSchema);

export default ChannelModel;
