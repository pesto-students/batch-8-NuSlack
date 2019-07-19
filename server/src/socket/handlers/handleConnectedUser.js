import { connectedUserAckEvent, userOnlineEvent, exceptionEvent } from '../../constants/eventNames';
import Users from '../../Schemas/users';
import { getChannelsListFor } from '../../model-functions/channelsFunctions';

const createException = socket => message => socket.emit(exceptionEvent, { message });

const joinChannels = socket => async (id) => {
  const channels = await getChannelsListFor(id);
  channels.forEach(channel => socket.join(String(channel.id)));
};

const emitOnlineStatus = socket => user => socket.nsp.emit(userOnlineEvent, ({
  userId: user._id,
  socketId: socket.id,
}));

const handleConnectedUser = socket => async (connectedUser) => {
  const { _id } = connectedUser;
  const exception = createException(socket);

  if (!_id || typeof _id !== 'string') {
    return exception('User Id is required.');
  }

  const user = await Users.findById(_id);

  if (!user) {
    return exception('User not found.');
  }

  Object.assign(socket, { store: { user } });

  const socketIds = Object.keys(socket.nsp.sockets);
  const onlineUsers = socketIds
    .filter(socketId => Boolean(socket.nsp.sockets[socketId].store))
    .map(socketId => ({
      userId: socket.nsp.sockets[socketId].store.user._doc._id,
      socketId,
    }));

  await joinChannels(socket)(user.id);

  emitOnlineStatus(socket)(user);

  return socket.emit(connectedUserAckEvent, { onlineUsers });
};

export default handleConnectedUser;
