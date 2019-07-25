import getInitialState from './state';
import {
  SET_CHANNELS,
  SET_USER,
  SET_CONNECTED,
  SET_ACTIVE_CHANNEL,
  SET_ACTIVE_USER,
  SET_CHANNELS_MAP,
  LOGOUT_USER,
  ADD_NEW_CHANNEL_MESSAGE,
  GENERATE_CHANNELS_MAP,
  GENERATE_USERS_MAP,
  SET_FIRST_USER_STATUS,
  SET_USER_ONLINE,
  SET_USER_OFFLINE,
  ADD_NEW_CHANNEL,
  REMOVE_CHANNEL,
  SET_USER_MESSAGES_MAP,
  ADD_NEW_USER_MESSAGE,
  SET_ACTIVE_TEAM,
  ADD_TEAM,
  GENERATE_TEAMS_MAP,
  ADD_TO_CHANNEL_LISTENER,
  REMOVE_FROM_CHANNEL_LISTENER,
} from './actions-types';

const generateChannelsMap = (channels, activeUser) => {
  const channelsMap = channels.reduce((acc, channel) => {
    acc[channel._id] = {
      ...channel,
      messages: [],
      unreadMessages: 0,
    };
    return acc;
  }, {});
  const channelIds = Object.keys(channelsMap);
  let activeChannel;
  if (!activeUser) {
    [activeChannel] = channelIds;
  } else {
    activeChannel = null;
  }
  return {
    channelsMap,
    channelIds,
    activeChannel,
  };
};

const generateTeamsMap = (teams) => {
  const teamsMap = teams.reduce((acc, team) => {
    acc[team._id] = team;
    return acc;
  }, {});
  const teamIds = Object.keys(teamsMap);
  return {
    teamsMap,
    teamIds,
    noTeams: teamIds.length === 0,
  };
};

const generateUsersMap = (users, activeChannel) => {
  const allUsersMap = users.reduce((acc, user) => {
    acc[user._id] = {
      ...user,
    };
    return acc;
  }, {});
  const allUserIds = Object.keys(allUsersMap);
  let activeUser;
  if (!activeChannel) {
    [activeUser] = allUserIds;
  } else {
    activeUser = null;
  }
  return {
    allUsersMap,
    allUserIds,
    activeUser,
  };
};

const setFirstUserStatus = (state, onlineUsers) => {
  const { allUsersMap } = state;
  onlineUsers.forEach((onlineUser) => {
    if (allUsersMap[onlineUser.userId]) {
      allUsersMap[onlineUser.userId].online = true;
      allUsersMap[onlineUser.userId].socketId = onlineUser.socketId;
    }
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
      return { ...state, activeChannel: action.payload, activeUser: null };
    case SET_ACTIVE_USER:
      return { ...state, activeUser: action.payload, activeChannel: null };
    case SET_ACTIVE_TEAM:
      return { ...state, activeTeam: action.payload };
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
    case ADD_NEW_CHANNEL_MESSAGE: {
      const existingChannel = state.channelsMap[action.payload.channelId] || {};
      if (!existingChannel.messages) {
        existingChannel.messages = [];
      }
      if (!existingChannel.unreadMessages) {
        existingChannel.unreadMessages = 0;
      }
      return {
        ...state,
        channelsMap: {
          ...state.channelsMap,
          [action.payload.channelId]: {
            ...existingChannel,
            messages: [...existingChannel.messages, action.payload.message],
            unreadMessages:
              action.payload.channelId !== state.activeChannel
                ? existingChannel.unreadMessages + 1
                : 0,
          },
        },
      };
    }
    case GENERATE_CHANNELS_MAP:
      return {
        ...state,
        ...generateChannelsMap(action.payload.channels, state.activeUser),
      };
    case GENERATE_USERS_MAP:
      return {
        ...state,
        ...generateUsersMap(action.payload.users, state.activeChannel),
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
          [action.payload.userId]: {
            ...state.allUsersMap[action.payload.userId],
            online: true,
            socketId: action.payload.socketId,
          },
        },
      };
    case SET_USER_MESSAGES_MAP:
      return {
        ...state,
        userMessages: {
          ...state.userMessages,
          [action.payload.receiverId]: {
            ...state.userMessages[action.payload.receiverId],
            messages: action.payload.messages,
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
      const activeChannel = channelIds[0];
      return {
        ...state,
        channelIds,
        channelsMap,
        activeChannel,
      };
    }
    case ADD_NEW_USER_MESSAGE: {
      const existingReceiver = state.userMessages[action.payload.receiverId] || {};
      if (!existingReceiver.messages) {
        existingReceiver.messages = [];
      }
      return {
        ...state,
        userMessages: {
          ...state.userMessages,
          [action.payload.receiverId]: {
            ...existingReceiver,
            messages: [...existingReceiver.messages, action.payload.message],
          },
        },
      };
    }
    case ADD_TEAM: {
      {
        const { teamsMap, teamIds } = state;
        teamIds.push(action.payload._id);
        teamsMap[action.payload._id] = action.payload;
        return {
          ...state,
          teamsMap,
          teamIds,
        };
      }
    }
    case GENERATE_TEAMS_MAP:
      return {
        ...state,
        ...generateTeamsMap(action.payload.teams),
      };
    case ADD_TO_CHANNEL_LISTENER: {
      const { channelsMap, channelIds } = state;
      const { channelId, channel } = action.payload;
      if (channelIds.indexOf(channelId) < 0) {
        channelIds.push(channelId);
      }

      channelsMap[channelId] = { ...channelsMap[channelId], ...channel };
      if (!channelsMap[channelId].messages) {
        channelsMap[channelId].messages = [];
      }
      return {
        ...state,
        channelsMap,
        channelIds,
      };
    }
    case REMOVE_FROM_CHANNEL_LISTENER: {
      const { userId, channelId } = action.payload;
      const { channelsMap, channelIds, activeChannel } = state;
      if (userId === state.user._id) {
        const newChannelIds = channelIds.filter(idInstance => idInstance !== channelId);
        delete channelsMap[channelId];
        const newActiveChannel = activeChannel === channelId ? newChannelIds[0] : activeChannel;
        return {
          ...state,
          activeChannel: newActiveChannel,
          channelsMap,
          channelIds: newChannelIds,
        };
      }
      const channelUsers = channelsMap[channelId].users;
      const updatedChannelUsers = channelUsers.filter(channelUserId => channelUserId !== userId);
      channelsMap[channelId].users = updatedChannelUsers;
      return {
        ...state,
        channelsMap,
      };
    }
    default:
      throw new Error('Action type not defined');
  }
};

export default reducer;
