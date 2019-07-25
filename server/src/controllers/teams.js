import mongoose from 'mongoose';
import Teams from '../Schemas/teams';
import Users from '../Schemas/users';
import * as constants from '../constants/failedResponse';
import { saveChannel } from './channels';

const getTeams = async (req, res) => {
  const teams = await Teams.find({ ...req.query });
  return res.send(teams);
};

const getTeam = async (req, res) => {
  const team = await Teams.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });
  if (!team) {
    return res.status(404).send(constants.teamNotFound);
  }
  return res.send(team);
};

const saveTeam = async (req, res) => {
  const team = new Teams(req.body);

  const savedTeam = await team.save();
  await Users.findOneAndUpdate(
    { _id: req.body.admins[0] },
    { $push: { teams: savedTeam.id } },
    { new: true },
  );
  await saveChannel(
    {
      body: {
        name: 'General',
        isGroup: true,
        isPrivate: false,
        autoJoin: true,
        admins: [req.body.admins[0]],
        teamId: savedTeam.id,
      },
    },
    { send: () => {} },
  );
  return res.send(savedTeam);
};

const deleteTeam = async (req, res) => {
  const team = await Teams.findOneAndDelete({ _id: req.params.id });
  await Users.updateMany(
    {
      teams: mongoose.Types.ObjectId(req.params.id),
    },
    {
      $pull: { users: mongoose.Types.ObjectId(req.params.id) },
    },
  );
  if (!team) {
    return res.status(404).send(constants.teamNotFound);
  }
  return res.send(team);
};

const addUsersToTeam = async (req, res) => {
  const arrayOfIds = req.body.users.map(id => mongoose.Types.ObjectId(id));
  const user = await Users.updateMany(
    { _id: { $in: arrayOfIds } },
    { $push: { teams: mongoose.Types.ObjectId(req.params.teamId) } },
  );
  return res.send(user);
};

const removeUserFromTeam = async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { teams: req.params.teamId } },
    { new: true },
  );
  if (!user) {
    return res.status(404).send(constants.userNotFound);
  }
  return res.send(user);
};
export {
  getTeams, getTeam, saveTeam, deleteTeam, removeUserFromTeam, addUsersToTeam,
};
