import mongoose from 'mongoose';
import * as tableNames from './tableNames';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const TeamSpecificData = new Schema({
  dateJoined: Date,
  role: String,
  teamId: ObjectId,
});

const UserSchema = new Schema({
  avatar: {type: String, default: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"},
  online: Boolean,
  lastActive: Date,
  username: String,
  tagLine: String,
  email: String,
  teamSpecificData: [TeamSpecificData],
});

const UserModel = mongoose.model(tableNames.users, UserSchema);

export default UserModel;
