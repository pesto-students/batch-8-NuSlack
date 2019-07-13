import { useReducer, useEffect, useRef } from 'react';
import createUseContext from 'constate';
import axios from 'axios';
import initSocket from '../../socket';
import reducer from './reducer';
import getInitialState from './state';
import {
  setChannelsHandler,
  setUserHandler,
  setConnectedHandler,
  logoutAndResetHandler,
  setActiveChannelHandler,
  setChannelsMapHandler,
} from './hooks';

const initialState = getInitialState();

const useHome = () => {
  const socketMethods = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, channels, isConnected, activeChannel, channelsMap } = state;
  const setChannels = setChannelsHandler(dispatch);
  const setUser = setUserHandler(dispatch);
  const setConnected = setConnectedHandler(dispatch);
  const logoutUser = logoutAndResetHandler(dispatch);
  const setActiveChannel = setActiveChannelHandler(dispatch);
  const setChannelsMap = setChannelsMapHandler(dispatch);
  const sendMessage = message => {
    if (socketMethods) {
      socketMethods.current.sendMessage(message);
    }
  };
  const fetchMessages = async channelId => {
    const { data: messages } = await axios.get(
      'http://localhost:8080/messages',
      {
        params: { channelId: channelId },
      },
    );
    // const newChannelsMap = {
    //   ...channelsMap,
    //   [channelId]: {
    //     messages,
    //   }
    // };
    setChannelsMap(messages, channelId);
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
    channelsMap,
    setConnected,
    sendMessage,
    logoutUser,
    activeChannel,
    setActiveChannel,
    fetchMessages,
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
