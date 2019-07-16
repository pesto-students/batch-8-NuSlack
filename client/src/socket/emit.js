import { connectedUserEvent, messageEvent } from '../constants/eventNames';

const sendConnectedEvent = client => user => client.emit(connectedUserEvent, user);

const sendMessageEvent = client => message => client.emit(messageEvent, message);

export { sendConnectedEvent, sendMessageEvent };
