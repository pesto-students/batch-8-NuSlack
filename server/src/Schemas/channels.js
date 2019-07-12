import mongoose from 'mongoose';
import { channelsTableName } from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ChannelSchema = new Schema({
  name: String,
  isGroup: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  autoJoin: { type: Boolean, default: false },
  admins: [String],
  teamId: ObjectId,
  users: [String],
});

const ChannelModel = mongoose.model(channelsTableName, ChannelSchema);

export default ChannelModel;
