import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TeamSpecificData = new Schema({
  dateJoined: Date,
  role: String,
  teamId: ObjectId,
});

const UserSchema = new Schema({
  avatar: { type: String, default: constants.defaultImage },
  online: Boolean,
  lastActive: Date,
  username: String,
  tagLine: String,
  email: String,
  teamSpecificData: [TeamSpecificData],
});

const UserModel = mongoose.model(constants.users, UserSchema);

export default UserModel;
