import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ChannelSchema = new Schema({
  admins: [String],
  channelId: ObjectId,
  isPrivate: Boolean,
  team: [ObjectId],
  users: [String],
  autoJoin: Boolean
});

const ChannelModel = mongoose.model('ChannelSchema', ChannelSchema);

export default ChannelModel;
