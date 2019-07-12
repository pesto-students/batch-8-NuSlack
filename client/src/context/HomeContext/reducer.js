import getInitialState from './state';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHANNELS':
      return {
        channels: [...action.payload.channels],
      };
    case 'SET_USER':
      return {
        user: { ...action.payload.user },
      };
    case 'SET_CONNECTED':
      return {
        isConnected: true,
      };
    case 'LOGOUT_USER':
      const initialState = getInitialState();
      return {
        ...initialState,
      };
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
