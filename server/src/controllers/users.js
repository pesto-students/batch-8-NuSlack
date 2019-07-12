import Users from '../models/users';
import Channels from '../models/channels';
const getUsers = async (req, res) => {
  const users = await Users.find({ ...req.query });
  return res.send(users);
};

const getUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};

const saveUser = async (req, res) => {
  const user = new Users(req.body);
  const savedUser = await user.save();
  await Channels.updateMany(
    { autoJoin: true },
    { $push: { users: savedUser } },
  );
  return res.send(savedUser);
};

const updateUser = async (req, res) => {
  const user = await Users.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true },
  );
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};

const deleteUser = async (req, res) => {
  const user = await Users.findOneAndDelete({ _id: req.params.id });
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};
export { getUsers, getUser, saveUser, updateUser, deleteUser };
