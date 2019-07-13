import { connectedUserAckEvent, userOnlineEvent } from '../../constants/eventNames';
import Users from '../../models/users';
import { getChannelsListFor } from '../../model-functions/channelsFunctions';

const createException = socket => message => socket.emit('exception', { message });

const joinChannels = socket => async (id) => {
  const channels = await getChannelsListFor(id);
  channels.forEach(channel => socket.join(String(channel.id)));
  return channels;
};

const emitOnlineStatus = socket => user => socket.broadcast.emit(userOnlineEvent, user);

const handleConnectedUser = socket => async ({ username: userName }) => {
  const exception = createException(socket);
  if (!userName || typeof userName !== 'string') {
    return exception('Username is required.');
  }
  const user = await Users.findOne({ username: userName });
  if (!user) {
    return exception('User not found.');
  }

  // Right now we are storing user info to store,
  // but later we will let socket authorization to do it.
  Object.assign(socket, { store: { user } });
  const channels = await joinChannels(socket)(user.id);
  emitOnlineStatus(socket)(user);
  return socket.emit(connectedUserAckEvent, { channels });
};

export default handleConnectedUser;
