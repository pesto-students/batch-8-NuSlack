import Messages from '../models/messages';

const getMessages = async (req, res) => {
  const messages = await Messages.find({ ...req.query })
    .populate('sender')
    .populate('receiver');
  return res.send(messages);
};

const saveMessage = async (req, res) => {
  const body = {...req.body, timestamp: new Date()}
  const message = new Messages(body);
  const savedMessage = await message.save();
  return res.send(savedMessage);
};

const updateMessage = async (req, res) => {
  const message = await Messages.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true },
  );
  if (!message) {
    return res.status(404).send('message not found');
  }
  return res.send(message);
};

const deleteMessage = async (req, res) => {
  const message = await Messages.findOneAndDelete({ _id: req.params.id });
  if (!message) {
    return res.status(404).send('message not found');
  }
  return res.send(message);
};

export {
  getMessages,
  saveMessage,
  updateMessage,
  deleteMessage,
};
