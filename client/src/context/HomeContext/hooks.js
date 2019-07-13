const setChannelsHandler = dispatch => channels => {
  dispatch({
    type: 'SET_CHANNELS',
    payload: { channels },
  });
};

const setUserHandler = dispatch => user => {
  localStorage.setItem('userDetails', JSON.stringify(user));
  dispatch({
    type: 'SET_USER',
    payload: { user },
  });
};

const setConnectedHandler = dispatch => () => {
  dispatch({
    type: 'SET_CONNECTED',
  });
};
const setActiveChannelHandler = dispatch => channelId => {
  dispatch({
    type: 'SET_ACTIVE_CHANNEL',
    payload: channelId,
  });
};
const setChannelsMapHandler = dispatch => (messages, channelId) => {
  dispatch({
    type: 'SET_CHANNELS_MAP',
    payload: {
      messages,
      channelId,
    },
  });
};

const logoutAndResetHandler = dispatch => () => {
  localStorage.removeItem('userDetails');
  dispatch({
    type: 'LOGOUT_USER',
  });
};

const newMessageHandler = dispatch => message => {
  dispatch({
    type: 'ADD_NEW_MESSAGE',
    payload: {
      message,
      channelId: message.channelId,
    },
  });
};

const generateChannelsMapHandler = dispatch => channels => {
  dispatch({
    type: 'GENERATE_CHANNELS_MAP',
    payload: { channels },
  });
};
const generateUsersMapHandler = dispatch => users => {
  dispatch({
    type: 'GENERATE_USERS_MAP',
    payload: { users },
  });
};
const setFirstUserStatusHandler = dispatch => onlineUserIds => {
  dispatch({
    type: 'SET_FIRST_USER_STATUS',
    payload: onlineUserIds,
  });
};

const setUserOnlineHandler = dispatch => userId => {
  dispatch({
    type: 'SET_USER_ONLINE',
    payload: userId,
  });
};
const setUserOfflineHandler = dispatch => userId => {
  dispatch({
    type: 'SET_USER_OFFLINE',
    payload: userId,
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
  setUserOnlineHandler
};
