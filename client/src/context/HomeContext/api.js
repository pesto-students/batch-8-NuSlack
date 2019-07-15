import axios from 'axios';
import { serverConfig } from '../../config';

const fetchMessagesApi = setChannelsMap => async (channelId) => {
  const { data: messages } = await axios.get(`${serverConfig.SERVER_BASE_URL}/messages`, {
    params: { channelId },
  });
  setChannelsMap(messages, channelId);
};

const fetchChannelsApi = generateChannelsMap => async (userId) => {
  const { data: channels } = await axios.get(`${serverConfig.SERVER_BASE_URL}/channels`, {
    params: { users: userId },
  });
  generateChannelsMap(channels);
};

const fetchUsersApi = generateUsersMap => async () => {
  const { data: users } = await axios.get(`${serverConfig.SERVER_BASE_URL}/users`);
  generateUsersMap(users);
};

export { fetchChannelsApi, fetchMessagesApi, fetchUsersApi };
