import mongoose from 'mongoose';

import Channels from '../models/channels';

const getChannels = async (req, res) => {
  const channels = await Channels.find({ ...req.query });
  return res.send(channels);
};

const getChannel = async (req, res) => {
  const channel = await Channels.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });
  if (!channel) {
    return res.status(404).send('channel not found');
  }
  return res.send(channel);
};

const saveChannel = async (req, res) => {
  const channel = new Channels(req.body);
  const savedChannel = await channel.save();
  return res.send(savedChannel);
};

const updateChannel = async (req, res) => {
  const channel = await Channels.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { ...req.body },
    { new: true },
  );
  if (!channel) {
    return res.status(404).send('channel not found');
  }
  return res.send(channel);
};

const deleteChannel = async (req, res) => {
  const channel = await Channels.findOneAndDelete({ _id: req.params.id });
  if (!channel) {
    return res.status(404).send('channel not found');
  }
  return res.send(channel);
};

const addUserToChannel = async (req, res) => {
  const initialChannel = await Channels.findOne({ _id: req.params.channelId });
  if (initialChannel.users.indexOf(req.params.userId) >= 0) {
    return res.send(400).send('User already present');
  }
  const channel = await Channels.findOneAndUpdate(
    { _id: req.params.channelId },
    { $push: { users: mongoose.Types.ObjectId(req.params.userId) } },
    { new: true },
  );
  if (!channel) {
    return res.status(404).send('channel not found');
  }
  return res.send(channel);
};

const removeUserFromChannel = async (req, res) => {
  const channel = await Channels.findOneAndUpdate(
    { _id: req.params.channelId },
    { $pull: { users: req.params.userId } },
  );
  if (!channel) {
    return res.status(404).send('channel not found');
  }
  return res.send(channel);
};

export {
  getChannels,
  getChannel,
  saveChannel,
  updateChannel,
  deleteChannel,
  addUserToChannel,
  removeUserFromChannel,
};
