import mongoose from 'mongoose';
import Teams from '../Schemas/teams';
import Users from '../Schemas/users';
import * as constants from '../constants/failedResponse';

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

  return res.send(savedTeam);
};


const deleteTeam = async (req, res) => {
  const team = await Teams.findOneAndDelete({ _id: req.params.id });
  if (!team) {
    return res.status(404).send(constants.teamNotFound);
  }
  return res.send(team);
};

const addUserToTeam = async (req, res) => {
  const initialUser = await Users.findOne({
    _id: req.params.userId,
    teams: req.params.teamId,
  });
  if (initialUser) {
    return res.status(400).send(constants.userAlreadyPresent);
  }
  const user = await Users.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { teams: mongoose.Types.ObjectId(req.params.teamId) } },
    { new: true },
  );
  if (!user) {
    return res.status(404).send(constants.userNotFound);
  }
  return res.send(user);
};

const removeUserFromTeam = async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { users: req.params.teamId } },
    { new: true },
  );
  if (!user) {
    return res.status(404).send(constants.userNotFound);
  }
  return res.send(user);
};
export {
  getTeams,
  getTeam,
  saveTeam,
  deleteTeam,
  removeUserFromTeam,
  addUserToTeam,
};
