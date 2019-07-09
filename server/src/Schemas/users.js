import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TeamSpecificData = new Schema({
  dateJoined: Date,
  role: String,
  teamId: ObjectId
});

const UserSchema = new Schema({
  online: Boolean,
  lastActive: Date,
  username: String,
  tagLine: String,
  email: String,
  teamsIds: [ObjectId],
  channelIds: [ObjectId],
  teamSpecificData: [TeamSpecificData]
});

const UserModel = mongoose.model('UserSchema', UserSchema);

export default UserModel;
