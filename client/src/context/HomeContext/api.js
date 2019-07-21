import axios from 'axios';
import { serverConfig } from '../../config';

const fetchChannelMessagesApi = setChannelsMap => async (channelId) => {
  const { data: messages } = await axios.get(`${serverConfig.SERVER_BASE_URL}/messages`, {
    params: { channelId },
  });
  setChannelsMap(messages, channelId);
};

const fetchUserMessagesApi = setUserMessagesMap => async (senderId, receiverId) => {
  const { data: messages } = await axios.get(
    `${serverConfig.SERVER_BASE_URL}/messages/one-to-one`,
    {
      params: {
        senderId,
        receiverId,
      },
    },
  );
  setUserMessagesMap(messages, receiverId);
};

const fetchChannelsApi = generateChannelsMap => async (userId, teamId) => {
  const { data: channels } = await axios.get(`${serverConfig.SERVER_BASE_URL}/channels`, {
    params: { users: userId, teamId },
  });
  generateChannelsMap(channels);
};

const fetchUsersApi = generateUsersMap => async (teamId) => {
  const { data: users } = await axios.get(`${serverConfig.SERVER_BASE_URL}/users`, {
    params: { teams: teamId },
  });
  generateUsersMap(users);
};

const fetchTeamsApi = generateTeamsMap => async (userId) => {
  if (userId) {
    const { data: user } = await axios.get(`${serverConfig.SERVER_BASE_URL}/users/${userId}`);
    const { teams } = user;
    generateTeamsMap(teams);
  }
};

export {
  fetchChannelsApi,
  fetchChannelMessagesApi,
  fetchUserMessagesApi,
  fetchUsersApi,
  fetchTeamsApi,
};
