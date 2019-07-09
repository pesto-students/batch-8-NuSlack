import ioClient from 'socket.io-client';
import mockingoose from 'mockingoose';
import { io, server } from '../setup';
import '../socket/index';
import { newMessageEvent, connectedUserAckEvent, connectedUserEvent } from '../socket/eventNames';
import user from '../Schemas/users';
import channel from '../Schemas/channels';

jest.mock('../setup');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  server.on('error', (error) => {
    throw Error('Server not running', error);
  });
  server.on('listening', () => {
    httpServerAddr = httpServer.address();
    ioServer = io;
    done();
  });
  httpServer = server.listen();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port
  socket = ioClient.connect(`http://127.0.0.1:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

// Test Cases
describe('Socket.io connection', () => {
  describe('server', () => {
    test('should connect', () => {
      ioServer.on('connection', (mySocket) => {
        expect(mySocket).toBeDefined();
      });
    });
  });

  describe('client', () => {
    test('should receive echo message', (done) => {
      ioServer.emit('echo', 'Hello World');
      socket.once('echo', (message) => {
        expect(message).toBe('Hello World');
        done();
      });
    });

    test('should get Ack with user data', (done) => {
      const doc = {
        _id: '507f191e810c19729de860ea',
        username: 'name',
        email: 'name@email.com',
      };

      mockingoose(user).toReturn(doc, 'findOne');

      socket.emit(connectedUserEvent, { userName: 'saurabh' });
      socket.on(connectedUserAckEvent, (data) => {
        expect(typeof data).toBe('object');
        expect(typeof data.socketId).toBe('string');
        done();
      });
    });

    test('should persist socket connections', (done) => {
      const userDoc = {
        _id: '507f191e810c19729de860ea',
        username: 'saurabh',
      };

      const channelDoc = {
        _id: '5d23ecfcb69ce662ece0b90a',
        users: ['saurabh'],
      };

      mockingoose(user).toReturn(userDoc, 'findOne');
      mockingoose(channel).toReturn(channelDoc, 'findOne');

      socket.emit(connectedUserEvent, { userName: 'saurabh' });
      socket.emit(newMessageEvent, {
        channelId: '5d23ecfcb69ce662ece0b90a',
        message: 'hello',
        username: 'saurabh',
      });
      socket.on(newMessageEvent, (data) => {
        expect(typeof data).toBe('object');
        expect(data.message).toBe('hello');
        done();
      });
    });
  });
});
