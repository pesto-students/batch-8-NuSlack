import reducer from '../reducer';
import getInitialState from '../state';

afterEach(() => {
  localStorage.clear();
});

describe('home-reducer', () => {
  describe('initial-state', () => {
    describe('when `localStorage` has no user', () => {
      it('should have initial state without user details', () => {
        const newState = getInitialState();
        expect(newState.user).toMatchObject({});
      });
    });
    describe('when `localStorage` has user', () => {
      it('should have initial state with user details', () => {
        const user = {
          _id: '123',
          username: 'some-name',
        };
        localStorage.setItem('userDetails', JSON.stringify(user));
        const newState = getInitialState();
        expect(newState.user).toMatchObject(user);
      });
    });
  });

  describe('reducer-actions', () => {
    describe('SET_CHANNELS', () => {
      it('should set channels to the state', () => {
        const channels = ['channel-1', 'channel-2'];
        const stateAfterSetChannels = reducer(getInitialState(), {
          type: 'SET_CHANNELS',
          payload: { channels },
        });

        expect(typeof stateAfterSetChannels).toBe('object');
        expect(stateAfterSetChannels.channels).toMatchObject(channels);
      });
    });

    describe('SET_USER', () => {
      it('should set user to the state', () => {
        const user = {
          _id: '123',
          username: 'some-name',
        };
        const stateAfterSetUser = reducer(getInitialState(), {
          type: 'SET_USER',
          payload: { user },
        });

        expect(typeof stateAfterSetUser).toBe('object');
        expect(stateAfterSetUser.user).toMatchObject(user);
      });
    });
  });
});
