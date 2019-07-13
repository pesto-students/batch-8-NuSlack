import mongoose from 'mongoose';
import * as tableNames from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const MessageSchema = new Schema({
  message: String,
  read: Boolean,
  timestamp: Date,
  sender: { type: ObjectId, ref: tableNames.users },
  receiver: { type: ObjectId, ref: tableNames.users },
  channelId: { type: ObjectId, ref: tableNames.channels },
  teamId: ObjectId,
});

const MessagesModel = mongoose.model(tableNames.messages, MessageSchema);

export default MessagesModel;
