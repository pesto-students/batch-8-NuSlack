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

export { setChannelsHandler, setUserHandler };
