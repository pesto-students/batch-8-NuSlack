import { useReducer } from 'react';
import createUseContext from 'constate';

import reducer from './reducer';
import initialState from './state';
import { setChannelsHandler, setUserHandler } from './hooks';

const useHome = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, channels } = state;
  const setChannels = setChannelsHandler(dispatch);
  const setUser = setUserHandler(dispatch);
  return {
    user,
    channels,
    setChannels,
    setUser,
  };
};

const useHomeContext = createUseContext(useHome);

export { useHomeContext, useHome };
