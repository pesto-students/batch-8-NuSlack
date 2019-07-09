import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MessageSchema = new Schema({
  message: String,
  read: Boolean,
  timestamp: Date,
  sender: String,
  channelId: ObjectId,
  teamId: ObjectId
});

const MessagesModel = mongoose.model('MessageSchema', MessageSchema);

export default MessagesModel;
