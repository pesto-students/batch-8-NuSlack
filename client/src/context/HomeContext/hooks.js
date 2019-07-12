const setChannelsHandler = dispatch => (channels) => {
  dispatch({
    type: 'SET_CHANNELS',
    payload: { channels },
  });
};

const setUserHandler = dispatch => (user) => {
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

export { setChannelsHandler, setUserHandler, setConnectedHandler };
