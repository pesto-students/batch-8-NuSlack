import { connectedUserAckEvent, userOnlineEvent, exceptionEvent } from '../../constants/eventNames';
import Users from '../../Schemas/users';
import { getChannelsListFor } from '../../model-functions/channelsFunctions';

const createException = socket => message => socket.emit(exceptionEvent, { message });

const joinChannels = socket => async (id) => {
  const channels = await getChannelsListFor(id);
  channels.forEach(channel => socket.join(String(channel.id)));
  return channels;
};

const emitOnlineStatus = socket => user => socket.nsp.emit(userOnlineEvent, user);

const handleConnectedUser = socket => async ({ username }) => {
  const exception = createException(socket);

  if (!username || typeof username !== 'string') {
    return exception('Username is required.');
  }

  const user = await Users.findOne({ username });

  if (!user) {
    return exception('User not found.');
  }

  Object.assign(socket, { store: { user } });

  const socketIds = Object.keys(socket.nsp.sockets);
  const onlineUsers = socketIds
    .filter(socketId => Boolean(socket.nsp.sockets[socketId].store))
    .map(socketId => socket.nsp.sockets[socketId].store.user._doc._id);

  const channels = await joinChannels(socket)(user.id);

  emitOnlineStatus(socket)(user);

  return socket.emit(connectedUserAckEvent, { channels, onlineUsers });
};

export default handleConnectedUser;
