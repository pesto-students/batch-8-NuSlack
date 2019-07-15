import { useReducer, useRef, useEffect } from 'react';
import createUseContext from 'constate';
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
  generateChannelsMapHandler,
  generateUsersMapHandler,
  setFirstUserStatusHandler,
} from './action-handlers';

import {
  fetchMessagesApi,
  fetchChannelsApi,
  fetchUsersApi,
} from './api';

const initialState = getInitialState();

const useHome = () => {
  const socketMethods = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    user,
    channels,
    isConnected,
    activeChannel,
    channelsMap,
    channelIds,
    allUserIds,
    allUsersMap,
  } = state;

  const generateChannelsMap = useRef(generateChannelsMapHandler(dispatch));
  const fetchChannels = useRef(
    fetchChannelsApi(generateChannelsMap.current),
  );
  const generateUsersMap = useRef(generateUsersMapHandler(dispatch));
  const fetchUsers = useRef(fetchUsersApi(generateUsersMap.current));
  const setChannels = useRef(setChannelsHandler(dispatch));
  const setUser = useRef(setUserHandler(dispatch));
  const setConnected = useRef(setConnectedHandler(dispatch));
  const logoutUser = useRef(logoutAndResetHandler(dispatch));
  const setActiveChannel = useRef(setActiveChannelHandler(dispatch));
  const setChannelsMap = useRef(setChannelsMapHandler(dispatch));
  const fetchMessages = useRef(fetchMessagesApi(setChannelsMap.current));
  const newMessage = useRef(newMessageHandler(dispatch));
  const setFirstUserStatus = useRef(setFirstUserStatusHandler(dispatch));
  const sendMessage = useRef((message, channelId) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({ message, channelId });
    }
  });

  useEffect(() => {
    if (user && user.username) {
      if (!socketMethods.current) {
        //  TODO: connect with socket module
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
    channelIds,
    allUserIds,
    allUsersMap,
    fetchUsers: fetchUsers.current,
    setFirstUserStatus: setFirstUserStatus.current,
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
