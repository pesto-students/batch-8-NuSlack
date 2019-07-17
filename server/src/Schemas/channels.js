import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const ChannelSchema = new Schema({
  name: String,
  isGroup: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  autoJoin: { type: Boolean, default: false },
  admins: [{ type: ObjectId, ref: constants.users }],
  teamId: { type: ObjectId, ref: constants.teams },
  users: [{ type: ObjectId, ref: constants.users }],
});

const ChannelModel = mongoose.model(constants.channels, ChannelSchema);

export default ChannelModel;
