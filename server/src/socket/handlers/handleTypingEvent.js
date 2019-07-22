//FIXME

let typeEvent = 'typeEvent';

const handleTypingEvent = socket => ({
  channelId, receiverId, receiverSocketId,
}) => {
  console.log("server/handleTypingEvent");
  const senderId = socket.store.user._id;
  
  if (channelId) {
    socket.nsp.to(channelId).emit(typeEvent, { channelId });
  } else if (receiverId) {
    if (receiverSocketId && socket.nsp.sockets[receiverSocketId]) {
      socket.nsp
        .to(receiverSocketId)
        .emit(typeEvent, { receiverId: senderId });
    }
    if (String(senderId) !== String(receiverId)) {
      socket.emit(typeEvent, { receiverId });
    }
  }
};


export default handleTypingEvent;
