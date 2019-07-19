import {
  connectedUserEvent,
  messageEvent,
  addUserEvent,
  removeUserEvent,
} from '../constants/eventNames';

const sendConnectedEvent = client => user => client.emit(connectedUserEvent, user);

const sendMessageEvent = client => message => client.emit(messageEvent, message);

const emitAddUserToChannel = client => data => client.emit(addUserEvent, data);

const emitRemoveUserFromChannel = client => data => client.emit(removeUserEvent, data);

// TODO: Remove naked strings
const startTyping = client => message => client.emit('startTyping', message);

export {
  sendConnectedEvent, sendMessageEvent, emitAddUserToChannel, emitRemoveUserFromChannel, startTyping, 
};
