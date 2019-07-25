import { localStorageKeys } from '../../config';

const getInitialState = () => {
  const user = localStorage.getItem(localStorageKeys.USER_DETAILS);
  const activeTeam = localStorage.getItem('activeTeam') || null;

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
    activeTeam,
    error: null,
    teamsMap: {},
    teamIds: [],
  };

  return initialState;
};

export default getInitialState;
