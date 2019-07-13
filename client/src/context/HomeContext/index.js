import { useReducer, useRef, useEffect } from 'react';
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
  newMessageHandler,
  generateChannelsMapHandler
} from './hooks';

const initialState = getInitialState();

const fetchMessagesHandler = setChannelsMap => async (channelId) => {
  const { data: messages } = await axios.get('http://localhost:8080/messages', {
    params: { channelId },
  });
  setChannelsMap(messages, channelId);
};

const fetchChannelsHandler = generateChannelsMap => async (userId) => {
  const { data: channels } = await axios.get('http://localhost:8080/channels', {
    params: { users: userId },
  });
  console.log('channels fetched', channels)
  generateChannelsMap(channels);
};

const useHome = () => {
  const socketMethods = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    user, channels, isConnected, activeChannel, channelsMap, channelIds
  } = state;
  const generateChannelsMap = useRef(generateChannelsMapHandler(dispatch));
  const fetchChannels = useRef(fetchChannelsHandler(generateChannelsMap.current))
  const setChannels = useRef(setChannelsHandler(dispatch));
  const setUser = useRef(setUserHandler(dispatch));
  const setConnected = useRef(setConnectedHandler(dispatch));
  const logoutUser = useRef(logoutAndResetHandler(dispatch));
  const setActiveChannel = useRef(setActiveChannelHandler(dispatch));
  const setChannelsMap = useRef(setChannelsMapHandler(dispatch));
  const fetchMessages = useRef(fetchMessagesHandler(setChannelsMap.current));
  const newMessage = useRef(newMessageHandler(dispatch));

  const sendMessage = useRef((message, channelId) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({ message, channelId });
    }
  });

  useEffect(() => {
    if (user && user.username) {
      if (!socketMethods.current) {
        socketMethods.current = initSocket({ user, newMessage: newMessage.current });
      }
    }
  }, [user, newMessage]);

  return {
    user,
    channels,
    isConnected,
    setChannels: setChannels.current,
    setUser: setUser.current,
    channelsMap,
    setConnected: setConnected.current,
    sendMessage: sendMessage.current,
    logoutUser: logoutUser.current,
    activeChannel,
    setActiveChannel: setActiveChannel.current,
    fetchMessages: fetchMessages.current,
    fetchChannels: fetchChannels.current,
    channelIds
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
