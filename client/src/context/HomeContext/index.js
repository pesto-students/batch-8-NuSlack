import { useReducer, useRef, useEffect } from 'react';
import createUseContext from 'constate';
import reducer from './reducer';
import getInitialState from './state';
import initSocket from '../../socket';

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
  setUserOfflineHandler,
  setUserOnlineHandler,
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
  const logoutAndReset = useRef(logoutAndResetHandler(dispatch));
  const setActiveChannel = useRef(setActiveChannelHandler(dispatch));
  const setChannelsMap = useRef(setChannelsMapHandler(dispatch));
  const fetchMessages = useRef(fetchMessagesApi(setChannelsMap.current));
  const newMessage = useRef(newMessageHandler(dispatch));
  const setFirstUserStatus = useRef(setFirstUserStatusHandler(dispatch));
  const setUserOffline = useRef(setUserOfflineHandler(dispatch));
  const setUserOnline = useRef(setUserOnlineHandler(dispatch));
  const sendMessage = useRef((message, channelId) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({ message, channelId });
    }
  });

  const logoutUser = useRef(() => {
    if (socketMethods.current) {
      socketMethods.current.close();
      socketMethods.current = null;
      logoutAndReset.current();
    }
  });

  useEffect(() => {
    if (user && user.username && channelIds.length && allUserIds.length) {
      if (!socketMethods.current) {
        socketMethods.current = initSocket({
          user,
          newMessage: newMessage.current,
          setFirstUserStatus: setFirstUserStatus.current,
          setUserOffline: setUserOffline.current,
          setUserOnline: setUserOnline.current,
        });
      }
    }
  }, [user, channelIds, allUserIds]);

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
