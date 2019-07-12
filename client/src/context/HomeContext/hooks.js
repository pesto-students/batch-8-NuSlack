const setChannelsHandler = dispatch => (channels) => {
  dispatch({
    type: 'SET_CHANNELS',
    payload: { channels },
  });
};

const setUserHandler = dispatch => (user) => {
  dispatch({
    type: 'SET_CHANNELS',
    payload: { user },
  });
};

export { setChannelsHandler, setUserHandler };
