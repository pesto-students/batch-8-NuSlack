import mongoose from 'mongoose';
import { messagesTableName } from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;
const MessageSchema = new Schema({
  message: String,
  read: Boolean,
  timestamp: Date,
  sender: String,
  channelId: ObjectId,
  teamId: ObjectId,
});

const MessagesModel = mongoose.model(messagesTableName, MessageSchema);

export default MessagesModel;
