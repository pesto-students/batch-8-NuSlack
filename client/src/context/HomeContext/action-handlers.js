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
  dispatch({
    type: ADD_NEW_MESSAGE,
    payload: {
      message,
      channelId: message.channelId,
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

const setFirstUserStatusHandler = dispatch => (onlineUserIds) => {
  dispatch({
    type: SET_FIRST_USER_STATUS,
    payload: onlineUserIds,
  });
};

const setUserOnlineHandler = dispatch => (userId) => {
  dispatch({
    type: SET_USER_ONLINE,
    payload: userId,
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

export {
  setChannelsHandler,
  setUserHandler,
  setConnectedHandler,
  logoutAndResetHandler,
  setActiveChannelHandler,
  setChannelsMapHandler,
  newMessageHandler,
  generateChannelsMapHandler,
  generateUsersMapHandler,
  setFirstUserStatusHandler,
  setUserOfflineHandler,
  setUserOnlineHandler,
  addChannelHandler,
  removeChannelHandler,
};
