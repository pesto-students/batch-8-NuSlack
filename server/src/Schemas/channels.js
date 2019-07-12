import mongoose from 'mongoose';
import * as tableNames from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ChannelSchema = new Schema({
  name: String,
  isGroup: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  autoJoin: { type: Boolean, default: false },
  admins: [{ type: ObjectId, ref: tableNames.users }],
  teamId: ObjectId,
  users: [{ type: ObjectId, ref: tableNames.users }],
});

const ChannelModel = mongoose.model(tableNames.channels, ChannelSchema);

export default ChannelModel;
