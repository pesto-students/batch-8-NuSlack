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
    // FIXME
    typingIndicator: {},
    //typingIndicator: {channelId, recieverId, typingUsers},
  };

  return initialState;
};

export default getInitialState;
