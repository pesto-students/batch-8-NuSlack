import { userDisconnectEvent } from '../../constants/eventNames';

const handleUserDisconnect = socket => () => {
  if (socket.store && socket.store.user) {
    socket.nsp.emit(userDisconnectEvent, socket.store.user._doc);
  }
};

export default handleUserDisconnect;
