const http = require('http');
const socket = require('socket.io');

// For mocking purpose no express app is used for creating server
const server = http.createServer();
const io = socket(server);

export { server, io };
