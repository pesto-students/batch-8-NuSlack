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

const sendTypeEvent = (client, message) => {
  console.log(message, 'MESSAGE');
  client.emit('typeEvent', message);
};


const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const throttledEvent = throttle(sendTypeEvent, 2000);

const sendTypingEvent = client => message => throttledEvent(client, message);


export {
  sendConnectedEvent, sendMessageEvent, emitAddUserToChannel, emitRemoveUserFromChannel, sendTypingEvent,
};
