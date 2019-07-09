import mongoose from 'mongoose';
import { usersTableName } from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TeamSpecificData = new Schema({
  dateJoined: Date,
  role: String,
  teamId: ObjectId,
});

const UserSchema = new Schema({
  online: Boolean,
  lastActive: Date,
  username: String,
  tagLine: String,
  email: String,
  teamsIds: [ObjectId],
  channelIds: [ObjectId],
  teamSpecificData: [TeamSpecificData],
});

const UserModel = mongoose.model(usersTableName, UserSchema);

export default UserModel;
