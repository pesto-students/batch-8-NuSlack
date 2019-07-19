import {
  connectedUserEvent,
  messageEvent,
  addUserEvent,
  removeUserEvent,
} from '../constants/eventNames';

const sendConnectedEvent = client => user =>
  client.emit(connectedUserEvent, user);

const sendMessageEvent = client => message =>
  client.emit(messageEvent, message);

const emitAddUserToChannel = client => data => client.emit(addUserEvent, data);

const emitRemoveUserFromChannel = client => data =>
  client.emit(removeUserEvent, data);

/*
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    console.log("EXECUTING");
    let context = this;
    let args = arguments;
    let later = function() {
    console.log("LATER");
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

*/

// TODO: Remove naked strings
const sendTypeEvent = (client, message) => {
  console.log(message, 'MESSAGE');
  client.emit('typeEvent', message);
};

//const sendTypingEvent = client => debounce(sendTypeEvent, 2000, false);

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
  sendConnectedEvent,
  sendMessageEvent,
  emitAddUserToChannel,
  emitRemoveUserFromChannel,
  sendTypingEvent,
};
