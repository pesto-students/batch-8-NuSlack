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
      return getInitialState();
    case 'SET_ACTIVE_CHANNEL':
      return { ...state, activeChannel: action.payload };
    case 'SET_CHANNELS_MAP':
      return {
        ...state,
        channelsMap: {
          ...state.channelsMap,
          [action.payload.channelId]: {
            messages: action.payload.messages,
          },
        },
      };
    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        channelsMap: {
          ...state.channelsMap,
          [action.payload.channelId]: {
            ...state.channelsMap[action.payload.channelId],
            messages: [...state.channelsMap[action.payload.channelId].messages, action.payload.message],
          },
        }
      };
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
