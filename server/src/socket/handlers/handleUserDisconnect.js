const handleDisconnectUser = socket => async () => {
  socket.nsp.emit('userDisconnected', socket.store.user._doc);
};

export default handleDisconnectUser;
