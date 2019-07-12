import Users from '../Schemas/users';

const getUsers = async (req, res) => {
  const users = await Users.find({ ...req.query });
  return res.send(users);
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
  return res.send(savedUser);
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
  if (!user) {
    return res.status(404).send('user not found');
  }
  return res.send(user);
};
export {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
};
