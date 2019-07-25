import mongoose from 'mongoose';
import Invitations from '../Schemas/invitations';
import Users from '../Schemas/users';
import Channels from '../Schemas/channels';
import * as constants from '../constants/failedResponse';

const { ObjectId } = mongoose.Types;
const getInvitations = async (req, res) => {
  const invitations = await Invitations.find({ ...req.query })
    .populate('team')
    .populate('invitedBy');
  return res.send(invitations);
};

const inviteUsers = async (req, res) => {
  const { invitedUsers, invitedBy, team } = req.body;
  const invitationObject = {
    invitedBy: ObjectId(invitedBy),
    team: ObjectId(team),
    timestamp: new Date(),
    status: 'sent',
  };
  const invitations = await Promise.all(
    invitedUsers.map((userId) => {
      const invitationToSave = {
        ...invitationObject,
        invitedUser: ObjectId(userId),
      };
      const invitation = new Invitations(invitationToSave);
      return invitation.save();
    }),
  );
  return res.send(invitations);
};

const acceptInvitation = async (req, res) => {
  const invitation = await Invitations.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    {
      status: 'accepted',
    },
    { new: true },
  );
  const user = await Users.findOneAndUpdate(
    {
      _id: ObjectId(invitation.invitedUser),
    },
    {
      $push: { teams: ObjectId(invitation.team) },
    },
    {
      new: true,
    },
  );
  await Channels.updateMany(
    {
      teamId: mongoose.Types.ObjectId(invitation.team),
      autoJoin: true,
    },
    { $push: { users: mongoose.Types.ObjectId(user.id) } },
  );
  if (!invitation) {
    return res.status(404).send(constants.invitationNotFound);
  }
  return res.send(invitation);
};
const rejectInvitation = async (req, res) => {
  const invitation = await Invitations.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      status: 'rejected',
    },
    { new: true },
  ).populate('team');
  if (!invitation) {
    return res.status(404).send(constants.invitationNotFound);
  }
  return res.send(invitation);
};

export {
  getInvitations, inviteUsers, acceptInvitation, rejectInvitation,
};
