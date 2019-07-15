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
    error: null,
  };

  return initialState;
};

export default getInitialState;
