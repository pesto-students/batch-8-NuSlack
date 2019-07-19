import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const TeamSchema = new Schema({
  name: String,
  admins: [{ type: mongoose.Schema.ObjectId, ref: constants.users }],
});

const TeamModel = mongoose.model(constants.teams, TeamSchema);

export default TeamModel;
