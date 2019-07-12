import ioClient from 'socket.io-client';
import mockingoose from 'mockingoose';
import { io, server } from '../setup';
import '../socket/index';
import { messageEvent, connectedUserAckEvent, connectedUserEvent } from '../constants/eventNames';
import user from '../models/users';
import channel from '../models/channels';
import message from '../models/messages';

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
      socket.once('echo', (echoMessage) => {
        expect(echoMessage).toBe('Hello World');
        done();
      });
    });

    test('should get Ack with user data', (done) => {
      const doc = {
        _id: '507f191e810c19729de860ea',
        username: 'name',
        email: 'name@email.com',
      };

      const channels = [
        {
          id: 'channel-one',
        },
      ];

      mockingoose(user).toReturn(doc, 'findOne');
      mockingoose(channel).toReturn(channels, 'find');

      socket.emit(connectedUserEvent, { userName: 'saurabh' });
      socket.on(connectedUserAckEvent, (data) => {
        expect(typeof data).toBe('object');
        expect(typeof data.channels).toBe('object');
        done();
      });
    });

    test('should persist socket connections', (done) => {
      const userDoc = {
        _id: '507f191e810c19729de860ea',
        username: 'saurabh',
      };

      const channels = [
        {
          id: 'channel-one',
        },
      ];

      const messageDoc = {
        channelId: '5d23ecfcb69ce662ece0b90a',
        message: 'hello',
        sender: {
          _id: '507f191e810c19729de860ea',
          username: 'saurabh',
        },
      };

      mockingoose(user).toReturn(userDoc, 'findOne');
      mockingoose(channel).toReturn(channels, 'find');
      mockingoose(message).toReturn(messageDoc, 'save');
      mockingoose(message).toReturn(messageDoc);

      socket.emit(connectedUserEvent, { userName: 'saurabh' });
      socket.emit(messageEvent, messageDoc);
      socket.on(messageEvent, (data) => {
        expect(typeof data).toBe('object');
        expect(data.message).toBe('hello');
      });
      done();
    });
  });
});
