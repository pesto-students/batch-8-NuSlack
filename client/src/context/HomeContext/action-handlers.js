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
} from './actions-types';
import { localStorageKeys } from '../../config';

const setChannelsHandler = dispatch => (channels) => {
  dispatch({
    type: SET_CHANNELS,
    payload: { channels },
  });
};

const setUserHandler = dispatch => (user) => {
  localStorage.setItem(localStorageKeys.USER_DETAILS, JSON.stringify(user));
  dispatch({
    type: SET_USER,
    payload: { user },
  });
};

const setConnectedHandler = dispatch => () => {
  dispatch({
    type: SET_CONNECTED,
  });
};

const setActiveChannelHandler = dispatch => (channelId) => {
  dispatch({
    type: SET_ACTIVE_CHANNEL,
    payload: channelId,
  });
};

const setActiveUserHandler = dispatch => (userId) => {
  dispatch({
    type: SET_ACTIVE_USER,
    payload: userId,
  });
};
const setActiveTeamHandler = dispatch => (teamId) => {
  dispatch({
    type: SET_ACTIVE_TEAM,
    payload: teamId,
  });
};

const setChannelsMapHandler = dispatch => (messages, channelId) => {
  dispatch({
    type: SET_CHANNELS_MAP,
    payload: {
      messages,
      channelId,
    },
  });
};

const logoutAndResetHandler = dispatch => () => {
  localStorage.removeItem(localStorageKeys.USER_DETAILS);
  dispatch({
    type: LOGOUT_USER,
  });
};

const newMessageHandler = dispatch => (message) => {
  if (message.channelId) {
    return dispatch({
      type: ADD_NEW_CHANNEL_MESSAGE,
      payload: {
        message,
        channelId: message.channelId,
      },
    });
  }
  return dispatch({
    type: ADD_NEW_USER_MESSAGE,
    payload: {
      message: message.message,
      receiverId: message.receiverId,
    },
  });
};

const generateChannelsMapHandler = dispatch => (channels) => {
  dispatch({
    type: GENERATE_CHANNELS_MAP,
    payload: { channels },
  });
};

const generateUsersMapHandler = dispatch => (users) => {
  dispatch({
    type: GENERATE_USERS_MAP,
    payload: { users },
  });
};

const setFirstUserStatusHandler = dispatch => (onlineUsers) => {
  dispatch({
    type: SET_FIRST_USER_STATUS,
    payload: onlineUsers,
  });
};

const setUserOnlineHandler = dispatch => (user) => {
  dispatch({
    type: SET_USER_ONLINE,
    payload: user,
  });
};

const setUserOfflineHandler = dispatch => (userId) => {
  dispatch({
    type: SET_USER_OFFLINE,
    payload: userId,
  });
};

const addChannelHandler = dispatch => (channel) => {
  dispatch({
    type: ADD_NEW_CHANNEL,
    payload: channel,
  });
};

const removeChannelHandler = dispatch => (channel) => {
  dispatch({
    type: REMOVE_CHANNEL,
    payload: channel,
  });
};

const setUserMessagesMapHandler = dispatch => (messages, receiverId) => {
  dispatch({
    type: SET_USER_MESSAGES_MAP,
    payload: {
      messages,
      receiverId,
    },
  });
};

const addTeamHandler = dispatch => (team) => {
  dispatch({
    type: ADD_TEAM,
    payload: team,
  });
};

const generateTeamsMapHandler = dispatch => (teams) => {
  dispatch({
    type: GENERATE_TEAMS_MAP,
    payload: { teams },
  });
};

// addTypingUser
// TODO remove naked string
const setUserTypingHandler = dispatch => (user) => {
  dispatch({
    type: 'SET_USER_TYPING',
    payload: user,
  });
};

export {
  setChannelsHandler,
  setUserHandler,
  setConnectedHandler,
  logoutAndResetHandler,
  setActiveChannelHandler,
  setActiveUserHandler,
  setChannelsMapHandler,
  newMessageHandler,
  generateChannelsMapHandler,
  generateUsersMapHandler,
  setFirstUserStatusHandler,
  setUserOfflineHandler,
  setUserOnlineHandler,
  addChannelHandler,
  removeChannelHandler,
  setUserMessagesMapHandler,
  setActiveTeamHandler,
  addTeamHandler,
  generateTeamsMapHandler,
  setUserTypingHandler,
};
