const sendConnectedEvent = client => user => client.emit('userConnected', user);

const sendMessageEvent = client => message => client.emit('message', message);

export { sendConnectedEvent, sendMessageEvent };
