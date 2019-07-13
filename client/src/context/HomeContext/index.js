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
  generateChannelsMapHandler,
  generateUsersMapHandler,
  setFirstUserStatusHandler,
  setUserOfflineHandler,
  setUserOnlineHandler,
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
  generateChannelsMap(channels);
};

const fetchUsersHandler = generateUsersMap => async () => {
  const { data: users } = await axios.get('http://localhost:8080/users');
  generateUsersMap(users);
};

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
    fetchChannelsHandler(generateChannelsMap.current),
  );
  const generateUsersMap = useRef(generateUsersMapHandler(dispatch));
  const fetchUsers = useRef(fetchUsersHandler(generateUsersMap.current));
  const setChannels = useRef(setChannelsHandler(dispatch));
  const setUser = useRef(setUserHandler(dispatch));
  const setConnected = useRef(setConnectedHandler(dispatch));
  const logoutUser = useRef(logoutAndResetHandler(dispatch));
  const setActiveChannel = useRef(setActiveChannelHandler(dispatch));
  const setChannelsMap = useRef(setChannelsMapHandler(dispatch));
  const fetchMessages = useRef(fetchMessagesHandler(setChannelsMap.current));
  const newMessage = useRef(newMessageHandler(dispatch));
  const setFirstUserStatus = useRef(setFirstUserStatusHandler(dispatch));
  const setUserOffline = useRef(setUserOfflineHandler(dispatch));
  const setUserOnline = useRef(setUserOnlineHandler(dispatch));
  const sendMessage = useRef((message, channelId) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({ message, channelId });
    }
  });

  useEffect(() => {
    if (user && user.username) {
      if (!socketMethods.current) {
        socketMethods.current = initSocket({
          user,
          newMessage: newMessage.current,
          setFirstUserStatus: setFirstUserStatus.current,
          setUserOffline: setUserOffline.current,
          setUserOnline: setUserOnline.current
        });
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
    setFirstUserStatus: setFirstUserStatus.current
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
