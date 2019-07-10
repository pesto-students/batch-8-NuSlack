import Users from '../Schemas/users';

const getUsers = async (req, res) => {
  const users = await Users.find({ ...req.query });
  res.send(users);
};

const getUser = async (req, res) => {
  const user = await Users.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};

const saveUser = async (req, res) => {
  const user = new Users(req.body);
  const savedUser = await user.save();
  res.send(savedUser);
};

const updateUser = async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { username: req.params.username },
    { ...req.body },
    { new: true },
  );
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};

const deleteUser = async (req, res) => {
  const user = await Users.findOneAndDelete({ username: req.params.username });
  res.send(user);
};
const addUserToChannels = async (req, res) => {
  const user = await Users.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).send('user not found');
  }
  const { channelIds } = user;
  req.body.channelIds.forEach((channelId) => {
    if (channelIds.indexOf(channelId) < 0) {
      channelIds.push(channelId);
    }
  });
  const updatedUser = await Users.findOneAndUpdate(
    { username: req.params.username },
    { channelIds },
    { new: true },
  );
  return res.send(updatedUser);
};

const removeUserFromChannel = async (req, res) => {
  const user = await Users.findOne({ username: req.params.username });
  if (!user) {
    return res.status(404).send('user not found');
  }
  const { channelIds } = user;
  const newChannelIds = channelIds.filter(
    channelId => String(channelId) !== req.params.channelId,
  );
  const updatedUser = await Users.findOneAndUpdate(
    { username: req.params.username },
    { channelIds: newChannelIds },
    { new: true },
  );
  return res.send(updatedUser);
};

export {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  addUserToChannels,
  removeUserFromChannel,
};
