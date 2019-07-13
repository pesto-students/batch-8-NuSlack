const socket = require('socket.io-client');

const client = socket.connect('http://127.0.0.1:8080', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  transports: ['websocket'],
});

client.on('connect', () => {
  client.emit('userConnected', { username: 'jaspreet' });

  setTimeout(() => {
    client.emit('message', { channelId: '5d27bffae89ee7d994f4ee2e', message: 'hi dude' });
  }, 500);
});

client.on('message', (message) => {
  console.log('got the message', message);
});

client.on('exception', ({ message }) => {
  console.log('error message', message);
});
