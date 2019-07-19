import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
  online: { type: Boolean, default: false },
  lastActive: Date,
  username: String,
  tagLine: String,
  email: { type: String, unique: true, required: true },
  password: { type: String },
  teams: [{ type: ObjectId, ref: constants.teams }],
  teamSpecificData: [TeamSpecificData],
});

UserSchema.pre('save', async function save(next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});


UserSchema.methods.isValidPassword = async function isValidPassword(password) {
  const user = this;
  if (user.password && password) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }
  return false;
};

const UserModel = mongoose.model(constants.users, UserSchema);

export default UserModel;
