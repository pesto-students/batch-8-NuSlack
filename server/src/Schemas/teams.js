import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const TeamSchema = new Schema({
  name: String,
  admins: [{ type: mongoose.Schema.ObjectId, ref: constants.users }],
  avatarUrl: {
    type: String,
    default:
      'https://images.pexels.com/photos/5836/yellow-metal-design-decoration.jpg?cs=srgb&dl=art-creative-design-5836.jpg&fm=jpg',
  },
  primaryColor: { type: String },
  secondaryColor: { type: String },
});

const TeamModel = mongoose.model(constants.teams, TeamSchema);

export default TeamModel;
