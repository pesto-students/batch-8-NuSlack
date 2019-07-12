import { useReducer, useEffect, useRef } from 'react';
import createUseContext from 'constate';

import initSocket from '../../socket';
import reducer from './reducer';
import getInitialState from './state';
import {
  setChannelsHandler,
  setUserHandler,
  setConnectedHandler,
  logoutAndResetHandler,
} from './hooks';

const initialState = getInitialState();

const useHome = () => {
  const socketMethods = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, channels, isConnected } = state;
  const setChannels = setChannelsHandler(dispatch);
  const setUser = setUserHandler(dispatch);
  const setConnected = setConnectedHandler(dispatch);
  const logoutUser = logoutAndResetHandler(dispatch);

  const sendMessage = (message) => {
    if (socketMethods) {
      socketMethods.current.sendMessage(message);
    }
  };

  useEffect(() => {
    if (user && user.username) {
      socketMethods.current = initSocket({ user, setConnected });
    }
  }, [user, setUser, setConnected]);

  return {
    user,
    channels,
    isConnected,
    setChannels,
    setUser,
    setConnected,
    sendMessage,
    logoutUser,
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
