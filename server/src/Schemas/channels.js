import mongoose from 'mongoose';
import { channelsTableName } from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ChannelSchema = new Schema({
  name: String,
  oneToOne: Boolean,
  isPrivate: Boolean,
  autoJoin: Boolean,
  admins: [String],
  teamId: ObjectId,
  users: [String],
});

const ChannelModel = mongoose.model(channelsTableName, ChannelSchema);

export default ChannelModel;
