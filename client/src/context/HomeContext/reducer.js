import getInitialState from './state';
import {
  SET_CHANNELS,
  SET_USER,
  SET_CONNECTED,
  SET_ACTIVE_CHANNEL,
  SET_CHANNELS_MAP,
  LOGOUT_USER,
  ADD_NEW_MESSAGE,
  GENERATE_CHANNELS_MAP,
  GENERATE_USERS_MAP,
  SET_FIRST_USER_STATUS,
  SET_USER_ONLINE,
  SET_USER_OFFLINE,
  ADD_NEW_CHANNEL,
  REMOVE_CHANNEL,
} from './actions-types';

const generateChannelsMap = (channels) => {
  const channelsMap = channels.reduce((acc, channel) => {
    acc[channel._id] = {
      ...channel,
      messages: [],
      unreadMessages: 0,
    };
    return acc;
  }, {});
  const channelIds = Object.keys(channelsMap);
  const [activeChannel] = channelIds;
  return {
    channelsMap,
    channelIds,
    activeChannel,
  };
};

const generateUsersMap = (users) => {
  const allUsersMap = users.reduce((acc, user) => {
    acc[user._id] = {
      ...user,
    };
    return acc;
  }, {});
  const allUserIds = Object.keys(allUsersMap);
  return {
    allUsersMap,
    allUserIds,
  };
};

const setFirstUserStatus = (state, onlineUserIds) => {
  const { allUsersMap } = state;
  onlineUserIds.forEach((onlineUserId) => {
    allUsersMap[onlineUserId].online = true;
  });

  return allUsersMap;
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        channels: [...action.payload.channels],
      };
    case SET_USER:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case SET_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case LOGOUT_USER:
      return getInitialState();
    case SET_ACTIVE_CHANNEL:
      return { ...state, activeChannel: action.payload };
    case SET_CHANNELS_MAP:
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
    case ADD_NEW_MESSAGE:
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
                ? state.channelsMap[action.payload.channelId].unreadMessages + 1
                : 0,
          },
        },
      };
    case GENERATE_CHANNELS_MAP:
      return {
        ...state,
        ...generateChannelsMap(action.payload.channels),
      };
    case GENERATE_USERS_MAP:
      return {
        ...state,
        ...generateUsersMap(action.payload.users),
      };
    case SET_FIRST_USER_STATUS:
      return { ...state, ...setFirstUserStatus(state, action.payload) };
    case SET_USER_OFFLINE:
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          [action.payload]: {
            ...state.allUsersMap[action.payload],
            online: false,
          },
        },
      };
    case SET_USER_ONLINE:
      return {
        ...state,
        allUsersMap: {
          ...state.allUsersMap,
          [action.payload]: {
            ...state.allUsersMap[action.payload],
            online: true,
          },
        },
      };
    case ADD_NEW_CHANNEL: {
      const channelsMap = {
        ...state.channelsMap,
        [action.payload._id]: action.payload,
      };
      const { channelIds } = state;
      channelIds.push(action.payload._id);
      const updatedChannelIds = [...channelIds];
      return {
        ...state,
        channelIds: updatedChannelIds,
        channelsMap,
      };
    }
    case REMOVE_CHANNEL: {
      const { channelsMap } = state;
      const channelIds = state.channelIds.filter(channelId => channelId !== action.payload);
      delete channelsMap[action.payload];
      return {
        ...state,
        channelIds,
        channelsMap,
      };
    }
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
