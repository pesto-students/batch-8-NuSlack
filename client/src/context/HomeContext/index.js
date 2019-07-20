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
  setActiveUserHandler,
  setChannelsMapHandler,
  newMessageHandler,
  generateChannelsMapHandler,
  generateUsersMapHandler,
  setFirstUserStatusHandler,
  setUserOfflineHandler,
  setUserOnlineHandler,
  addChannelHandler,
  removeChannelHandler,
  setUserMessagesMapHandler,
  setActiveTeamHandler,
  addTeamHandler,
  generateTeamsMapHandler,
  addUserToChannelListenerHandler,
  removeUserFromChannelListenerHandler,
} from './action-handlers';

import {
  fetchChannelMessagesApi,
  fetchUserMessagesApi,
  fetchChannelsApi,
  fetchUsersApi,
  fetchTeamsApi,
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
    activeUser,
    channelsMap,
    channelIds,
    allUserIds,
    allUsersMap,
    userMessages,
    activeTeam,
    teamsMap,
    teamIds,
  } = state;
  const generateChannelsMap = useRef(generateChannelsMapHandler(dispatch));
  const fetchChannels = useRef(fetchChannelsApi(generateChannelsMap.current));
  const generateUsersMap = useRef(generateUsersMapHandler(dispatch));
  const fetchUsers = useRef(fetchUsersApi(generateUsersMap.current));
  const setChannels = useRef(setChannelsHandler(dispatch));
  const setUser = useRef(setUserHandler(dispatch));
  const setConnected = useRef(setConnectedHandler(dispatch));
  const logoutAndReset = useRef(logoutAndResetHandler(dispatch));
  const setActiveChannel = useRef(setActiveChannelHandler(dispatch));
  const setActiveUser = useRef(setActiveUserHandler(dispatch));
  const setChannelsMap = useRef(setChannelsMapHandler(dispatch));
  const setUserMessagesMap = useRef(setUserMessagesMapHandler(dispatch));
  const fetchChannelMessages = useRef(fetchChannelMessagesApi(setChannelsMap.current));
  const fetchUserMessages = useRef(fetchUserMessagesApi(setUserMessagesMap.current));
  const newMessage = useRef(newMessageHandler(dispatch));
  const setFirstUserStatus = useRef(setFirstUserStatusHandler(dispatch));
  const setUserOffline = useRef(setUserOfflineHandler(dispatch));
  const setUserOnline = useRef(setUserOnlineHandler(dispatch));
  const addChannel = useRef(addChannelHandler(dispatch));
  const removeChannel = useRef(removeChannelHandler(dispatch));
  const setActiveTeam = useRef(setActiveTeamHandler(dispatch));
  const addTeam = useRef(addTeamHandler(dispatch));
  const generateTeamsMap = useRef(generateTeamsMapHandler(dispatch));
  const fetchTeams = useRef(fetchTeamsApi(generateTeamsMap.current));
  const addUserToChannelListener = useRef(addUserToChannelListenerHandler(dispatch));
  const removeUserFromChannelListener = useRef(removeUserFromChannelListenerHandler(dispatch));
  const sendMessage = useRef((message, channelId, receiverId, receiverSocketId) => {
    if (socketMethods) {
      socketMethods.current.sendMessage({
        message, channelId, receiverId, receiverSocketId,
      });
    }
  });
  const addUserToChannel = useRef((data) => {
    if (socketMethods) {
      socketMethods.current.emitAddUserToChannel(data);
    }
  });
  const removeUserFromChannel = useRef((data) => {
    if (socketMethods) {
      socketMethods.current.emitRemoveUserFromChannel(data);
    }
  });

  const logoutUser = useRef(() => {
    if (socketMethods.current) {
      socketMethods.current.close();
      socketMethods.current = null;
    }
    logoutAndReset.current();
  });

  useEffect(() => {
    if (user && user.username && allUserIds.length) {
      if (!socketMethods.current) {
        socketMethods.current = initSocket({
          user,
          newMessage: newMessage.current,
          setFirstUserStatus: setFirstUserStatus.current,
          setUserOffline: setUserOffline.current,
          setUserOnline: setUserOnline.current,
          addUserToChannelListener: addUserToChannelListener.current,
          removeUserFromChannelListener: removeUserFromChannelListener.current,
        });
      }
    }
  }, [user, allUserIds]);

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
    activeUser,
    setActiveChannel: setActiveChannel.current,
    setActiveUser: setActiveUser.current,
    fetchChannelMessages: fetchChannelMessages.current,
    fetchChannels: fetchChannels.current,
    channelIds,
    allUserIds,
    allUsersMap,
    fetchUsers: fetchUsers.current,
    setFirstUserStatus: setFirstUserStatus.current,
    addChannel: addChannel.current,
    removeChannel: removeChannel.current,
    addUserToChannel: addUserToChannel.current,
    removeUserFromChannel: removeUserFromChannel.current,
    fetchUserMessages: fetchUserMessages.current,
    userMessages,
    activeTeam,
    setActiveTeam: setActiveTeam.current,
    addTeam: addTeam.current,
    fetchTeams: fetchTeams.current,
    teamsMap,
    teamIds,
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
