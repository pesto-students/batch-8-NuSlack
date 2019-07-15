import getInitialState from './state';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CHANNELS':
      return {
        ...state,
        channels: [...action.payload.channels],
      };
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case 'SET_CONNECTED':
      return {
        ...state,
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
            ...state.channelsMap[action.payload.channelId],
            messages: action.payload.messages,
            unreadMessages: 0,
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
            messages: [
              ...state.channelsMap[action.payload.channelId].messages,
              action.payload.message,
            ],
            unreadMessages:
              action.payload.channelId !== state.activeChannel
                ? (state.channelsMap[
                    action.payload.channelId
                  ].unreadMessages += 1)
                : 0,
          },
        },
      };
    case 'GENERATE_CHANNELS_MAP':
      const newStateWithChannelsData = { ...state };
      newStateWithChannelsData.channelsMap = action.payload.channels.reduce(
        (acc, channel) => {
          acc[channel._id] = {
            ...channel,
            messages: [],
            unreadMessages: 0
          };
          return acc;
        },
        {},
      );
      newStateWithChannelsData.channelIds = Object.keys(
        newStateWithChannelsData.channelsMap,
      );
      newStateWithChannelsData.activeChannel =
        newStateWithChannelsData.channelIds[0];
      return {
        ...newStateWithChannelsData,
      };
    case 'GENERATE_USERS_MAP':
      const newStateWithUserData = { ...state };
      newStateWithUserData.allUsersMap = action.payload.users.reduce(
        (acc, user) => {
          acc[user._id] = {
            ...user,
          };
          return acc;
        },
        {},
      );
      newStateWithUserData.allUserIds = Object.keys(
        newStateWithUserData.allUsersMap,
      );
      return {
        ...newStateWithUserData,
      };
    case 'SET_FIRST_USER_STATUS':
      const { allUsersMap } = state;
      const onlineUserIds = action.payload;
      onlineUserIds.forEach(onlineUserId => {
        allUsersMap[onlineUserId].online = true;
      });
      return { ...state, allUsersMap };
    case 'SET_USER_OFFLINE':
      const userToSetOffline = state.allUsersMap[action.payload];
      userToSetOffline.online = false;
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          [action.payload]: userToSetOffline,
        },
      };
    case 'SET_USER_ONLINE':
      const userToSetOnline = state.allUsersMap[action.payload];
      userToSetOnline.online = true;
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          [action.payload]: userToSetOnline,
        },
      };
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
