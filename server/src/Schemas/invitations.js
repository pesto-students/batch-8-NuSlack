import mongoose from 'mongoose';
import * as constants from './constants';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const InvitationsSchema = new Schema({
  invitedBy: { type: ObjectId, ref: constants.users },
  invitedUser: { type: ObjectId, ref: constants.users },
  team: { type: ObjectId, ref: constants.teams },
  timestamp: Date,
  status: String,
});

const InvitationsModel = mongoose.model(constants.invitations, InvitationsSchema);

export default InvitationsModel;
