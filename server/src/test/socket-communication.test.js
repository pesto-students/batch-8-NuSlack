import ioClient from 'socket.io-client';
import 'sinon-mongoose';
import sinon from 'sinon';
import { io, server } from '../setup';
import '../socket/index';
import {
  messageEvent,
  connectedUserAckEvent,
  connectedUserEvent,
  exceptionEvent,
} from '../constants/eventNames';
import user from '../Schemas/users';
import channel from '../Schemas/channels';
import message from '../Schemas/messages';

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
  sinon.restore();
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
      const userDoc = {
        _doc: {
          _id: '507f191e810c19729de860ea',
        },
        _id: '507f191e810c19729de860ea',
        username: 'name',
        email: 'name@email.com',
      };

      const channels = [
        {
          id: 'channel-one',
        },
      ];

      sinon
        .mock(user)
        .expects('findOne')
        .resolves(userDoc);

      sinon
        .mock(channel)
        .expects('find')
        .chain('select')
        .resolves(channels);

      socket.emit(connectedUserEvent, { username: 'name' });
      socket.on(connectedUserAckEvent, (data) => {
        expect(typeof data).toBe('object');
        expect(typeof data.onlineUsers).toBe('object');
        done();
      });
    });

    describe('`username` field', () => {
      describe('when not passed in connection event', () => {
        test('should send `exception` event saying `Username is required.`', (done) => {
          socket.emit(connectedUserEvent, {});
          socket.on(exceptionEvent, (data) => {
            expect(typeof data).toBe('object');
            expect(data.message).toBe('Username is required.');
            done();
          });
        });
      });

      describe('when passed incorrect value in connection event', () => {
        test('should send `exception` event saying `Username is required.`', (done) => {
          socket.emit(connectedUserEvent, { username: 'not-in-db' });

          sinon
            .mock(user)
            .expects('findOne')
            .resolves(null);

          socket.on(exceptionEvent, (data) => {
            expect(typeof data).toBe('object');
            expect(data.message).toBe('User not found.');
            done();
          });
        });
      });
    });

    test('should persist socket connections', (done) => {
      const userDoc = {
        _doc: {
          _id: '507f191e810c19729de860ea',
        },
        _id: '507f191e810c19729de860ea',
        username: 'name',
        email: 'name@email.com',
      };

      const channels = [
        {
          id: '5d23ecfcb69ce662ece0b90a',
        },
      ];

      const messageDoc = {
        channelId: '5d23ecfcb69ce662ece0b90a',
        message: 'hello',
        populate: () => ({
          execPopulate: async () => {
            Promise.resolve({
              channelId: '5d23ecfcb69ce662ece0b90a',
              message: 'hello',
              sender: {
                _id: '507f191e810c19729de860ea',
                username: 'name',
              },
            });
          },
        }),
      };

      Object.defineProperty(message.prototype, 'save', {
        value: message.prototype.save,
        configurable: true,
      });

      const messageModelMock = sinon.mock(message.prototype);

      sinon
        .mock(user)
        .expects('findOne')
        .resolves(userDoc);

      sinon
        .mock(channel)
        .expects('find')
        .chain('select')
        .resolves(channels);

      messageModelMock.expects('save').resolves(messageDoc);

      socket.emit(connectedUserEvent, { username: 'name' });
      socket.on(connectedUserAckEvent, () => {
        socket.emit(messageEvent, messageDoc);
        socket.on(messageEvent, (data) => {
          expect(typeof data).toBe('object');
          expect(data.message).toBe('hello');
          done();
        });
      });
    });
  });
});
