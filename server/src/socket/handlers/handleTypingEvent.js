// Broadcast the 'typing' event 

const handleTypingEvent = socket => () => {
  if (socket.store && socket.store.user) {
  	console.log('server/socket');
    socket.nsp.emit('typing', socket.store.user._doc);
  }
};

export default handleTypingEvent;

