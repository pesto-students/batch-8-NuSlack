import { localStorageKeys } from '../../config';

const getInitialState = () => {
  const user = localStorage.getItem(localStorageKeys.USER_DETAILS);

  const initialState = {
    user: user ? JSON.parse(user) : {},
    isConnecting: true,
    isConnected: false,
    channelIds: [],
    channelsMap: {},
    allUserIds: [],
    allUsersMap: {},
    activeChannel: null,
    activeUser: null,
    userMessages: {},
    activeTeam: null,
    error: null,
    teamsMap: {},
    teamIds: [],
    //  1. setInterval to front-end, base counter to 5 and setInterval till it reaches 0
    //  2. emit the stopTyping event
    typingUsers : [],
  };

  return initialState;
};

export default getInitialState;
