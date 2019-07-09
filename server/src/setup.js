import http from 'http';
import socket from 'socket.io';
import app from './app';

const server = http.createServer(app);
const io = socket(server);

export { io, server };
