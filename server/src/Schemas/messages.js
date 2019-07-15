import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const MessageSchema = new Schema({
  message: String,
  read: Boolean,
  timestamp: Date,
  sender: { type: ObjectId, ref: constants.users },
  receiver: { type: ObjectId, ref: constants.users },
  channelId: { type: ObjectId, ref: constants.channels },
  teamId: ObjectId,
});

const MessagesModel = mongoose.model(constants.messages, MessageSchema);

export default MessagesModel;
