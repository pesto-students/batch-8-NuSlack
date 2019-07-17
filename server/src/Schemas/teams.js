import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const TeamSchema = new Schema({
  name: String,
});

const TeamModel = mongoose.model(constants.teams, TeamSchema);

export default TeamModel;
